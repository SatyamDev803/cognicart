from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from typing import List

from app.db.models import Product, Sale
from app.schemas.product import ProductCreate, ProductUpdate
from app.exceptions import ProductNotFoundException
from fastapi import HTTPException, status

from app.ai.embedding import get_embedding
from app.ai.vector_store.chroma_client import get_product_collection


async def search_products_semantic(db: AsyncSession, query: str, limit: int = 10) -> List[Product]:
    if not query: 
        return []
    
    query_embedding = get_embedding(query)
    if not query_embedding:
        print("Warning: Could not generate embedding for query.")
        return []
    
    try:
        product_collection = get_product_collection()
        results = product_collection.query(
            query_embeddings=[query_embedding],
            n_results=limit,
            include=['metadatas']
        )
    except Exception as e:
        print(f"Error querying vector database: {e}")
        return []
    
    if not results or not results.get("ids") or not results["ids"][0]:
        return []
    
    product_ids = [int(id_str) for id_str in results["ids"][0]]

    if not product_ids:
        return []
    
    stmt = select(Product).where(Product.id.in_(product_ids))

    db_result = await db.execute(stmt)
    products_from_db = db_result.scalars().all()

    product_map = {product.id: product for product in products_from_db}
    ordered_products = [product_map[pid] for pid in product_ids if pid in product_map]

    return ordered_products


async def create_new_product(db: AsyncSession, product: ProductCreate) -> Product:
    db_product = Product(**product.model_dump())
    db.add(db_product)
    await db.commit()
    await db.refresh(db_product)

    # Generate and store embedding
    if db_product.description:
        embedding = get_embedding(db_product.description)
        if embedding:
            try:
                product_collection = get_product_collection()
                product_collection.add(
                    ids=[str(db_product.id)],
                    embeddings=[embedding],
                    metadatas=[{"name": db_product.name, "price": db_product.price}]
                )
            except Exception as e:
                 print(f"Error adding embedding for product {db_product.id}: {e}")
    return db_product

async def get_product_by_id(db: AsyncSession, product_id: int) -> Product:
    db_product = await db.get(Product, product_id)
    if not db_product:
        raise ProductNotFoundException(f"Product with ID {product_id} not found")
    return db_product

async def get_all_products(db: AsyncSession, skip: int = 0, limit: int = 100) -> List[Product]:
    result = await db.execute(select(Product).order_by(Product.id).offset(skip).limit(limit))
    return result.scalars().all()

async def update_product(db: AsyncSession, product_id: int, product_update: ProductUpdate) -> Product:
    db_product = await get_product_by_id(db, product_id)
    if not db_product:
        raise ProductNotFoundException(f"Product with ID {product_id} not found")

    update_data = product_update.model_dump(exclude_unset=True)
    description_changed = 'description' in update_data and update_data['description'] != db_product.description

    for key, value in update_data.items():
        setattr(db_product, key, value)

    await db.commit()
    await db.refresh(db_product)

    # Update embedding if description changed
    if description_changed and db_product.description:
        embedding = get_embedding(db_product.description)
        if embedding:
            try:
                product_collection = get_product_collection()
                product_collection.upsert(
                    ids=[str(db_product.id)],
                    embeddings=[embedding],
                    metadatas=[{"name": db_product.name, "price": db_product.price}]
                )
            except Exception as e:
                 print(f"Error updating embedding for product {db_product.id}: {e}")
    return db_product

async def delete_product(db: AsyncSession, product_id: int):
    sales_count_query = select(func.count(Sale.id)).where(Sale.product_id == product_id)
    sales_count = await db.scalar(sales_count_query)
    if sales_count > 0:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"Cannot delete product ID {product_id}. It has {sales_count} associated sale(s).")

    db_product = await get_product_by_id(db, product_id)
    if not db_product:
        raise ProductNotFoundException(f"Product with ID {product_id} not found")

    await db.delete(db_product)
    await db.commit()

    # Delete embedding from vector store
    try:
        product_collection = get_product_collection()
        product_collection.delete(ids=[str(product_id)])
    except Exception as e:
        print(f"Warning: Failed to delete embedding for product {product_id}: {e}")
    return {"message": "Product deleted successfully"}
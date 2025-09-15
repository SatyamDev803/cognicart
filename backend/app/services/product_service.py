from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import func
from typing import List

from app.db.models import Product, Sale
from app.schemas.product import ProductCreate, ProductUpdate
from app.exceptions import ProductNotFoundException

async def create_new_product(db: AsyncSession, product: ProductCreate) -> Product:
    db_product = Product(**product.model_dump())
    db.add(db_product)
    await db.commit()
    await db.refresh(db_product)
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

    if db_product is None:
        raise ProductNotFoundException(f"Product with ID {product_id} not found")
    
    update_data = product_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_product, key, value)

    await db.commit()
    await db.refresh(db_product)
    return db_product

async def delete_product(db: AsyncSession, product_id: int):
    # First, check if there are any sales associated with this product
    sales_count_query = select(func.count(Sale.id)).where(Sale.product_id == product_id)
    sales_count = await db.scalar(sales_count_query)

    if sales_count > 0:
        # If sales exist, raise a 409 Conflict error
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Cannot delete product with ID {product_id}. It has {sales_count} associated sale(s)."
        )

    # If no sales, proceed with deletion
    db_product = await get_product_by_id(db, product_id)
    
    if db_product is None:
        raise ProductNotFoundException(f"Product with ID {product_id} not found")
    
    await db.delete(db_product)
    await db.commit()
    # No need to return the product, as it's deleted
    return {"message": "Product deleted successfully"}
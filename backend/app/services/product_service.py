from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List

from app.db.models import Product
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

async def get_all_products(db: AsyncSession) -> List[Product]:
    result = await db.execute(select(Product).order_by(Product.id))
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

async def delete_product(db: AsyncSession, product_id: int) -> Product:
    db_product = await get_product_by_id(db, product_id)

    if db_product is None:
        raise ProductNotFoundException(f"Product with ID {product_id} not found")
    
    await db.delete(db_product)
    await db.commit()
    return db_product
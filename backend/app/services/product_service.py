from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List

from app.db.models import Product
from app.schemas.product import ProductCreate

async def get_all_products(db: AsyncSession) -> List[Product]:
    result = await db.execute(select(Product).order_by(Product.id))
    return result.scalars().all()

async def create_product(db: AsyncSession, product: ProductCreate) -> Product:
    db_product = Product(**product.dict())
    db.add(db_product)
    await db.commit()
    await db.refresh(db_product)
    return db_product 
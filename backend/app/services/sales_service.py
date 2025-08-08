from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List

from app.db.models import Sale
from app.schemas.sale import SaleCreate

async def create_new_sale(db: AsyncSession, sale: SaleCreate) -> Sale:
    """
    Creates a new sale record in the database.
    """
    db_sale = Sale(
        product_id=sale.product_id,
        quantity=sale.quantity,
        price_per_unit=sale.price_per_unit,
    )
    db.add(db_sale)
    await db.commit()
    await db.refresh(db_sale)
    return db_sale

async def get_all_sales(db: AsyncSession, skip: int = 0, limit: int = 100) -> List[Sale]:
    """
    Retrieves all sales records from the database with pagination.
    """
    result = await db.execute(select(Sale).offset(skip).limit(limit))
    return result.scalars().all()
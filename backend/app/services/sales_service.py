from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import func 
from typing import List

from app.db.models import Sale
from app.schemas.sale import SaleCreate, SalesAnalytics  

async def create_new_sale(db: AsyncSession, sale: SaleCreate) -> Sale:
    db_sale = Sale(**sale.dict())
    db.add(db_sale)
    await db.commit()
    await db.refresh(db_sale)
    return db_sale

async def get_all_sales(db: AsyncSession, skip: int = 0, limit: int = 100) -> List[Sale]:
    result = await db.execute(select(Sale).order_by(Sale.id.desc()).offset(skip).limit(limit))
    return result.scalars().all()

async def get_sales_analytics(db: AsyncSession) -> SalesAnalytics:
    # Calculates sales analytics from the database
    total_revenue_query = select(func.sum(Sale.quantity * Sale.price_per_unit))
    sales_count_query = select(func.count(Sale.id))

    total_revenue_result = await db.execute(total_revenue_query)
    sales_count_result = await db.execute(sales_count_query)

    total_revenue = total_revenue_result.scalar_one_or_none() or 0
    sales_count = sales_count_result.scalar_one_or_none() or 0

    average_sale = total_revenue / sales_count if sales_count > 0 else 0

    return SalesAnalytics(
        total_revenue=total_revenue,
        sales_count=sales_count,
        average_sale=average_sale
    )


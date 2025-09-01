from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import func 
from typing import List

from app.db.models import Sale
from app.schemas.sale import SaleCreate, SalesAnalytics, SaleUpdate

async def create_new_sale(db: AsyncSession, sale: SaleCreate) -> Sale:
    db_sale = Sale(**sale.model_dump())
    db.add(db_sale)
    await db.commit()
    await db.refresh(db_sale)
    return db_sale


async def get_all_sales(db: AsyncSession, skip: int = 0, limit: int = 100) -> List[Sale]:
    query = select(Sale).order_by(Sale.id.desc()).offset(skip).limit(limit)
    result = await db.scalars(query)
    return result.all()


async def update_sale(db: AsyncSession, sale_id: int, sale_update: SaleUpdate) -> Sale:
    db_sale = await db.get(Sale, sale_id) 
    
    if db_sale is None:
        raise HTTPException(status_code=404, detail="Sale not found")

    update_data = sale_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_sale, key, value)

    db.add(db_sale)
    await db.commit()
    await db.refresh(db_sale)
    return db_sale


async def delete_sale(db: AsyncSession, sale_id: int) -> None:
    db_sale = await db.get(Sale, sale_id)
    
    if db_sale is None:
        raise HTTPException(status_code=404, detail="Sale not found")

    await db.delete(db_sale)
    await db.commit()
    return


async def get_sales_analytics(db: AsyncSession) -> SalesAnalytics:
    # Use a single query to calculate all metrics at once.
    query = select(
        func.coalesce(func.sum(Sale.quantity * Sale.price_per_unit), 0).label('total_revenue'),
        func.coalesce(func.count(Sale.id), 0).label('sales_count'),
        func.coalesce(func.avg(Sale.quantity * Sale.price_per_unit), 0).label('average_sale')
    )

    # Execute the query and get the result.
    result = await db.execute(query)
    
    # Get the single row of results.
    analytics_row = result.first()
    
    # Unpack the results from the row using column labels.
    total_revenue = analytics_row.total_revenue
    sales_count = analytics_row.sales_count
    average_sale = analytics_row.average_sale

    return SalesAnalytics(
        total_revenue=total_revenue,
        sales_count=sales_count,
        average_sale=average_sale
    )
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import func, select
from typing import List

from app.db.models import Sale, Product
from app.schemas.product import TopProduct

async def get_top_selling_products(db: AsyncSession) -> List[TopProduct]:
    query = (
        select(
            Product.id.label("product_id"),
            Product.name.label("product_name"),
            func.sum(Sale.quantity).label("total_quantity_sold")
        )
        .join(Sale, Product.id == Sale.product_id)
        .group_by(Product.id, Product.name)
        .order_by(func.sum(Sale.quantity).desc())
        .limit(5)
    )

    result = await db.execute(query)
    return result.all()
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.api.v1.dependencies import get_current_user
from app.db.models import User
from app.db.session import get_db
from app.schemas.product import TopProduct
from app.services import analytics_service

router = APIRouter(prefix="/analytics", tags=["Analytics"])

@router.get("/top-products", response_model=List[TopProduct], summary="Get top 5 selling products")
async def get_top_products(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return await analytics_service.get_top_selling_product(db=db)
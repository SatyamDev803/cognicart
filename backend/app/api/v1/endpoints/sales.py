from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.db.session import get_db
from app.schemas.sale import Sale as SaleSchema, SaleCreate, SalesAnalytics
from app.services import sales_service

router = APIRouter()

@router.post("/", response_model=SaleSchema, status_code=status.HTTP_201_CREATED)
async def create_sale(
    sale_in: SaleCreate,
    db: AsyncSession = Depends(get_db),
):
    return await sales_service.create_new_sale(db=db, sale=sale_in)

@router.get("/", response_model=List[SaleSchema])
async def read_sales(
    skip: int = 0,
    limit: int = 100,
    db: AsyncSession = Depends(get_db)
):
    return await sales_service.get_all_sales(db=db, skip=skip, limit=limit)

@router.get("/analytics/", response_model=SalesAnalytics)
async def get_analytics(db: AsyncSession = Depends(get_db)):
    return await sales_service.get_sales_analytics(db=db)
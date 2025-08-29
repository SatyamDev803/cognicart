from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Dict

from app.db.session import get_db
from app.schemas.sale import Sale as SaleSchema, SaleCreate, SalesAnalytics, SaleUpdate
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


@router.get("/analytics/", response_model= sales_service.SalesAnalytics)
async def get_analytics(db: AsyncSession = Depends(get_db)):
    return await sales_service.get_sales_analytics(db=db)


@router.put("/{sale_id}", response_model=SaleSchema)
async def update_existing_sale(
    sale_id: int, 
    sale_in: SaleUpdate, 
    db: AsyncSession = Depends(get_db)
):
    return await sales_service.update_sale(db=db, sale_id=sale_id, sale_update=sale_in)


@router.delete("/{sale_id}", response_model=Dict[str, str])
async def delete_existing_sale(
    sale_id: int, 
    db: AsyncSession = Depends(get_db)
):
    await sales_service.delete_sale(db=db, sale_id=sale_id)
    return {"message": "Sale deleted successfully"}
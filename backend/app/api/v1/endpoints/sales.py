from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.db.session import get_db
from app.schemas.sale import Sale, SaleCreate, SalesAnalytics, SaleUpdate
from app.schemas.common import MessageResponse
from app.services import sales_service

router = APIRouter(prefix="/sales", tags=["Sales"])

@router.post("/", response_model=Sale, status_code=status.HTTP_201_CREATED, summary="Create a new sale")
async def create_sale(
    sale_in: SaleCreate,
    db: AsyncSession = Depends(get_db),
):
    return await sales_service.create_new_sale(db=db, sale=sale_in)

@router.get("/", response_model=List[Sale], summary="Get all sales")
async def read_sales(
    skip: int = 0,
    limit: int = 100,
    db: AsyncSession = Depends(get_db)
):
    return await sales_service.get_all_sales(db=db, skip=skip, limit=limit)
    
@router.get("/analytics", response_model=SalesAnalytics, summary="Get sales analytics")
async def get_analytics(db: AsyncSession = Depends(get_db)):
    return await sales_service.get_sales_analytics(db=db)

@router.get("/{sale_id}", response_model=Sale, summary="Get a single sale by ID")
async def read_sale(
    sale_id: int,
    db: AsyncSession = Depends(get_db)
):
    return await sales_service.get_sale_by_id(db=db, sale_id=sale_id)

@router.put("/{sale_id}", response_model=Sale, summary="Update a sale")
async def update_sale(
    sale_id: int, 
    sale_in: SaleUpdate, 
    db: AsyncSession = Depends(get_db)
):  
    return await sales_service.update_sale(db=db, sale_id=sale_id, sale_update=sale_in)

@router.delete("/{sale_id}", response_model=MessageResponse, summary="Delete a sale")
async def delete_sale(
    sale_id: int, 
    db: AsyncSession = Depends(get_db)
):  
    await sales_service.delete_sale(db=db, sale_id=sale_id)
    return {"message": "Sale deleted successfully"}
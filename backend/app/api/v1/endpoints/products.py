from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.db.session import get_db
from app.schemas.product import Product, ProductCreate, ProductUpdate
from app.schemas.common import MessageResponse
from app.services import product_service

router = APIRouter(prefix="/products", tags=["Products"])

@router.post("/", response_model=Product, status_code=status.HTTP_201_CREATED, summary="Create a new product")
async def create_product(
    product_in: ProductCreate, 
    db: AsyncSession = Depends(get_db)
):
    return await product_service.create_new_product(db=db, product=product_in)


@router.get("/", response_model=List[Product], summary="Get all products")
async def read_products(
    skip: int = 0, 
    limit: int = 100, 
    db: AsyncSession = Depends(get_db)
):
    return await product_service.get_all_products(db=db, skip=skip, limit=limit)


@router.get("/{product_id}", response_model=Product, summary="Get a single product by ID")
async def read_product(
    product_id: int, 
    db: AsyncSession = Depends(get_db)
):
    return await product_service.get_product_by_id(db=db, product_id=product_id)


@router.put("/{product_id}", response_model=Product, summary="Update a product")
async def update_product(
    product_id: int, 
    product_in: ProductUpdate, 
    db: AsyncSession = Depends(get_db)
):
    return await product_service.update_product(db=db, product_id=product_id, product_update=product_in)


@router.delete("/{product_id}", response_model=MessageResponse, summary="Delete a product")
async def delete_product(
    product_id: int, 
    db: AsyncSession = Depends(get_db)
):
    await product_service.delete_product(db=db, product_id=product_id)
    return {"message": "Product deleted successfully"}
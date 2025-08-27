from app.db.session import get_db
from app.schemas.product import Product, ProductCreate
from app.services import product_service

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List 

router = APIRouter()

@router.get("/", response_model = List[Product])
async def read_products(db: AsyncSession = Depends(get_db)):
    return await product_service.get_all_products(db = db)

@router.post("/", response_model = Product, status_code = 201)
async def create_new_product(product_in: ProductCreate, db: AsyncSession = Depends(get_db)):
    return await product_service.create_product(db = db, product=product_in)


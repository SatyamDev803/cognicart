from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.db.session import get_db
from app.schemas.product import Product, ProductCreate, ProductUpdate, ProductSearchQuery 
from app.schemas.common import MessageResponse
from app.services import product_service
from app.api.v1.dependencies import require_admin_user, get_current_user
from app.schemas.user import User as UserSchema

router = APIRouter(prefix="/products", tags=["Products"])


@router.post("/search", response_model=List[Product], summary="Perform semantic search for products")
async def search_products(
    search_query: ProductSearchQuery,
    db: AsyncSession = Depends(get_db),
    current_user: UserSchema = Depends(get_current_user) 
):
    try:
        results = await product_service.search_products_semantic(db=db, query=search_query.query)
        return results
    except Exception as e:
        print(f"Error during semantic search: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to perform product search.")


@router.post("/", response_model=Product, status_code=status.HTTP_201_CREATED)
async def create_product(product_in: ProductCreate, db: AsyncSession = Depends(get_db), admin_user: UserSchema = Depends(require_admin_user)):
    return await product_service.create_new_product(db=db, product=product_in)

@router.get("/", response_model=List[Product])
async def read_products(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db), current_user: UserSchema = Depends(get_current_user)):
    return await product_service.get_all_products(db=db, skip=skip, limit=limit)

@router.get("/{product_id}", response_model=Product)
async def read_product(product_id: int, db: AsyncSession = Depends(get_db), current_user: UserSchema = Depends(get_current_user)):
    return await product_service.get_product_by_id(db=db, product_id=product_id)

@router.put("/{product_id}", response_model=Product)
async def update_product(product_id: int, product_in: ProductUpdate, db: AsyncSession = Depends(get_db), admin_user: UserSchema = Depends(require_admin_user)):
    return await product_service.update_product(db=db, product_id=product_id, product_update=product_in)

@router.delete("/{product_id}", response_model=MessageResponse)
async def delete_product(product_id: int, db: AsyncSession = Depends(get_db), admin_user: UserSchema = Depends(require_admin_user)):
    return await product_service.delete_product(db=db, product_id=product_id)
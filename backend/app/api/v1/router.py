from fastapi import APIRouter
from app.api.v1.endpoints import sales
from app.api.v1.endpoints import products

api_router = APIRouter()
api_router.include_router(sales.router, prefix="/sales", tags=["sales"])
api_router.include_router(products.router, prefix = "/products", tags = ["products"])
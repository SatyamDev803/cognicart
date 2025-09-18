from fastapi import APIRouter
from app.api.v1.endpoints import sales, products, auth

api_router = APIRouter()

api_router.include_router(auth.router)
api_router.include_router(sales.router)
api_router.include_router(products.router)
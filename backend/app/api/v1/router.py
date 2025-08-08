from fastapi import APIRouter
from app.api.v1.endpoints import sales

api_router = APIRouter()
api_router.include_router(sales.router, prefix="/sales", tags=["sales"])
from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class SaleBase(BaseModel):
    product_id: str
    quantity: int
    price_per_unit: float

class SaleCreate(SaleBase):
    pass

class SaleUpdate(BaseModel):
    product_id: Optional[str] = None
    quantity: Optional[int] = None
    price_per_unit: Optional[float] = None

class Sale(SaleBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class SalesAnalytics(BaseModel):
    total_revenue: float
    sales_count: int
    average_sale: float
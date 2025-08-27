from pydantic import BaseModel
from datetime import datetime

class SaleBase(BaseModel):
    product_id: str
    quantity: int
    price_per_unit: float

class SaleCreate(SaleBase):
    pass

class Sale(BaseModel):
    id: int
    product_id: str
    quantity: int
    price_per_unit: float
    created_at: datetime

    class Config:
        from_attributes = True

class SalesAnalytics(BaseModel):
    total_revenue: float
    sales_count: int
    average_sale: float
from pydantic import BaseModel, Field, ConfigDict
from datetime import datetime
from typing import Optional

class SaleBase(BaseModel):
    product_id: int = Field(..., gt=0) 
    quantity: int = Field(..., gt=0)
    price_per_unit: float = Field(..., gt=0)

class SaleCreate(SaleBase):
    pass

class SaleUpdate(BaseModel):
    product_id: Optional[int] = Field(default=None, gt=0) 
    quantity: Optional[int] = Field(default=None, gt=0)
    price_per_unit: Optional[float] = Field(default=None, gt=0)

class Sale(SaleBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

class SalesAnalytics(BaseModel):
    total_revenue: float
    sales_count: int
    average_sale: float
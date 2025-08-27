from pydantic import BaseModel
from datetime import datetime

class ProductBase(BaseModel):
    name: str
    description: str | None = None 
    price: float 

class ProductCreate(ProductBase):
    pass 

class Product(ProductBase):
    id: int

    class Config:
        from_attributes = True  
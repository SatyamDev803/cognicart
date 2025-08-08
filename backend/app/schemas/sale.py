from pydantic import BaseModel
from datetime import datetime

# This schema is used when creating a new sale via the API.
# It defines the fields the user must provide.
class SaleCreate(BaseModel):
    product_id: str
    quantity: int
    price_per_unit: float

# This schema is used when reading a sale from the API.
# It defines the fields that will be returned to the user.
class Sale(BaseModel):
    id: int
    product_id: str
    quantity: int
    price_per_unit: float
    created_at: datetime

    class Config:
        # This allows Pydantic to read the data from an ORM model (SQLAlchemy)
        from_attributes = True
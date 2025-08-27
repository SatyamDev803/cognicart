from sqlalchemy import Column, Integer, String, Float, DateTime, func
from app.db.base import Base

class Sale(Base):
    __tablename__ = "sales"

    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(String, index=True, nullable=False)
    quantity = Column(Integer, nullable=False)
    price_per_unit = Column(Float, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key = True, index = True)
    name = Column(String, index = True, nullable = False)
    description = Column(String, nullable = False)
    price = Column(Float, nullable = False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

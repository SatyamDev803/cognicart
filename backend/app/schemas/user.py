from pydantic import BaseModel, EmailStr, ConfigDict
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    name: Optional[str] = None
    role: str = "viewer"


class UserCreate(UserBase):
    name: str
    password: str

class User(UserBase):
    id: int
    is_active: bool 
    created_at: datetime

    model_config = ConfigDict(from_attributes = True)


class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None 
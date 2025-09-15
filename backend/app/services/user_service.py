import email
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession 
from sqlalchemy.future import select
from typing import Optional

from app.db.models import User
from app.schemas.user import UserCreate
from app.core.security import get_password_hash, verify_password

async def get_user_by_email(db: AsyncSession, email: str) -> Optional[User]:
    result = await db.execute(select(User).filter(User.email == email))
    return result.scalars().first()

async def create_user(db: AsyncSession, user: UserCreate) -> User:
    db_user = await get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(
            status_code = status.HTTP_400_BAD_REQUEST,
            detail = "Email already registered"
        )
    
    hashed_password = get_password_hash(user.password)
    db_user = User(
        email = user.email,
        name = user.name,
        hashed_password = hashed_password,
        role = user.role
    )

    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)
    return db_user

async def authenticate_user(db: AsyncSession, email: str, password: str) -> Optional[User]:
    user = await get_user_by_email(db, email=email)
    if not user or not user.is_active or not user.hashed_password:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    
    return user 

async def get_or_create_user_from_google(db: AsyncSession, user_info: dict) -> User:
    user = await get_user_by_email(db, email=user_info['email'])
    if user:
        if not user.google_id:
            user.google_id = user_info.get('sub')
            db.add(user)
            await db.commit()
            await db.refresh(user)
        return user
    
    else:
        new_user = User(
            email=user_info['email'],
            name=user_info.get('name'), # <-- ADD THIS LINE
            google_id = user_info.get('sub'),
            hashed_password = None,
            role = "viewer"
        )
        db.add(new_user)
        await db.commit()
        await db.refresh(new_user)
        return new_user
    

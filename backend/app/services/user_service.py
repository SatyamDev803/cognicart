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


async def get_user_by_id(db: AsyncSession, user_id: int) -> Optional[User]:
    return await db.get(User, user_id)


async def create_user(db: AsyncSession, user: UserCreate) -> User:
    existing_user = await get_user_by_email(db, email=user.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    hashed_password = get_password_hash(user.password)
    new_user = User(
        name=user.name,
        email=user.email,
        hashed_password=hashed_password,
        role=user.role
    )
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    return new_user


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
            await db.commit()
        return user
    
    new_user = User(
        email=user_info['email'],
        name=user_info.get('name'),
        google_id=user_info.get('sub'),
        hashed_password=None,
        role="viewer"
    )
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    return new_user

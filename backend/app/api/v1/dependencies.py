import json
from fastapi import Depends, HTTPException, status, Request
from sqlalchemy.ext.asyncio import AsyncSession
from redis.asyncio import Redis

from app.db.session import get_db
from app.db.redis_client import get_redis
from app.schemas.user import User as UserSchema
from app.services import user_service

SESSION_COOKIE_NAME = "session_id"

async def get_current_user(
    request: Request,
    db: AsyncSession = Depends(get_db),
    redis_client: Redis = Depends(get_redis)
) -> UserSchema:
    session_id = request.cookies.get(SESSION_COOKIE_NAME)
    if not session_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")

    user_data_json = await redis_client.get(f"session:{session_id}")
    if not user_data_json:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Session expired or invalid")

    user_data = json.loads(user_data_json)
    user = await user_service.get_user_by_id(db, user_id=user_data.get("id"))
    
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
        
    return user

async def require_admin_user(current_user: UserSchema = Depends(get_current_user)) -> UserSchema:
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="The user does not have adequate permissions"
        )
    return current_user
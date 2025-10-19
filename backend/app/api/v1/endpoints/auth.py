import uuid
from fastapi import APIRouter, Depends, HTTPException, status, Request, Response
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from redis.asyncio import Redis
from authlib.integrations.starlette_client import OAuth

from app.db.session import get_db
from app.db.redis_client import get_redis
from app.schemas.user import UserCreate, User as UserSchema
from app.services import user_service
from app.core.config import settings
from app.api.v1.dependencies import get_current_user

router = APIRouter(prefix="/auth", tags=["Authentication"])

SESSION_COOKIE_NAME = "session_id"
SESSION_EXPIRATION_SECONDS = 1800

oauth = OAuth()
oauth.register(
    name='google',
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_id=settings.GOOGLE_CLIENT_ID,
    client_secret=settings.GOOGLE_CLIENT_SECRET,
    client_kwargs={'scope': 'openid email profile'}
)

async def create_session(response: Response, user: UserSchema, redis_client: Redis):
    session_id = str(uuid.uuid4())
    user_data = UserSchema.model_validate(user).model_dump_json()
    await redis_client.set(f"session:{session_id}", user_data, ex=SESSION_EXPIRATION_SECONDS)
    response.set_cookie(key=SESSION_COOKIE_NAME, value=session_id, httponly=True, samesite="lax", secure=False, expires=SESSION_EXPIRATION_SECONDS, path="/")

@router.post("/login")
async def login_for_session(response: Response, db: AsyncSession = Depends(get_db), redis_client: Redis = Depends(get_redis), form_data: OAuth2PasswordRequestForm = Depends()):
    user = await user_service.authenticate_user(db, email=form_data.username, password=form_data.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect email or password")
    await create_session(response, user, redis_client)
    return {"message": "Login successful"}

@router.post("/register", response_model=UserSchema, status_code=status.HTTP_201_CREATED)
async def register_user(response: Response, user_in: UserCreate, db: AsyncSession = Depends(get_db), redis_client: Redis = Depends(get_redis)):
    user = await user_service.create_user(db=db, user=user_in)
    await create_session(response, user, redis_client)
    return user

@router.post("/logout")
async def logout(response: Response, request: Request, redis_client: Redis = Depends(get_redis)):
    session_id = request.cookies.get(SESSION_COOKIE_NAME)
    if session_id:
        await redis_client.delete(f"session:{session_id}")
    response.delete_cookie(SESSION_COOKIE_NAME, path="/")
    return {"message": "Logout successful"}

@router.get("/me", response_model=UserSchema)
async def read_users_me(current_user: UserSchema = Depends(get_current_user)):
    return current_user

@router.get("/google/login")
async def login_via_google(request: Request):
    redirect_uri = settings.GOOGLE_REDIRECT_URI
    return await oauth.google.authorize_redirect(request, redirect_uri)

@router.get("/google/callback")
async def auth_via_google_callback(request: Request, response: Response, db: AsyncSession = Depends(get_db), redis_client: Redis = Depends(get_redis)):
    try:
        token = await oauth.google.authorize_access_token(request)
    except Exception:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Could not validate credentials')
    user_info = token.get('userinfo')
    if not user_info:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Could not fetch user info')
    user = await user_service.get_or_create_user_from_google(db, user_info=user_info)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Could not create or retrieve user')
    await create_session(response, user, redis_client)
    response.status_code = status.HTTP_307_TEMPORARY_REDIRECT
    response.headers["Location"] = f"{settings.FRONTEND_URL}/dashboard"
    return response
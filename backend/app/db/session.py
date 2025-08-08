from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

# Create an async engine to connect to the database
engine = create_async_engine(settings.DATABASE_URL, echo=True, future=True)

# Create a sessionmaker to generate new DB sessions
AsyncSessionLocal = sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False
)

async def get_db() -> AsyncSession:
    """
    FastAPI dependency that provides a database session for each request.
    """
    async with AsyncSessionLocal() as session:
        yield session
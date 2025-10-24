from langchain_google_genai import ChatGoogleGenerativeAI
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)

llm = None

try:
    llm = ChatGoogleGenerativeAI(
        model=settings.GOOGLE_GENAI_MODEL,
        google_api_key=settings.GOOGLE_API_KEY,
        temperature=0,
        convert_system_message_to_human=True,
    )
    logger.info("Successfully connected to Google GenAI", extra={"model": settings.GOOGLE_GENAI_MODEL})
except Exception as e:
    logger.error("Failed to initialize the gemini-2.5-flash model", exc_info=True)
    raise RuntimeError(f"Failed to initialize model {settings.GOOGLE_GENAI_MODEL}: {e}")

if llm is None:
    logger.error(
        "Failed to initialize a Google GenAI model. Set GOOGLE_API_KEY and/or "
        "GOOGLE_GENAI_MODEL in your environment to a supported model name. "
    )


def get_llm():
    if llm is None:
        raise RuntimeError("Gemini LLM is not initialized. Check GOOGLE_API_KEY and GOOGLE_GENAI_MODEL.")
    return llm
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.api.v1.dependencies import get_current_user
from app.db.models import User
from app.db.session import get_db
from app.schemas.product import TopProduct
from app.services import analytics_service
from app.schemas.agent import AgentQuery, AgentResponse
from app.ai.agent_logic.sale_agent import get_agent_executor
import asyncio
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/analytics", tags=["Analytics"])


def _extract_answer_from_graph_result(result) -> str:
    # Extract readable text from the agent's response
    try:
        # Return if already a string
        if isinstance(result, str):
            return result

        if isinstance(result, dict):
            # Check for common response keys
            if "output" in result and isinstance(result["output"], str):
                return result["output"]
            if "answer" in result and isinstance(result["answer"], str):
                return result["answer"]

            # Extract from messages list
            msgs = result.get("messages") if isinstance(result.get("messages"), list) else None
            if msgs:
                # Find the last assistant message
                for m in reversed(msgs):
                    content = None
                    if isinstance(m, dict):
                        content = m.get("content")
                    else:
                        content = getattr(m, "content", None)

                    if not content:
                        continue

                    # Handle string content
                    if isinstance(content, str) and content.strip():
                        return content.strip()

                    # Handle structured content (list of parts)
                    if isinstance(content, list):
                        parts = []
                        for part in content:
                            if isinstance(part, dict) and part.get("type") == "text":
                                txt = part.get("text")
                                if isinstance(txt, str):
                                    parts.append(txt)
                            elif isinstance(part, str):
                                parts.append(part)
                        if parts:
                            return "\n".join(p.strip() for p in parts if p and p.strip())

            # Try other common keys
            for key in ("result", "response", "output", "messages"):
                if key in result:
                    return str(result[key])

        return str(result)
    except Exception:
        logger.exception("Failed to extract answer from graph result")
        return str(result)


@router.get("/top-products", response_model=List[TopProduct], summary="Get top 5 selling products")
async def get_top_products(
    db: AsyncSession = Depends(get_db),
    # current_user: User = Depends(get_current_user)
):
    # Fetch top selling products from the database
    return await analytics_service.get_top_selling_products(db=db)


@router.post("/ask", response_model=AgentResponse, summary="Ask the AI sales agent a question")
async def ask_agent(query: AgentQuery, current_user: User = Depends(get_current_user)):
    # Run the AI agent to answer sales analytics questions
    try:
        agent_graph = get_agent_executor()

        # Run agent asynchronously
        result = await agent_graph.ainvoke({"messages": [{"role": "user", "content": query.question}]})

        answer = _extract_answer_from_graph_result(result)
        return AgentResponse(answer=answer)
    except RuntimeError as e:
        raise HTTPException(status_code=503, detail=str(e))
    except Exception as e:
        logger.exception("Error running agent")
        raise

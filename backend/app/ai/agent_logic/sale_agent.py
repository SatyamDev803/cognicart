from typing import Optional
import logging
from langchain.agents import create_agent

from app.ai.llm.gemini_client import get_llm
from app.ai.agent_logic.tools import get_top_selling_products, get_monthly_sales_revenue_trends

logger = logging.getLogger(__name__)

# Initialize LLM and tools
_LLM = get_llm()
_TOOLS = [get_top_selling_products, get_monthly_sales_revenue_trends]

# Cache the agent graph to avoid recreation
_CACHED_GRAPH: Optional[object] = None


# Create and cache the agent graph. Returns the compiled agent
def get_agent_executor():
    
    global _CACHED_GRAPH
    
    if _CACHED_GRAPH is not None:
        return _CACHED_GRAPH
    
    model = _LLM
    if model is None:
        raise RuntimeError("LLM not initialized. Please set GOOGLE_API_KEY and GOOGLE_GENAI_MODEL if needed.")
    
    try:
        _CACHED_GRAPH = create_agent(
            model=model,
            tools=_TOOLS,
            system_prompt="You are a helpful sales analytics assistant.",
            debug=False,
        )
        logger.info("Created and cached agent graph")
        return _CACHED_GRAPH
    except Exception:
        logger.exception("Failed to create agent graph")
        raise


# Run the agent with given inputs
def run_agent(inputs: dict):
    
    graph = get_agent_executor()
    return graph.run(inputs) # {"messages": [{"role": "user", "content": "Give me top products"}]}

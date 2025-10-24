"""Test the agent locally.

Usage:
  cd backend
  . .venv/bin/activate
  PYTHONPATH=. python scripts/test_agent.py "give me top products"
"""
import sys
import asyncio
import logging

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO, format='%(asctime)s %(levelname)s %(name)s: %(message)s')

from app.ai.agent_logic.sale_agent import get_agent_executor


def extract_final_answer(result) -> str:
    """Extract clean final answer from agent result."""
    if isinstance(result, str):
        return result
    
    if isinstance(result, dict) and result.get("messages"):
        messages = result["messages"]
        
        # Get the last AI message
        for msg in reversed(messages):
            content = None
            
            # Extract content from message
            if isinstance(msg, dict):
                content = msg.get("content")
            else:
                content = getattr(msg, "content", None)
            
            if not content:
                continue
            
            # Handle string content
            if isinstance(content, str) and content.strip():
                return content.strip()
            
            # Handle list content (structured parts)
            if isinstance(content, list):
                for part in content:
                    if isinstance(part, dict) and part.get("type") == "text":
                        text = part.get("text", "")
                        if text.strip():
                            return text.strip()
    
    return str(result)


async def run(question: str):
    """Run the agent and display clean output."""
    try:
        graph = get_agent_executor()
        logger.info("Invoking agent with question: %s", question)
        
        result = await graph.ainvoke({"messages": [{"role": "user", "content": question}]})
        
        # Extract and display clean answer
        answer = extract_final_answer(result)
        
        print("\n" + "="*60)
        print("AGENT RESPONSE")
        print("="*60)
        print(answer)
        print("="*60 + "\n")
        
    except Exception:
        logger.exception("Agent invocation failed")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python scripts/test_agent.py \"your question\"")
        sys.exit(1)
    
    question = sys.argv[1]
    asyncio.run(run(question))

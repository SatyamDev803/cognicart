from pydantic import BaseModel

class AgentQuery(BaseModel):
    question: str

class AgentResponse(BaseModel):
    answer: str
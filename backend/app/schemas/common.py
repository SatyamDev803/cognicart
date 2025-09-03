from pydantic import BaseModel

class MessageResponse(BaseModel):
    # A standard response model for messages
    message: str
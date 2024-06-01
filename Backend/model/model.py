from pydantic import BaseModel

class Blog(BaseModel):
    UserName: str
    Password: str
    Email: str
    

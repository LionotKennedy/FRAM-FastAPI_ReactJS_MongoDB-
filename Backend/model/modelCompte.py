
from pydantic import BaseModel

class Compte(BaseModel):
    nameClient: str
    soldeClient: str
    soldeStatus: str
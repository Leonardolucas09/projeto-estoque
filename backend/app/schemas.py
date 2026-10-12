from decimal import Decimal
from pydantic import BaseModel, Field, ConfigDict

class ProdutoCreate(BaseModel):
    sku: str = Field(min_length=1)
    nome: str = Field(min_length=1)
    categoria: str = Field(min_length=1)
    preco_unitario: Decimal = Field(gt=0)       # RN04
    quantidade_estoque: int = Field(default=0, ge=0)   # RN02
    quantidade_minima: int = Field(default=0, ge=0)

class ProdutoUpdate(BaseModel):
    sku: str | None = Field(default=None, min_length=1)
    nome: str | None = Field(default=None, min_length=1)
    categoria: str | None = Field(default=None, min_length=1)
    preco_unitario: Decimal | None = Field(default=None, gt=0)
    quantidade_estoque: int | None = Field(default=None, ge=0)
    quantidade_minima: int | None = Field(default=None, ge=0)

class ProdutoResponse(ProdutoCreate):
    id: int
    model_config = ConfigDict(from_attributes=True)
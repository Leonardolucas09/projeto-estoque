from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Numeric, Enum
from sqlalchemy.orm import relationship
from app.database import Base

import enum
from datetime import datetime

class Produto(Base):
    __tablename__ = "produtos"

    id = Column(Integer, primary_key=True)
    sku = Column(String, unique=True, index=True, nullable=False)
    nome = Column(String, nullable=False)
    categoria = Column(String, nullable=False)
    preco_unitario = Column(Numeric(10, 2), nullable=False)
    quantidade_estoque = Column(Integer, nullable=False, default=0)
    quantidade_minima = Column(Integer, nullable=False, default=0)
    categoria = Column(String, nullable=False)

    movimentacoes = relationship("Movimentacao", back_populates="produto")

class TipoMovimentacao(enum.Enum):
    ENTRADA = "ENTRADA"
    SAIDA = "SAIDA"

class Movimentacao(Base):
    __tablename__ = "movimentacoes"

    id = Column(Integer, primary_key=True)
    produto_id = Column(Integer, ForeignKey("produtos.id"), nullable=False)
    tipo = Column(Enum(TipoMovimentacao), nullable=False)
    quantidade = Column(Integer, nullable=False)
    data_movimentacao = Column(DateTime, default=datetime.utcnow, nullable=False)

    produto = relationship("Produto", back_populates="movimentacoes")
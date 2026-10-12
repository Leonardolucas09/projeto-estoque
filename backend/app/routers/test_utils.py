import os
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db, Base, engine
from app.models import Produto 
from decimal import Decimal

router = APIRouter(prefix="/api/test", tags=["testes"])

@router.post("/reset")
def reset_banco(db: Session = Depends(get_db)):
    # Apenas rodar em ambiente de dev
    if os.getenv("ENV") != "dev":
        raise HTTPException(status_code=403, detail="Acesso negado: apenas em ambiente de desenvolvimento.")

    #Deleta tabelas e recria
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    produtos = [
        Produto(sku="SKU-001", nome="Teclado Mecânico", categoria="Periféricos", preco_unitario=Decimal("10.00"), quantidade_estoque=100, quantidade_minima=10),
        Produto(sku="SKU-002", nome="Mouse", categoria="Periféricos", preco_unitario=Decimal("20.00"), quantidade_estoque=19, quantidade_minima=20),
        Produto(sku="SKU-003", nome="Monitor", categoria="Monitores", preco_unitario=Decimal("30.00"), quantidade_estoque=0, quantidade_minima=30),
        Produto(sku="SKU-004", nome="Notebook", categoria="Notebooks", preco_unitario=Decimal("40.00"), quantidade_estoque=50, quantidade_minima=50),
    ]

    db.add_all(produtos)
    db.commit()

    return {"status": "Banco resetado", "produtos": len(produtos)}
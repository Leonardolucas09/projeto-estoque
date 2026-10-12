from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Produto
from app.schemas import ProdutoCreate, ProdutoUpdate, ProdutoResponse

router = APIRouter(prefix="/api/produtos", tags=["produtos"])

@router.post("", response_model=ProdutoCreate, status_code=201)
def criar_produto(dados: ProdutoCreate, db: Session = Depends(get_db)):
    # Verifica se o SKU já existe
    existente = db.query(Produto).filter(Produto.sku == dados.sku).first()
    if existente:
        raise HTTPException(status_code=409, detail="SKU já cadastrado.")

    # Criação do produto
    produto = Produto(**dados.model_dump())
    db.add(produto)
    db.commit()
    db.refresh(produto)
    return produto

@router.put("/{produto_id}", response_model=ProdutoResponse)
def atualizar_produto(produto_id: int, dados: ProdutoUpdate, db: Session = Depends(get_db)):
    produto = db.get(Produto, produto_id)
    if not produto:
        raise HTTPException(status_code=404, detail="Produto não encontrado.")

    campos = dados.model_dump(exclude_unset=True, exclude_none=True)  # Apenas campos fornecidos

    # RN01: Se o SKU for fornecido, verifica se já existe outro produto com o mesmo SKU
    novo_sku = campos.get("sku")
    if novo_sku:
        duplicado = db.query(Produto).filter(
            Produto.sku == novo_sku, 
            Produto.id != produto_id
        ).first()
        if duplicado:
            raise HTTPException(status_code=409, detail="SKU já cadastrado.")

    # Atualiza apenas os campos fornecidos
    for campo, valor in campos.items():
        setattr(produto, campo, valor)

    db.commit()
    db.refresh(produto)
    return produto
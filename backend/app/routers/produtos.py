from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import or_
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Produto
from app.schemas import ProdutoCreate, ProdutoUpdate, ProdutoResponse

def buscar_produto_ativo(db: Session, produto_id: int) -> Produto:
    produto = db.get(Produto, produto_id)
    
    if not produto or not produto.ativo:
        raise HTTPException(status_code=404, detail="Produto não encontrado")

    return produto

router = APIRouter(prefix="/api/produtos", tags=["produtos"])

@router.post("", response_model=ProdutoResponse, status_code=201)
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
    
    produto = buscar_produto_ativo(db, produto_id)

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

@router.get("", response_model=list[ProdutoResponse])
def listar_produtos(
    busca: str | None = None,
    categoria: str | None = None,
    db: Session = Depends(get_db),
):
    query = db.query(Produto).filter(Produto.ativo == 1)

    if busca:
        termo = f"%{busca}%"
        query = query.filter(or_(Produto.nome.ilike(termo), Produto.sku.ilike(termo)))

    if categoria:
        query = query.filter(Produto.categoria == categoria)

    return query.order_by(Produto.nome).all()

@router.get("/categorias", response_model=list[str])
def listar_categorias(db: Session = Depends(get_db)):
    linhas = (
        db.query(Produto.categoria)
        .filter(Produto.ativo == True)
        .distinct()
        .order_by(Produto.categoria)
        .all()
    )
    return [linha[0] for linha in linhas]

@router.delete("/{produto_id}", status_code=204)
def excluir_produto(produto_id: int, db: Session = Depends(get_db)):

    buscar_produto_ativo(db, produto_id)
    
    produto = buscar_produto_ativo(db, produto_id)
    produto.ativo = False
    db.commit()
    
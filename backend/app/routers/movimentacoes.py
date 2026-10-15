from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Movimentacao, TipoMovimentacao
from app.schemas import MovimentacaoCreate, MovimentacaoResponse
from app.routers.produtos import buscar_produto_ativo

router = APIRouter(prefix="/api/movimentacoes", tags=["movimentacoes"])

@router.post("", response_model=MovimentacaoResponse, status_code=201)
def registrar_movimentacao(dados: MovimentacaoCreate, db: Session = Depends(get_db)):
    produto = buscar_produto_ativo(db, dados.produto_id)

    if dados.tipo == TipoMovimentacao.SAIDA:
        if dados.quantidade > produto.quantidade_estoque:
            raise HTTPException(status_code=409, detail="Estoque insuficiente")
        produto.quantidade_estoque -= dados.quantidade
    else:
        produto.quantidade_estoque += dados.quantidade

    movimentacao = Movimentacao(**dados.model_dump())
    db.add(movimentacao)
    db.commit()
    db.refresh(movimentacao)
    
    return movimentacao

@router.get("", response_model=list[MovimentacaoResponse])
def listar_historico_movimentacoes(
    produto_id: int | None = None,
    db: Session = Depends(get_db),
):
    query = db.query(Movimentacao)

    if produto_id is not None:
        query = query.filter(Movimentacao.produto_id == produto_id)

    return query.order_by(
        Movimentacao.data_movimentacao.desc(),
        Movimentacao.id.desc(),
    ).all()
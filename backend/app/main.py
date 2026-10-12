from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routers import test_utils, produtos
from app import models

Base.metadata.create_all(bind=engine)

app = FastAPI(title="API de Estoque")
app.include_router(test_utils.router)
app.include_router(produtos.router)

# Permite que o frontend (Vite, porta 5173) chame a API durante o desenvolvimento
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health():
    """Rota de verificação: confirma que a API está no ar."""
    return {"status": "ok"}
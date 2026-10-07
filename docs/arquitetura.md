# Arquitetura

Padrão: **Decoupled MVC / REST API**.

```
[ Frontend: React.js + TailwindCSS ]
                 │
           (HTTP / REST API)
                 │
                 ▼
[ Serverless Backend: Python (AWS Lambda / FastAPI) ]
                 │
                 ▼
[ Banco de Dados: SQLite / DynamoDB / PostgreSQL Serverless ]
```

| Camada | Papel |
|--------|-------|
| React.js | View; gerencia o estado da interface |
| Backend Serverless (Python) | Controllers (funções/API Gateway) e Models (regras de negócio e acesso ao banco) |

Cada função serverless atende um endpoint específico (ex.: `POST /produtos`, `GET /estoque`).

## Fluxo de testes (Page Object Model)

```
[ Test Script (Selenium / Python) ]
                │
                ▼
      [ Page Objects Layer ]
   (ex: ProdutoPage, EstoquePage)
                │
 (Localiza via data-testid)
                ▼
   [ React Frontend (DOM) ]
```

Dica: use `POST /api/test/reset` (somente dev/local) para limpar e popular o banco antes de cada suíte.

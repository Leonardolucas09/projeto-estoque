# 📦 Sistema de Controle de Estoque (Laboratório de Testes com Selenium)

Sistema simples de controle de estoque criado **para praticar testes automatizados E2E com Selenium**.
A aplicação é pequena de propósito: o foco é aprender a testar, usando o padrão **Page Object Model (POM)**.

---

## 📑 Sumário

1. [Visão geral](#1-visão-geral)
2. [Tecnologias](#2-tecnologias)
3. [Pré-requisitos (instalar uma vez)](#3-pré-requisitos-instalar-uma-vez)
4. [Baixando o projeto](#4-baixando-o-projeto)
5. [Estrutura de pastas](#5-estrutura-de-pastas)
6. [Rodando o Backend (Python)](#6-rodando-o-backend-python)
7. [Rodando o Frontend (React)](#7-rodando-o-frontend-react)
8. [Rodando os testes (Selenium)](#8-rodando-os-testes-selenium)
9. [Endpoint de reset para testes](#9-endpoint-de-reset-para-testes)
10. [Padrão `data-testid`](#10-padrão-data-testid)
11. [Trabalhando em dupla com Git](#11-trabalhando-em-dupla-com-git)
12. [Requisitos e regras de negócio](#12-requisitos-e-regras-de-negócio)
13. [Problemas comuns](#13-problemas-comuns)
14. [Comandos de bolso](#14-comandos-de-bolso)

---

## 1. Visão geral

| Camada | O que faz | Tecnologia |
|---|---|---|
| **Frontend (View)** | Telas e estado da interface | React + TailwindCSS |
| **Backend (Controller + Model)** | API REST, regras de negócio, acesso ao banco | Python (FastAPI, estilo serverless) |
| **Banco de dados** | Persistência local, fácil de zerar | SQLite (arquivo) |
| **Testes E2E** | Simulam o usuário no navegador | Selenium + Python + pytest |

Fluxo dos testes:

```
[ Test Script (Selenium / Python) ]
              │
              ▼
   [ Page Objects Layer ]        (ex: ProdutoPage, EstoquePage)
              │   localiza elementos via data-testid
              ▼
   [ React Frontend (DOM) ]  ──HTTP──►  [ API Python ]  ──►  [ SQLite ]
```

---

## 2. Tecnologias

- **Node.js 20+** e **npm**: rodam o React.
- **Python 3.11+** e **pip/venv**: rodam o backend e os testes.
- **Git**: versionamento e trabalho em dupla.
- **Google Chrome** (ou Firefox): navegador usado pelo Selenium.
- **VS Code** (recomendado): editor.

---

## 3. Pré-requisitos (instalar uma vez)

### 3.1 Git
- Baixe em <https://git-scm.com/downloads> e instale (pode deixar as opções padrão).
- Configure seu nome e e-mail (aparecem nos commits):

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu-email@exemplo.com"
```

### 3.2 Node.js (para o React)
- Baixe a versão **LTS** em <https://nodejs.org>.
- Confira a instalação:

```bash
node --version    # esperado: v20.x ou superior
npm --version
```

### 3.3 Python
- Baixe em <https://www.python.org/downloads/> (versão 3.11 ou superior).
- **Windows:** na instalação, marque **"Add Python to PATH"**.
- Confira:

```bash
python --version      # Windows
python3 --version     # macOS / Linux
pip --version
```

> 💡 Em macOS/Linux o comando costuma ser `python3`. Neste README, onde aparecer `python`, use `python3` se necessário.

### 3.4 Google Chrome
- Baixe em <https://www.google.com/chrome/>.
- O Selenium 4+ baixa o *driver* (chromedriver) automaticamente, então **não precisa instalar nada além do navegador**.

### 3.5 VS Code (recomendado)
- <https://code.visualstudio.com/>
- Extensões úteis: **Python**, **ES7+ React/Redux snippets**, **Tailwind CSS IntelliSense**, **GitLens**.

---

## 4. Baixando o projeto

Escolha **uma** das opções.

### Opção A: Clonar com Git (recomendado)

```bash
git clone https://github.com/Leonardolucas09/projeto-estoque.git
cd projeto-estoque
```

### Opção B: Baixar o ZIP
1. No GitHub, clique em **Code → Download ZIP**.
2. Extraia a pasta.
3. Abra o terminal dentro dela.

> ⚠️ Com o ZIP você não terá histórico Git. Para trabalhar em dupla, use a **Opção A**.

### Abrindo no VS Code

```bash
code .
```

---

## 5. Estrutura de pastas

```
projeto-estoque/
├── README.md
├── docs/                       # Requisitos, regras, diagramas (rastreabilidade)
│   ├── requisitos-funcionais.md
│   ├── requisitos-nao-funcionais.md
│   ├── regras-de-negocio.md
│   ├── casos-de-uso.md
│   ├── modelo-er.md
│   └── arquitetura.md
├── backend/                    # API Python
│   ├── app/
│   │   ├── main.py             # Ponto de entrada da API
│   │   ├── database.py         # Conexão SQLite
│   │   ├── models.py           # Models (Produto, Movimentacao)
│   │   ├── schemas.py          # Validações de entrada/saída
│   │   ├── routes/
│   │   │   ├── produtos.py     # /api/produtos
│   │   │   ├── movimentacoes.py# /api/movimentacoes
│   │   │   └── test_utils.py   # /api/test/reset (somente dev)
│   │   └── services/           # Regras de negócio (RN01 a RN04)
│   ├── requirements.txt
│   └── .env.example
├── frontend/                   # React + Tailwind
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/api.js     # Chamadas HTTP ao backend
│   │   └── App.jsx
│   ├── package.json
│   └── .env.example
└── tests/                      # Selenium
    ├── pages/                  # Page Objects (ProdutoPage, EstoquePage)
    ├── test_produtos.py
    ├── test_movimentacoes.py
    ├── conftest.py             # Fixtures (driver, reset do banco)
    └── requirements.txt
```

> 📝 Esta é a estrutura **planejada**. Ela será criada conforme o projeto avança. Se algo ainda não existir na sua cópia, é porque ainda não foi desenvolvido.

---

## 6. Rodando o Backend (Python)

Todos os comandos abaixo partem da pasta raiz do projeto.

### 6.1 Entrar na pasta e criar o ambiente virtual

O **ambiente virtual (venv)** isola as bibliotecas do projeto para não bagunçar o Python do seu computador. Faça **uma vez**:

```bash
cd backend
python -m venv .venv
```

### 6.2 Ativar o ambiente virtual (toda vez que abrir um terminal novo)

| Sistema | Comando |
|---|---|
| **Windows (PowerShell)** | `.venv\Scripts\Activate.ps1` |
| **Windows (CMD)** | `.venv\Scripts\activate.bat` |
| **macOS / Linux** | `source .venv/bin/activate` |

Quando ativo, o terminal mostra `(.venv)` no começo da linha.

> ⚠️ **Windows PowerShell bloqueando?** Rode uma vez:
> `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`

Para sair do ambiente: `deactivate`.

### 6.3 Instalar as dependências

```bash
pip install -r requirements.txt
```

### 6.4 Configurar variáveis de ambiente

```bash
# macOS / Linux
cp .env.example .env

# Windows (PowerShell)
Copy-Item .env.example .env
```

Conteúdo esperado do `.env`:

```env
APP_ENV=development
DATABASE_URL=sqlite:///./estoque.db
```

> 🔒 `APP_ENV=development` é o que libera a rota `/api/test/reset`. Nunca use em produção.

### 6.5 Iniciar a API

```bash
uvicorn app.main:app --reload --port 8000
```

- `--reload`: reinicia automaticamente quando você salva um arquivo.
- API em: <http://localhost:8000>
- **Documentação interativa (Swagger):** <http://localhost:8000/docs>: aqui você testa os endpoints direto no navegador, sem precisar do frontend.

Para parar: `Ctrl + C`.

### 6.6 Sobre o "Serverless"

Em desenvolvimento rodamos a API como um servidor comum (uvicorn) para facilitar o debug. A mesma aplicação FastAPI pode ser empacotada para AWS Lambda com o adaptador **Mangum** e publicada com o **Serverless Framework**. Cada rota continua sendo "uma função" lógica (`POST /api/produtos`, `GET /api/produtos`, etc.).

---

## 7. Rodando o Frontend (React)

Abra **outro terminal** (o backend continua rodando no primeiro).

### 7.1 Instalar dependências (uma vez, e sempre que o `package.json` mudar)

```bash
cd frontend
npm install
```

### 7.2 Configurar variáveis de ambiente

```bash
# macOS / Linux
cp .env.example .env

# Windows (PowerShell)
Copy-Item .env.example .env
```

Conteúdo esperado:

```env
VITE_API_URL=http://localhost:8000/api
```

### 7.3 Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

- Acesse: <http://localhost:5173>
- Hot reload: ao salvar um arquivo, a página atualiza sozinha.

### 7.4 Scripts úteis

| Comando | O que faz |
|---|---|
| `npm run dev` | Sobe o servidor de desenvolvimento |
| `npm run build` | Gera a versão otimizada em `dist/` |
| `npm run preview` | Serve localmente a versão de `build` |

### 7.5 Se estiver criando o frontend do zero (referência)

```bash
npm create vite@latest frontend -- --template react
cd frontend
npm install
npm install -D tailwindcss @tailwindcss/vite
```

Depois, siga o guia oficial do Tailwind para Vite: <https://tailwindcss.com/docs/installation/using-vite>

---

## 8. Rodando os testes (Selenium)

> ✅ **Antes de testar:** backend (porta 8000) **e** frontend (porta 5173) precisam estar rodando.

### 8.1 Preparar o ambiente de testes (uma vez)

Abra um **terceiro terminal** na raiz do projeto:

```bash
cd tests
python -m venv .venv
```

Ative o venv (mesma tabela da seção 6.2, ajustando o caminho para `tests/.venv`) e instale:

```bash
pip install -r requirements.txt
```

Conteúdo mínimo do `tests/requirements.txt`:

```
selenium>=4.20
pytest>=8.0
requests>=2.31
```

### 8.2 Executar

```bash
pytest -v                          # todos os testes
pytest tests/test_produtos.py -v   # um arquivo específico
pytest -k "cadastrar" -v           # testes cujo nome contém "cadastrar"
pytest -x                          # para no primeiro erro
```

### 8.3 Como cada teste funciona

1. **Antes da suíte:** o `conftest.py` chama `POST /api/test/reset`, que limpa o banco e insere dados conhecidos (seed).
2. O teste abre o Chrome via Selenium.
3. O teste usa **Page Objects** (`ProdutoPage`, `EstoquePage`) para interagir com a tela.
4. Os elementos são localizados **sempre** por `data-testid`.

Exemplo de Page Object:

```python
from selenium.webdriver.common.by import By

class ProdutoPage:
    def __init__(self, driver, base_url="http://localhost:5173"):
        self.driver = driver
        self.base_url = base_url

    def abrir(self):
        self.driver.get(f"{self.base_url}/produtos")

    def preencher_sku(self, sku):
        self.driver.find_element(By.CSS_SELECTOR, '[data-testid="input-sku"]').send_keys(sku)

    def salvar(self):
        self.driver.find_element(By.CSS_SELECTOR, '[data-testid="btn-salvar-produto"]').click()
```

### 8.4 Dicas de depuração

- Rode **com o navegador visível** para ver o que o teste faz (é o padrão; só use `--headless` na hora de automatizar).
- Use **esperas explícitas** (`WebDriverWait`) em vez de `time.sleep()`.
- Se um teste falhar, abra a tela manualmente e confira se o `data-testid` existe (botão direito → *Inspecionar*).

---

## 9. Endpoint de reset para testes

| | |
|---|---|
| **Rota** | `POST /api/test/reset` |
| **Função** | Apaga todos os dados e insere o *seed* de teste |
| **Disponibilidade** | **Somente** quando `APP_ENV=development`. Em outros ambientes retorna `404` |

Testar manualmente:

```bash
curl -X POST http://localhost:8000/api/test/reset
```

Ou pelo Swagger: <http://localhost:8000/docs>.

---

## 10. Padrão `data-testid`

**Regra (RNF01):** todo elemento interativo ou que exiba feedback deve ter um `data-testid` **estático e único**.

Convenção de nomes: `tipo-descricao` em minúsculas, com hífens.

| Tipo | Prefixo | Exemplo |
|---|---|---|
| Campo de texto | `input-` | `input-sku`, `input-nome-produto` |
| Botão | `btn-` | `btn-salvar-produto`, `btn-excluir-produto` |
| Modal | `modal-` | `modal-confirmar-exclusao` |
| Alerta / mensagem | `alert-` | `alert-estoque-baixo`, `alert-erro-sku-duplicado` |
| Linha da tabela | `row-` | `row-produto-<id>` |
| Seletor / filtro | `select-` | `select-categoria` |

```jsx
<input data-testid="input-sku" name="sku" />
<button data-testid="btn-salvar-produto">Salvar</button>
```

> ⚠️ Nunca gere o `data-testid` a partir de texto que muda (ex.: nome do produto). Para linhas, use o **id**.

---

## 11. Trabalhando em dupla com Git

### 11.1 Regras de ouro
1. **Nunca** faça commit direto na `main`. Use branches.
2. **Sempre** atualize antes de começar a trabalhar.
3. Commits pequenos, com mensagem clara.
4. Combinem **quem mexe em quê**, para evitar conflitos nos mesmos arquivos.

### 11.2 Fluxo diário

```bash
# 1. Atualizar a main
git checkout main
git pull

# 2. Criar sua branch (uma por tarefa)
git checkout -b feat/cadastro-produto

# 3. Trabalhar... depois ver o que mudou
git status

# 4. Salvar o trabalho
git add .
git commit -m "feat: adiciona formulário de cadastro de produto (RF01)"

# 5. Enviar para o GitHub
git push -u origin feat/cadastro-produto
```

6. No GitHub, abra um **Pull Request**, peça para sua colega revisar e faça o *merge*.

### 11.3 Padrão de nomes

| Tipo | Branch | Mensagem de commit |
|---|---|---|
| Nova funcionalidade | `feat/nome` | `feat: descrição` |
| Correção | `fix/nome` | `fix: descrição` |
| Teste | `test/nome` | `test: descrição` |
| Documentação | `docs/nome` | `docs: descrição` |

> 💡 Cite o requisito na mensagem (ex.: `RF03`, `RN02`) para manter a rastreabilidade.

### 11.4 Resolvendo conflitos
Se o Git avisar de conflito após um `git pull`, abra o arquivo no VS Code: ele mostra as opções **Accept Current / Incoming / Both**. Resolva, depois:

```bash
git add <arquivo>
git commit
```

### 11.5 O que NÃO vai para o Git

Garanta que o `.gitignore` contenha:

```
.venv/
node_modules/
__pycache__/
.env
*.db
dist/
.pytest_cache/
```

---

## 12. Requisitos e regras de negócio

Detalhes completos em [`docs/`](./docs). Resumo:

### Requisitos funcionais

| ID | Descrição |
|---|---|
| RF01 | Cadastrar produto (nome, SKU, categoria, preço, estoque, estoque mínimo) |
| RF02 | Listar produtos em tabela com busca (nome/SKU) e filtro por categoria |
| RF03 | Editar produto existente |
| RF04 | Excluir produto (com confirmação em modal) |
| RF05 | Registrar movimentações de entrada e saída |
| RF06 | Alerta visual para produtos abaixo da quantidade mínima |

### Regras de negócio

| ID | Descrição |
|---|---|
| RN01 | O SKU deve ser único no sistema |
| RN02 | A quantidade em estoque nunca pode ser menor que zero |
| RN03 | Não é permitida saída maior que o estoque atual |
| RN04 | O preço unitário deve ser estritamente maior que zero |

### Requisitos não-funcionais

| ID | Descrição |
|---|---|
| RNF01 | Testabilidade: `data-testid` estáticos e únicos |
| RNF02 | Desempenho: respostas em menos de 2 s (sem contar cold start) |
| RNF03 | Setup simples: banco fácil de zerar/popular (SQLite + rota de reset) |
| RNF04 | Responsividade com TailwindCSS |

> 🔗 **Rastreabilidade:** cada teste deve citar no nome ou docstring o RF/RN que valida. Exemplo: `test_saida_maior_que_estoque_deve_falhar  # RN03`.

---

## 13. Problemas comuns

| Sintoma | Causa provável | Solução |
|---|---|---|
| `python: command not found` | Python não está no PATH | Use `python3` ou reinstale marcando "Add to PATH" |
| `pip: command not found` | venv não ativado | Ative o venv (seção 6.2) |
| PowerShell: "scripts desabilitados" | Política de execução | `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` |
| `ModuleNotFoundError` | Dependências não instaladas ou venv errado | Ative o venv e rode `pip install -r requirements.txt` |
| `Address already in use` (porta 8000/5173) | Outro processo usando a porta | Feche o processo anterior ou troque a porta (`--port 8001`) |
| Frontend não carrega dados | Backend desligado ou URL errada | Confira `VITE_API_URL` e se a API está em <http://localhost:8000/docs> |
| Erro de CORS no navegador | Backend não permite a origem do React | Habilite CORS para `http://localhost:5173` no backend |
| `NoSuchElementException` no Selenium | `data-testid` ausente/errado ou elemento ainda não renderizou | Inspecione o DOM e use `WebDriverWait` |
| `SessionNotCreatedException` | Chrome e driver incompatíveis | Atualize o Chrome e `pip install -U selenium` |
| `npm install` falha | Node antigo | Atualize para Node 20+ |
| `/api/test/reset` retorna 404 | `APP_ENV` não está como `development` | Ajuste o `.env` e reinicie a API |

---

## 14. Comandos de bolso

```bash
# ----- Backend -----
cd backend
source .venv/bin/activate          # Windows: .venv\Scripts\Activate.ps1
uvicorn app.main:app --reload --port 8000

# ----- Frontend -----
cd frontend
npm run dev

# ----- Testes -----
cd tests
source .venv/bin/activate          # Windows: .venv\Scripts\Activate.ps1
pytest -v
```

**Rotina de um dia de trabalho:** `git pull` → subir backend → subir frontend → programar → rodar testes → commit → push → Pull Request.

---

📌 **Status do projeto:** em desenvolvimento. Atualize esta seção conforme os RFs forem concluídos.

| RF | Status |
|---|---|
| RF01 | ⬜ A fazer |
| RF02 | ⬜ A fazer |
| RF03 | ⬜ A fazer |
| RF04 | ⬜ A fazer |
| RF05 | ⬜ A fazer |
| RF06 | ⬜ A fazer |

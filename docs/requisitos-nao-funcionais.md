# Requisitos Não-Funcionais (RNF)

*Essenciais para otimizar os testes com Selenium.*

| ID    | Descrição |
|-------|-----------|
| RNF01 | **Testabilidade (Selenium):** todos os campos de formulário, botões, modais, linhas de tabela e mensagens de feedback devem conter atributos `data-testid` estáticos e exclusivos (ex.: `data-testid="input-nome-produto"`). |
| RNF02 | **Desempenho:** as funções serverless devem responder às requisições em menos de 2 segundos (desconsiderando cold start). |
| RNF03 | **Simplicidade de Setup:** o banco de dados de testes local deve ser simples de zerar/popular via scripts (ex.: SQLite em arquivo local) ou via rotas de reset/seed no backend. |
| RNF04 | **Responsividade:** a interface deve adaptar-se visualmente utilizando TailwindCSS. |

## Ambiente de teste

Endpoint auxiliar `POST /api/test/reset`, disponível **apenas** em ambiente local/desenvolvimento, que limpa e popula o banco com seed data antes de cada suíte Selenium.

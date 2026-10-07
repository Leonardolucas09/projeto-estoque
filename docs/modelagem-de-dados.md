# Modelagem de Dados

## Entidades e Atributos

### 1. Entidade: `PRODUTO`
Representa os itens mantidos no catálogo de estoque.

* `id` (UUID / Integer) — Chave Primária
* `sku` (String, Unique) — Código identificador do produto
* `nome` (String) — Nome do produto
* `categoria` (String) — Categoria do produto
* `preco_unitario` (Decimal) — Valor por unidade
* `quantidade_estoque` (Integer) — Quantidade disponível
* `quantidade_minima` (Integer) — Limiar para disparo de alertas
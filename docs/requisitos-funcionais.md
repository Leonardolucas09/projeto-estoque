# Requisitos Funcionais (RF)

| ID   | Descrição |
|------|-----------|
| RF01 | O sistema deve permitir o cadastro de novos produtos (Nome, SKU/Código único, Categoria, Preço Unitário, Quantidade em Estoque, Quantidade Mínima). |
| RF02 | O sistema deve listar todos os produtos cadastrados em uma tabela, com busca por nome/SKU e filtro por categoria. |
| RF03 | O sistema deve permitir a edição das informações de um produto existente. |
| RF04 | O sistema deve permitir a exclusão de um produto do estoque, com confirmação em modal. |
| RF05 | O sistema deve registrar movimentações de entrada (adição) e saída (baixa) de estoque. |
| RF06 | O sistema deve exibir alertas visuais (badge vermelha) para produtos com estoque abaixo da quantidade mínima. |

> Rastreabilidade: cada teste Selenium deve citar no docstring/nome o(s) RF que valida (ex.: `test_rf01_cadastrar_produto_valido`).

# Regras de Negócio (RN)

| ID   | Descrição |
|------|-----------|
| RN01 | O código SKU do produto deve ser único em todo o sistema. |
| RN02 | A quantidade de estoque de um produto nunca pode ser menor que zero. |
| RN03 | Uma movimentação de saída não pode ser efetuada se a quantidade requisitada for maior que a quantidade atual em estoque. |
| RN04 | O preço unitário do produto deve ser estritamente maior que zero. |

> Rastreabilidade: cada RN deve ter ao menos um teste de caminho feliz e um de violação (ex.: SKU duplicado → mensagem de erro).

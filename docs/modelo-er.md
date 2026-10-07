# Modelo de Dados (ER / Conceitual)

Relacionamento: **PRODUTO 1 — N MOVIMENTACAO**

```
+------------------------------------+       1      N       +---------------------------------------+
|              PRODUTO               |----------------------|             MOVIMENTACAO              |
+------------------------------------+                      +---------------------------------------+
| PK : id (UUID/Int)                 |                      | PK : id (UUID/Int)                    |
|      sku (VarChar - Unique)        |                      | FK : produto_id (UUID/Int)            |
|      nome (VarChar)                |                      |      tipo (ENUM: ENTRADA, SAIDA)      |
|      categoria (VarChar)           |                      |      quantidade (Int)                 |
|      preco_unitario (Decimal)      |                      |      data_movimentacao (Timestamp)    |
|      quantidade_estoque (Int)      |                      +---------------------------------------+
|      quantidade_minima (Int)       |
+------------------------------------+
```

## PRODUTO
| Campo | Tipo | Observação |
|-------|------|------------|
| id | UUID / Integer | PK |
| sku | String | Único (RN01) |
| nome | String | |
| categoria | String | Usado no filtro (RF02) |
| preco_unitario | Decimal | > 0 (RN04) |
| quantidade_estoque | Integer | >= 0 (RN02) |
| quantidade_minima | Integer | Base do alerta (RF06) |

## MOVIMENTACAO
| Campo | Tipo | Observação |
|-------|------|------------|
| id | UUID / Integer | PK |
| produto_id | UUID / Integer | FK → PRODUTO |
| tipo | Enum | ENTRADA, SAIDA |
| quantidade | Integer | Saída limitada pelo estoque (RN03) |
| data_movimentacao | Timestamp | |

> Nota: o diagrama ER original não listava `categoria`, mas ela está no RF01/RF02 e foi incluída aqui.

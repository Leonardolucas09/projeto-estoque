from pages.estoque_page import EstoquePage

def test_cadastrar_produto_novo_aparece_na_tabela(driver):
    """RF01: um produto cadastrado aparece na tabela."""
    pagina = EstoquePage(driver).abrir()

    pagina.abrir_novo_produto()
    pagina.preencher_produto(
        sku="SKU-005", nome="Webcam", categoria="Periféricos",
        preco="150", estoque="10", minimo="5",
    )
    pagina.salvar_produto()

    pagina.esperar_modal_produto_fechar()
    pagina.esperar_linha_aparecer(5)
    assert "Webcam" in pagina.texto_da_linha(5)
    assert pagina.esperar_feedback() == "Produto cadastrado com sucesso."

def test_cadastrar_sku_duplicado_e_recusado(driver):
    """RN01: o SKU deve ser único no sistema."""
    pagina = EstoquePage(driver).abrir()

    pagina.abrir_novo_produto()
    pagina.preencher_produto(
        sku="SKU-001", nome="Outro", categoria="Periféricos",
        preco="10", estoque="1", minimo="1",
    )
    pagina.salvar_produto()

    assert pagina.esperar_erro_produto() == "SKU já cadastrado."
    assert not pagina.linha_existe(5)         # nenhuma linha nova foi criada


def test_cadastrar_preco_zero_e_recusado(driver):
    """RN04: o preço unitário deve ser estritamente maior que zero."""
    pagina = EstoquePage(driver).abrir()

    pagina.abrir_novo_produto()
    pagina.preencher_produto(
        sku="SKU-006", nome="Cabo", categoria="Acessórios",
        preco="0", estoque="1", minimo="1",
    )
    pagina.salvar_produto()

    assert pagina.esperar_erro_produto() != ""
    assert not pagina.linha_existe(5)

def test_editar_nome_atualiza_a_tabela(driver):
    """RF03: editar um produto atualiza a linha na tabela."""
    pagina = EstoquePage(driver).abrir()

    pagina.abrir_edicao(1)
    pagina.preencher_produto(nome="Teclado Gamer")
    pagina.salvar_produto()

    pagina.esperar_modal_produto_fechar()
    assert pagina.esperar_feedback() == "Produto atualizado com sucesso."
    assert "Teclado Gamer" in pagina.texto_da_linha(1)


def test_cancelar_exclusao_nao_remove_o_produto(driver):
    """RF04: cancelar a confirmação mantém o produto."""
    pagina = EstoquePage(driver).abrir()

    pagina.abrir_exclusao(1)
    pagina.cancelar_exclusao()

    assert pagina.linha_existe(1)


def test_confirmar_exclusao_remove_o_produto(driver):
    """RF04: confirmar a exclusão remove a linha da tabela."""
    pagina = EstoquePage(driver).abrir()

    pagina.abrir_exclusao(1)
    pagina.confirmar_exclusao()

    pagina.esperar_linha_sumir(1)
    assert pagina.esperar_feedback() == "Produto excluído com sucesso."
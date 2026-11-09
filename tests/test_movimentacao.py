from pages.estoque_page import EstoquePage


def test_entrada_aumenta_o_estoque(driver):
    """RF05: uma entrada soma a quantidade ao estoque do produto."""
    pagina = EstoquePage(driver).abrir()

    pagina.selecionar_produto(2)               # Mouse
    pagina.esperar_estoque_no_painel(19)      # estoque inicial
    pagina.movimentar("ENTRADA", 5)

    pagina.esperar_estoque_no_painel(24)      # estoque final


def test_saida_maior_que_o_estoque_e_recusada(driver):
    """RN03: saída maior que o estoque é recusada e o estoque não muda."""
    pagina = EstoquePage(driver).abrir()

    pagina.selecionar_produto(2)
    pagina.movimentar("SAIDA", 500)

    assert pagina.esperar_mensagem_erro() == "Estoque insuficiente"
    pagina.esperar_estoque_no_painel(19)


def test_saida_que_leva_abaixo_do_minimo_aciona_o_alerta(driver):
    """RF05 + RF06: depois da saída, o estoque fica abaixo do mínimo e o alerta aparece."""
    pagina = EstoquePage(driver).abrir()

    assert not pagina.tem_badge_estoque_baixo(4)   # Notebook: 50 de mínimo 50
    pagina.selecionar_produto(4)
    pagina.movimentar("SAIDA", 1)

    pagina.esperar_badge_estoque_baixo(4)


def test_estoque_igual_ao_minimo_nao_e_considerado_baixo(driver):
    """RF06 (valor limite): 'abaixo do mínimo' é estritamente menor."""
    pagina = EstoquePage(driver).abrir()

    assert pagina.tem_badge_estoque_baixo(2)       # 19 < 20
    assert not pagina.tem_badge_estoque_baixo(4)   # 50 = 50

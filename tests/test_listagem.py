from pages.estoque_page import EstoquePage

def test_busca_por_nome_filtra_a_tabela(driver):
    """RF02: a busca por nome mostra só os produtos correspondentes."""
    pagina = EstoquePage(driver).abrir()

    pagina.buscar("mouse")
    pagina.esperar_linha_sumir(1)   # o Teclado (SKU-001) sai da lista

    assert pagina.linha_existe(2)       # o Mouse (SKU-002) continua
    assert not pagina.linha_existe(3)   # o Monitor (SKU-003) sumiu

def test_busca_sem_resultado_mostra_mensagem(driver):
    """RF02: a busca sem resultados mostra uma mensagem de lista vazia."""
    pagina = EstoquePage(driver).abrir()

    pagina.buscar("não existo")
    assert pagina.esperar_msg_lista_vazia() == "Nenhum produto encontrado."

def test_filtro_por_categoria_mostra_so_a_categoria(driver):
    """RF02: o filtro por categoria mostra apenas os produtos da categoria selecionada."""
    pagina = EstoquePage(driver).abrir()

    pagina.filtrar_categoria("Periféricos")
    pagina.esperar_linha_sumir(3)   # o Monitor (Categoria: Monitores) sai da lista

    assert pagina.linha_existe(1)       # o Teclado (Categoria: Periféricos) continua
    assert pagina.linha_existe(2)       # o Mouse (Categoria: Periféricos) continua
    assert not pagina.linha_existe(3)   # o Monitor (Categoria: Monitores) sumiu
    assert not pagina.linha_existe(4)   # o Headset (Categoria: Periféricos) sumiu
    
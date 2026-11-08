from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait, Select
from selenium.webdriver.support import expected_conditions as EC

class EstoquePage:
    URL = "http://localhost:5173"

    #Onde está os elementos da página
    TABELA = (By.CSS_SELECTOR, '[data-testid="tabela-produtos"]')
    INPUT_BUSCA = (By.CSS_SELECTOR, '[data-testid="input-busca"]')
    SELECT_CATEGORIA = (By.CSS_SELECTOR, '[data-testid="select-categoria"]')
    MSG_LISTA_VAZIA = (By.CSS_SELECTOR, '[data-testid="msg-lista-vazia"]')
    PAINEL_ESTOQUE = (By.CSS_SELECTOR, '[data-testid="produto-selecionado-estoque"]')
    INPUT_QUANTIDADE = (By.CSS_SELECTOR, '[data-testid="input-quantidade"]')
    BTN_CONFIRMAR = (By.CSS_SELECTOR, '[data-testid="btn-confirmar-movimentacao"]')
    MSG_ERRO = (By.CSS_SELECTOR, '[data-testid="msg-erro"]')

    def __init__(self, driver, timeout=5):
        self.driver = driver
        self.wait = WebDriverWait(driver, timeout)

    @staticmethod
    def _linha(produto_id):
        return (By.CSS_SELECTOR, f'[data-testid="linha-produto-{produto_id}"]')

        #Ações que podem ser feitas na página
    def abrir(self):
        self.driver.get(self.URL)
        self.wait.until(EC.presence_of_element_located(self.TABELA))
        return self

    def buscar(self, termo):
        input_busca = self.wait.until(EC.presence_of_element_located(self.INPUT_BUSCA))
        input_busca.clear()
        input_busca.send_keys(termo)

    def esperar_linha_sumir(self, produto_id):
        self.wait.until(EC.invisibility_of_element_located(self._linha(produto_id)))

    def linha_existe(self, produto_id):
        return len(self.driver.find_elements(*self._linha(produto_id))) > 0

    def filtrar_categoria(self, nome):
        elemento = self.wait.until(EC.visibility_of_element_located(self.SELECT_CATEGORIA))
        Select(elemento).select_by_visible_text(nome)

    def esperar_msg_lista_vazia(self):
        mensagem = self.wait.until(EC.visibility_of_element_located(self.MSG_LISTA_VAZIA))
        return mensagem.text

    @staticmethod
    def _botao_tipo(tipo):
        # "ENTRADA" -> "btn-tipo-entrada" | "SAÍDA" -> "btn-tipo-saida"
        return (By.CSS_SELECTOR, f'[data-testid="btn-tipo-{tipo.lower()}"]')

    @staticmethod
    def _badge_baixo(produto_id):
        return (By.CSS_SELECTOR, f'[data-testid="alert-estoque-baixo-{produto_id}"]')

    def selecionar_produto(self, produto_id):
        linha = self.wait.until(EC.element_to_be_clickable(self._linha(produto_id)))
        linha.find_element(By.TAG_NAME, "td").click()

    def movimentar(self, tipo, quantidade):
        self.wait.until(EC.element_to_be_clickable(self._botao_tipo(tipo))).click()
        campo = self.wait.until(EC.visibility_of_element_located(self.INPUT_QUANTIDADE))
        campo.clear()
        campo.send_keys(str(quantidade))
        self.driver.find_element(*self.BTN_CONFIRMAR).click()

    def esperar_estoque_no_painel(self, quantidade):
        self.wait.until(
            lambda d: d.find_element(*self.PAINEL_ESTOQUE).text == f"{quantidade} em estoque"
        )

    def esperar_mensagem_erro(self):
        return self.wait.until(EC.visibility_of_element_located(self.MSG_ERRO)).text

    def tem_badge_estoque_baixo(self, produto_id):
        return len(self.driver.find_elements(*self._badge_baixo(produto_id))) > 0

    def esperar_badge_estoque_baixo(self, produto_id):
        self.wait.until(EC.presence_of_element_located(self._badge_baixo(produto_id)))
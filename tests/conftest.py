import pytest 
import requests
from selenium import webdriver

API_URL = "http://localhost:8000/api"

@pytest.fixture(autouse=True)
def resetar_banco():
    # Faz uma requisição para resetar o banco de dados antes de cada teste
    response = requests.post(f"{API_URL}/test/reset")
    assert response.status_code == 200, (
        "Reset falhou. O backend está rodando com o ENV=dev?"
    )

@pytest.fixture
def driver():
    # Configura o Selenium WebDriver para usar o Chrome (ou outro navegador de sua escolha)
    navegador = webdriver.Chrome()  # ou webdriver.Firefox(), dependendo do navegador que você deseja usar
    navegador.set_window_size(1440, 900)  # Define o tamanho da janela do navegador
    yield navegador
    navegador.quit()  # Fecha o navegador após o teste
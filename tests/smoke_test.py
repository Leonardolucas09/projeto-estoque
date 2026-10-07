from selenium import webdriver

URL_FRONTEND = "http://localhost:5173"

driver = webdriver.Chrome()  # o Selenium Manager baixa o chromedriver sozinho
try:
    driver.get(URL_FRONTEND)
    print("Título da página:", driver.title)
    assert driver.title != "", "A página não carregou (título vazio)"
    print("Smoke test OK")
finally:
    driver.quit()  # sempre fecha o navegador, mesmo se algo falhar
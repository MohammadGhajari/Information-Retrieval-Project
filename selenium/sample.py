from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time

service = webdriver.ChromeService(executable_path = 'chromedriver.exe')
driver = webdriver.Chrome(service=service)

def get_link_rank(query, domain, num_pages=10):
    base_url = "https://www.google.com/search?q=" + query
    domain_rank = 0
    recommended_queries = []

    for page in range(num_pages):
        driver.get(base_url + "&start=" + str(page * 10))
        time.sleep(2)

        if (page == 0):
            queries_elements = driver.find_elements(By.XPATH, "//div[@class='mtv5bd']")
            recommended_queries = [query.text for query in queries_elements]

        search_results = driver.find_elements(By.XPATH, "//div[@class='tF2Cxc']//a[@href]")
        for rank, result in enumerate(search_results, start=page * 10 + 1):
            href = result.get_attribute("href")
            if domain in href:
                domain_rank = rank
                break

    return rank, recommended_queries

query = "Python programming"
rank, recommended_queries = get_link_rank(query=query, domain="python.org", num_pages=1)
print(rank, recommended_queries)

driver.quit()

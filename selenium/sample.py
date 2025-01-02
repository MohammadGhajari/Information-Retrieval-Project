from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time

service = webdriver.ChromeService(executable_path = 'chromedriver.exe')
driver = webdriver.Chrome(service=service)

def get_google_search_links(query, num_pages=10):
    base_url = "https://www.google.com/search?q=" + query
    links = []
    
    for page in range(num_pages):
        driver.get(base_url + "&start=" + str(page * 10))

        time.sleep(2)

        search_results = driver.find_elements(By.XPATH, "//a[@href]")
        
        for result in search_results:
            href = result.get_attribute("href")
            jsname = result.get_attribute("jsname")
            if href and jsname and jsname == "UWckNb":
                links.append(href)
        
        # TODO
        # class="y6Uyqe" --> recommended queries
        # new words in <b></b>

        recommended_queries = driver.find_elements(By.CLASS_NAME, "dg6jd")
        for query in recommended_queries:
            print(query.text)
    
    return links

query = "Python programming"
links = get_google_search_links(query, num_pages=1)

for i, link in enumerate(links, 1):
    print(f"{i}. {link}")

driver.quit()

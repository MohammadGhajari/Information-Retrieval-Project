from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time
import sys
import json
import requests
from datetime import datetime
import pytz


service = webdriver.ChromeService(executable_path = 'chromedriver.exe')
driver = webdriver.Chrome(service=service)

def get_link_rank(query, domain, num_pages=10):
    base_url = "https://www.google.com/search?q=" + query
    domain_rank = 0
    rank = 0
    recommended_queries = []

    for page in range(num_pages):
        driver.get(base_url + "&start=" + str(page * 10))
        time.sleep(2)

        if (page == 0):
            queries_elements = driver.find_elements(By.XPATH, "//div[@class='mtv5bd']")
            recommended_queries = [query.text for query in queries_elements]

        search_results = driver.find_elements(By.XPATH, "//a[@href]")
        for result in search_results:
            href = result.get_attribute("href")
            jsname = result.get_attribute("jsname")
            if href and jsname and jsname == "UWckNb":
                rank += 1
                if domain in href:
                    driver.get(href)
                    time.sleep(5)

                    domain_rank = rank
                    break
        
        if domain_rank != 0:
            break

    return domain_rank, recommended_queries


if __name__ == "__main__":
  
 
    url = "http://127.0.0.11:8000/api/queries"
    

    response = requests.get(url)
    response.raise_for_status()  

    queryList = response.json()['data']
    


    for query in queryList:
        domain = query["website"]
        keyword = query["query"]

        rank, recommended_queries = get_link_rank(query=keyword, domain=domain, num_pages=10)
        
        print("------------------------------")
        print(rank)
        print("------------------------------")
        
        # save in database
        # if there is no result, then dont update the document in database
        if rank == 0: continue
        formatted_time =  datetime.now(pytz.utc).strftime("%Y-%m-%dT%H:%M:%S.%f")[:-3] + "+00:00"

        updated_search_pairs = query['searchPairs'] + [{"time": formatted_time, "rank": rank}]

        payload = {
            "searchPairs": updated_search_pairs,
            "suggestedQueries": recommended_queries
        }
        id = query['id']
        response = requests.patch(url + "/" + id, json=payload)
        print(response)

        

        
        
    
    driver.quit()



    

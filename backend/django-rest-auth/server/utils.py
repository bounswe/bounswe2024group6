import requests

import requests
import logging



def choose_architecture_query(keyword):
    architectural_style_query = f'''
        SELECT DISTINCT ?item ?itemLabel  WHERE {{
                ?item rdfs:label ?itemLabel.
                ?item wdt:P31 wd:Q32880.
                FILTER(lang(?itemLabel) = "en" && contains(lcase(?itemLabel), "{keyword.lower()}"))
        }}
    '''
    return architectural_style_query


def choose_architect_query(keyword):
    architect_query= f'''
            SELECT DISTINCT ?item ?itemLabel  WHERE {{
                        ?item rdfs:label ?itemLabel.
                        ?item wdt:P106 wd:Q42973.
                            FILTER(lang(?itemLabel) = "en" && contains(lcase(?itemLabel), "{keyword.lower()}"))

            }}
    '''
    return architect_query
    
def choose_building(keyword):
    building_query=f'''SELECT DISTINCT ?item ?itemLabel  WHERE {{
            ?item rdfs:label ?itemLabel.
            ?item p:P149 ?statement1.
            ?statement1 (ps:P149/(wdt:P279*)) _:anyValueP149.
            FILTER(lang(?itemLabel) = "en" && contains(lcase(?itemLabel), "{keyword.lower()}"))
    }}
'''
    return building_query

def query_architectural_style(query):
    
    endpoint_url = "https://query.wikidata.org/sparql"
    headers = {
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0',
        'Accept': 'application/sparql-results+json'
    }
    params = {'query': choose_architecture_query(query), 'format': 'json'}
    response = requests.get(endpoint_url, headers=headers, params=params)

    data = response.json()
    
    print(data)
    if response.status_code == 500:
        return {"response:": "error: while query the data"}
    elif data['results']['bindings'] == []:
        return None
    
    return data
    
def query_architect(query):
    
    endpoint_url = "https://query.wikidata.org/sparql"
    headers = {
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0',
        'Accept': 'application/sparql-results+json'
    }
    params = {'query': choose_architect_query(query), 'format': 'json'}
    response = requests.get(endpoint_url, headers=headers, params=params)

    data = response.json()
    
    print(data)
    if response.status_code == 500:
        return {"response:": "error: while query the data"}
    elif data['results']['bindings'] == []:
        return None
    
    return data
    
    
def query_building(query):
    
    endpoint_url = "https://query.wikidata.org/sparql"
    headers = {
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0',
        'Accept': 'application/sparql-results+json'
    }
    params = {'query': choose_building(query), 'format': 'json'}
    response = requests.get(endpoint_url, headers=headers, params=params)

    data = response.json()
    
    print(data)
    if response.status_code == 500:
        return {"response:": "error: while query the data"}
    elif data['results']['bindings'] == []:
        return None

    return data




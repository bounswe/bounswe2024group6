import requests_async
import requests
import logging
import json


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
    building_query=f'''
    SELECT DISTINCT ?item ?itemLabel  WHERE {{
            ?item rdfs:label ?itemLabel.
            ?item p:P149 ?statement1.
            ?statement1 (ps:P149/(wdt:P279*)) _:anyValueP149.
            FILTER(lang(?itemLabel) = "en" && contains(lcase(?itemLabel), "{keyword.lower()}"))

    }}
'''
    
    
    return building_query

async def query_architectural_style(query):
    
    endpoint_url = "https://query.wikidata.org/sparql"
    headers = {
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0',
        'Accept': 'application/sparql-results+json'
    }
    params = {'query': choose_architecture_query(query), 'format': 'json'}
    response = await requests_async.get(endpoint_url, headers=headers, params=params)
    
    data = response.json()
    
    print(data)
    if response.status_code == 500:
        return {"response:": "error: while query the data"}
    elif data['results']['bindings'] == []:
        return None

    return await calculate_result_list(data)

    
async def query_architect(query):
    
    endpoint_url = "https://query.wikidata.org/sparql"
    headers = {
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0',
        'Accept': 'application/sparql-results+json'
    }
    params = {'query': choose_architect_query(query), 'format': 'json'}
    response = await requests_async.get(endpoint_url, headers=headers, params=params)

    data = response.json()
    
    print(data)
    if response.status_code == 500:
        return {"response:": "error: while query the data"}
    elif data['results']['bindings'] == []:
        return None
    
    return await calculate_result_list(data)

    
    
async def query_building(query):
    
    endpoint_url = "https://query.wikidata.org/sparql"
    headers = {
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0',
        'Accept': 'application/sparql-results+json'
    }
    params = {'query': choose_building(query), 'format': 'json'}
    response = await requests_async.get(endpoint_url, headers=headers, params=params)

    data = response.json()
    
    print(data)
    if response.status_code == 500:
        return {"response:": "error: while query the data"}
    
    elif data['results']['bindings'] == []:
        return None
    
    return calculate_result_list(data)




def calculate_result_list(data):
    result_list = []
    for entry in data['results']['bindings']:
        
        entity_id = entry['item']['value'].split('/')[-1].strip()
        response = requests.get(f"https://www.wikidata.org/w/api.php?action=wbgetclaims&property=P18&entity={entity_id}", params= {"format": "json"})
        data = response.json()
        item_label = entry['itemLabel']['value']
        response_dict = {"Entity ID": entity_id, "Item Label": item_label}
        
        if "P18" in data["claims"]:
            image_name = data["claims"]["P18"][0]["mainsnak"]["datavalue"]["value"]
            underscores_str = replace_under_score(image_name)
            
            response_dict['Image'] = f''' https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/{underscores_str}&width=300'''
        else:
            response['Image'] = "No Image"

        result_list.append(response_dict)
    return result_list


def replace_under_score(string):
    modified_str = ""
    for i in range(len(string)):
        if string[i] == " ":
            modified_str += "_"
        else:
            modified_str += string[i]
    return modified_str
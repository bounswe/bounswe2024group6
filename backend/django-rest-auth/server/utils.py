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
    SELECT DISTINCT ?item ?itemLabel ?image  WHERE {{
            ?item rdfs:label ?itemLabel.
            ?item p:P149 ?statement1.
            ?item p:18 ?image.
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
    response =  requests.get(endpoint_url, headers=headers, params=params)
    
    data = response.json()
    
    print(data)
    if response.status_code == 500:
        return {"response:": "error: while query the data"}
    elif data['results']['bindings'] == []:
        return None

    return calculate_result_list(data)

    
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
    
    return calculate_result_list(data)

    
    
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
            response_dict['Image'] = "No Image"

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

def get_description_wikibase(entity_id):
    wikibase_endpoint_url = "https://wikidata.org/w/rest.php/wikibase/v0"
    response = requests.get(f"{wikibase_endpoint_url}/entities/items/{entity_id}/descriptions")
    print(response.json())
    return response.json()



def get_content_wikidata(entity_id):
    title = get_title_wikibase(entity_id)
    page_id = get_page_id_wikibase(title)
    # endpoint_url = f"https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&format=json&pageids={page_id}"
    endpoint_url = f"https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exlimit=max&explaintext&titles={title}"
    response = requests.get(endpoint_url)
    text = response.json()["query"]["pages"][page_id]["extract"]
    print(text)
    return text

def get_title_wikibase(entity_id):
    print(entity_id)
    endpoint_url = f"https://www.wikidata.org/w/api.php?action=wbgetentities&ids={entity_id}&format=json&props=sitelinks"
    response = requests.get(endpoint_url)

    resp = response.json()
    print(resp)
    title = resp["entities"][entity_id]["sitelinks"]["enwiki"]["title"]
    return title

def get_page_id_wikibase(entity_title):
    endpoint_url = f"https://en.wikipedia.org/w/api.php?action=query&titles={entity_title}&format=json"
    response = requests.get(endpoint_url)
    page_id = list(response.json()["query"]["pages"].keys())[0]
    return page_id


def choose_building_info(entity_id):
    building_info_query = f'''
        PREFIX schema: <http://schema.org/> 
        SELECT DISTINCT ?buildingLabel ?architect ?countryLabel ?coordinate ?style ?description WHERE {{
        VALUES ?building {{ wd:{entity_id} }}
        ?building wdt:P84 ?architect ;
                    wdt:P17 ?country ;
                    wdt:P625 ?coordinate ;
                    wdt:P149 ?style .
                    wd:{entity_id} schema:description ?description .
        FILTER(LANG(?description) = "en")

        # Get labels for the results
        SERVICE wikibase:label {{ 
            bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". 
        }}
    }}
    '''
    return building_info_query

def query_building_info(entity_id):
    endpoint_url = "https://query.wikidata.org/sparql"
    headers = {
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0',
        'Accept': 'application/sparql-results+json'
    }
    params = {'query': choose_building_info(entity_id), 'format': 'json'}
    response = requests.get(endpoint_url, headers=headers, params=params)

    data = response.json()
    print(data)
    if response.status_code == 500:
        return {"response:": "error: while query the data"}
    elif data['results']['bindings'] == []:
        return None

    architects = set()
    countries = set()
    coordinates = set()
    styles = set()
    description = set()
    for entry in data['results']['bindings']:
        description.add(entry['description']['value'])
        architects.add(entry['architect']['value'].strip().split('/')[-1])
        countries.add( entry['countryLabel']['value'])
        coordinates.add(entry['coordinate']['value'])
        styles.add(entry['style']['value'].strip().split('/')[-1])
    
    if len(countries):
        country = list(countries)[0]
    else:
        country = "Unknown"

    if len(coordinates):
        coordinate = list(coordinates)[0]
    else:
        coordinate = "Unknown"

    if len(description):
        description = list(description)[0]
    else:
        description = "Unknown"
    label = data['results']['bindings'][0]['buildingLabel']['value']
    description = data['results']['bindings'][0]['description']['value']
    return {"name": label, "description":description, "architect": list(architects), "country": country, "coordinates": coordinate, "architecturalStyle": list(styles), "description": description}


def get_building_info(entity_id):
    title = get_title_wikibase(entity_id)
    page_id = get_page_id_wikibase(title)
    endpoint_url = f"https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&format=json&pageids={page_id}"
    response = requests.get(endpoint_url)
    text = response.json()["query"]["pages"][page_id]["extract"]

    building_info = query_building_info(entity_id)

    architects = []
    for architect_id in building_info["architect"]:
        architect_info = get_architect_or_style_info_for_building(architect_id)
        architects.append(architect_info)
    
    styles = []
    for style in building_info["architecturalStyle"]:
        style_info = get_architect_or_style_info_for_building(style)
        styles.append(style_info)

    

    return {"name": building_info["name"], "architect": architects, "country": building_info["country"], "coordinates": building_info["coordinates"], "architecturalStyle": styles, "description": building_info["description"], "wikiText": text}

def get_architect_or_style_info_for_building(architect_id):
    print(architect_id)
    architect_info_query = f'''
SELECT DISTINCT ?architect ?architectLabel WHERE {{
    VALUES ?architect {{ wd:{architect_id} }}
    
    # Get labels for the results
    SERVICE wikibase:label {{
        bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en".
        ?architect rdfs:label ?architectLabel.
    }}
}}

    '''
    endpoint_url = "https://query.wikidata.org/sparql"
    headers = {
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0',
        'Accept': 'application/sparql-results+json'
    }
    params = {'query': architect_info_query, 'format': 'json'}
    response = requests.get(endpoint_url, headers=headers, params=params)

    data = response.json()
    if response.status_code == 500:
        return {"response:": "error: while query the data"}
    elif data['results']['bindings'] == []:
        return None

    architect_label = data['results']['bindings'][0]['architectLabel']['value']
    

    return {"name": architect_label, "image": get_image(architect_id), "id": architect_id}



def get_image(entity_id):
    response = requests.get(f"https://www.wikidata.org/w/api.php?action=wbgetclaims&property=P18&entity={entity_id}", params= {"format": "json"})
    data = response.json()

    
    if "P18" in data["claims"]:
        image_name = data["claims"]["P18"][0]["mainsnak"]["datavalue"]["value"]
        underscores_str = replace_under_score(image_name)
        
        image = f''' https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/{underscores_str}&width=300'''
    else:
        image = "No Image"

    return image
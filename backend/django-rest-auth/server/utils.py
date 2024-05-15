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
    
    text = get_wiki_text(page_id)

    building_info = query_building_info(entity_id)

    architects = []
    for architect_id in building_info["architect"]:
        architect_info = get_architect_or_style_info_for_building(architect_id)
        architects.append(architect_info)
    
    styles = []
    for style in building_info["architecturalStyle"]:
        style_info = get_architect_or_style_info_for_building(style)
        styles.append(style_info)

    coordinates = building_info["coordinates"].split("(")[1]
    coordinates = coordinates.split(")")[0].split(" ")
    

    return {"name": building_info["name"], "architect": architects, "country": building_info["country"], "coordinates": {"latitude": coordinates[0], "longitude": coordinates[1]}, "architecturalStyle": styles, "description": building_info["description"], "wikiText": text}

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


def query_architect_info(entity_id):

    query = f"""
    PREFIX wd: <http://www.wikidata.org/entity/>
    PREFIX wdt: <http://www.wikidata.org/prop/direct/>
    PREFIX schema: <http://schema.org/>

SELECT DISTINCT 
    ?architect ?architectLabel ?description ?image ?workLocationLabel ?movementLabel ?movementImage ?movement
    ?notableWork ?notableWorkLabel ?notableWorkImage ?notableWorkCoordinate ?notableWorkStyle ?notableWorkStyleLabel ?notableWorkStyleImage
WHERE {{
    VALUES ?architect {{ wd:{entity_id} }}  # Mimar Sinan's Wikidata ID

    # Basic information about the architect
    OPTIONAL {{ ?architect wdt:P18 ?image . }}  # Image
    OPTIONAL {{ ?architect wdt:P937 ?workLocation . }}  # Work location
    OPTIONAL {{ ?architect wdt:P135 ?movement . }}  # Architectural movement

    # Get labels for the results
    SERVICE wikibase:label {{ 
        bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". 
        ?architect rdfs:label ?architectLabel .
        ?workLocation rdfs:label ?workLocationLabel .
        ?movement rdfs:label ?movementLabel .
    }}
    
    OPTIONAL {{
        ?architect wdt:P800 ?notableWork .
        OPTIONAL {{ ?notableWork wdt:P18 ?notableWorkImage . }}  # Image of the notable work
        OPTIONAL {{ ?notableWork wdt:P625 ?notableWorkCoordinate . }}  # Coordinates of the notable work
        OPTIONAL {{ ?notableWork wdt:P149 ?notableWorkStyle . }}  # Architectural style of the notable work
        OPTIONAL {{ ?notableWorkStyle wdt:P18 ?notableWorkStyleImage . }}  # Image of the architectural style

        # Get labels for the notable works
        SERVICE wikibase:label {{ 
            bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". 
            ?notableWork rdfs:label ?notableWorkLabel .
            ?notableWorkStyle rdfs:label ?notableWorkStyleLabel .
        }}


    }}

    # Retrieve the English description
    ?architect schema:description ?description .
    FILTER(LANG(?description) = "en")
}}    
"""
    
    endpoint_url = "https://query.wikidata.org/sparql"
    headers = {
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0',
        'Accept': 'application/sparql-results+json'
    }
    params = {'query': query, 'format': 'json'}
    response = requests.get(endpoint_url, headers=headers, params=params)

    data = response.json()
    print(data)
    if response.status_code == 500:
        return {"response:": "error: while query the data"}
    elif data['results']['bindings'] == []:
        return None

    return data



def get_architect_info(entity_id):
    title = get_title_wikibase(entity_id)
    page_id = get_page_id_wikibase(title)
    text = get_wiki_text(page_id)

    architect_info = query_architect_info(entity_id)

    architect_label = architect_info['results']['bindings'][0]['architectLabel']['value']
    description = architect_info['results']['bindings'][0]['description']['value']
    image = architect_info['results']['bindings'][0]['image']['value']

    work_locations = set()
    notable_works = set()
    images = set()
    description = set()
    movements = set()


    for entry in architect_info['results']['bindings']:
        if 'workLocationLabel' in entry:
            work_locations.add(entry['workLocationLabel']['value'])
        if 'notableWork' in entry:
            notable_works.add(entry["notableWork"]["value"])
        if 'image' in entry:
            images.add(entry["image"]["value"])
        if 'description' in entry:
            description.add(entry["description"]["value"])
        if 'movement' in entry:
            movements.add(entry['movement']['value'])
        if 'notableWorkStyle' in entry:
            movements.add(entry["notableWorkStyle"]["value"])

    notable_works_dict = {}
    for work in notable_works:
        notable_works_dict[work] = {"id": work.split('/')[-1], "image": "", "coordinateLocation": None}
        for entry in architect_info['results']['bindings']:
            if entry["notableWork"]["value"] == work:
                notable_works_dict[work]["image"] = entry["notableWorkImage"]["value"]
                coordinates = entry["notableWorkCoordinate"]["value"]
                coordinates = coordinates.split("(")[1]
                coordinates = coordinates.split(")")[0].split(" ")[0:2]
                notable_works_dict[work]["coordinateLocation"] = {"latitude": coordinates[0], "longitude": coordinates[1]}
    
    notable_works = [x for x in notable_works_dict.values()]

    movement_dict = {}
    for movement in movements:
        movement_dict[movement] = {"id": movement.split('/')[-1], "image": ""}
        for entry in architect_info['results']['bindings']:
            if "movement" in entry and entry["movement"]["value"] == movement and "movementImage" in entry:
                movement_dict[movement]["name"] = entry["movementLabel"]["value"]
                movement_dict[movement]["image"] = entry["movementImage"]["value"]
            if "notableWorkStyle" in entry and entry["notableWorkStyle"]["value"] == movement and "notableWorkStyleImage" in entry:
                movement_dict[movement]["name"] = entry["notableWorkStyleLabel"]["value"]
                movement_dict[movement]["image"] = entry["notableWorkStyleImage"]["value"]

    movements = [x for x in movement_dict.values()]

    return {"name": architect_label, "description": list(description), "image": image, "workLocations": list(work_locations), "notableWorks": list(notable_works), "movements": list(movements), "wikiText": text}

def get_wiki_text(page_id):
    endpoint_url = f"https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&format=json&pageids={page_id}"
    response = requests.get(endpoint_url)
    text = response.json()["query"]["pages"][page_id]["extract"]
    return text


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
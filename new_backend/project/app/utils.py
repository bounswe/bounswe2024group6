import requests_async
import requests
import logging
import json

    

    
def get_description_wikibase(entity_id):
    wikibase_endpoint_url = "https://wikidata.org/w/rest.php/wikibase/v0"
    response = requests.get(f"{wikibase_endpoint_url}/entities/items/{entity_id}/descriptions")
    return response.json()


def get_text(entity_id):
    title = get_title_wikibase(entity_id)
    if title is None:
        return "No information available about this entry."
    page_id = get_page_id_wikibase(title)
    text = get_wiki_text(page_id)
    return text

def get_content_wikidata(entity_id):
    title = get_title_wikibase(entity_id)
    page_id = get_page_id_wikibase(title)
    # endpoint_url = f"https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&format=json&pageids={page_id}"
    endpoint_url = f"https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exlimit=max&explaintext&titles={title}"
    response = requests.get(endpoint_url)
    text = response.json()["query"]["pages"][page_id]["extract"].replace("\n", " ")
    return text

def get_title_wikibase(entity_id):
    endpoint_url = f"https://www.wikidata.org/w/api.php?action=wbgetentities&ids={entity_id}&format=json&props=sitelinks"
    response = requests.get(endpoint_url)

    resp = response.json()

    if "enwiki" not in resp["entities"][entity_id]["sitelinks"]:
        return None
    title = resp["entities"][entity_id]["sitelinks"]["enwiki"]["title"]
    return title

def get_page_id_wikibase(entity_title):
    endpoint_url = f"https://en.wikipedia.org/w/api.php?action=query&titles={entity_title}&format=json"
    response = requests.get(endpoint_url)
    page_id = list(response.json()["query"]["pages"].keys())[0]
    return page_id


def choose_building_info(entity_id):
    # ARAS: we may choose to use the old query if the new one takes too long, so i'll just put it here.
    building_info_query_old = f'''
SELECT DISTINCT ?building ?buildingLabel ?architect ?style ?description ?coordinate ?architectLabel ?architectImage ?image ?styleLabel ?styleImage WHERE {{
  VALUES ?building {{ wd:{entity_id} }}  # Using the provided building ID
  
  ?building
           rdfs:label ?buildingLabel;
  OPTIONAL{{?building schema:description ?description;}}         
           wdt:P625 ?coordinate.
  OPTIONAL {{         
    ?building wdt:P18 ?image.
  }}
  OPTIONAL {{
    ?building wdt:P84 ?architect.
    ?architect rdfs:label ?architectLabel.
    OPTIONAL {{ ?architect wdt:P18 ?architectImage. }}
  }}
  
  OPTIONAL {{
    ?building wdt:P149 ?style.
    ?style rdfs:label ?styleLabel.
    OPTIONAL {{ ?style wdt:P18 ?styleImage. }}
  }}
  
  # Filtering for English labels and descriptions
  FILTER(LANG(?buildingLabel) = "en")
  FILTER(LANG(?description) = "en")
  FILTER(LANG(?styleLabel) = "en")
  FILTER(LANG(?architectLabel) = "en")
  
  # Get labels for the results
  SERVICE wikibase:label {{ 
    bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". 
  }}
}}
    '''

    building_info_query = f"""
SELECT DISTINCT ?building ?buildingLabel ?description ?coordinate ?architect ?architectLabel ?architectImage ?image ?style ?styleLabel ?styleImage WHERE {{
  VALUES ?building {{ wd:{entity_id} }}  # Using the provided building ID
  
  ?building
           schema:description ?description;
           wdt:P625 ?coordinate.
  OPTIONAL {{         
    ?building wdt:P18 ?image.
  }}
  OPTIONAL {{
    ?building p:P84 ?architectStmt.
    ?architectStmt ps:P84 ?architect.
    ?architect rdfs:label ?architectLabel.
    OPTIONAL {{ ?architect wdt:P18 ?architectImage. }}
  }}
  
  OPTIONAL {{
    ?building wdt:P149 ?style.
    ?style rdfs:label ?styleLabel.
    OPTIONAL {{ ?style wdt:P18 ?styleImage. }}
  }}
  
  # Filtering for English labels and descriptions
  FILTER(LANG(?description) = "en")
  FILTER(LANG(?buildingLabel) = "en")
  FILTER(LANG(?architectLabel) = "en")
  FILTER(LANG(?styleLabel) = "en")
  
  # Get labels for the building
  SERVICE wikibase:label {{ 
    bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". 
    ?building rdfs:label ?buildingLabel.
  }}
}}    
"""
    return building_info_query

def query_building_info(entity_id):
    query = choose_building_info(entity_id)
    endpoint_url = "https://query.wikidata.org/sparql"
    headers = {
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0',
        'Accept': 'application/sparql-results+json'
    }
    params = {'query': query, 'format': 'json'}
    response = requests.get(endpoint_url, headers=headers, params=params)

    data = response.json()
    
    return data

def get_building_info(entity_id):
    text = get_text(entity_id)

    building_info = query_building_info(entity_id)

    building_label = building_info['results']['bindings'][0]['buildingLabel']['value']
    description = building_info['results']['bindings'][0]['description']['value']

    images = set()
    architects = set()
    styles = set()
    coordinates = None
    for entry in building_info['results']['bindings']:
        if 'image' in entry:
            images.add(entry['image']['value'])
        if 'architect' in entry:
            architects.add(entry['architect']['value'])
        if 'style' in entry:
            styles.add(entry['style']['value'])
        if 'coordinate' in entry:
            coordinates = entry['coordinate']['value']
            coordinates = coordinates.split("(")[1]
            coordinates = coordinates.split(")")[0].split(" ")
            latitude = coordinates[0]
            longitude = coordinates[1]
            coordinates = {"latitude": latitude, "longitude": longitude}

    images = [x for x in images]
    
    architects_dict = {}
    for architect in architects:
        for entry in building_info['results']['bindings']:
            if entry['architect']['value'] == architect:
                architects_dict[architect] = {"id": architect.split('/')[-1], "image": "NULL", "name": "NULL"}
                if 'architectLabel' in entry:
                    architects_dict[architect]["name"] = entry['architectLabel']['value']
                if 'architectImage' in entry:
                    architects_dict[architect]["image"] = entry['architectImage']['value']
        

    styles_dict = {}

    for style in styles:
        for entry in building_info['results']['bindings']:

            if entry['style']['value'] == style:
                styles_dict[style] = {"id": style.split('/')[-1], "image": "NULL", "name": "NULL"}
                if 'styleLabel' in entry:
                    styles_dict[style]["name"] = entry['styleLabel']['value']
                if 'styleImage' in entry:
                    styles_dict[style]["image"] = entry['styleImage']['value']

    architects = [x for x in architects_dict.values()]
    styles = [x for x in styles_dict.values()]

    return {"name": building_label, "description": description, "image": images, "architect": architects, "architecturalStyle": styles, "coordinates": coordinates, "wikiText": text}


def query_architect_info(entity_id):

    query = f"""
    PREFIX wd: <http://www.wikidata.org/entity/>
    PREFIX wdt: <http://www.wikidata.org/prop/direct/>
    PREFIX schema: <http://schema.org/>

SELECT DISTINCT 
    ?architect ?architectLabel ?description ?image ?workLocationLabel ?movementLabel ?movementImage ?movement
    ?notableWork ?notableWorkLabel ?notableWorkImage ?notableWorkCoordinate ?notableWorkStyle ?notableWorkStyleLabel ?notableWorkStyleImage
WHERE {{
    VALUES ?architect {{ wd:{entity_id} }} 

    OPTIONAL {{ ?architect wdt:P18 ?image . }} 
    OPTIONAL {{ ?architect wdt:P937 ?workLocation . }}  
    OPTIONAL {{ ?architect wdt:P135 ?movement . }} 

    SERVICE wikibase:label {{ 
        bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". 
        ?architect rdfs:label ?architectLabel .
        ?workLocation rdfs:label ?workLocationLabel .
        ?movement rdfs:label ?movementLabel .
    }}
    
    OPTIONAL {{
        ?architect wdt:P800 ?notableWork .
        OPTIONAL {{ ?notableWork wdt:P18 ?notableWorkImage . }} 
        OPTIONAL {{ ?notableWork wdt:P625 ?notableWorkCoordinate . }}  
        OPTIONAL {{ ?notableWork wdt:P149 ?notableWorkStyle . }} 
        OPTIONAL {{ ?notableWorkStyle wdt:P18 ?notableWorkStyleImage . }} 

        SERVICE wikibase:label {{ 
            bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". 
            ?notableWork rdfs:label ?notableWorkLabel .
            ?notableWorkStyle rdfs:label ?notableWorkStyleLabel .
        }}


    }}

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
    if response.status_code == 500:
        return {"response:": "error: while query the data"}
    elif data['results']['bindings'] == []:
        return None

    return data



def get_architect_info(entity_id):

    text = get_text(entity_id)

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
                notable_works_dict[work]["name"] = entry["notableWorkLabel"]["value"]
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

def query_style_info(entity_id):
    query = f"""
PREFIX wd: <http://www.wikidata.org/entity/>
PREFIX wdt: <http://www.wikidata.org/prop/direct/>
PREFIX schema: <http://schema.org/>
PREFIX wikibase: <http://wikiba.se/ontology#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT DISTINCT 
    ?style ?styleLabel ?description ?wikiText 
    (COALESCE(?image, "NULL") AS ?image) 
    ?architect 
    (COALESCE(?architectLabel, "NULL") AS ?architectLabel) 
    (COALESCE(?architectImage, "NULL") AS ?architectImage) 
    ?building
    (COALESCE(?buildingLabel, "NULL") AS ?buildingLabel) 
    (COALESCE(?buildingCoordinates, "NULL") AS ?buildingCoordinates) 
    ?subclass 
    (COALESCE(?subclassLabel, "NULL") AS ?subclassLabel) 
    (COALESCE(?subclassImage, "NULL") AS ?subclassImage)
WHERE {{
    VALUES ?style {{ wd:{entity_id} }}  

    # Basic information about the style
    OPTIONAL {{ ?style wdt:P18 ?image . }}  
    OPTIONAL {{ ?style schema:description ?description . FILTER(LANG(?description) = "en") }}  
    OPTIONAL {{ ?style schema:articleBody ?wikiText . FILTER(LANG(?wikiText) = "en") }} 

    OPTIONAL {{ 
        ?style wdt:P61 ?architect .
        OPTIONAL {{ ?architect wdt:P18 ?architectImage . }}
    }}

    OPTIONAL {{ 
        ?style wdt:P84 ?building .
        OPTIONAL {{ ?building wdt:P625 ?buildingCoordinates . }}
    }}

    OPTIONAL {{ 
        ?style wdt:P279 ?subclass .
        OPTIONAL {{ ?subclass wdt:P18 ?subclassImage . }}
    }}

    SERVICE wikibase:label {{ 
        bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en".
        ?style rdfs:label ?styleLabel .
        ?architect rdfs:label ?architectLabel .
        ?building rdfs:label ?buildingLabel .
        ?subclass rdfs:label ?subclassLabel .
    }}
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

    return data

def get_style_info(entity_id):
    
    text = get_text(entity_id)

    style_info = query_style_info(entity_id)

    architects = set()
    buildings = set()   
    superclasses = set()
    images = set()

    for entry in style_info['results']['bindings']:
        if 'architect' in entry:
            architects.add(entry['architect']['value'])
        if 'building' in entry:
            buildings.add(entry['building']['value'])
        if 'subclass' in entry:
            superclasses.add(entry['subclass']['value'])
        if 'image' in entry:
            images.add(entry['image']['value'])

    architects_dict = {}

    for architect in architects:
        for entry in style_info['results']['bindings']:
            if entry['architect']['value'] == architect:
                architects_dict[architect] = {"id": architect.split('/')[-1], "name": entry['architectLabel']['value'], "image": entry['architectImage']['value']}
    
    buildings_dict = {}

    for building in buildings:
        for entry in style_info['results']['bindings']:
            if entry['building']['value'] == building:
                buildings_dict[building] = {"name": entry['buildingLabel']['value'], "id": building.split('/')[-1]}
                coordinates = entry['buildingCoordinates']['value']
                if(coordinates != "NULL"):
                    coordinates = coordinates.split("(")[1]
                    coordinates = coordinates.split(")")[0].split(" ")
                    buildings_dict[building]["coordinates"] = {"latitude": coordinates[0], "longitude": coordinates[1]}
                else:
                    buildings_dict[building]["coordinates"] = "NULL"
    
    superclasses_dict = {}

    for superclass in superclasses:
        for entry in style_info['results']['bindings']:
            if entry['subclass']['value'] == superclass:
                superclasses_dict[superclass] = {"id": superclass.split('/')[-1], "name": entry['subclassLabel']['value'], "image": entry['subclassImage']['value']}

    architects = [x for x in architects_dict.values()]
    buildings = [x for x in buildings_dict.values()]
    superclasses = [x for x in superclasses_dict.values()]

    return {"name": style_info['results']['bindings'][0]['styleLabel']['value'], "description": style_info['results']['bindings'][0]['description']['value'], "image": style_info['results']['bindings'][0]['image']['value'], "wikiText": text, "architects": architects, "buildings": buildings, "subclassOf": superclasses}




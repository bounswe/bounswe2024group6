from rdflib import Graph, URIRef
import requests
from requests.exceptions import ConnectionError, Timeout
from rest_framework.decorators import api_view
from rest_framework.response import Response


LEXVO_BASE_URL = "http://www.lexvo.org/data/term/eng/"

def get_meaning_uris_and_translations(word):
    response = requests.get(f"{LEXVO_BASE_URL}{word}", headers={'Accept': 'application/rdf+xml'})

    if response.status_code != 200:
        print(f"Error fetching data for '{word}': Status code {response.status_code}")
        return []

    g = Graph()
    meanings_uris = []
    translations = []

    g.parse(data=response.text, format="xml")

    for subj, pred, obj in g:
        if 'means' in pred:
            meanings_uris.append(str(obj))  # Store URI for each meaning
        elif 'translation' in pred:
            translations.append(str(obj))  # Store translation URIs

    return meanings_uris, translations
def get_detailed_info(uri):
    response = requests.get(uri, headers={'Accept': 'application/rdf+xml'})

    if response.status_code != 200:
        print(f"Error fetching details for URI '{uri}': Status code {response.status_code}")
        return None

    g = Graph()
    details = {
        "label": None,
        "comment": None,
        "broader": [],
        "narrower": [],
        "nearlySameAs": []
    }

    g.parse(data=response.text, format="xml")

    # Extract label and comment for description
    details["label"] = str(g.value(subject=URIRef(uri), predicate=URIRef("http://www.w3.org/2000/01/rdf-schema#label")))
    details["comment"] = str(g.value(subject=URIRef(uri), predicate=URIRef("http://www.w3.org/2000/01/rdf-schema#comment")))

    # Extract relationships: broader, narrower, nearlySameAs
    for subj, pred, obj in g:
        if 'broader' in pred:
            details["broader"].append(str(obj))
        elif 'narrower' in pred:
            details["narrower"].append(str(obj))
        elif 'nearlySameAs' in pred:
            details["nearlySameAs"].append(str(obj))

    return details


def search_lexvo(word):
    meanings_uris, translations = get_meaning_uris_and_translations(word)

    # Collect details for each meaning URI
    meanings_details = []
    for uri in meanings_uris:
        detailed_info = get_detailed_info(uri)
        if detailed_info:
            meanings_details.append(detailed_info)

    print(meanings_details)
    return {
        "translations": translations,
        "meanings": meanings_details
    }






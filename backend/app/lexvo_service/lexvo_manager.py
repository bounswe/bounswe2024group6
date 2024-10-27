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
    try:
        response = requests.get(uri, headers={'Accept': 'application/rdf+xml'}, timeout=5)
        response.raise_for_status()  # Raise an error for 4xx/5xx HTTP errors
    except (requests.ConnectionError, requests.Timeout):
        print(f"Error fetching details for URI '{uri}': Connection failed or timed out.")
        return None
    except requests.HTTPError as e:
        print(f"Error fetching details for URI '{uri}': {e}")
        return None

    # Proceed if the request is successful
    g = Graph()
    details = {
        "label": None,
        "comment": None,
        "broader": [],
        "narrower": [],
        "nearlySameAs": []
    }

    g.parse(data=response.text, format="xml")
    details["label"] = str(g.value(subject=URIRef(uri), predicate=URIRef("http://www.w3.org/2000/01/rdf-schema#label")))
    details["comment"] = str(g.value(subject=URIRef(uri), predicate=URIRef("http://www.w3.org/2000/01/rdf-schema#comment")))

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
    turkish_translations = [] 
    # Collect details for each meaning URI
    meanings_details = []
    for uri in meanings_uris:
        detailed_info = get_detailed_info(uri)
        if detailed_info:
            meanings_details.append(detailed_info)

    for translation_uri in translations:
        if len(translation_uri.split('/')) > 1:
            if translation_uri.split('/')[5] == "tur":
                turkish_translations.append(translation_uri)
    

    return {
        "translations": turkish_translations,
        "meanings": meanings_details
    }


def get_final_info(word):
    # Fetch meanings and translations using the search_lexvo function
    results = search_lexvo(word)

    # Prepare the response
    final_info = {
        "word": word,
        "meanings": [],
        "turkish_translations": []
    }

    # Populate meanings with details
    for meaning in results["meanings"]:
        meaning_info = {
            "label": meaning["label"],
            "comment": meaning["comment"],
            "broader": meaning["broader"],
            "narrower": meaning["narrower"],
            "nearlySameAs": meaning["nearlySameAs"]
        }
        final_info["meanings"].append(meaning_info)

    # Populate Turkish translations
    final_info["turkish_translations"] = results["translations"]

    return final_info










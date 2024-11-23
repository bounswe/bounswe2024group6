from rdflib import Graph, URIRef
import requests
from requests.exceptions import ConnectionError, Timeout
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..models import Relationship, Word
from urllib.parse import unquote
import time

CEFR_LEVELS = "https://github.com/openlanguageprofiles/olp-en-cefrj"
LEXVO_BASE_URL = "http://www.lexvo.org/data/term/eng/"
REQUEST_DELAY = 1
MAX_RETRIES = 3
CACHE = {}

def strip_identifier(term):
    return term.split('_')[0]

def fetch_word_info_with_retries(word):
    for attempt in range(MAX_RETRIES):
        try:
            response = requests.get(f"{LEXVO_BASE_URL}{word}", headers={'Accept': 'application/rdf+xml'})
            response.raise_for_status()
            return response
        except (ConnectionError, Timeout, requests.HTTPError) as e:
            print(f"Attempt {attempt+1} failed for word '{word}'. Error: {e}")
            if attempt < MAX_RETRIES - 1:
                time.sleep(REQUEST_DELAY * (attempt + 1))
    return response

def get_meanings_uris_and_translations_with_cache(word):
    if word in CACHE:
        return CACHE[word]
    
    response = fetch_word_info_with_retries(word)
    if not response:
        print(f"Error fetching data for '{word}'.")
        return [], []
    
    g = Graph()
    meanings_uris = []
    translations = []
    g.parse(data=response.text, format="xml")

    for subj, pred, obj in g:
        if 'means' in pred:
            meanings_uris.append(str(obj)) 
        elif 'translation' in pred:
            translations.append(str(obj))
    
    CACHE[word] = (meanings_uris, translations)
    return meanings_uris, translations


def decode_data(data):
    decoded_translations = [unquote(uri.split('/')[-1]) for uri in data.get('translations', [])]
    decoded_meanings = []
    for meaning in data.get('meanings', []):
        decoded_meaning = {
            "label": meaning["label"],
            "comment": meaning["comment"],
            "broader": [unquote(b.split('/')[-1]) for b in meaning.get("broader", [])],
            "narrower": [unquote(n.split('/')[-1]) for n in meaning.get("narrower", [])],
            "nearlySameAs": [unquote(s.split('/')[-1]) for s in meaning.get("nearlySameAs", [])]
        }
        decoded_meanings.append(decoded_meaning)
    return {
        "translations": decoded_translations,
        "meanings": decoded_meanings
    }

def get_detailed_info(uri):
    try:
        response = requests.get(uri, headers={'Accept': 'application/rdf+xml'}, timeout=5)
        response.raise_for_status() 
    except (requests.ConnectionError, requests.Timeout, requests.HTTPError) as e:
        print(f"Error fetching details for URI '{uri}': {e}")
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
    meanings_uris, translations = get_meanings_uris_and_translations_with_cache(word)
    turkish_translations = []
    meanings_details = []
    
    
    for uri in meanings_uris:
        if uri[7:12] == "lexvo":
            detailed_info = get_detailed_info(uri)
            if detailed_info:
                meanings_details.append(detailed_info)

    for translation_uri in translations:
        if len(translation_uri.split('/')) > 1 and translation_uri.split('/')[5] == "tur":
            turkish_translations.append(translation_uri)
    
    return {
        "translations": turkish_translations,
        "meanings": meanings_details
    }

def get_final_info(word):
    results = decode_data(search_lexvo(word))
    final_info = {
        "word": word,
        "meanings": [],
        "turkish_translations": results["translations"]
    }

    for meaning in results["meanings"]:
        meaning_info = {
            "label": meaning["label"],
            "comment": meaning["comment"],
            "broader": [strip_identifier(unquote(b)) for b in meaning["broader"]],
            "narrower": [strip_identifier(unquote(n)) for n in meaning["narrower"]],
            "nearlySameAs": [strip_identifier(unquote(s)) for s in meaning["nearlySameAs"]],
            "full_identifiers": {
                "broader": meaning["broader"],
                "narrower": meaning["narrower"],
                "nearlySameAs": meaning["nearlySameAs"]
            }
        }
        final_info["meanings"].append(meaning_info)

    return final_info

from rdflib import Graph, URIRef
import requests
from requests.exceptions import ConnectionError, Timeout
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..models import Category, Relationship, Word
from urllib.parse import unquote


CEFR_LEVELS="https://github.com/openlanguageprofiles/olp-en-cefrj"
LEXVO_BASE_URL = "http://www.lexvo.org/data/term/eng/"

def strip_identifier(term):
    return term.split('_')[0]


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
            meanings_uris.append(str(obj)) 
        elif 'translation' in pred:
            translations.append(str(obj)) 

    return meanings_uris, translations

def get_or_create_word(word_name, language="eng"):
    word_instance, _ = Word.objects.get_or_create(word=word_name, language=language)
    return word_instance

def get_or_create_category(label):
    category, _ = Category.objects.get_or_create(name=label)
    return category

def save_relationship(word_instance, related_word_instance, relation_type):
    Relationship.objects.get_or_create(
        word=word_instance,
        related_word=related_word_instance,
        relation_type=relation_type
    )

def populate_database_with_lexvo_data(word):
    results = decode_data(search_lexvo(word))
    word_instance = get_or_create_word(word)

    for meaning in results.get("meanings", []): 
        if meaning.get("label"):
            category = get_or_create_category(meaning["label"])
            word_instance.categories.add(category)

        for broader_uri in meaning.get("broader", []): 
            broader_word = broader_uri.split('/')[-1]
            broader_word_instance = get_or_create_word(broader_word)
            save_relationship(word_instance, broader_word_instance, relation_type='broader')

        for narrower_uri in meaning.get("narrower", []):  
            narrower_word = narrower_uri.split('/')[-1]
            narrower_word_instance = get_or_create_word(narrower_word)
            save_relationship(word_instance, narrower_word_instance, relation_type='narrower')

        for nearlySameAs_uri in meaning.get("nearlySameAs", []): 
            synonym_word = nearlySameAs_uri.split('/')[-1]
            synonym_word_instance = get_or_create_word(synonym_word)
            save_relationship(word_instance, synonym_word_instance, relation_type="nearlySameAs")

    for translation_uri in results.get("translations", []):  
        translated_word = translation_uri.split('/')[-1]
        translated_word_instance = get_or_create_word(translated_word, language="tur")
        save_relationship(word_instance, translated_word_instance, relation_type='translation')


def decode_data(data):
    decoded_translations = [unquote(uri.split('/')[-1]) for uri in data.get('translations', [])]
    decoded_meanings = []
    for meaning in data.get('meanings', []):
        decoded_meaning = {
            "label": meaning["label"],
            "comment": meaning["comment"],
            "broader": [unquote(broader.split('/')[-1]) for broader in meaning.get("broader", [])],
            "narrower": [unquote(narrower.split('/')[-1]) for narrower in meaning.get("narrower", [])],
            "nearlySameAs": [unquote(synonym.split('/')[-1]) for synonym in meaning.get("nearlySameAs", [])]
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
    except (requests.ConnectionError, requests.Timeout):
        print(f"Error fetching details for URI '{uri}': Connection failed or timed out.")
        return None
    except requests.HTTPError as e:
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

# Gets the turkish translation and the meaning labels displays the uris
def search_lexvo(word):
    meanings_uris, translations = get_meaning_uris_and_translations(word)
    turkish_translations = [] 
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

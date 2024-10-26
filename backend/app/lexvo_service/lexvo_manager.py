from rdflib import Graph, URIRef
import requests
from requests.exceptions import ConnectionError, Timeout
from rest_framework.decorators import api_view
from rest_framework.response import Response

def get_meanings_from_lexvo(word):
    base_url = "http://www.lexvo.org/data/term/eng/"
    response = requests.get(f"{base_url}{word}", headers={'Accept': 'application/rdf+xml'})

    if response.status_code != 200:
        print(f"Error fetching data for '{word}': Status code {response.status_code}")
        return []

    g = Graph()
    meanings_uris = []

    try:
        g.parse(data=response.text, format="xml")

        for subj, pred, obj in g:
            if 'means' in pred:
                meanings_uris.append(obj)

    except Exception as e:
        print(f"Parsing error: {e}")
        return []

    return meanings_uris

def fetch_detailed_meaning(uris):
    meanings = []
    for uri in uris:
        if "lexvo.org" not in uri:
            print(f"Skipping non-Lexvo URI: {uri}")
            continue

        try:
            response = requests.get(uri, headers={'Accept': 'application/rdf+xml'}, timeout=5)
            if response.status_code != 200:
                print(f"Error fetching details for URI '{uri}': Status code {response.status_code}")
                continue

            g = Graph()
            details = {}
            g.parse(data=response.text, format="xml")

            label = g.value(subject=URIRef(uri), predicate=URIRef("http://www.w3.org/2000/01/rdf-schema#label"))
            comment = g.value(subject=URIRef(uri), predicate=URIRef("http://www.w3.org/2000/01/rdf-schema#comment"))

            details["label"] = str(label) if label else "No label found"
            details["comment"] = str(comment) if comment else "No comment found"
            meanings.append(details)

        except (ConnectionError, Timeout) as e:
            print(f"Failed to fetch {uri}: {e}")
            continue

    return meanings


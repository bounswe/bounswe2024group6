from django.apps import AppConfig
import requests
from django.db.models.signals import post_migrate, post_init

import json

def fill_search_results(**kwargs):
        from .models import SearchResult
        print("starting...")

        query = """
            PREFIX wd: <http://www.wikidata.org/entity/>
            PREFIX wdt: <http://www.wikidata.org/prop/direct/>
            PREFIX schema: <http://schema.org/>
            SELECT * WHERE
            {{
            {{
                SELECT DISTINCT ?item ?itemLabel ?image ("building" as ?type)  WHERE {{
                ?item rdfs:label ?itemLabel.
                ?item p:P84 ?statement1.
                ?item wdt:P18 ?image.
                
                FILTER(lang(?itemLabel) = "en")
                }}
            }}
            
            UNION
            
            {{
                SELECT DISTINCT ?item ?itemLabel ?image ("architect" as ?type) WHERE {{
                ?item rdfs:label ?itemLabel.
                ?item wdt:P106 wd:Q42973.
                ?item wdt:P18 ?image.
                
                FILTER(lang(?itemLabel) = "en")
                }}
            }}
            
            UNION
            
            {{
                SELECT DISTINCT ?item ?itemLabel  ?image ("style" as ?type) WHERE {{
                ?item rdfs:label ?itemLabel.
                ?item wdt:P31 wd:Q32880.
                ?item wdt:P18 ?image.
                
                FILTER(lang(?itemLabel) = "en" )
                }}
            }}
            }}
        """
        endpoint = "https://query.wikidata.org/sparql"
        response = requests.get(endpoint, params={'query': query, 'format': 'json'})

        print(" fetched")
        import re
        
        # cleaned_content = re.sub(r'[\x00-\x1F\x7F-\x9F]', '', response.text)

       
        # data = json.loads(cleaned_content)
        response_text = response.content.decode('utf-8', errors='replace')

    # Remove invalid control characters from the response content
        cleaned_content = re.sub(r'[\x00-\x1F\x7F-\x9F]', '', response_text)
        
        # Attempt to parse the cleaned content as JSON
        try:
            results = json.loads(cleaned_content)
            # Print the results
            print("somehow loaded")

        except json.JSONDecodeError as e:
            print("Failed to decode JSON:", e)
        
        unique_items = {}

        for item in results['results']['bindings']:
            entity_id = item["item"]["value"].split("/")[-1]
            
            if entity_id not in unique_items:
                unique_items[entity_id] = item
        items = []
        for entity_id, item in unique_items.items():
            items.append({"entity_id": entity_id, "name": item["itemLabel"]["value"][:150], "image": item["image"]["value"], "type": item["type"]["value"]})

        SearchResult.objects.bulk_create([SearchResult(**item) for item in items])
            


class AppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'app'
    
    def ready(self):
        post_migrate.connect(fill_search_results, sender=self)

        
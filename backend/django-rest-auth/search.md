# API Documentation for Search Endpoint

## Overview
This documentation outlines the details for the API endpoint used for semantic search using Wikidata API and SPARQL.

## Base URL
The base URL for all endpoints mentioned in this document is:

## Endpoints

## Endpoints

### 1. Signup

- **Description**: Register a new user in the system.
- **HTTP Method**: POST
- **Endpoint URL**: /search/

- **Request Body Parameters**:
- `keyword` (string, required): Desired query which string the user wants to search.


- **Request Example**:
```
{
  "query": "hagia sophia"
}
```

Successful Response:
Code: 200 OK
Content

```
{
    "style": null,
    "building": [
        {
            "Entity ID": "Q1568660",
            "Item Label": "Hagia Sophia",
            "Image": " https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Thessaloniki_Saint_Sophia_Church_west_wall.jpg&width=300"
        },
        {
            "Entity ID": "Q1144576",
            "Item Label": "Little Hagia Sophia",
            "Image": " https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Sergius_and_Bacchus.jpg&width=300"
        },
        {
            "Entity ID": "Q12506",
            "Item Label": "Hagia Sophia",
            "Image": " https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Hagia_Sophia_Mars_2013.jpg&width=300"
        },
        {
            "Entity ID": "Q3656775",
            "Item Label": "Hagia Sophia Church",
            "Image": " https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/NessebarVieilleMetropole.jpg&width=300"
        },
        {
            "Entity ID": "Q1568666",
            "Item Label": "Hagia Sophia",
            "Image": " https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Trabzon_Hagia_Sophia_4900.jpg&width=300"
        },
        {
            "Entity ID": "Q4430013",
            "Item Label": "Hagia Sophia, Iznik",
            "Image": " https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Iznik,_aya_sofia,_esterno_01.jpg&width=300"
        }
    ],
    "architect": null
}
```


Error Response:
Code: 400 Bad Request
Content:
```
"there was an error with the query."
```

import csv
import requests
import os
import django
import pandas as pd
from ..models import Word, Category 
from .lexvo_manager import get_final_info


CREATE_TABLES_SQL = """
CREATE TABLE Category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE Word (
    id SERIAL PRIMARY KEY,
    word VARCHAR(255) UNIQUE NOT NULL,
    language VARCHAR(3) NOT NULL DEFAULT 'eng',
    level VARCHAR(20),
    part_of_speech VARCHAR(20),
    meaning VARCHAR(1000) NOT NULL DEFAULT 'Meaning not available'
);

CREATE TABLE Relationship (
    id SERIAL PRIMARY KEY,
    word_id INTEGER NOT NULL REFERENCES Word(id) ON DELETE CASCADE,
    related_word_id INTEGER NOT NULL REFERENCES Word(id) ON DELETE CASCADE,
    relation_type VARCHAR(50) NOT NULL
);
"""





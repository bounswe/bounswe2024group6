from langchain.prompts.prompt import PromptTemplate
from langchain_ollama import ChatOllama
from langchain_core.output_parsers import StrOutputParser
from dotenv import load_dotenv
import os

load_dotenv()
ollama_api_url = os.getenv("OLLAMA_API_URL")
ollama_api_key = os.getenv("OLLAMA_API_KEY")
# Initialize your Ollama model
llm = ChatOllama(model="llama3.1", api_url=ollama_api_url, api_key=ollama_api_key)

# Define the prompt template for multiple-choice question generation
multiple_choice_template = """
Generate a multiple-choice question based on the following criteria:

1. **Question Type**: 
    - **Type 1**: Given an English word, provide multiple choices in Turkish with one correct translation.
    - **Type 2**: Given a Turkish word, provide multiple choices in English with one correct translation.
    - **Type 3**: Given an English word, provide multiple choices with English definitions, including one correct meaning.

2. **Correct Answer**: "{correct_answer}"

3. **Question Type Selected**: {question_type}

4. **Difficulty Level**: {difficulty_level} (e.g., A1, A2, B1, B2, C1, C2)

5. **Instructions**: The multiple choices should be challenging yet plausible for the specified difficulty level. Each question should have four options, with one being the correct answer and the other three as distractors.

6. **Output**:
    - **Question**: (Based on {word})
    - **Options**:
        - a) Distractor 1
        - b) Distractor 2
        - c) Distractor 3
        - d) Correct answer
"""

def generate_multiple_choice(word, correct_answer, question_type, difficulty_level):
    question_prompt = PromptTemplate(
        input_variables=["word", "correct_answer", "question_type", "difficulty_level"],
        template=multiple_choice_template
    )
    formatted_prompt = question_prompt.format(
        word=word,
        correct_answer=correct_answer,
        question_type=question_type,
        difficulty_level=difficulty_level
    )
    
    response = llm.invoke(formatted_prompt)
    return response


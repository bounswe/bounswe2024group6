# Use an official Python runtime as a parent image
FROM python:3.9

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY requirements.txt ./

# Install Python dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Set environment variables for Django
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Expose the port that Django runs on
EXPOSE 8000

# Run the Django development server
CMD python manage.py makemigrations && python manage.py makemigrations app && python manage.py migrate && python manage.py populate_db_file  data/db_files/words.csv data/db_files/translations.csv data/db_files/relationships.csv && python manage.py runserver 0.0.0.0:8000 
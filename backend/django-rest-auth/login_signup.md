# API Documentation for Authentication Endpoints

## Overview
This document outlines the details for the API endpoints used for user authentication, including user registration (signup) and login. These endpoints are critical for securing access and enabling identity verification within the application.

## Base URL
The base URL for all endpoints mentioned in this document is:

## Endpoints

### 1. Signup

- **Description**: Register a new user in the system.
- **HTTP Method**: POST
- **Endpoint URL**: /signup/

- **Request Body Parameters**:
- `username` (string, required): Desired username for the new user.
- `password` (string, required): Password for the new user.

- **Request Example**:
```json
{
  "username": "kaan",
  "email": "kaan@example.com",
  "password": "1234"
}

Successful Response:
Code: 200 OK
Content

```json
{
    "token": "01433304cbe08c82a0dc7d19ca822217b31466a2",
    "user": {
        "id": 2,
        "username": "kaan",
        "password": "1234",
        "email": "kaan@example.com"
    }
}

Error Response:
Code: 400 Bad Request
Content:
```json
{
  "username": ["This field must be unique."]
}


### 2.Login 

- **Description**: Authenticate a user and retrieve a token.
- **HTTP Method**: POST
- **Endpoint URL**: /login/

- **Request Body Parameters**:
- `username` (string, required): The user's username.
- `password` (string, required): The user's password.

- **Request Example**:
```json
{
  "username": "existinguser",
  "password": "password123"
}

Successful Response:
Code: 200 OK

```json
{
    "token": "01433304cbe08c82a0dc7d19ca822217b31466a2",
    "user": {
        "id": 2,
        "username": "kaan",
        "password": "pbkdf2_sha256$720000$bz8Pb9r7h17CvDoIxYwoaN$OK7agNXYrSlpHaX+u+SN4c68OFqyqMCA+24gM+5IwcI=",
        "email": "kaan@example.com"
    }
}

Error Response:
Code: 404 Not Found
Content

```json
{
  "detail": "missing user"
}

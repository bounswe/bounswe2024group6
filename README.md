## How To Run The Project
### Requirements
- Docker Engine
- PostgreSQL

### Steps
Working locally:
1. Create a .env file in the root directory - refer to .env_example.
2. Open Docker Engine.
3. Run `docker compose up --build` at the root directory.
4. You can view the website at http://localhost:5173/

Deployment:
1. Create a .env file in the root directory - refer to .env_example.
2. Edit `/frontend/src/lib/baseURL.ts` with your public backend URL and port.
3. Run `docker compose build` at the root directory.
4. Run `docker compose up` at the root directory.
5. You can view the website at port 5173 at you public URL.


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
1. Select a virtual machine working on cloud environment.
2. Connect to the virtual machine with a SSH connection. Make sure it has Docker in it.
3. Clone the repository using `git clone {repository_url}`.
4. Create a `.env` file in the root directory - refer to .env_example.
5. Edit `/frontend/src/lib/baseURL.ts` with your public URL and port.
6. Run `docker compose build` at the root directory.
7. Run `docker compose up` at the root directory.
8. You can view the website at port 5173 at your public URL.

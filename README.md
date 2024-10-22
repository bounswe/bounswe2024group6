## How To Run The Project
### Requirements
- Docker Engine
- PostgreSQL

### Steps
Working locally:
1. Create a `.env` file in the root directory - refer to .env_example.
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

## Mobile:
### Prerequisites:
To build this project, ensure you have the following tools installed on your system:

- *Git*: [Install Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- *Node.js* and *npm*: [Download Node.js](https://nodejs.org/) (npm is included)
- *EAS CLI*: [Set up EAS](https://docs.expo.dev/eas-update/getting-started/)

### Steps to Build the Mobile App:

1. *Clone the Repository:*
   bash
   git clone https://github.com/bounswe/bounswe2024group6.git
   cd bounswe2024group6/mobile/bulingo
   

2. *Install Dependencies:*
   Run the following command to install the necessary npm packages:
   bash
   npm install
   

3. *Log In to EAS (if not logged in):*
   Ensure you are logged in to your EAS account:
   bash
   eas login
   
   (You will be prompted for your EAS account credentials.)

4. *Build the Project Using EAS:*
   To build the project for Android, use the following command:
   bash
   eas build -p android --profile preview
   
   > Note: You may be prompted for your EAS account username and password in this step if not already logged in.

5. *Access the APK:*
   Once the build completes, you will receive a URL to download the APK. You can find the APK download link:
   - On the EAS build details page
   - In the terminal output when the eas build process finishes

6. *Install the APK on Your Device:*
   After downloading the APK file, you can install it on your Android device. Enable *"Install from Unknown Sources"* in your phone’s settings if needed.

### Endpoints
The backend can be accessed through the following URL: http://161.35.208.249:8000 
The frontend can be accessed through the following URL: http://161.35.208.249:5173

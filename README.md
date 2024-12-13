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
   
   `git clone https://github.com/bounswe/bounswe2024group6.git`


   `cd bounswe2024group6/mobile/bulingo`
   

3. *Install Dependencies:*
   Run the following command to install the necessary npm packages:
   
   `npm install`
   

4. *Log In to EAS (if not logged in):*
   Ensure you are logged in to your EAS account:
   
   `eas login`
   
   (You will be prompted for your EAS account credentials.)

5. *Build the Project Using EAS:*
   To build the project for Android, you will have to first delete the `projectId` field from the app config. It should look like the following:

   ```
   ...
   extra: {
      eas: {
      },
      router: {
        origin: false
      }
    },
   ...
   ```

   You should then run the following command, which will prompt you to input a project id when you follow the steps presented.
   
   `eas build -p android --profile preview`

   Afterwards, you should update the app config accordingly. It will look something like this:

   ```
   ...
   extra: {
      eas: {
        "projectId": "1b91f436-e301-4a27-aeb3-1c57be3bf9a2"
      },
      router: {
        origin: false
      }
    },
   ...
   ```

   Alternatively, you can build the application locally, but it has many more dependencies and you will have to deal with gradle. The command for it is this:

   `eas build -p android --profile preview --local`

   You will still need to login and change the projectId with the steps described above.
   
   > Note: You may be prompted for your EAS account username and password in this step if not already logged in.

7. *Access the APK:*
   Once the build completes, you will receive a URL to download the APK (or an apk file will be created if you used to local build option). You can find the APK download link:
   - On the EAS build details page
   - In the terminal output when the eas build process finishes

8. *Install the APK on Your Device:*
   After downloading the APK file, you can install it on your Android device. Enable *"Install from Unknown Sources"* in your phone’s settings if needed.

### Endpoints
The backend can be accessed through the following URL: http://161.35.208.249:8000 

The frontend can be accessed through the following URL: http://161.35.208.249:5173

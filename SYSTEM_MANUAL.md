# System Manual
## System Manual (Frontend)

### System Requirements

#### Hardware Requirements
- RAM: 4GB minimum (8GB recommended)
- Storage: 10GB minimum free space
  - Additional space required depending on database and media storage needs

#### Software Requirements

- **Operating System**
    - Linux (Ubuntu 20.04 LTS or later recommended)
    - macOS 10.15 or later
    - Windows 10/11 with WSL2 enabled

- **Required Software**
    - Docker Engine 20.10.0 or later
    - Docker Compose v2.0.0 or later
    - Git (latest version)

- **Network Requirements**
    - Internet connection for pulling Docker images
    - Available ports:
      - 5432 (PostgreSQL)
      - 8000 (Django backend)
      - 5173 (Vite development server)

- **Development Environment**
    - Code editor or IDE (VSCode recommended)
    - Terminal emulator
    - Web browser (Chrome, Firefox, or Safari latest version)

- **Development Tools (Optional)**
    - PostgreSQL client for database management
    - API testing tools (Postman recommended)
    - Browser developer tools
    - Docker Desktop (for Windows and macOS users)

#### Installation Instructions

**Installing Docker:**
- **Ubuntu:**
    - Update your existing list of packages:
        ```sh
        sudo apt update
        ```
    - Install prerequisite packages:
        ```sh
        sudo apt install apt-transport-https ca-certificates curl software-properties-common
        ```
    - Add the GPG key for the official Docker repository:
        ```sh
        curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
        ```
    - Add the Docker repository to APT sources:
        ```sh
        sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
        ```
    - Install Docker:
        ```sh
        sudo apt install docker-ce
        ```
    
- **Mac:** You can install Docker Desktop following the instructions here: [Install Docker Desktop on Mac](https://docs.docker.com/desktop/setup/install/mac-install/)
- **Windows:** You can install Docker Desktop following the instructions here: [Install Docker Desktop on Windows](https://docs.docker.com/desktop/setup/install/windows-install/)

**Working locally:**
1. Create a `.env` file in the root directory - refer to .env_example.
2. Make sure Docker is installed, you can refer to instructions for installing Docker described above.
3. Open Docker Engine.
4. Run `docker compose up --build` at the root directory.
5. You can view the website at http://localhost:5173/

**Deployment:**
1. Select a virtual machine working on cloud environment.
2. Connect to the virtual machine with a SSH connection.
3. Make sure Docker is installed, you can refer to instructions for installing Docker described above.
4. Clone the repository using `git clone https://github.com/bounswe/bounswe2024group6.git`.
5. Create a `.env` file in the root directory - refer to .env_example.
6. Edit `/frontend/src/lib/baseURL.ts` with your public URL and port.
7. Run `docker compose build` at the root directory.
8. Run `docker compose up` at the root directory.
9. You can view the website at port 5173 at your public URL.


## System Manual (Mobile):

The mobile app can be used via Expo or it can be directly installed to your mobile device / android emulator. 

### System Requirements
* Supported Platforms:
	- iOS: Compatible with iOS 11.0 and higher. iOS 13.0 and higher is recommended.
	- Android: Supports Android 6.0 (Lollipop) and above. Android 8.0 and above is recommended 
* Hardware Requirements:
    - RAM: Minimum 2 GB, recommended 4 GB
    - Storage: Minimum 100 MB, recommended 500 MB
* Additional Requirements for Emulator Usage
	- [Android Studio](https://developer.android.com/studio) & [SDK Tools](https://developer.android.com/tools)

The system requirements mentioned above are concerned with installing the apk file found in the release. If you wish to build the application yourself, you can follow the instructions in the Mobile section of the [readme](https://github.com/bounswe/bounswe2024group6/blob/main/README.md).

### Installation Instructions
#### Install Using an Emulator (Android Virtual Device)
In order to use an emulator to run the mobile app, you must first have an Android Virtual Device ready and have the 'platform-tools' and 'cmdline-tools' installed on your computer. You must be able to run the 'adb' and 'emulator' commands. If you are not able to do this, you may need to update your system's PATH with `<Android-SDK-Path>/emulator`. The android SDK path can be found by following the instructions in the 'SDK Tools' link in the System Requirements.

To create an Android Virtual Device, open Android Studio and navigate to the Device Manager, usually found on the thin bar on the right. From there, you can go to the Virtual tab and press 'Create Device' and follow the steps to create a virtual device. 

After creating the virtual device, you can start it from either the Android Studio GUI or with the command `emulator -avd <AVD_NAME>`. You can find the AVD_NAME by running the command `emulator -list-avds`.

After starting the Android Virtual Device, you can install **bulingo.apk** by running the command `adb install <PATH_TO_bulingo.apk>`. Afterwards, you should be able to see the app in your Android Virtual Device.
#### Install to Physical Device
Once you download the apk file found in the release (or the one you built yourself) to your device, you can install it by simply finding it in your files and pressing it. You may need to enable apk installation from unknown sources from the Settings.

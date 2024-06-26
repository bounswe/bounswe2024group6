# This repository belongs to the Group 6 of CMPE 352 Course

![White and Black Corporate Architecture Presentation](https://github.com/bounswe/bounswe2024group6/assets/57640531/cb99734c-7d9e-48c3-bcd8-11472ac2afae)

### About Us

We are 3rd and 4th year students of Department of Computer Engineering. We are taking CMPE352 course from Suzan Üsküdarlı in 2024 Spring semester!





### About the Project
Our project is a semantic information for architectural domain. In the Wiki page you can find our Requirements work for the project. Currently we are done with search bar and user authentication. Post, profile and feed features are to be implemented soon.
###  Team Members
* [Oktay Özel](https://github.com/bounswe/bounswe2024group6/wiki/Personal-Wiki-&-Effort-:-Oktay-%C3%96zel)
* [Aras Taşçı](https://github.com/bounswe/bounswe2024group6/wiki/Personal-Wiki-&-Efforts:-Aras-Taşçı)
* [Yunus Emre Özdemir](https://github.com/bounswe/bounswe2024group6/wiki/Personal-Wiki-&-Effort:-Yunus-Emre-Özdemir)
* [Kaan Yolcu](https://github.com/bounswe/bounswe2024group6/wiki/Personal-Wiki-&-Effort:-Kaan-Yolcu)
* [Elif Nur Deniz](https://github.com/bounswe/bounswe2024group6/wiki/Personal-Wiki-&-Effort:-Elif-Nur-Deniz)
* [Eymen Çeliktürk](https://github.com/bounswe/bounswe2024group6/wiki/Personal-Wiki-&-Efforts:-Eymen-Çeliktürk)
* [Anıl Köse](https://github.com/bounswe/bounswe2024group6/wiki/Personal-Wiki-%26-Effort%3A-Anıl-Köse)
* [Battal Hazar](https://github.com/bounswe/bounswe2024group6/wiki/Personal-Wiki-&-Effort--Battal-Hazar)
* [Halil Özkan](https://github.com/bounswe/bounswe2024group6/wiki/Personal-Wiki-&-Effort:-Halil-Özkan) 
* [Ebru Özçakı](https://github.com/bounswe/bounswe2024group6/wiki/Personal-Wiki-&-Effort:-Ebru-Özçakı)


### Project Build Steps
* Prerequisites: Docker

* Clone the repository to your local environment:

```
git clone https://github.com/bounswe/bounswe2024group6.git
cd bounswe2024group6
```

* Set the env variables as shown in ./.env.example in ./.env.

* Update allowed hosts in ./backend\django-rest-auth\server\settings.py. Add the IPs that can send request to your API. For your local environment, add local host.

* Set base urls in frontend\src\pages\Browse.tsx, frontend\src\pages\Home.tsx pages (ie. local host).

* After that, run the docker codes below to start the application:
```
docker compose build
docker compose up
```

* The front-end server will be avaliable at "http://127.0.0.1:5173/" and the back-end server will be avaliable at "http://127.0.0.1:8000/".


### Mobile App

* First, go to the project folder, it is where package.json is located.
* Use the commands
```
npm run start
npm run android
npm run ios
```
and what they do respectively as follows:
  - Runs the expo server.
  - Runs the app in an android device
  - Runs the app in an ios device

Then you can reach the mobile app and web app via following IP addresses:

- Metro server will be waiting on exp://192.168.1.76:8081
- Web will be waiting on http://localhost:8081

Once the expo server starts, you can do the following:

› Press s │ switch to development build

› Press a │ open Android

› Press i │ open iOS simulator

› Press w │ open web

› Press j │ open debugger

› Press r │ reload app

› Press m │ toggle menu

› Press o │ open project code in your editor

› Press ? │ show all commands






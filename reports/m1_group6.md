# Executive Summary
The project thus far has been coming along nicely. We have learned a lot from working together as a team, and the customer presentation was helpful in aligning ourselves with the customer's vision. We have created about half of the pages for both the mobile and the front-end application, although the design of the front-end app was preferred during the presentation. Because of that, the mobile team will have to redesign their UI. We will also be choosing a designated presenter for the remaining customer presentations, and we'll try to have a more concrete presentation plan.

Functionality wise, our project is somewhat lacking. The back-end team has a lot of work to do about searching, linking and question choice suggestion functionalities before the second customer presentation. The mobile team will be busy adding the missing pages, redesigning the UI on existing pages and connecting the app to the backend endpoints. The frontend team will also be creating more pages and connecting their application to the backend. 

Finally, we are planning to implement some experimental features related to language learning (like a small word of the day section) before the second customer milestone. These functions are not likely to be implemented fully, but we at least want to showcase them in the presentation on the off-chance that the customer really enjoys them.
# Customer Feedback and Reflections
Our customer presentation provided valuable feedback to us and allowed us to reflect both on our presentation and status quo of our work. 
Our customers specifically requested that our quizzes should allow the user to track its progress *while solving* the quiz, and we plan to add that functionality. They've also requested that the application should be responsive in the quizzes, such that it provides the question list after solving the quiz, prompting the user with phrases like "Wanna try again?" to enhance the experience of the user by encouraging them. Regarding the quiz creation functionality, customers looked positive on quiz levels being non-restrictive, and thought adding a question to a quiz *can* add meta-information like tags would be a valuable feature.

Regarding our presentation, we realized that our mock data choices weren't the most realistic and took notes to make a completely thought scenario from start to finish as we observed the opposite do *not* get good feedback from the customers.
# List and Status of Deliverables
| Deliverable | Status |
| ----------- | ------ |
| [Requirements](https://github.com/bounswe/bounswe2024group6/wiki/Requirements-%E2%80%90-451) | Completed |
| [Class Diagrams](https://github.com/bounswe/bounswe2024group6/wiki/Class-Diagrams) | Completed |
| [Use Case Diagrams](https://github.com/bounswe/bounswe2024group6/wiki/Use-case-diagram-%E2%80%90-451) | Completed |
| [Sequence Diagrams](https://github.com/bounswe/bounswe2024group6/wiki/CMPE-451-%E2%80%90-Sequence-Diagrams) | Completed | 
| [Senario #1](https://github.com/bounswe/bounswe2024group6/wiki/User-Scenario-1) | Completed |
| [Senario #2](https://github.com/bounswe/bounswe2024group6/wiki/User-Scenario-2) | Completed | 
| [Senario #3](https://github.com/bounswe/bounswe2024group6/wiki/User-Scenario-3) | Completed | 
| [Senario #4](https://github.com/bounswe/bounswe2024group6/wiki/User-Scenario-4) | Completed |
| [Senario #5](https://github.com/bounswe/bounswe2024group6/wiki/User-Scenario-5) | Completed |
| [Frontend Mockups](https://github.com/bounswe/bounswe2024group6/wiki/Front%E2%80%90End-Mockups) | Completed |
| [Mobile Mockups](https://github.com/bounswe/bounswe2024group6/wiki/Mobile-Mockups) | Completed (UI will be changed) | 
| [Project Plan](https://github.com/bounswe/bounswe2024group6/wiki/General-Project-Plan) | Completed
| [Communication Plan](https://github.com/bounswe/bounswe2024group6/wiki/Communication-Plan) | Completed |
| [RAM](https://github.com/bounswe/bounswe2024group6/wiki/Responsibility-Assignment-Matrix-%E2%80%90-451) | Completed 
| [Prerelease](https://github.com/bounswe/bounswe2024group6/releases/tag/customer-milestone-1) | Completed |
# Meetings And Reports
- [Lab Report 1](https://github.com/bounswe/bounswe2024group6/wiki/Lab-Report-1)
- [Lab Report 2](https://github.com/bounswe/bounswe2024group6/wiki/Lab-Report-2)
- [Lab Report 3](https://github.com/bounswe/bounswe2024group6/wiki/Lab-Report-3)
- [Lab Report 4](https://github.com/bounswe/bounswe2024group6/wiki/Lab-Report-4)
- [Lab Meeting 1](https://github.com/bounswe/bounswe2024group6/wiki/CMPE-451-Lab-1-Meeting)
- [Weekly Meeting 1](https://github.com/bounswe/bounswe2024group6/wiki/CMPE-451-Weekly-Meeting-1)
- [Lab Meeting 2](https://github.com/bounswe/bounswe2024group6/wiki/Lab-Meeting-2)
- [Weekly Meeting 2](https://github.com/bounswe/bounswe2024group6/wiki/CMPE-451-Weekly-Meeting-2)
- [Frontend Meeting 1](https://github.com/bounswe/bounswe2024group6/wiki/Frontend-Meeting-1)
- [Lab Meeting 3](https://github.com/bounswe/bounswe2024group6/wiki/Lab-Meeting-3)
- [Weekly Meeting 3](https://github.com/bounswe/bounswe2024group6/wiki/Weekly-Meeting-3)
- [Lab Meeting 4](https://github.com/bounswe/bounswe2024group6/wiki/Lab-Meeting-4)
- [Frontend Meeting 2](https://github.com/bounswe/bounswe2024group6/wiki/Frontend-Meeting-2)
- [Weekly Meeting 4](https://github.com/bounswe/bounswe2024group6/wiki/CMPE-451-Weekly-Meeting-4)

# Evaluation of the status of deliverables and its impact on your project plan (reflection)
All deliverables were planned and completed on time, thanks to the structured project plan we established from the start. The clear definition of milestones and task dependencies allowed us to follow a logical sequence of development, ensuring that each phase was completed efficiently.

The project plan helped us stay on track by providing visibility into how tasks were interdependent. This allowed the team to prioritize critical tasks, such as setting up the backend and database before focusing on more complex features like semantic search. As a result, we were able to manage our resources effectively and meet the deadlines for each milestone.

Reflecting on the project so far, the adherence to the plan has minimized disruptions, and our team has been able to follow the outlined timeline without major delays. The clear dependencies outlined in the plan also enabled us to swiftly adapt when necessary, ensuring the smooth progress of deliverables without impacting the overall project schedule.
# Evaluation of Tools and Processes

### Git & GitHub
The version control system git & GitHub provides helped us manage feature development efficiently. The project wiki feature provided by Github also provided us with a convenient place to store all of the discussions and research we have made thus far.

### Django
As the backend team, we were well-acquainted with the Django framework from CMPE352 and did not hesitate to choose Django again - the MVC architecture it provides makes it easy to scale and allows multiple developers to work on the code without major conflict worries.

### PostgreSQL
PostgreSQL was our backup to MySQL. After we had problems installing the `mysqlclient` Python package for our Python environment, we resorted to PostgreSQL for ease of use - it did not disappoint us.

### Docker
Using Docker simplified our development and deployment processes by containerizing the entire application. We appreciated how it ensured consistency across different environments (we used it extensively in our local machines), though writing and maintaining Dockerfiles required some time investment.

### React
React was central to our front-end development. Its component-based structure gave us flexibility in building a dynamic user interface. However, managing the state across multiple components and optimizing rendering sometimes became challenging.

### Vite
We chose Vite for its speed in bundling and hot reloading, which significantly improved our development experience compared to traditional bundlers.

### TailwindCSS
TailwindCSS made styling easier and more modular, letting us focus on design without having to write extensive CSS from scratch. The utility-first approach worked well for rapid development, although managing consistency across large, complex layouts occasionally became tricky.

### NextUI
NextUI provided us with a beautiful set of pre-built React components that improved our design process. It was easy to integrate, but customizing components to fit specific design requirements sometimes involved digging into the library's internals.

### ReactRouter
ReactRouter simplified navigation in our application. It allowed for easy route management, though handling cases like dynamic routing presented some challenges we had to address carefully.

### TypeScript
TypeScript added a layer of type safety that helped us catch bugs early and made the codebase more maintainable. However, the strict typing sometimes slowed us down.

### DigitalOcean
DigitalOcean provided a straightforward and cost-effective platform for deploying our application. We appreciated the simplicity of setting up and managing droplets.

### React Native
Most of the mobile team were not familiar with mobile programming when we started this project. However, the ease with which it can be learned and the community around React Native creates a welcoming atmosphere that makes it a really suitable language for a team like this. It's quite flexible and has a large array of tools in its ecosystem to speed up the development process.
### Postman
We have utilized Postman to keep track of the endpoints implemented by backend that are currenctly available and to instruct the fronend and mobile teams on how to use those endpoins.

# Requirements Addressed
* 1.1.1.1 Guests shall be able to sign up.
* 1.1.1.4 Guest shall be able to log in.
* 1.1.2.1 Logged-in Users shall be able to log out.
* 1.1.2.2 Logged-in Users shall be able to view their profile.
* 1.1.2.6 Logged-in Users shall be able to view their own forum posts/comments while viewing their profile.
* 1.1.2.14 Logged-in Users shall be able to go to the forum post when viewing a post in someone's profile.
* 1.2.1.1 Guests shall be able to view the quiz feed.
* 1.2.1.2 Guests shall be able to see quiz statistics and details.
* 1.2.2.2 Logged-in Users shall be able to create a quiz.
* 1.2.2.4 Logged-in Users shall be able to add tags to a quiz (including difficulty tags) while creating a quiz.
* 1.2.2.5 Logged-in Users shall be able to take a quiz.
* 1.3.1.1 Guests shall be able to view the forum feed.
* 1.3.1.2 Guests shall be able to view the comments under a forum post.
* 1.3.2.4 Logged-in users shall be able to add tags to the post while creating new posts in the forum.
* 1.3.2.8 Logged-in users shall be able to like/unlike posts and comments.


# RAM

- **L (Lead)**: The person who carries out the majority of the work. There can be multiple leads if the task requires collaboration.
- **C (Contributor)**: The person who is not responsible for the task but contributed in a minor way.
- **A (Approver)**: The person who approved the item.
- **R (Reviewer)**: The person who reviewd the item and provided feedback.

Shortened names:

- **Oktay Özel (OÖ)**
- **Aras Taşçı (AT)**
- **Yunus Emre Özdemir (YEÖ)**
- **Kaan Yolcu (KY)**
- **Elif Nur Deniz (END)**
- **Anıl Köse (AK)**
- **Halil Özkan (HÖ)**
- **Ali Tarık Şahin (ATŞ)**
- **Ahmet Oğuz Engin (AOE)**
- **Yağız Güldal (YG)**

| Tasks                                              | OÖ  | AT  | YEÖ | KY  | END | AK  | HÖ  | ATŞ | AOE | YG  |
|----------------------------------------------------|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
| **Mobile Development**                           |     |     |     |     |     |  L  |     |     |  L  |  L  |
| Create SignUp and Login Pages                      |     |     |     |     |     |  A  |     |     |  L  |  L  |
| Create Quiz Feed Page                              |     |     |     |     |     |  A  |     |     |  L  |  A  |
| Create Home Page and Navigation Bar                |     |     |     |     |     |  A  |     |     |  R  |  L  |
| Upgrade Expo SDK to Version 51                     |     |     |     |     |     |  A  |     |     |     |  L  |
| Prepare Mobile for Deployment and Prerelease Fixes |     |     |     |     |     |  A  |     |     |  L  |  L  |
| Refactor Components for Prerelease                 |     |     |     |     |     |  A  |     |     |  L  |  L  |
| Fix Register Button and Fetch Calls Issues         |     |     |     |     |     |     |     |     |  A  |  L  |
| Implement Quiz Creation Flow                       |     |     |     |     |     |  L  |     |     |  L  |  A  |
| Implement Quiz Question and Details Pages          |     |     |     |     |     |  L  |     |     |  A  |  L  |
| Implement Like/Unlike Functionality and Add New Icons|   |     |     |     |     |  A  |     |     |  L  |     |
| Mobile Build Instructions and Merge to Main        |     |     |     |     |     |  A  |     |     |  C  |  L  |
| **Backend Development**                          |  L  |  L  |     |  L  |     |     |  L  |     |     |     |
| Dockerization and Setup                            |  L  |   L |     |  L  |  R   |     | A   |     |     |     |
| Implement Post View and Feed Endpoints with Mock Data| C  |   R |     |  L  |     |     | L   |     |     |     |
| Implement Quiz View and Creation Endpoints         |    A |  L  |     |  C  |     |     |     |     |     |     |
| Profile Model, Serializer, View & Update Functionality| A |     |     |  L  |     |     | A   |     |     |     |
| Login, Signup, Logout Functionalities              |   L |     |     |  A  |     |     | C   |     |     |     |
| Fix Mock Data Creation and Merge Backend Setup Changes| |   L  |     |  A  |  R   |     |     |     |     |     |
| **Frontend Development**                         |     |     |  L  |     |  L  |     |     |  L  |     |     |
| Frontend Project Initialization                    |     |     |  L  |     |   A  |     |     |   R  |     |     |
| Create Navbar and Adjust Design Elements           |     |     |  L  |     |   A  |     |     |   R  |     |     |
| Switch to NextUI and Redesign Navbar               |     |     |  L  |     |  A   |     |     |  C  |     |     |
| Create Post Component and Post Creation Template   |     |     |     |     |  L   |     |     |  L  |     |     |
| Create Forum Page                                  |     |     |  A  |     |   A  |     |     |  L  |     |     |
| Create Post Page                                   |     |     |  L  |     |   A  |     |     |  R  |     |     |
| Connect Frontend to Backend and Dockerize Frontend |     |     |  L  |     |   A  |     |     |   R  |     |     |
| Connect Forum, Post and Profile Pages to Backend   |     |     |  L  |     |   A  |     |     |   R  |     |     |
| Reduce Frontend Initial Load Time and Fix Performance Issues| | | L  |     |   R  |     |     |  C  |     |     |
| Design Profile Page                                |     |     |  A  |     |   L  |     |     |  R  |     |     |
| Implement Filtering View and Adjustments in Forum Page|  |     |     |     |   R  |     |     |  L  |     |     |
| Fix Profile Page Design and Deployment Issues      |     |     |  L  |     |   L  |     |     |  C  |     |     |
| Create Preview for Post Creation                   |     |     |  A  |     |   R  |     |     |  L  |     |     |
| **Meetings and Documentation**                  |  C  |  C  |  C  |  C  |  C   |  C  | C   | C   |  C  |  C  |
| 1st Customer Presentations (Backend, Mobile, Frontend)| C| C   |  C  |  C  |   C  |  C  | C   |  C   |  C  |C   |
| Weekly Meeting Notes and Agendas                   |   C |  C   |     |  C  |  C   |  C   | C   |   C  |  C  | C   |
| Host Lab Meetings and Take Notes                   |     |  C   |     |     |  C   |     | A   |   C  |  C  | C   |
| Create Lab Reports and Templates                   |  C  |     |     |     |   C  |     | C   |   C  |  C  | C   |
| Create Project Plan and Readme File                |  C  |  L   |  A  |  L  |  C   |  C  | A   |  A   |  C  |  C  |
| Create the Outline of RAM                   |  A   |     |     |  A  |     |     | L   |     |     |     |
| **Requirements and Design**                      |     |     |     |     |     |     | C   |     |     |     |
| Finalize Requirements and Review User Scenarios    |  A   |     |     |     |  L   |   C  | C   |     |  C  |  C  |
| Create Mockups and Scenario Mockups                |  A   |     |  L  |     | L    |   C  | C   |  L   |  L  |  L   |
| Create Class Diagrams and Sequence Diagrams        |  L   |   L  |  L  |  L  |  R   |     | A   |     |  L   |     |
| Update Requirements and Preliminary Use Case Diagram|  L  |     |     |   C |   R  |  C  | C   |     |   C  |  L  |
| Research Tasks (W3C Standards, Linked Data)        |  R   |     |  L  |     |   R  |     |     |   L  |     |     |
| **Wiki and Homepage Updates**                   |     |     |     |     |     |     |  C  |     |  C  |     |
| Organize Homepage and Wiki Sidebar                 |  L  |  C   |     |  L  |  L   |     |  C  |  C   |  C  |  C  |
| Update Wiki Pages with Real Data and Redesign      |     |     |     |  L  |     |     |     |   C  |  C   |     |
| Create Personal Pages for Newcomers                |     |     |     |     |     |     |     |     |  L   |     |
| Archive Old Project and Repositories               |     |   R  | L   |    |  L   |     |     |     |     |     |
| **Other Tasks**                                   |     |     |     |     |     |     |     |     |     |     |
| Clear Obsolete Branches and Close Old Issues       |     |   L  |     |   L |     |     |     |     |     |     |



# Individual Contributions

## Ali Tarık Şahin

In the frontend team, I attend meetings and help with discussions and decisions. I research W3C standards, create mockups, and design things like filters and post templates. I often pair up with teammates to build features, like the post component. I also work on fixing issues with navigation, filtering, and improving the UI. Plus, I keep notes and write lab reports to document our progress.


### Issues

| Task| Link | Duration |
|-------------------------------------|-------------------------------------------|----------|
 | Attended lab, weekly and frontend meetings, contributed to discussions and decision making process. | [#Lab-2](https://github.com/bounswe/bounswe2024group6/wiki/Lab-Meeting-2), [#Frontend-1](https://github.com/bounswe/bounswe2024group6/wiki/Frontend-Meeting-1), [#Weekly-3](https://github.com/bounswe/bounswe2024group6/wiki/Weekly-Meeting-3), [#Lab-4](https://github.com/bounswe/bounswe2024group6/wiki/Lab-Meeting-4), [#Frontend-2](https://github.com/bounswe/bounswe2024group6/wiki/Frontend-Meeting-2) |8 hours|
| Research W3C Standards       |  [issue270](https://github.com/bounswe/bounswe2024group6/issues/270)                      |  3 hours     | 
| Frontend Mockups       |  [issue282](https://github.com/bounswe/bounswe2024group6/issues/282)                      |  3 hours     | 
| Lab Report 4      |  [labreport4](https://github.com/bounswe/bounswe2024group6/wiki/Lab-Report-4)                      |  1 hour     | 
| Improvements for the project      |  [issue292](https://github.com/bounswe/bounswe2024group6/issues/292)                      |  1 hour     |
|FRONTEND: Replace Link components with navigate |  [issue415](https://github.com/bounswe/bounswe2024group6/issues/415)    |  30 minutes     | 
| FRONTEND: fix filtering view     |  [issue394](https://github.com/bounswe/bounswe2024group6/issues/394)                      |  30 minutes     | 
| Frontend: add filter components to the forum page     |  [issue382](https://github.com/bounswe/bounswe2024group6/issues/382)  |  45 minutes    |
|Frontend: Create Preview For Post Creation |  [issue366](https://github.com/bounswe/bounswe2024group6/issues/366)    |  1 hour     |
| Create Post Creation Template    |  [issue322](https://github.com/bounswe/bounswe2024group6/issues/322)  |  2 hours    |
|Finalise Post Component Design |  [issue319](https://github.com/bounswe/bounswe2024group6/issues/319)    |  1 hour 30 minutes     | 
| Pair Programming with elifnurdeniz on creation of post component   |  [frontend-meeting-notes](https://github.com/bounswe/bounswe2024group6/wiki/Frontend-Meeting-2)  |  3 hours     | 

I’ve worked on several PRs, including creating, merging, and reviewing them.Below is a table detailing my PR responsibilities:

### Pull Requests
| Title | Link | Duration |
|-------------------------------------|-------------------------------------------|----------|
|fix(frontend): Routing HOT FIX |  [#417](https://github.com/bounswe/bounswe2024group6/pull/417) |Assigned|
| fix(frontend): fixed filter view   |  [#396](https://github.com/bounswe/bounswe2024group6/pull/396) | Assigned |
| feat(frontend): added filtering view above forum posts |  [#391](https://github.com/bounswe/bounswe2024group6/pull/391)  |Assigned |
|feat(frontend): added preview for post creation |  [#370](https://github.com/bounswe/bounswe2024group6/pull/370) | Assigned |
| feat(frontend): create post creation template|  [#361](https://github.com/bounswe/bounswe2024group6/pull/361)  |Assigned     |
|FRONTEND-319: Finalise Post Component Design |  [#339](https://github.com/bounswe/bounswe2024group6/pull/339) | Assigned     |
| feat(frontend): create post component  |  [#323](https://github.com/bounswe/bounswe2024group6/pull/323)  |  Assigned     | 
| feat(frontend): adjusted avatar in the navbar  |  [#392](https://github.com/bounswe/bounswe2024group6/pull/392)  |  Reviewed     | 
| feat(frontend): adjusted navbar design  |  [#390](https://github.com/bounswe/bounswe2024group6/pull/390)  |  Reviewed     | 
| feat(frontend): design profile page and own posts  |  [#383](https://github.com/bounswe/bounswe2024group6/pull/383)  |  Reviewed    | 

## Aras Taşçı
### Responsibilities

I was responsible for various tasks in the backend team that included project setup, dockerization, database setup, implementing quiz related endpoints and filling the database with mockdata. But not only that, I also took part in project development tasks such as creating class diagrams and creating a project plan.

### Code Related and Non-Code Related Significant Issues
| Task                                | Link                                | Duration |
|-------------------------------------|-------------------------------------------|----------|
 | Attended lab, weekly and frontend meetings, contributed to discussions and decision making process. |[#Lab-1](https://github.com/bounswe/bounswe2024group6/wiki/CMPE-451-Lab-1-Meeting), [#Lab-2](https://github.com/bounswe/bounswe2024group6/wiki/Lab-Meeting-2), [#Weekly-3](https://github.com/bounswe/bounswe2024group6/wiki/Weekly-Meeting-3), [#Lab-4](https://github.com/bounswe/bounswe2024group6/wiki/Lab-Meeting-4)  |10 hours|
| Organized the Homepage | [#263](https://github.com/bounswe/bounswe2024group6/issues/263)                 |   15 mins        |
| Created Class Diagrams | [#283](https://github.com/bounswe/bounswe2024group6/issues/283)                |   2 hours        |
| Hosted Lab Meeting 3 | [#287](https://github.com/bounswe/bounswe2024group6/issues/287) | 2 hours |
| Created a project plan until Milestone 1 | [#285](https://github.com/bounswe/bounswe2024group6/issues/285)| 1.5 hours|
| Backend Dockerization, switched the database from MySQL to PostgreSQL| [#325](https://github.com/bounswe/bounswe2024group6/issues/325)                |  4-5 hours        |
| Implement Quiz Creation Endpoint   | [#342](https://github.com/bounswe/bounswe2024group6/issues/342) | 1 hour |
| Implement Quiz Feed Endpoint | [#344](https://github.com/bounswe/bounswe2024group6/issues/344)| 1.5 hours|
| Get Docker to work with Database Migrations | [#346](https://github.com/bounswe/bounswe2024group6/issues/346)| 1 hour | 
| Fix Mock Data Creation | [#380](https://github.com/bounswe/bounswe2024group6/issues/380) | 15 mins | 
| Fix Quiz View Endpoint Data Structure | [#389](https://github.com/bounswe/bounswe2024group6/issues/389) | 15 mins | 
| Create a README file | [#416](https://github.com/bounswe/bounswe2024group6/issues/416) | 10 mins |

### Pull Requests
I've created, merged and reveiwed several PRs, and thanks to our division of labour, I never needed to solve any merge conflicts - in the case of a merge conflict, I would have created a merge branch and solved the merge there as not to disturb the main branch. Below is a table of my PR responsibilities.

| Pull Requests | Link | Action |
| ------------- | ------------- | ------------- |
| Backend Setup | [#301](https://github.com/bounswe/bounswe2024group6/pull/301) | Assigned |
| fix(backend): push docker-compose.yml that was untracked| [#340](https://github.com/bounswe/bounswe2024group6/pull/340) | Assigned |
| [Backend]: Implement Quiz View and Quiz Creation Endpoint | [#345](https://github.com/bounswe/bounswe2024group6/pull/345) | Assigned |
| chore(backend): merge backend setup changes once and for all | [#378](https://github.com/bounswe/bounswe2024group6/pull/378) | Assigned |
| fix(backend): Fix Mock Data Creation | [#381](https://github.com/bounswe/bounswe2024group6/pull/381) | Assigned |
| backend(fix): fix quiz feed endpoint data structure | [#393](https://github.com/bounswe/bounswe2024group6/pull/393) | Assigned |
| chore: archive old project | [#262](https://github.com/bounswe/bounswe2024group6/pull/262) | Reviewed |
| removed bookmark count and changed field category to tags| [#379](https://github.com/bounswe/bounswe2024group6/pull/379) | Reviewed |
| Removed level field from quiz creation endpoint and add tag field | [#395](https://github.com/bounswe/bounswe2024group6/pull/395) | Reviewed |
| changed level to tags | [#398](https://github.com/bounswe/bounswe2024group6/pull/398) | Reviewed |


## Yunus Emre Özdemir
### Responsibilities and Main Contributions:
- Participated in team meetings, contributing to decisions and discussions.
- Researched and chose Activity Streams 2.0 for project standards.
- Contributed to front-end mockups and class diagrams.
- Initialized the frontend application and built key components.
- Migrated from Ant Design to NextUI and redesigned the Navbar.
- Connected frontend pages (Profile, Forum, Post) to backend.
- Dockerized the frontend and fixed deployment issues.
- Reduced frontend load time and implemented performance hotfixes.
- Participated in preparing the first customer presentation.
### Issues
| Task Details | Link | Duration |
| ------------- | ------------- | ------------- |
| Attended lab, weekly and frontend meetings, contributed to discussions and decision making process. |[#Lab-1](https://github.com/bounswe/bounswe2024group6/wiki/CMPE-451-Lab-1-Meeting), [#Lab-2](https://github.com/bounswe/bounswe2024group6/wiki/Lab-Meeting-2), [#Frontend-1](https://github.com/bounswe/bounswe2024group6/wiki/Frontend-Meeting-1), [#Weekly-3](https://github.com/bounswe/bounswe2024group6/wiki/Weekly-Meeting-3), [#Lab-4](https://github.com/bounswe/bounswe2024group6/wiki/Lab-Meeting-4), [#Frontend-2](https://github.com/bounswe/bounswe2024group6/wiki/Frontend-Meeting-2) |10 hours|
| Updated my Personal Effort Journal every week |[Personal Wiki & Effort Page](https://github.com/bounswe/bounswe2024group6/wiki/Personal-Wiki-&-Effort:-Yunus-Emre-Özdemir)|50 minutes|
| Researched W3C Standards and chose Activity Streams 2.0 for our project |[Issue #270](https://github.com/bounswe/bounswe2024group6/issues/270)|3 hours|
| Archived the repository from CMPE352 |[Issue #259](https://github.com/bounswe/bounswe2024group6/issues/259)|15 minutes|
| Participated in the creation of Front-End Mockups |[Issue #282](https://github.com/bounswe/bounswe2024group6/issues/282)|5 hours|
| Participated in the creation of Class Diagrams |[Issue #283](https://github.com/bounswe/bounswe2024group6/issues/283)|5 hours|
| Initialized the Frontend Application |[Issue #294](https://github.com/bounswe/bounswe2024group6/issues/294)|4 hours|
| Created the Navbar Component |[Issue #309](https://github.com/bounswe/bounswe2024group6/issues/309)|1 hour|
| Made the switch to NextUI from Ant Design |[Issue #311](https://github.com/bounswe/bounswe2024group6/issues/311)|30 minutes|
| Redesigned Navbar with NextUI |[Issue #320](https://github.com/bounswe/bounswe2024group6/issues/320)|40 minutes|
| Created the Post Page |[Issue #348](https://github.com/bounswe/bounswe2024group6/issues/348)|1.5 hours|
| Dockerized the Frontend and Connected to the Backend |[Issue #368](https://github.com/bounswe/bounswe2024group6/issues/368)|2 hours|
| Fixed the Dockerfile to solve file permission issues |[Issue #372](https://github.com/bounswe/bounswe2024group6/issues/372)|45 minutes|
| Reduced Frontend Initial Load Time |[Issue #373](https://github.com/bounswe/bounswe2024group6/issues/373)|2 hours|
| Connected the Profile Page with Backend |[Issue #399](https://github.com/bounswe/bounswe2024group6/issues/399)|40 minutes|
| Connected the Forum Page with Backend |[Issue #400](https://github.com/bounswe/bounswe2024group6/issues/400)|20 minutes|
| Connected the Post Page with Backend |[Issue #404](https://github.com/bounswe/bounswe2024group6/issues/404)|1 hour|
| Made a Deployment and Performance Hotfix |[Issue #413](https://github.com/bounswe/bounswe2024group6/issues/413)|1 hour|
| Participated in the front-end side of the preperation and presentation of 1st Customer Presentation |[Issue #299](https://github.com/bounswe/bounswe2024group6/issues/299)|1 hour|

### Pull Requests
I created granular pull requests in one to one correspondence with issues which made tracking the progress of issues very easy. I also reviewed and approved my teammates' PRs thoroughly.
| Pull Requests | Link | Action |
| ------------- | ------------- | ------------- |
| feat(frontend): initialization | [#303](https://github.com/bounswe/bounswe2024group6/pull/303) | Assigned |
| feat(frontend): create navbar | [#310](https://github.com/bounswe/bounswe2024group6/pull/310) | Assigned |
| feat(frontend): switch to nextui | [#312](https://github.com/bounswe/bounswe2024group6/pull/312) | Assigned |
| feat(frontend): redesign navbar with nextui | [#324](https://github.com/bounswe/bounswe2024group6/pull/324) | Assigned |
| feat(frontend): create post page | [#349](https://github.com/bounswe/bounswe2024group6/pull/349) | Assigned |
| chore(backend): merge current progress to main | [#367](https://github.com/bounswe/bounswe2024group6/pull/367) | Assigned |
| feat(frontend): dockerize frontend and connect to backend | [#371](https://github.com/bounswe/bounswe2024group6/pull/371) | Assigned |
| fix(frontend): update dockerfile | [#397](https://github.com/bounswe/bounswe2024group6/pull/397) | Assigned |
| feat(frontend): reduce frontend initial load time | [#402](https://github.com/bounswe/bounswe2024group6/pull/402) | Assigned |
| feat(frontend): connect post page with backend | [#406](https://github.com/bounswe/bounswe2024group6/pull/406) | Assigned |
| feat(frontend): connect forum with backend | [#408](https://github.com/bounswe/bounswe2024group6/pull/408) | Assigned |
| feat(frontend): connect profile page with backend | [#409](https://github.com/bounswe/bounswe2024group6/pull/409) | Assigned |
| fix(frontend): deployment and performance hot fix | [#410](https://github.com/bounswe/bounswe2024group6/pull/410) | Assigned |
| feat(frontend): create post component | [#323](https://github.com/bounswe/bounswe2024group6/pull/323) | Reviewed |
| FRONTEND-319: Finalise Post Component Design | [#339](https://github.com/bounswe/bounswe2024group6/pull/339) | Reviewed |
| feat(frontend): create post creation template | [#361](https://github.com/bounswe/bounswe2024group6/pull/361) | Reviewed |
| feat(frontend): added preview for post creation | [#370](https://github.com/bounswe/bounswe2024group6/pull/370) | Reviewed |
| fix(frontend): fixed profile page design | [#414](https://github.com/bounswe/bounswe2024group6/pull/414) | Reviewed |
| fix(frontend): HOT FIX | [#417](https://github.com/bounswe/bounswe2024group6/pull/417) | Reviewed |

## Oktay Özel 
### Responsibilities: 
 - Backend implementation and plan 
 - Contribution to the software design and planning
 - Attending to the meetings and responding to needs of other teams
### Main Contributions:
 - Project plan 
 - Class Diagram
 - Scenario Mockups
 - Backend design and database structure
 - Creating backend infrastructure 
 - Postman project setup and endpoints
 - Design ideas and weekly meetings
 - Lab reports
 - Requirements
 - 
| Task Details | Issue Link | Wiki Link | Duration |
| ------------- | ------------- | ------------- | ------------- |
|Profile Model, Serializer, View and Update Functionality|[#364 ](https://github.com/bounswe/bounswe2024group6/issues/364)||2h|
|Postman Group Set Up and Translate the Self-Written Endpoints|[#363](https://github.com/bounswe/bounswe2024group6/issues/363)|[link](https://bulingo.postman.co/workspace/bu_lingo-Workspace~5276bc47-5dde-4359-81b6-f78f0f0fe721/collection/39100761-86d636dd-9e5e-40b2-8561-8c7341a9d9b4?action=share&creator=39100761)|2h|
|Login, Signup, Logout Functionalities|[#350](https://github.com/bounswe/bounswe2024group6/issues/350)||2h|
|Implement Post View Endpoint with Mockdata|[#308 ](https://github.com/bounswe/bounswe2024group6/issues/308)||1h|
|1st Customer Presentation: Backend Endpoint Implementation|[#302 ](https://github.com/bounswe/bounswe2024group6/issues/302)||5h|
|Setup Backend Infrastructure|[#284 ](https://github.com/bounswe/bounswe2024group6/issues/284)||2h|
|Class Diagrams|[#283 ](https://github.com/bounswe/bounswe2024group6/issues/283)|[diagram](https://github.com/bounswe/bounswe2024group6/wiki/Class-Diagrams)|1h|
|Take Meeting 2 Notes|[#276 ](https://github.com/bounswe/bounswe2024group6/issues/276)||1h|
|Requirements: Preliminary Functional Requirements|[#269 ](https://github.com/bounswe/bounswe2024group6/issues/269)|[requirements](https://github.com/bounswe/bounswe2024group6/wiki/Requirements-%E2%80%90-451)|1h|
|Lab Report 1: 24 September 2024|[#265 ](https://github.com/bounswe/bounswe2024group6/issues/265)||1h|

### Pull Requests

| Title | Link | Role |
| ----- | ---- | ---- |
| Backend, Database, Infrastructure, Authentication, Login, Register,Signup      | [#301](https://github.com/bounswe/bounswe2024group6/pull/301)      | Creator     |
| Profile, profile view, profile update, serializers| [#369](https://github.com/bounswe/bounswe2024group6/pull/369)      | Creator     |

## Yağız Güldal 
### Responsibilities: 
 - Mobile Application Development
 - Helping with Software Design (Requirements, UML diagrams, Mockups etc.)

### Main Contributions:
 - Linked Data & Lexvo Research
 - Use Case Diagram
 - Creating scenario Mock-ups
 - Creating Pages & Components for the Mobile App
 - Getting the Mobile App & Presentation ready for Customer Milestone 1

### Code Related Significant Issues: 
| Task | Issue | Commits |
| ---- | ----- | ------- |
| Create mobile navigation bar | [Issue #315](https://github.com/bounswe/bounswe2024group6/issues/315)| [7b21965](https://github.com/bounswe/bounswe2024group6/pull/317/commits/7b219656d939901e4ca45ece0167b2b453f00b2b), [9187e14](https://github.com/bounswe/bounswe2024group6/pull/317/commits/9187e14786eefc875b84c2e99d36afb4633903dd) |
| Create mobile home page | [Issue #316](https://github.com/bounswe/bounswe2024group6/issues/316) | [9bfde59](https://github.com/bounswe/bounswe2024group6/pull/318/commits/9bfde59921e8d6360100497b6480a457f25105b6) |
| Create mobile login page | [Issue #327](https://github.com/bounswe/bounswe2024group6/issues/327) | [9e2bb39](https://github.com/bounswe/bounswe2024group6/pull/330/commits/9e2bb393fcefb24e1dbc6688bd206502bc807951), [708f1ed](https://github.com/bounswe/bounswe2024group6/pull/330/commits/708f1ed6e3983696e8d19efe7bcea34df7b6c25a) | 
| Create mobile quiz results page | [Issue #332](https://github.com/bounswe/bounswe2024group6/issues/332) | [0d5ba5d](https://github.com/bounswe/bounswe2024group6/pull/343/commits/0d5ba5d05039f370a21bfed97c5bc2d3e908ffb0) | 
 | Finish Quiz Solving Pages and create a mock quiz (Mobile) | [Issue #412](https://github.com/bounswe/bounswe2024group6/issues/412) | [56feff8](https://github.com/bounswe/bounswe2024group6/pull/418/commits/56feff847c0d1553928da3b19b5f624f576f17f3), [4166199](https://github.com/bounswe/bounswe2024group6/pull/418/commits/4166199115ab89d70f8e5542e15e4433db2573e6) |
| Refactor and connect components for Pre-release (Mobile) | [Issue #421](https://github.com/bounswe/bounswe2024group6/issues/421) | [dc710a4](https://github.com/bounswe/bounswe2024group6/pull/422/commits/dc710a47a6f91aeca658bd0257a4609cd1a4bb94) |
| Remove broken components/functions from the mobile app for Pre-release | [Issue #424](https://github.com/bounswe/bounswe2024group6/issues/424), [Issue #426](https://github.com/bounswe/bounswe2024group6/issues/424) | [c996287](https://github.com/bounswe/bounswe2024group6/pull/427/commits/c996287f2c7e1a80867417b40c61ffeb1de4b3f0), [17f11e2](https://github.com/bounswe/bounswe2024group6/pull/427/commits/17f11e2eb70da727a421b31092ca87c07fd46a10) |
 - Reviewed Quiz Creation Pages for Mobile - [PR #365](https://github.com/bounswe/bounswe2024group6/pull/365)
 - Reviewed Quiz Question Page for Mobile - [PR #356](https://github.com/bounswe/bounswe2024group6/pull/356)
 - Reviewed Updated Version of Quiz Creation Pages for mobile - [PR #407](https://github.com/bounswe/bounswe2024group6/pull/407), [PR #420](https://github.com/bounswe/bounswe2024group6/pull/420)

### Non-code Related Significant Issues
 - Creating the scenario mock-ups - [Issue #288](https://github.com/bounswe/bounswe2024group6/issues/288)
    - Created 5 scenario mock-ups with Ahmet Oğuz Engin in our project wiki, based on beginner, intermediate and advanced level language learners.
 - Creating Mobile UI Mock-ups - [Issue #290](https://github.com/bounswe/bounswe2024group6/issues/290)
    - Created the mobile UI Mock-ups with Ahmet Oğuz Engin, making sure the inquire with the front-end team frequently to be on the same page and to have similar designs.
 - Creating & Updating the Use Case Diagram - [Issue #279](https://github.com/bounswe/bounswe2024group6/issues/279)
    - Created the use-case diagram found in the wiki and kept it updated as the team explored different ideas. The use-case diagram was also updated after the discussions had with the assistants during the lab.
 - Brief research about linked data and Lexvo - [Issue #267](https://github.com/bounswe/bounswe2024group6/issues/267)
    -  Since some team members had never worked with Linked Data before, I completed a brief research about it and turned it into a wiki article. I also made sure to include some information about word-net and Lexvo, two data sources that may be of use for our project.
 - Prepare Mobile App for the Pre-release - [Issue #429](https://github.com/bounswe/bounswe2024group6/issues/429), [Issue #300](https://github.com/bounswe/bounswe2024group6/issues/300)
    - This issue included fixing the naming and folder structure of the project, removing redundant files (since we had decided to use the past year's project as a baseline instead of starting from scratch) and creating/testing the apk files.

### Pull Requests

| Title | Link | Role |
| ----- | ---- | ---- |
| Mobile Merge to Main                                   | [#428](https://github.com/bounswe/bounswe2024group6/pull/428)      | Creator     |
| fix(mobile): Disable register Buttons                  | [#427](https://github.com/bounswe/bounswe2024group6/pull/427)      | Creator     |
| fix(mobile): Remove fetch function from Login and Register | [#425](https://github.com/bounswe/bounswe2024group6/pull/425)      | Creator     |
| chore(mobile): Preparing the mobile project for Prerelease | [#423](https://github.com/bounswe/bounswe2024group6/pull/423)      | Creator     |
| fix(mobile): Final Fixes before prerelease             | [#422](https://github.com/bounswe/bounswe2024group6/pull/422)      | Creator     |
| feat(mobile): Interactive Quiz Page using Mock Data     | [#418](https://github.com/bounswe/bounswe2024group6/pull/418)      | Creator     |
| feat(mobile): Mobile connection to Backend - Login and Register | [#405](https://github.com/bounswe/bounswe2024group6/pull/405)      | Creator     |
| feat(mobile): add extensible navbar buttons            | [#359](https://github.com/bounswe/bounswe2024group6/pull/359)      | Creator     |
| feat(mobile): Add Press Indicators to Navbar Buttons   | [#352](https://github.com/bounswe/bounswe2024group6/pull/352)      | Creator     |
| feat(mobile): Create Quiz Results Page                 | [#343](https://github.com/bounswe/bounswe2024group6/pull/343)      | Creator     |
| feat(mobile): Creating a Login Page                    | [#330](https://github.com/bounswe/bounswe2024group6/pull/330)      | Creator     |
| feat(mobile): Create Home Page                         | [#318](https://github.com/bounswe/bounswe2024group6/pull/318)      | Creator     |
| feat(mobile): Create Navigation Bar                    | [#317](https://github.com/bounswe/bounswe2024group6/pull/317)      | Creator     |
| chore(mobile): Upgrade Expo SDK Version                | [#314](https://github.com/bounswe/bounswe2024group6/pull/314)      | Creator     |
| Add mobile build instructions                                                                                   | [#430](https://github.com/bounswe/bounswe2024group6/pull/430)      | Reviewer, Merger |
| feat(mobile): Quiz Creation Flow - Navigation Across Quiz Creation Flow Pages - Temporary Quiz Data Storage      | [#420](https://github.com/bounswe/bounswe2024group6/pull/420)      | Reviewer, Merger |
| feat+refactor(mobile): New Version of Quiz Creations                                                            | [#407](https://github.com/bounswe/bounswe2024group6/pull/407)      | Reviewer, Merger |
| feat+refactor(mobile): Quiz Creation Flow - QuizCreationSettings and QuizCreationInfo Pages                      | [#403](https://github.com/bounswe/bounswe2024group6/pull/403)      | Reviewer, Merger |
| feat(mobile): quiz creation page                                                                                 | [#365](https://github.com/bounswe/bounswe2024group6/pull/365)      | Reviewer, Merger |
| feat(mobile): add new icons and like-unlike functionality                                                        | [#362](https://github.com/bounswe/bounswe2024group6/pull/362)      | Reviewer, Merger |
| feat(mobile): quiz question page                                                                                 | [#356](https://github.com/bounswe/bounswe2024group6/pull/356)      | Reviewer, Merger |
| feat(mobile): Create a SignUp Page                                                                               | [#347](https://github.com/bounswe/bounswe2024group6/pull/347)      | Reviewer, Merger |
| BACKEND-325: Dockerization and Post Feed Endpoint w/ Mockdata                                                    | [#328](https://github.com/bounswe/bounswe2024group6/pull/328)      | Reviewer |


## Ahmet Oğuz Engin
### Responsibilities: 
 - Mobile application development
 - Contribution to the software design and planning
### Main Contributions:
 - Requirements
 - Sequence Diagrams
 - Scenario Mockups
 - Mobile Mockups
 - Creating pages and components for mobile application
 - Planning the presentation for mobile
 - Lab Reports + Meeting Notes
 
 ### Code Related Significant Issues: 
 | Task | Issue | Commits | Related PR | 
 | ---- | ----- | ------- | -------  |
 | Creating and testing the quiz feed page. | [#326](https://github.com/bounswe/bounswe2024group6/issues/326) | [b167656](https://github.com/bounswe/bounswe2024group6/pull/329/commits/b167656cb141fdb643a9c288fa3eb680546ae857) [69b1ff9](https://github.com/bounswe/bounswe2024group6/pull/329/commits/69b1ff9126e98b140ead4942b7ed6d517262468e) [4780ccd](https://github.com/bounswe/bounswe2024group6/pull/329/commits/4780ccd343b4168c175c494dc33d0fadb2b84b64) | [#329](https://github.com/bounswe/bounswe2024group6/pull/329) |
 | Creating and testing the registration page with client side checks. | [#331](https://github.com/bounswe/bounswe2024group6/issues/331) | [862861e](https://github.com/bounswe/bounswe2024group6/pull/347/commits/862861e91e381d1de7dabb2ea34927851629bd57) [0c92fc6](https://github.com/bounswe/bounswe2024group6/pull/347/commits/0c92fc607191a8c1680ffac1d2ed9b4f1bb56e22) [c51b85b](https://github.com/bounswe/bounswe2024group6/pull/347/commits/c51b85bc48808b762af04fbf56836ab6894c70c2) | [#347](https://github.com/bounswe/bounswe2024group6/pull/347) | 
 | Implementation of like-unlike on quiz feed page (Mobile). | [#360](https://github.com/bounswe/bounswe2024group6/issues/360) | [3f64085](https://github.com/bounswe/bounswe2024group6/pull/362/commits/3f640857a74ac6d5d1798e72aaf88f396a0d1949) [b1b1c3b](https://github.com/bounswe/bounswe2024group6/pull/362/commits/b1b1c3b629b0beb021961d6c73b80fa5ead4c489) | [#362](https://github.com/bounswe/bounswe2024group6/pull/362) |
 | Quiz creation flow with temporary quiz question storage and navigation across quiz creation flow pages. | [#377](https://github.com/bounswe/bounswe2024group6/issues/377) | [2a72f13](https://github.com/bounswe/bounswe2024group6/pull/420/commits/2a72f1369e4d6c40e43ebfb8dca1e5ca426c7b85) [8b388aa](https://github.com/bounswe/bounswe2024group6/pull/420/commits/8b388aabe56e10106dcb331df35555d2ab132ef6) [47e7536](https://github.com/bounswe/bounswe2024group6/pull/420/commits/47e7536949063a012efc1f81f7295cef7a2538c1)  | [#420](https://github.com/bounswe/bounswe2024group6/pull/420) |  |
  | Fixing the design and logic related issues with quiz creation. | [#375](https://github.com/bounswe/bounswe2024group6/issues/375) | [c144a8c](https://github.com/bounswe/bounswe2024group6/pull/403/commits/c144a8c94c392e8338483c4e9e490a042cbe37fd) [d753f32](https://github.com/bounswe/bounswe2024group6/pull/403/commits/d753f3277587de316418dd43c5da4d552cdc06e0) [50cef5e](https://github.com/bounswe/bounswe2024group6/pull/403/commits/50cef5e759ace6de2dae90f72786a7294385e036) [ab6d188](https://github.com/bounswe/bounswe2024group6/pull/403/commits/ab6d188e6b385e7d03c573c0051859909393ab7c) [f92a2c5](https://github.com/bounswe/bounswe2024group6/pull/403/commits/f92a2c5141af34517d07bd1301f8bcdeb60fad98) | [#403](https://github.com/bounswe/bounswe2024group6/pull/403) |
   | Refactoring the quiz creation page in accordance with mockups and made some changes to improve UI and functionality. | [#386](https://github.com/bounswe/bounswe2024group6/issues/386) | [e7c0fa4](https://github.com/bounswe/bounswe2024group6/pull/407/commits/e7c0fa4d39ad14305e591f5889a13374723accbf) [bbc9832](https://github.com/bounswe/bounswe2024group6/pull/407/commits/bbc9832ae179a34fe9181fc0dbae94611b81958b) [c3db59c](https://github.com/bounswe/bounswe2024group6/pull/407/commits/c3db59c9a0aea88f00d55a21003e1a6f7044e26e) [3a7faf6](https://github.com/bounswe/bounswe2024group6/pull/407/commits/3a7faf69b6626e61eaa34d5235ed226cdbc92605)  | [#407](https://github.com/bounswe/bounswe2024group6/pull/407) |
  
 
 ### Non-code Related Significant Issues
 - Creating the scenario mock-ups - [#288](https://github.com/bounswe/bounswe2024group6/issues/288)
    - Created 5 scenario mock-ups with Yağız Güldal in our project wiki for people from different backgrounds and with varying levels of English.
 - Creating Mobile UI Mock-ups - [#290](https://github.com/bounswe/bounswe2024group6/issues/290)
    - Created the mobile UI Mock-ups with Yağız Güldal, while constantly making sure that we have consistent designs with the front-end.
 - Creating & Updating the Squence Diagrams - [#281](https://github.com/bounswe/bounswe2024group6/issues/281)
    - I created the sequence diagrams found in the wiki and kept them updated as requirements changed and teammates requested modifications. 
 - Creating & Updating the Requirements - [#268](https://github.com/bounswe/bounswe2024group6/issues/268) [#269](https://github.com/bounswe/bounswe2024group6/issues/269)  [#289](https://github.com/bounswe/bounswe2024group6/issues/289)
    - I created the glossary section for requirments and contributed to the creation and updates of the functional requirements part.
 - Creating build instructions for mobile [#429](https://github.com/bounswe/bounswe2024group6/issues/429)
     - I created mobile APK build instructions with major contributions from Yağız Güldal to ensure that everyone can build and use the mobile app without facing technical difficulties. 
 - Creating the pre-release. [#431](https://github.com/bounswe/bounswe2024group6/issues/431)
    - I've created the pre-release including the mobile apk and source codes and brief description of requirements that are covered.
    


 ### Pull Requests

| Title | Link | Role |
| ----- | ---- | ---- |
| feat(mobile): Create a Quiz Feed Page | [#329](https://github.com/bounswe/bounswe2024group6/pull/329) | Creator |
| feat(mobile): Create a SignUp Page | [#347](https://github.com/bounswe/bounswe2024group6/pull/347) | Creator |
| feat(mobile): add new icons and like-unlike functionality | [#362](https://github.com/bounswe/bounswe2024group6/pull/362) | Creator |
| feat+refactor(mobile): Quiz Creation Flow - QuizCreationSettings and QuizCreationInfo Pages | [#403](https://github.com/bounswe/bounswe2024group6/pull/403) | Creator |
| feat+refactor(mobile): New Version of Quiz Creations | [#407](https://github.com/bounswe/bounswe2024group6/pull/407) | Creator |
| feat(mobile): Quiz Creation Flow - Navigation Across Quiz Creation Flow Pages - Temporary Quiz Data Storage | [#420](https://github.com/bounswe/bounswe2024group6/pull/420) | Creator |
| Add mobile build instructions | [#430](https://github.com/bounswe/bounswe2024group6/pull/430) | Creator |
| [Backend]: Implement Quiz View and Quiz Creation Endpoint | [#345](https://github.com/bounswe/bounswe2024group6/pull/345) | Reviewer |
| feat(mobile): Add Press Indicators to Navbar Buttons | [#352](https://github.com/bounswe/bounswe2024group6/pull/352) | Reviewer, Merger |
| feat(mobile): add extensible navbar buttons | [#359](https://github.com/bounswe/bounswe2024group6/pull/359) | Reviewer, Merger |
| feat(frontend): dockerize frontend and connect to backend | [#371](https://github.com/bounswe/bounswe2024group6/pull/371) | Reviewer, Merger |
| feat(mobile): Mobile connection to Backend - Login and Register | [#405](https://github.com/bounswe/bounswe2024group6/pull/405) | Reviewer, Merger |
| feat(mobile): Interactive Quiz Page using Mock Data | [#418](https://github.com/bounswe/bounswe2024group6/pull/418) | Reviewer, Merger |
| fix(mobile): Final Fixes before prerelease | [#422](https://github.com/bounswe/bounswe2024group6/pull/422) | Reviewer, Merger |
| chore(mobile): Preparing the mobile project for Prerelease | [#423](https://github.com/bounswe/bounswe2024group6/pull/423) | Reviewer, Merger |
| fix(mobile): Remove fetch function from Login and Register | [#425](https://github.com/bounswe/bounswe2024group6/pull/425) | Reviewer, Merger |
| fix(mobile): Disable register Buttons | [#427](https://github.com/bounswe/bounswe2024group6/pull/427) | Reviewer, Merger |
| Mobile Merge to Main | [#428](https://github.com/bounswe/bounswe2024group6/pull/428) | Reviewer, Merger |

### Additional
I also took meeting notes, prepared lab reports, and assigned tasks to my teammates.
[#274](https://github.com/bounswe/bounswe2024group6/issues/274) [#280](https://github.com/bounswe/bounswe2024group6/issues/280) [#374](https://github.com/bounswe/bounswe2024group6/issues/374) 







 
 
 
 
 ## Anıl Köse
### Responsibilities: 
 - Mobile application project initialization
 - Mobile application feature development
 - Contribution to the software design and planning
### Main Contributions:
 - Elicitation Questions
 - Scenario Mockups
 - Creation of some pages and components for mobile application
 - Planning the presentation for the mobile app
 - Requirements
 
 ### Code Related Significant Issues: 
 | Task | Issue | Commits |
 | ---- | ----- | ------- |
 | Set up the Mobile Application Project for BuLingo. | [#335](https://github.com/bounswe/bounswe2024group6/issues/335) |  |
 | Created Quiz Question Page for the Mobile App | [#333](https://github.com/bounswe/bounswe2024group6/issues/333) | [cbf932b](https://github.com/bounswe/bounswe2024group6/pull/356/commits/cbf932bf9d726d94879e16fe90a8cfc930a05ac7) |
 | Implemented Quiz Creation Page for the Mobile App | [#305](https://github.com/bounswe/bounswe2024group6/issues/305) | [8de7f40](https://github.com/bounswe/bounswe2024group6/pull/365/commits/8de7f4052fbd389cf2a28fb8ea0b4394ea5e16ca) [f4e6516](https://github.com/bounswe/bounswe2024group6/pull/365/commits/f4e651668c90857b2a3ee3cb93e45fadab080002) |
 | Integrate quiz view API endpoint. | [#304](https://github.com/bounswe/bounswe2024group6/issues/304) |  |
  | Made Improvements For The Project. | [#292](https://github.com/bounswe/bounswe2024group6/issues/292) |  |
   | Created Elicitation Questions based on the requirements. | [#272](https://github.com/bounswe/bounswe2024group6/issues/272) |  |
   
   
## Kaan Yolcu

### Responsibilities

I was responsible for several tasks within the backend team, including setting up the project, dockerization, database configuration, and implementing as well as fixing post-related endpoints. In addition to my backend responsibilities, I also contributed to overall project development. I drafted the entire project plan, covering Milestones 1 through 3, and created numerous sequence diagrams. I researched technologies like Lexvo and WordNet to support the implementation of semantic search by Milestone 2 and contributed significantly to defining project requirements.

### Main Contributions:
- Drawed Sequence Diagrams
- Implemented endpoints
- Did Database and Docker Configuration for Reinitialization of backend
- Written Project Plan until Milestone 3
- Researched about Lexvo and Wordnet

### Issues 
| Task                                | Link                                | Duration |
|-------------------------------------|-------------------------------------------|----------|
 | Attended lab, weekly and frontend meetings, contributed to discussions and decision making process. |[#Lab-1](https://github.com/bounswe/bounswe2024group6/wiki/CMPE-451-Lab-1-Meeting), [#Lab-2](https://github.com/bounswe/bounswe2024group6/wiki/Lab-Meeting-2), [#Weekly-3](https://github.com/bounswe/bounswe2024group6/wiki/Weekly-Meeting-3), [#Lab-4](https://github.com/bounswe/bounswe2024group6/wiki/Lab-Meeting-4)  |10 hours|
| Contributed on non-functional requirements | [Issue 271](https://github.com/bounswe/bounswe2024group6/issues/271)                 |   15 mins        |
| Drawed Sequence Diagrams on Posts and Quizzes | [Issue 281](https://github.com/bounswe/bounswe2024group6/issues/281)                |   120 mins        |
| Made a research about Lexvo and Wordnet | [Issue 277](https://github.com/bounswe/bounswe2024group6/issues/277)                        |   120 mins         |
| Created a project plan until milestone 1| [Issue 285](https://github.com/bounswe/bounswe2024group6/issues/285)|60 mins|
| Created the Project Plan until Milestone 3 using click-up| [Issue 285](https://github.com/bounswe/bounswe2024group6/issues/285)                |   120 mins        |
| Switched from mysql to Postgres because of unending mysql errors and dockerized the backend| [Issue 325](https://github.com/bounswe/bounswe2024group6/issues/325)                |  240 mins        |
| Created mockdata and written the endpoint for backend post feed page | [Commit Link](https://github.com/bounswe/bounswe2024group6/pull/328/commits/b710422e23a8d336b1d149abecbd7d085a467ee6) - [Issue 308](https://github.com/bounswe/bounswe2024group6/issues/308)           |  60 mins        |
|  Mock Data Changes for Post Endpoint | [Issue 336](https://github.com/bounswe/bounswe2024group6/issues/336)| 20 minutes|
| Fixed Quiz View Endpoint | [Issue 389](https://github.com/bounswe/bounswe2024group6/issues/389)| 35 minutes | 
| Change Quiz level field to a list of "tags"| [Issue 384](https://github.com/bounswe/bounswe2024group6/issues/384)| 35 minutes | 

### Code Related Significant Issues: 
| Task | Issue | Commits |
| ---- | ----- | ------- |
|  Mock Data Changes for Post Endpoint | [Issue 336](https://github.com/bounswe/bounswe2024group6/issues/336)| 20 minutes|
| Fixed Quiz View Endpoint | [Issue 389](https://github.com/bounswe/bounswe2024group6/issues/389)| 35 minutes | 
| Change Quiz level field to a list of "tags"| [Issue 384](https://github.com/bounswe/bounswe2024group6/issues/384)| 35 minutes | 
| Created mockdata and written the endpoint for backend post feed page | [Issue 308](https://github.com/bounswe/bounswe2024group6/issues/308)   | 60 mins |



 ### Non-code Related Significant Issues
  - Creating the project plan - [#285](https://github.com/bounswe/bounswe2024group6/issues/285)
  - Drawed Sequence Diagramös - [#281](https://github.com/bounswe/bounswe2024group6/issues/281)
 - Contributed on non-functional requirements - [#271](https://github.com/bounswe/bounswe2024group6/issues/271)
 - Made a research about Lexvo and Wordnet - [Issue 277](https://github.com/bounswe/bounswe2024group6/issues/277)
 - Switched from mysql to Postgres because of unending mysql errors and dockerized the backend - [Issue 325](https://github.com/bounswe/bounswe2024group6/issues/325) 
 ### Pull Requests
 
| Title | Link | Role |
| ----- | ---- | ---- |
| changed level to tags | [#398](https://github.com/bounswe/bounswe2024group6/pull/398) | Creator, Merger |
| Removed level field from quiz creation endpoint and add tag field| [#395](https://github.com/bounswe/bounswe2024group6/pull/395) | Creator, Merger |
| backend(fix): fix quiz feed endpoint data structure| [#393](https://github.com/bounswe/bounswe2024group6/pull/393) |Rewiever |
| removed bookmark count and changed field category to tags |  [#379](https://github.com/bounswe/bounswe2024group6/pull/379) | Creator, Merger |
| chore(backend): merge backend setup changes once and for all | [#378](https://github.com/bounswe/bounswe2024group6/pull/378) | Reviewer |
| Backend 364 profile, profile view, profile update| [#364](https://github.com/bounswe/bounswe2024group6/pull/364) | Rewiever, Merger|
| BACKEND-325: Dockerization and Post Feed Endpoint w/ Mockdata | [#325](https://github.com/bounswe/bounswe2024group6/pull/364)| Creator| 
| Backend setup PR | [#325](https://github.com/bounswe/bounswe2024group6/pull/301)| Rewiever, Merger | 

   
## Halil Özkan

### Responsibilities

- Responsible for designing and implementing various components, including profile mock-up endpoints.
- Accountable for drawing Use Case Diagrams with Yağız and contributing to meetings and discussions.
- Consulted on requirements and creating the Responsibility Assignment Matrix (RAM).
- Informed about all meetings and issues related to backend and requirements.


### Main Contributions:
- Drawed Use Case Diagrams with Yağız
- Implemented profile mock-up endpoint
- Joined meetings and contributed
- Written RAM
- Worked on Requirements

### Issues 
| Task                                | Link                                | Duration |
|-------------------------------------|-------------------------------------------|----------|
| Attended lab, weekly and backend meetings, contributed to discussions and decision making process. |[#Lab-1](https://github.com/bounswe/bounswe2024group6/wiki/CMPE-451-Lab-1-Meeting), [#Lab-2](https://github.com/bounswe/bounswe2024group6/wiki/Lab-Meeting-2), [#Weekly-3](https://github.com/bounswe/bounswe2024group6/wiki/Weekly-Meeting-3), [#Lab-4](https://github.com/bounswe/bounswe2024group6/wiki/Lab-Meeting-4)  |10 hours|
| Contributed on non-functional requirements |[Issue 260](https://github.com/bounswe/bounswe2024group6/issues/260), [Issue 263](https://github.com/bounswe/bounswe2024group6/issues/263), [Issue 292](https://github.com/bounswe/bounswe2024group6/issues/292), [Issue 302](https://github.com/bounswe/bounswe2024group6/issues/302) |15 mins|
| Drawed Use Case Diagrams on Posts and Quizzes | [Issue 279](https://github.com/bounswe/bounswe2024group6/issues/279), [Issue 286](https://github.com/bounswe/bounswe2024group6/issues/286),|   120 mins        |
| Created RAM | [Issue 295](https://github.com/bounswe/bounswe2024group6/issues/295)                        |   120 mins         |
| Profile mockup data endpoint| [Issue 341](https://github.com/bounswe/bounswe2024group6/issues/341)|60 mins|


### Code Related Significant Issues: 
| Task | Issue | Commits |
| ---- | ----- | ------- |
|  Profile mockup data endpoint | [Issue 341](https://github.com/bounswe/bounswe2024group6/issues/341)| 20 minutes|




 ### Non-code Related Significant Issues
  - Creating RAM- [#285](https://github.com/bounswe/bounswe2024group6/issues/285)
  - Drawed Use Case Diagrams - [#281](https://github.com/bounswe/bounswe2024group6/issues/281)

 ### Pull Requests
 
| Title | Link | Role |
| ----- | ---- | ---- |
| added mock up profile | [#354](https://github.com/bounswe/bounswe2024group6/pull/354) | Creator, Merger |
| backend setup PR| [#301](https://github.com/bounswe/bounswe2024group6/pull/301) | Contributor |

## Elif Nur Deniz
### Responsibilities
 - Frontend application development
 - Contribution to the software design and planning (requirements, diagrams, mockups etc.)
### Main contributions
 -  Participated in requirements planning and frontend mockups.
 -  Checked all requirements, diagrams, mockups to see if they align with each other and the project details.
 -  Decided on the main user interface design of frontend.
 -  Help coding post component and the forum page.
 -  Implemented profile page.
 -  Did adjustments on the general page design and continously discussed the details with frontend team.
### Code-related significant issues
- Initial design of Post and Forum - [meeting](https://github.com/bounswe/bounswe2024group6/wiki/Frontend-Meeting-2)
- Initial Comment and Post details design - [issue](https://github.com/bounswe/bounswe2024group6/issues/321) (discarded later)
- Profile Page Design and initial functionalities - [issue](https://github.com/bounswe/bounswe2024group6/issues/355)
- Design fixes - [1](https://github.com/bounswe/bounswe2024group6/issues/385), [2](https://github.com/bounswe/bounswe2024group6/issues/387), [3](https://github.com/bounswe/bounswe2024group6/issues/411)
### Non-code-related significant issues
- Helping with requirements - [issue](https://github.com/bounswe/bounswe2024group6/issues/269)
- Creating frontend mockups - [issue](https://github.com/bounswe/bounswe2024group6/issues/282)
- 1st milestone frontend presentation - [issue](https://github.com/bounswe/bounswe2024group6/issues/299)
- Creating Readme file - [issue](https://github.com/bounswe/bounswe2024group6/issues/416)
- Reviewing and adjusting project deliverables - [issue 1](https://github.com/bounswe/bounswe2024group6/issues/297), [issue 2](https://github.com/bounswe/bounswe2024group6/issues/432)
### Pull requests
| Title | Link | Role |
| ----- | ---- | ---- |
| Initial post component and forum design | [#323](https://github.com/bounswe/bounswe2024group6/pull/323) | Assigned |
| Initial comment and post details design (discarded later) |[#337](https://github.com/bounswe/bounswe2024group6/pull/337) | Assigned |
| Mock data for profile page | [#354](https://github.com/bounswe/bounswe2024group6/pull/354) | Reviewer |
| Profile Page Design and initial functionalities | [#383](https://github.com/bounswe/bounswe2024group6/pull/383)| Assigned |
| Adjusted navbar design | [#390](https://github.com/bounswe/bounswe2024group6/pull/390) | Assigned |
| adjusted avatar in the navbar | [#392](https://github.com/bounswe/bounswe2024group6/pull/392)| Assigned |
| fixed profile page design | [#414](https://github.com/bounswe/bounswe2024group6/pull/414)| Assigned |
| Dockerization and Post Feed Endpoint | [#328](https://github.com/bounswe/bounswe2024group6/pull/328)|Reviewer |
| feat(frontend): initialization|[#303](https://github.com/bounswe/bounswe2024group6/pull/303) |Reviewer |
| feat(frontend): create navbar|[#310](https://github.com/bounswe/bounswe2024group6/pull/310) | Reviewer|
| feat(frontend): switch to nextui|[#312](https://github.com/bounswe/bounswe2024group6/pull/312) | Reviewer|
| feat(frontend): redesign navbar with nextui| [#324](https://github.com/bounswe/bounswe2024group6/pull/324)| Reviewer|
| chore(backend): merge current progress to main| [#367](https://github.com/bounswe/bounswe2024group6/pull/367)|Reviewer |
| feat(frontend): added filtering view above forum posts| [#391](https://github.com/bounswe/bounswe2024group6/pull/391)|Reviewer |
| fix(frontend): fixed filter view| [#396](https://github.com/bounswe/bounswe2024group6/pull/396)|Reviewer |
| fix(frontend): update dockerfile| [#397](https://github.com/bounswe/bounswe2024group6/pull/397)|Reviewer |
| feat(frontend): reduce frontend initial load time|[#402](https://github.com/bounswe/bounswe2024group6/pull/402) | Reviewer|
| feat(frontend): connect post page with backend|[#406](https://github.com/bounswe/bounswe2024group6/pull/406) |Reviewer |
| feat(frontend): connect forum with backend| [#408](https://github.com/bounswe/bounswe2024group6/pull/408)| Reviewer|
| feat(frontend): connect profile page with backend| [#409](https://github.com/bounswe/bounswe2024group6/pull/409)| Reviewer|
| fix(frontend): deployment and performance hot fix| [#410](https://github.com/bounswe/bounswe2024group6/pull/410)| Reviewer|


### Additional information
 - Keeping wiki pages in order and making necessary updates as we change an aspect of the project.
 - Being attendive in meetings and decision-making process.
 - Took meeting notes time to time and documented on wiki.
 - Wrote my weekly contributions.

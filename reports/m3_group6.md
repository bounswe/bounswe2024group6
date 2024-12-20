# CMPE451 Group 6 Final Milestone Report

## Executive Summary

### Summary of Project Status
Project has been successfully completed. A user can have the full experience of creating quizzes, taking quizzes, reading and writing comments on forums and discussions. Furthermore, s/he can search any sort of content (posts, comments, quizzes, profiles) through search screen. Also, s/he has a profile page, s/he can browse through other users' profiles, and s/he is notified of a variety of updates when his/her quizzes, posts are deleted or get liked etc. We have additional features such as press&hold on the words to see their meanings. As for more advanced features, a user can add images to a quiz while creating a quiz, also the options for MCQs are recommended by our backend algorithms.

### Status of Deliverables
We have our codebase and all documentation ready in the main branch and our website and mobile application as well as backend server is up and running.

### Final Release Notes

**Project:** Bulingo  
**Version:** 1.0 (Final Release)  
**Date:** December 20, 2024

**Overview:**  
Bulingo is a language-learning platform designed to help users improve their English skills through interactive quizzes, community-driven forums, and personalized user experiences. It integrates a web interface (Next.js), a mobile application (React Native/Expo), and a backend (Django) along with external APIs (Lexvo, Wordnet, Pexels) to enhance quiz content.

**Key Features & Enhancements:**
- **User Accounts & Profiles:**  
  - Users can sign up, log in, and view/update their profiles.  
  - Profiles show created quizzes, solved quizzes with results, bookmarked items, and forum activity.  
  - Users can follow/unfollow others and update profile pictures.
  
- **Quizzes:**  
  - Guests can view quiz feeds, quiz details, and search quizzes.  
  - Registered users can create quizzes with tags (including difficulty tags), and integrate image suggestions and multiple-choice options through external APIs.  
  - Users can solve quizzes, see results, review incorrect answers, and use the built-in dictionary for additional language support.
  
- **Forum & Community Interaction:**  
  - Guests can view forum posts and comments.  
  - Registered users can create posts, add tags, comment, bookmark, like/unlike, and customize their feeds.  
  - Admins can delete posts/comments, adjust tags, ban users, and generally perform all actions regular users can.
  
- **Notifications & UI:**  
  - Users receive notifications for follows, likes, quiz completions, and admin actions.  
  - Dark mode is available for a more comfortable viewing experience.  
  - Users can access the system from smartphones, tablets, and web browsers.

**Known Limitations:**
- Email verification and password reset features were not completed.  
- Changing a user’s own password is not implemented.  
- Deleting one’s own comments in the forum is not available.  
- Some recommended quiz answers/images may still be off-target.  
- Long quiz answers appear scrollable, which is functional but not aesthetically ideal.

**Non-Functional Notes:**
- Basic security measures (password hashing, limited exposure of sensitive data) are in place.  
- Performance and large-scale load testing results are not explicitly documented.  
- The system is available in English, and some Turkish support exists, but full bilingual verification is unclear.


### Changes From Previous Milestone
During Milestone 2, our team received feedback regarding the integration of images into our quiz system. This integration proved challenging as it required additional fields and changes to the response format, which significantly impacted both our Mobile and Frontend teams.
We had initially planned to implement a dueling feature that would allow two users to compete head-to-head in quiz competitions, which we believed would enhance user engagement and entertainment value. However, due to time constraints, we were unable to implement this feature.
We also restructured our tag system to allow users more flexibility in adding and removing tags. This modification presented integration challenges for the frontend team, as our initial design was based on a fixed set of tags.
Performance issues have emerged due to the incorporation of external APIs and image handling. We are currently exploring solutions such as caching and pagination to improve application response times.
A key addition was the implementation of an Admin role, a privileged user type that we had envisioned from the project's inception. Despite some integration challenges for the backend team, we successfully implemented administrative capabilities including quiz deletion and user banning functionality.

### Reflections Related To The Final Milestone

- **Functionality vs. Network Issues:**  
  During the final demo, the system mostly worked as intended. However, slow internet connections affected image uploading, showing that some features depend on stable network conditions.

- **UI/UX Improvements for Long Text:**  
  Feedback indicated that long quiz answer texts were hard to read when scrollable. A better approach might be larger answer areas or more responsive layouts.

- **Refining Quiz Recommendations:**  
  While quiz recommendations work, they can sometimes suggest multiple correct answers or unrelated words/images. Users can change recommended content, but more refinement is needed.

- **Need for More Thorough Testing:**  
  More extensive user testing could catch small bugs, such as deleted quizzes/posts still appearing in notifications.

- **Importance of Communication & Consistency:**  
  Differences in team interpretations led to inconsistencies, causing some re-implementation. Clearer, earlier communication would have saved time and effort.

- **Overall Success:**  
  Despite missing certain features (email verification, password reset, own comment deletion), the project met most requirements and added extras like a dictionary, dark mode, and notifications.


### What Could Have Been Done Differently

1. **Clearer Early Requirements:**  
   More thorough planning of email verification, password resets, and other account management details could have prevented incomplete features.

2. **Early UI/UX Prototyping:**
   Showing prototypes to stakeholders or test users earlier would have revealed UI issues, like scrollable long text answers, enabling smoother fixes.

3. **Continuous Integration & Testing:**
   Implementing CI/CD pipelines and automated tests at the start would have caught bugs earlier, maintaining code quality and saving time.

4. **Stronger Communication Among Teams:**
   Ensuring all team members shared a common understanding of feature implementations would have minimized inconsistencies and rework.

5. **Performance and Load Testing:**
   Conducting load tests and checking non-functional requirements early would have guaranteed better scalability and responsiveness.


## Progress Based on Teamwork

### Individual Work Summary
| Name                     | Summary of Work       |
|--------------------------|-----------------------|
| Aras Taşçı | Led the backend integration efforts to ensure seamless communication with the frontend, managing deployments, and maintaining infrastructure while quickly resolving urgent issues. Implemented a wide range of features, including all quiz-related core features, quiz cancellation and automatic quiz creation, admin functionalities such as banning users, bookmarking endpoints for words, and comprehensive Activity Streams. Optimized the codebase through rigorous testing for the quiz endpoints, and managed Docker configurations. Provided responsive support to frontend and mobile teams, enabling smoother API integration and ensuring that development advanced continuously.|
| Halil Özkan | As a member of the backend team, my main responsibilities included ensuring that our backend systems communicated effectively with the frontend. I was tasked with fixing bugs, adding new features, and improving existing functionalities to enhance the overall performance and user experience of our application. Additionally, I played a key role in reviewing and merging pull requests from my teammates, which helped maintain the integrity and quality of our codebase. I also managed deployment processes and collaborated closely with other team members to address any backend-related issues promptly. |
| Kaan Yolcu |Throughout this development phase, I implemented significant system-wide modifications to support image upload and generation capabilities, including extensive Docker configuration updates. I enhanced the semantic processing capabilities by integrating WordNet and Lexvo endpoints, which required developing numerous additional endpoints and functions beyond the initial Milestone 2 deliverables for example the description of words or multiple choice generation or getting the true answers all held by those endpoints and functions. To address performance concerns, I implemented caching mechanisms to optimize system speed. Additionally, I provided ongoing support to the frontend team through various hotfix implementations as requested. Also written numerous scripts and utility functions to maintain data coherence |
| Yunus Emre Özdemir | Throughout this milestone, I implemented several core features and administrative functionalities that significantly enhanced the platform's capabilities. My key contributions included developing a comprehensive search system, creating a complete guest view interface, implementing a dictionary feature for language learning, and establishing a bookmark word functionality. I also built robust administrative controls including user ban management, post/comment moderation tools, and quiz moderation capabilities. The tag system was enhanced through custom tag creation and searchable filtering for both forum and quiz sections. Additionally, I improved the user interface by implementing profile-related features such as ban status display, bookmarked comments visualization, and improved activity stream notifications. To ensure code quality, I wrote comprehensive unit tests for Guest and Admin views, contributed to standards documentation, and conducted user testing. |
| Ali Tarık Şahin | During milestone 3, I focused on improving the frontend functionality and ensuring integration with the backend. I connected the quiz creation functionality to the backend, implemented image upload features for the quiz creation page, and ensured that quiz-related skeletons and quiz images were properly displayed. Additionally, I resolved bugs such as fixing tests for forum post composition and improved frontend usability by integrating features like quiz option recommendations and adding image functionalities to quiz questions. I also contributed to testing and coverage improvements, including co-authoring quiz review tests and addressing documentation and implementation standards. Also, I took part in management related issues contributing to the overall workflow of the group progress.|
| Ahmet Oğuz Engin | During milestone 3, I played a key role in developing and refining the mobile quiz features in the project. I improved the quiz pages' UI/UX based on milestone 2 feedback and implemented essential functionalities such as image upload, bookmark, and like features. I also established and updated backend connections for mobile quiz creation, results, and image suggestions, ensuring robust integration with the backend systems. Additionally, I integrated the Lexvo-based Suggestion System into the mobile quiz creation process, enhancing functionality and user experience. Collaborating with the backend team, I helped shape the quiz and suggestion systems. I also fixed and added new unit tests for components like QuizDetails and QuizReviewQuestion, strengthening the mobile application's reliability and maintainability.|
|Elif Nur Deniz|During this milestone, I focused on frontend development, finalized core components such as all quiz related pages except for creation, adding profile images, user profiles and displaying all related components in the page such as solved/created quizzes, liked posts/quizzes, followers/following users and saved content management, providing a comprehensive activity overview. I also contributed to improving the quiz feed with filtering and sorting options and redesigning the end-of-quiz interface for better usability. To enhance performance, I implemented skeleton loaders to provide a smoother user experience during page loading. In bug fixing and testing, I resolved issues like first-level post comments, access token/guest view problems, and profile edit tests. I also conducted unit tests, such as the quiz review test, to ensure feature reliability. I took the initiative and tested many functionalities and fixed bugs where necessary before all customer presentations. Beyond technical work, I contributed to planning and management, collaborating with teammates to ensure all requirements are done before the deadline. I constantly pointed out the missing or buggy features to the whole team and asked for improvements. My proactive approach, early task initiation, and collaborative mindset enabled me to contribute effectively to the overall project success.|
| Yağız Güldal | In this milestone, I took on three main roles. The first and most demanding was being a part of the mobile team. There wasn't much designing left to do for the parts I was responsible for, but there were a lot of parts that needed to be connected to the backend. I was responsible for the profile pages, the built-in dictionary, the search page and the notification page. I also fixed a lot of bugs and small issues that could have been noticed during the presentation. My second main role was being the pseudo-communicator of the group. I tried to act as a bit of a glue between the different teams and the teaching assistant by frequently checking up on the work performed by the backend, mobile and frontend teams and I also distributed the tasks during the labs. My final responsibility was planning and presenting during the Final Customer Milestone. I helped prepare a nice, believable user story for the demo and I communicated to the teams what features we definitely needed for that plan to work. I made sure the plan included a showcase of the most critical features requested of us. I then practiced the demo with others and successfully presented it without much trouble.|
|Oktay Özel| In this Milestone, I have implemented additional features for profile such as profile picture and recursive comments namely reply feature to comments. I have also cleaned our previous tests.py folder to a tests directory which included two subdirectories unit and integration. Under those I have implemented 54 unit and integration tests doing the necessay fixes simultaneousy. I also have taken part via hot fixes while frontend and mobile teams are connecting to the backend. Did necessary deployment chores. I have taken an active role in the planning part also. I also have implemented bookmarked features to comments and have added guest access to some endpoints. |
|Anıl Köse| This semester, I played a key role in the mobile team, taking on various responsibilities that ensured the successful development and delivery of the mobile application. My main tasks included creating and maintaining the Forum pages, reviewing and merging pull requests, and handling the routing mechanisms for the Quiz and Search pages. I also contributed to finalizing the product by conducting release checks and applying final fixes. Additionally, I hosted team meetings, wrote a lab report, and conducted user tests to ensure that our mobile application met both user expectations and technical standards. Throughout the project, I completed several tasks and pull requests that contributed directly to the development and improvement of the mobile application. Notable contributions include adding the PressableText component to the Forum and Quiz screens, implementing the bookmark feature for forum comments, and developing the custom tag functionality for post creation. I also worked on enhancements such as displaying profile pictures of comment authors and enabling users to navigate to their profiles from the Forum Post Page. Furthermore, I ensured that guest users faced appropriate restrictions on the Forum and Quiz pages, enhancing both functionality and security. These tasks were completed on time and in line with project goals, showcasing my commitment and attention to detail. Lastly, I was actively involved in the testing and finalization stages of the project. I conducted user tests to identify and resolve usability issues, ensuring the application provided a seamless user experience. I also took part in the final checks before release, resolving critical issues and making necessary adjustments to deliver a polished product. Through these efforts, I made sure our application was not only functional but also user-friendly and ready for presentation. Overall, my contributions helped the team achieve its goals, and I’m proud to have played a vital part in delivering a high-quality mobile application.|

### Status of Requirements
#### Completed Requirements are as follows:
##### Functional Requirements
* 1.1.1.1 Guests shall be able to sign up.
* 1.1.1.4 Guest shall be able to log in.
* 1.1.2.1 Logged-in Users shall be able to log out.
* 1.1.2.2 Logged-in Users shall be able to view their profile.
* 1.1.2.4 Logged-in Users shall be able to view their bookmarked forum posts while viewing their profile.
* 1.1.2.5 Logged-in Users shall be able to view their bookmarked quizzes while viewing their profile.
* 1.1.2.6 Logged-in Users shall be able to view their own forum posts/comments while viewing their profile.
* 1.1.2.7 Logged-in Users shall be able to change their profile picture while viewing their profile.
* 1.1.2.8 Logged-in Users shall be able to view their own created quizzes while viewing their profile.
* 1.1.2.9 Logged-in Users shall be able to view their own solved quizzes & results while viewing their profile.
* 1.1.2.10 Logged-in Users shall be able to view their followers while viewing their profile.
* 1.1.2.11 Logged-in Users shall be able to view the people following them while viewing their profile.
* 1.1.2.12 Logged-in Users shall be able to search for other users using their usernames.
* 1.1.2.13 Logged-in Users shall be able to go to the quiz page when viewing a quiz in someone's profile.
* 1.1.2.14 Logged-in Users shall be able to go to the forum post when viewing a post in someone's profile.
* 1.1.2.15 Logged-in Users shall be able to follow other users.
* 1.1.2.16 Logged-in Users shall be able to unfollow other users.
* 1.1.2.17 Logged-in Users shall be able to view the created, solved quizzes and the forum posts of another user when viewing their profile.
* 1.1.2.18 Logged-in Users shall be able to view the following/followers of another user from their profile.
* 1.1.3.1 Admins shall be able to do everything that a user can.
* 1.1.3.2 Admins shall be able to ban users.
* 1.2.1.1 Guests shall be able to view the quiz feed.
* 1.2.1.2 Guests shall be able to see quiz statistics and details.
* 1.2.1.3 Guests shall be able to use the search functionality to find quizzes.
* 1.2.2.1 Logged-in Users shall be able to do everything that guests can.
* 1.2.2.2 Logged-in Users shall be able to create a quiz.
* 1.2.2.3 Logged-in Users shall be able to add questions to a quiz with the help of Lexvo while creating a quiz.
* 1.2.2.4 Logged-in Users shall be able to add tags to a quiz (including difficulty tags) while creating a quiz.
* 1.2.2.5 Logged-in Users shall be able to take a quiz.
* 1.2.2.6 Logged-in Users shall be able to cancel a quiz while taking it.
* 1.2.3.1 Admins shall be able to do everything that a logged-in user can.
* 1.2.3.2 Admins shall be able to delete any quiz.
* 1.2.3.3 Admins shall be able to change the tags of any quiz.
* 1.3.1.1 Guests shall be able to view the forum feed.
* 1.3.1.2 Guests shall be able to view the comments under a forum post.
* 1.3.1.3 Guests shall be able to search use the search functionality to find forum posts.
* 1.3.2.1 Logged-in users shall be able to do everything that a guest can.
* 1.3.2.2 Logged-in users shall have their feeds customized.
* 1.3.2.3 Logged-in users shall be able to create new posts in the forum.
* 1.3.2.4 Logged-in users shall be able to add tags to the post while creating new posts in the forum.
* 1.3.2.5 Logged-in users shall be able to create new comments under posts.
* 1.3.2.6 Logged-in users shall be able to bookmark posts and comments in the forum.
* 1.3.2.8 Logged-in users shall be able to like/unlike posts and comments.
* 1.3.3.1 Admins shall be able to do everything that a logged-in user can.
* 1.3.3.2 Admins shall be able to delete any post.
* 1.3.3.3 Admins shall be able to delete any comment.
* 1.3.3.4 Admins shall be able to adjust the tags of a post.

##### Non-functional Requirements
* 2.1.1 The project should be available in English and Turkish (to cater to beginner level learners as well).
* 2.1.3 The platform must be capable of accommodating a minimum of 100 simultaneous user actions.
* 2.2.1 The system shall respond to requests within 3 seconds.
* 2.2.2 The system should be capable of handling up to 100 requests per second
* 2.2.3 The platform must maintain a minimum up-time of 99%.
* 2.3.1 Passwords maintained in the system's database will be secured through encryption
* 2.3.2 Private personal information of users (their email(s) and password) shall be concealed from other members
* 2.4.1 Compatibility with popular web browsers like Google Chrome, Safari is ensured for the project.
* 2.4.2 The users shall be able to enter the system from a smartphone or tablet, both through the Android app and through a web browser.
* 2.4.3 It should be compatible with different popular Operating Systems.

#### Not Completed Requirements are as follows:
* 1.1.1.2 Guests may need to verify their email when they sign up.
* 1.1.1.3 Guest may be able to reset their passwords through the 'Forget Password' functionality.
* 1.1.2.3 Logged-in Users shall be able to change their password.
* 1.3.2.7 Logged-in users shall be able to delete their own comments.



### API Documentation

#### **Authentication**

##### **Register**
**Endpoint**: `/signup/`  
**Method**: `POST`  
**Description**: Register a new user.  
**Request Body**:  
```json
{
  "username": "user123",
  "email": "user123@example.com",
  "password": "securepassword"
}
```
**Response**:  
- **201**: Registration successful.
- **400**: Validation errors.



##### **Login**
**Endpoint**: `/login/`  
**Method**: `POST`  
**Description**: Authenticate a user and retrieve a JWT token.  
**Request Body**:  
```json
{
  "username": "user123",
  "password": "securepassword"
}
```
**Response**:  
- **200**:  
```json
{
  "access": "<access_token>",
  "refresh": "<refresh_token>"
}
```
- **401**: Invalid credentials.



##### **Refresh Token**
**Endpoint**: `/refresh/`  
**Method**: `POST`  
**Description**: Refresh an expired JWT token.  
**Request Body**:  
```json
{
  "refresh": "<refresh_token>"
}
```
**Response**:  
- **200**:  
```json
{
  "access": "<new_access_token>"
}
```
- **401**: Invalid token.



#### **User Profile**

##### **View Profile**
**Endpoint**: `/profile/`  
**Method**: `GET`  
**Description**: Retrieve the authenticated user's profile details.  
**Response**:  
- **200**:  
```json
{
  "username": "user123",
  "email": "user123@example.com",
  "level": "Intermediate",
  "profile_picture": "<url>",
  "followers": 15,
  "following": 10
}
```



##### **Update Profile**
**Endpoint**: `/profile/update/`  
**Method**: `POST`  
**Description**: Update the authenticated user's profile.  
**Request Body**:  
```json
{
  "level": "Advanced",
  "profile_picture": "<base64_encoded_image>"
}
```
**Response**:  
- **200**: Profile updated successfully.
- **400**: Validation errors.



##### **Follow User**
**Endpoint**: `/profile/follow/`  
**Method**: `POST`  
**Description**: Follow another user.  
**Request Body**:  
```json
{
  "username": "user_to_follow"
}
```
**Response**:  
- **200**:  
```json
{
  "message": "Successfully followed user_to_follow",
  "follower_count": 50
}
```
- **400**: Cannot follow yourself or invalid username.



##### **Unfollow User**
**Endpoint**: `/profile/unfollow/`  
**Method**: `POST`  
**Description**: Unfollow a user.  
**Request Body**:  
```json
{
  "username": "user_to_unfollow"
}
```
**Response**:  
- **200**:  
```json
{
  "message": "Successfully unfollowed user_to_unfollow",
  "follower_count": 49
}
```
- **400**: Cannot unfollow yourself or invalid username.



#### **Quiz Management**

##### **Create Quiz**
**Endpoint**: `/quiz/create/`  
**Method**: `POST`  
**Description**: Create a new quiz with associated questions.  
**Request Body**:  
```json
{
  "title": "Math Quiz",
  "description": "Test your math skills",
  "level": "Beginner",
  "tags": ["math", "algebra"],
  "questions": [
    {
      "question_number": 1,
      "question_text": "What is 2+2?",
      "choices": ["1", "2", "3", "4"],
      "correct_choice": 4
    }
  ]
}
```
**Response**:  
- **201**: Quiz created successfully.
- **400**: Validation errors.



##### **View Quizzes**
**Endpoint**: `/feed/quiz/`  
**Method**: `GET`  
**Description**: Retrieve a list of all quizzes.  
**Response**:  
- **200**:  
```json
[
  {
    "id": 1,
    "title": "Math Quiz",
    "description": "Test your math skills",
    "level": "Beginner",
    "tags": ["math", "algebra"]
  }
]
```

##### **Start Quiz**
**Endpoint**: `/quiz/start/`  
**Method**: `POST`  
**Description**: Start a quiz attempt.  
**Request Body**:  
```json
{
  "quiz_id": 1
}
```
**Response**:  
- **200**: Quiz progress started successfully.
- **400**: Quiz progress could not be started.


##### **Submit Quiz**
**Endpoint**: `/quiz/submit/`  
**Method**: `POST`  
**Description**: Submit a completed quiz.  
**Request Body**:  
```json
{
  "quiz_progress_id": 1
}
```
**Response**:  
- **200**:  
```json
{
  "score": 8,
  "total_questions": 10,
  "result_url": "/quiz/result/1"
}
```



##### **Get Quiz Results**
**Endpoint**: `/quiz/results/`  
**Method**: `GET`  
**Description**: Retrieve results for all completed quizzes.  
**Response**:  
- **200**:  
```json
[
  {
    "quiz_title": "Math Quiz",
    "score": 8,
    "total_questions": 10
  }
]
```



##### **Like Quiz**
**Endpoint**: `/quiz/like/`  
**Method**: `POST`  
**Description**: Like a quiz.  
**Request Body**:  
```json
{
  "quiz_id": 1
}
```
**Response**:  
- **200**: Quiz liked successfully.



##### **Bookmark Quiz**
**Endpoint**: `/quiz/bookmark/`  
**Method**: `POST`  
**Description**: Bookmark a quiz.  
**Request Body**:  
```json
{
  "quiz_id": 1
}
```
**Response**:  
- **200**: Quiz bookmarked successfully.



##### **Delete Quiz**
**Endpoint**: `/quiz/delete/`  
**Method**: `POST`  
**Description**: Delete a quiz.  
**Request Body**:  
```json
{
  "quiz_id": 1
}
```
**Response**:  
- **200**: Quiz deleted successfully.
- **403**: Unauthorized.


#### **Post Management**

##### **Create Post**
**Endpoint**: `/post/create/`  
**Method**: `POST`  
**Description**: Create a new post.  
**Request Body**:  
```json
{
  "title": "My First Post",
  "description": "This is the description of my post.",
  "tags": ["tag1", "tag2"]
}
```
**Response**:  
- **201**:  
```json
{
  "detail": "Post created successfully.",
  "post_id": 1
}
```
- **400**: Validation errors.



##### **Get Post Details**
**Endpoint**: `/post/`  
**Method**: `POST`  
**Description**: Get details of a specific post.  
**Request Body**:  
```json
{
  "post_id": 1
}
```
**Response**:  
- **200**:  
```json
{
  "id": 1,
  "title": "My First Post",
  "description": "This is the description of my post.",
  "author": "user123",
  "created_at": "2024-12-19T12:34:56",
  "like_count": 10,
  "tags": ["tag1", "tag2"],
  "is_liked": true,
  "is_bookmarked": false,
  "comments": [
    {
      "id": 1,
      "body": "Nice post!",
      "author": "user456",
      "created_at": "2024-12-19T12:40:00",
      "like_count": 5
    }
  ]
}
```
- **400**: Post not found or invalid request.



##### **Like Post**
**Endpoint**: `/post/like/`  
**Method**: `POST`  
**Description**: Like a post.  
**Request Body**:  
```json
{
  "post_id": 1
}
```
**Response**:  
- **200**:  
```json
{
  "detail": "Post liked successfully.",
  "like_count": 11,
  "is_liked": true,
  "is_bookmarked": false
}
```
- **400**: Already liked or invalid request.



##### **Unlike Post**
**Endpoint**: `/post/unlike/`  
**Method**: `POST`  
**Description**: Unlike a post.  
**Request Body**:  
```json
{
  "post_id": 1
}
```
**Response**:  
- **200**:  
```json
{
  "detail": "Post unliked successfully.",
  "like_count": 10,
  "is_liked": false,
  "is_bookmarked": false
}
```
- **400**: Post not liked or invalid request.



##### **Delete Post**
**Endpoint**: `/post/delete/`  
**Method**: `POST`  
**Description**: Delete a post.  
**Request Body**:  
```json
{
  "post_id": 1
}
```
**Response**:  
- **200**:  
```json
{
  "detail": "Post deleted successfully."
}
```
- **403**: Unauthorized action.
- **400**: Post not found or invalid request.



##### **Update Post**
**Endpoint**: `/post/update/<int:post_id>/`  
**Method**: `POST`  
**Description**: Update a post's details.  
**Request Body**:  
```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "tags": ["new_tag"]
}
```
**Response**:  
- **200**:  
```json
{
  "detail": "Post updated successfully."
}
```
- **403**: Unauthorized action.
- **400**: Validation errors.



##### **Get User Posts**
**Endpoint**: `/post/my-posts/`  
**Method**: `GET`  
**Description**: Retrieve all posts created by the authenticated user.  
**Response**:  
- **200**:  
```json
{
  "posts": [
    {
      "id": 1,
      "title": "My First Post",
      "description": "This is the description of my post.",
      "created_at": "2024-12-19T12:34:56",
      "like_count": 10,
      "tags": ["tag1", "tag2"]
    }
  ]
}
```



#### **Comment Management**

##### **Add Comment**
**Endpoint**: `/post/comment/add/`  
**Method**: `POST`  
**Description**: Add a comment to a post.  
**Request Body**:  
```json
{
  "post_id": 1,
  "body": "Great post!"
}
```
**Response**:  
- **201**: Comment added successfully.
- **400**: Validation errors.



##### **Delete Comment**
**Endpoint**: `/post/comment/delete/`  
**Method**: `POST`  
**Description**: Delete a comment.  
**Request Body**:  
```json
{
  "comment_id": 1
}
```
**Response**:  
- **200**: Comment deleted successfully.
- **403**: Unauthorized action.
- **400**: Comment not found or invalid request.



##### **Like Comment**
**Endpoint**: `/post/comment/like/`  
**Method**: `POST`  
**Description**: Like a comment.  
**Request Body**:  
```json
{
  "comment_id": 1
}
```
**Response**:  
- **200**: Comment liked successfully.
- **400**: Already liked or invalid request.



##### **Unlike Comment**
**Endpoint**: `/post/comment/unlike/`  
**Method**: `POST`  
**Description**: Unlike a comment.  
**Request Body**:  
```json
{
  "comment_id": 1
}
```
**Response**:  
- **200**: Comment unliked successfully.
- **400**: Comment not liked or invalid request.



##### **Get Comments**
**Endpoint**: `/comment/`  
**Method**: `GET`  
**Description**: Retrieve details of a specific comment.  
**Request Parameters**:  
- **comment_id**: ID of the comment.  

**Response**:  
- **200**:  
```json
{
  "id": 1,
  "body": "Great post!",
  "author": "user123",
  "created_at": "2024-12-19T12:40:00",
  "like_count": 5
}
```
- **400**: Comment not found or invalid request.



#### **Search**

##### **Search Users, Posts, Comments, or Quizzes**
**Endpoint**: `/search/`  
**Method**: `GET`  
**Description**: Perform a search across users, posts, comments, or quizzes.  
**Query Parameters**:  
- **q**: Search query string.  
- **type** (optional): Filter results by `users`, `posts`, `comments`, or `quizzes`.  

**Response**:  
- **200**:  
```json
{
  "users": [
    {
      "username": "user123",
      "email": "user123@example.com",
      "level": "Intermediate",
      "profile_picture": "<url>",
      "isFollowing": true
    }
  ],
  "posts": [
    {
      "id": 1,
      "title": "My First Post",
      "description": "This is the description of my post.",
      "author": "user123",
      "created_at": "2024-12-19T12:34:56",
      "like_count": 10,
      "tags": ["tag1", "tag2"]
    }
  ],
  "comments": [
    {
      "id": 1,
      "body": "Nice post!",
      "author": "user456",
      "created_at": "2024-12-19T12:40:00",
      "like_count": 5,
      "isLiked": false,
      "isBookmarked": false
    }
  ],
  "quizzes": [
    {
      "id": 1,
      "title": "Math Quiz",
      "description": "Test your math skills",
      "author": "user123",
      "tags": ["math", "algebra"],
      "level": "Beginner",
      "isLiked": true,
      "isBookmarked": false,
      "likeCount": 15
    }
  ]
}
```
- **400**: Missing or invalid query.

#### **Bookmark Management**

##### **Bookmark Post**
**Endpoint**: `/bookmark/`  
**Method**: `POST`  
**Description**: Bookmark a specific post.  
**Request Body**:  
```json
{
  "post_id": 1
}
```
**Response**:  
- **201**:  
```json
{
  "detail": "Post bookmarked successfully.",
  "is_liked": true,
  "is_bookmarked": true,
  "like_count": 5
}
```
- **400**:  
  - Post ID is missing.
  - Post is already bookmarked.



##### **Unbookmark Post**
**Endpoint**: `/unbookmark/`  
**Method**: `POST`  
**Description**: Remove a bookmark from a specific post.  
**Request Body**:  
```json
{
  "post_id": 1
}
```
**Response**:  
- **200**:  
```json
{
  "detail": "Post unbookmarked successfully.",
  "is_liked": false,
  "is_bookmarked": false,
  "like_count": 5
}
```
- **400**:  
  - Post ID is missing.
  - Post is not bookmarked.



##### **Get Bookmarked Posts**
**Endpoint**: `/get_bookmarked_posts/`  
**Method**: `POST`  
**Description**: Retrieve all posts bookmarked by the authenticated user.  
**Response**:  
- **200**:  
```json
[
  {
    "id": 1,
    "title": "My First Post",
    "description": "This is the description of my post.",
    "author": "user123",
    "created_at": "2024-12-19T12:34:56",
    "like_count": 10,
    "tags": ["tag1", "tag2"]
  },
  {
    "id": 2,
    "title": "Another Post",
    "description": "This is another post description.",
    "author": "user456",
    "created_at": "2024-12-19T13:34:56",
    "like_count": 8,
    "tags": ["tag3", "tag4"]
  }
]
```



##### **Error Responses**

- **400**: Validation error or missing required fields.
- **404**: Post not found when attempting to bookmark or unbookmark.


#### **Activity Stream Management**

##### **Get Activities for Logged-In User**
**Endpoint**: `/user-activities-as-object/`  
**Method**: `GET`  
**Description**: Retrieve activities where the logged-in user is the affected party.  
**Response**:  
- **200**:  
```json
{
  "activities": [
    {
      "actor": "user123",
      "verb": "liked",
      "object_type": "Post",
      "object_name": "My First Post",
      "object_id": 1,
      "timestamp": "2024-12-19T12:34:56",
      "affected_username": "current_user"
    }
  ]
}
```

##### **Get Activities by User**
**Endpoint**: `/user-activities/`  
**Method**: `POST`  
**Description**: Retrieve activities performed by a specific user.  
**Request Body**:  
```json
{
  "user_id": 1
}
```
**Response**:  
- **200**:  
```json
{
  "activities": [
    {
      "verb": "created",
      "object_type": "Post",
      "object_id": 1,
      "timestamp": "2024-12-19T12:34:56"
    }
  ]
}
```
- **400**: Missing user ID.
- **404**: User not found.


#### **Admin Management**

##### **Ban User**
**Endpoint**: `/admin-ban/`  
**Method**: `POST`  
**Description**: Ban a user from the system. Only accessible by admin users.  
**Request Body**:  
```json
{
  "username": "user_to_ban"
}
```
**Response**:  
- **200**:  
```json
{
  "detail": "User banned successfully."
}
```
- **403**: User is not authorized to perform this action.
- **400**: Missing username.
- **404**: User not found.



##### **Check Admin Status**
**Endpoint**: `/admin-check/`  
**Method**: `GET`  
**Description**: Verify if the logged-in user has admin privileges.  
**Response**:  
- **200**:  
```json
{
  "is_admin": true
}
```



##### **Error Responses**

- **400**: Missing or invalid required fields.
- **403**: Unauthorized action (e.g., non-admin attempting to ban a user).
- **404**: Resource not found (e.g., user not found during ban action).


#### Link to the API
- https://64.226.76.231:8000

#### Example API Calls

##### **Example 1: Bookmark a Post**

**Functionality**: Bookmark a specific post to save it for later reference.

**API Endpoint**: `/bookmark/`  
**Method**: `POST`  
**Authentication**: Required (refer to this example for obtaining a token).  

---

###### **Instructions**
1. Obtain a valid JWT token using `/login/` (refer to Example 1 for details).
2. Send a `POST` request to `/bookmark/` with the following body:
   ```json
   {
       "post_id": 1
   }
   ```
3. Include the `Authorization` header: `Bearer <access_token>`.

---

###### **Possible Responses**
- **201 Created**: Post bookmarked successfully.  
  **Response Body**:  
  ```json
  {
      "detail": "Post bookmarked successfully.",
      "is_liked": false,
      "is_bookmarked": true,
      "like_count": 5
  }
  ```

- **400 Bad Request**: Missing or invalid parameters.  
  **Response Body**:  
  ```json
  {
      "detail": "Post ID is required."
  }
  ```

- **404 Not Found**: Post does not exist.  
  **Response Body**:  
  ```json
  {
      "detail": "Not found."
  }
  ```

- **400 Bad Request**: Post is already bookmarked.  
  **Response Body**:  
  ```json
  {
      "detail": "Post is already bookmarked."
  }
  ```

---

##### **Example 2: Start a Quiz**

**Functionality**: Start a quiz attempt and retrieve its questions.

**API Endpoint**: `/quiz/start/`  
**Method**: `POST`  
**Authentication**: Required (use the token obtained in Example 1).  

---

###### **Instructions**
1. Send a `POST` request to `/quiz/start/` with the following body:
   ```json
   {
       "quiz_id": 1
   }
   ```
2. Include the `Authorization` header: `Bearer <access_token>`.

---

###### **Possible Responses**
- **200 OK**: Quiz started successfully.  
  **Response Body**:  
  ```json
  {
      "questions": [
          {
              "question": "What is 2+2?",
              "question_image": null,
              "choices": ["1", "2", "3", "4"],
              "choice_images": [null, null, null, null],
              "question_number": 1,
              "previous_answer": 0
          }
      ],
      "quiz_progress_id": 123,
      "quiz_title": "Math Quiz",
      "quiz_title_image": null,
      "question_count": 10
  }
  ```

- **400 Bad Request**: Missing or invalid parameters.  
  **Response Body**:  
  ```json
  {
      "detail": "Quiz ID is required."
  }
  ```

- **404 Not Found**: Quiz does not exist.  
  **Response Body**:  
  ```json
  {
      "detail": "Not found."
  }
  ```

---

##### **Example 3: Search for Quizzes**

**Functionality**: Search for quizzes using a keyword.

**API Endpoint**: `/search/`  
**Method**: `GET`  
**Authentication**: Optional (use the token from Example 1 for personalized results).  

---

###### **Instructions**
1. Send a `GET` request to `/search/` with the following query parameters:  
   - `q`: The search keyword (e.g., "math").  
   - `type` (optional): The type of entity to search for (e.g., "quizzes").

2. If authenticated, include the `Authorization` header: `Bearer <access_token>`.

---

###### **Possible Responses**
- **200 OK**: Search results returned successfully.  
  **Response Body**:  
  ```json
  {
      "quizzes": [
          {
              "id": 1,
              "title": "Math Quiz",
              "description": "Test your math skills",
              "author": "user123",
              "tags": ["math", "algebra"],
              "level": "Beginner",
              "isLiked": false,
              "isBookmarked": false,
              "likeCount": 15
          }
      ]
  }
  ```

- **400 Bad Request**: Missing or invalid query parameter.  
  **Response Body**:  
  ```json
  {
      "error": "A search query is required."
  }
  ```  

---

These structured examples include both request and response details, enabling easy implementation and debugging!



### User Interface / User Experience

#### Mobile

* Initial [Mobil Mockups](https://github.com/bounswe/bounswe2024group6/wiki/Mobile-Mockups)
* [Main Page](https://github.com/bounswe/bounswe2024group6/blob/main/mobile/bulingo/app/(tabs)/index.tsx)

![Screenshot 2024-12-20 at 00.54.54](https://hackmd.io/_uploads/H1P5UffB1l.png)
![Screenshot 2024-12-20 at 00.55.07](https://hackmd.io/_uploads/BJw5IGfB1e.png)
* [Login Page](https://github.com/bounswe/bounswe2024group6/blob/main/mobile/bulingo/app/login.tsx)

![Screenshot 2024-12-20 at 00.49.45](https://hackmd.io/_uploads/ByHbrGGryl.png)
* [Registration](https://github.com/bounswe/bounswe2024group6/blob/main/mobile/bulingo/app/register.tsx)

![Screenshot 2024-12-20 at 08.30.43](https://hackmd.io/_uploads/HykfWFGHyx.png)
* [Search Screen](https://github.com/bounswe/bounswe2024group6/blob/main/mobile/bulingo/app/(tabs)/search.tsx)

![Screenshot 2024-12-20 at 08.33.43](https://hackmd.io/_uploads/HJv6WKMByg.png)

* [Quiz Feed](https://github.com/bounswe/bounswe2024group6/blob/main/mobile/bulingo/app/(tabs)/quizzes/index.tsx)

![Screenshot 2024-12-20 at 00.39.21](https://hackmd.io/_uploads/B1V2NfGSyl.png)

* [Quiz Creation - Settings](https://github.com/bounswe/bounswe2024group6/blob/main/mobile/bulingo/app/(tabs)/quizzes/quizCreationSettings.tsx)

![Screenshot 2024-12-20 at 08.37.03](https://hackmd.io/_uploads/SkoYGFfHJe.png)

* [Quiz Creation - Question List](https://github.com/bounswe/bounswe2024group6/blob/main/mobile/bulingo/app/(tabs)/quizzes/quizCreationQuestionList.tsx)

![Screenshot 2024-12-20 at 08.37.56](https://hackmd.io/_uploads/SJNTGYGSke.png)

* [Quiz Creation - Info](https://github.com/bounswe/bounswe2024group6/blob/main/mobile/bulingo/app/(tabs)/quizzes/quizCreationInfo.tsx)

![Screenshot 2024-12-20 at 08.38.54](https://hackmd.io/_uploads/SkgbQKMByg.png)

* [Quiz Details](https://github.com/bounswe/bounswe2024group6/blob/main/mobile/bulingo/app/(tabs)/quizzes/quizDetails.tsx)

![Screenshot 2024-12-20 at 08.48.33](https://hackmd.io/_uploads/rk4rBFMS1x.png)

* [Quiz Questions](https://github.com/bounswe/bounswe2024group6/blob/main/mobile/bulingo/app/(tabs)/quizzes/quizQuestion.tsx)

![Screenshot 2024-12-20 at 08.49.52](https://hackmd.io/_uploads/Sk6KHFzHkx.png)

* [Quiz Review](https://github.com/bounswe/bounswe2024group6/blob/main/mobile/bulingo/app/(tabs)/quizzes/quizReview.tsx)

![Screenshot 2024-12-20 at 08.50.50](https://hackmd.io/_uploads/SkpprYfBJg.png)

* [Quiz Result](https://github.com/bounswe/bounswe2024group6/blob/main/mobile/bulingo/app/(tabs)/quizzes/quizResults.tsx)

![Screenshot 2024-12-20 at 08.56.35](https://hackmd.io/_uploads/S1I7PYMH1x.png)

* [Forum Feed](https://github.com/bounswe/bounswe2024group6/blob/main/mobile/bulingo/app/(tabs)/forums/index.tsx)

![Screenshot 2024-12-20 at 09.02.35](https://hackmd.io/_uploads/BJ_YOFzBJe.png)

* [Forum Post + Comment Creation](https://github.com/bounswe/bounswe2024group6/blob/main/mobile/bulingo/app/(tabs)/forums/forumPostPage.tsx)

![Screenshot 2024-12-20 at 09.03.30](https://hackmd.io/_uploads/S1y6uYfBJl.png)
![Screenshot 2024-12-20 at 09.07.37](https://hackmd.io/_uploads/Hkw3FtMBye.png)

* [Forum Post Creation](https://github.com/bounswe/bounswe2024group6/blob/main/mobile/bulingo/app/(tabs)/forums/forumPostCreation.tsx)

![Screenshot 2024-12-20 at 09.04.57](https://hackmd.io/_uploads/HJPMYFfByl.png)

* [Own Profile](https://github.com/bounswe/bounswe2024group6/blob/main/mobile/bulingo/app/(tabs)/profile/index.tsx)

![Screenshot 2024-12-20 at 09.08.13](https://hackmd.io/_uploads/Hk6RFYGr1x.png)

* [Other Profile](https://github.com/bounswe/bounswe2024group6/blob/main/mobile/bulingo/app/(tabs)/profile/users/%5Busername%5D/index.tsx)

![Screenshot 2024-12-20 at 09.09.59](https://hackmd.io/_uploads/rkUS5KfSJl.png)

* [Followers](https://github.com/bounswe/bounswe2024group6/blob/main/mobile/bulingo/app/(tabs)/profile/followers.tsx)

![Screenshot 2024-12-20 at 09.15.59](https://hackmd.io/_uploads/S1CooYGSyx.png)

* [Following](https://github.com/bounswe/bounswe2024group6/blob/main/mobile/bulingo/app/(tabs)/profile/following.tsx)

![Screenshot 2024-12-20 at 09.16.50](https://hackmd.io/_uploads/BJgyhKGH1l.png)

* [User Search](https://github.com/bounswe/bounswe2024group6/blob/main/mobile/bulingo/app/(tabs)/search.tsx)

![Screenshot 2024-12-20 at 09.18.01](https://hackmd.io/_uploads/SJwX3tGrkx.png)

#### Frontend

  * Initial [Frontend Mockups](https://github.com/bounswe/bounswe2024group6/wiki/Front%E2%80%90End-Mockups)
 * [Login Page](https://github.com/bounswe/bounswe2024group6/blob/main/frontend/src/components/auth/login.tsx#L18)
  ![login_page](https://hackmd.io/_uploads/BymdZCbSJg.png)
 * [Forum Page](https://github.com/bounswe/bounswe2024group6/blob/main/frontend/src/pages/forum.tsx#L23)
  ![forum_page](https://hackmd.io/_uploads/r1yo-AbHyx.png)
 * [Post Creation Page](https://github.com/bounswe/bounswe2024group6/blob/main/frontend/src/components/post/compose-post-form.tsx#L40)
  ![compose_post_page](https://hackmd.io/_uploads/rJrMuAbH1g.png)
 * [Comments Page](https://github.com/bounswe/bounswe2024group6/blob/main/frontend/src/pages/post.tsx#L20)
  ![comments_page](https://hackmd.io/_uploads/B1uG_A-rye.png)
 * [Profile Page](https://github.com/bounswe/bounswe2024group6/blob/main/frontend/src/pages/profile.tsx#L53)
  ![profile_page](https://hackmd.io/_uploads/SyxqMAZHJx.png)
 * [Edit Profile Page](https://github.com/bounswe/bounswe2024group6/blob/main/frontend/src/pages/profile-update.tsx#L14)
  ![profile_edit_page](https://hackmd.io/_uploads/rkjgcC-rkx.png)
 * [Quiz Feed](https://github.com/bounswe/bounswe2024group6/blob/main/frontend/src/pages/quizzes.tsx#L22)
  ![quizzez_page](https://hackmd.io/_uploads/SkQ6ZRWH1g.png)
 * [Quiz Create Page](https://github.com/bounswe/bounswe2024group6/blob/main/frontend/src/pages/quiz-creation.tsx#L13)
  ![quiz_create_page](https://hackmd.io/_uploads/r1cRbCbrkg.png)
 * [Quiz View](https://github.com/bounswe/bounswe2024group6/blob/main/frontend/src/pages/quiz.tsx#L22)
  ![quiz_page](https://hackmd.io/_uploads/H11lGAWHJe.png)
 * [Quiz Review Page](https://github.com/bounswe/bounswe2024group6/blob/main/frontend/src/pages/quiz-end.tsx#L20)
  ![quiz_recommendation_page](https://hackmd.io/_uploads/ByWHuRZH1g.png)
 * [Notifications Section](https://github.com/bounswe/bounswe2024group6/blob/main/frontend/src/components/notification/notification-card.tsx#L11)
  ![notifications_page](https://hackmd.io/_uploads/HJAzzAWSyx.png)
 *  [Night Mode Forum](https://github.com/bounswe/bounswe2024group6/blob/main/frontend/src/components/common/theme-switcher.tsx#L7)
  ![night_mode](https://hackmd.io/_uploads/H1NNMAWHJx.png)
     

### Description & Utilization of Activity Streams 2.0

Activity Streams 2.0 is a JSON-based standard for describing social activities and interactions in a structured, machine-readable format. It provides a standardized way to represent entities such as actors, actions, and objects across platforms, enabling interoperability and extensibility. Core components include the **actor** (entity performing the activity), **verb** (action taken), and **object** (target of the action). Optional fields like `context`, `target`, and `published` allow for additional details. The standard ensures consistent data exchange while supporting custom extensions for domain-specific use cases.

---

#### Examples

```json
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "type": "Activity",
  "actor": {
    "type": "Person",
    "id": "user123",
    "name": "John Doe"
  },
  "verb": "create",
  "object": {
    "type": "Note",
    "id": "note456",
    "content": "Hello, world!"
  },
  "published": "2024-11-05T12:00:00Z"
}

{
  "@context": "https://www.w3.org/ns/activitystreams",
  "type": "QuizActivity",
  "actor": {
    "type": "User",
    "id": "alitariksahin",
    "name": "Ali Tarık Şahin"
  },
  "verb": "solve",
  "object": {
    "type": "Quiz",
    "id": "quiz_356",
    "level": "C1",
    "title": "Local Cuisines"
  },
  "result": {
    "type": "Score",
    "score": 95,
    "maxScore": 100
  },
  "published": "2024-11-05T14:30:00Z"
}
```
#### Implementation in Milestone 3 (Notifications)

Activity Streams 2.0 implementation is used in the notifications feature we have added in milestone 2. Its use and the type of notifications sent to the users have been expanded for this milestone. Notifications and Activity Streams 2.0 are closely related, as the standard provides a structured framework for representing activities that can serve as the basis for generating notifications. Notifications are often a direct output of social activities, such as when a user likes, comments, or follows.

In bulingo, users can like posts, follow each other, and interact with content. Activity Streams 2.0 serves as an ideal framework for structuring these activities. For example, when a user likes a post, the action can be represented with an actor (the user), a verb ("like"), and an object (the post). Similarly, following another user can be captured as an activity where the actor performs the "follow" action on a target (another user). These structured activities can then be used to generate notifications for bulingo participants, ensuring consistency and clarity in how interactions are communicated. With the addition of admin functionality, users also receive notifications whenever an admin deletes/changes the content they have created.


### Scenarios
* A scenario encompassing all core functionalities our project bulingo: Davide is a student who knows some Turkish and English, and he is willing to improve both. So, he registers for bulingo with his email and password. Then he proceeds with sign-in where provides the username and password that he had registered with. After that he goes to his profile and adds profile picture as well as bio information. Upon completing those he proceeds with the forum page and starts to read most related forum posts for him. He then adds a comment on one post and bookmarks that post to read later again. While reading the posts he encounters a quiz suggestion in one of the posts and he proceeds with that quiz after liking the post. He takes the quiz about fruits and sometimes photos of the questions help him remember the words better. After taking the quiz, he moves forward with review quiz option where he saw his mistakes. He wants to share what he learned from the quiz in the forum and creates a forum post in which he mentions about some interesting words that he encountered during the quiz. After posting his forum post he gets 20 likes and sees it via notifications. But after half an hour an admin deletes his post because of wrong usage of a turkish word, and he learns this via another notification. Then it becomes dark and he switches to dark mode which is way releiving for his eyes.

For this secenario we have a full stack mobile and web app with all endpoints ready and connected. We have forum part, quiz part, search part as well as profile and lexvo api parts. All implemented endpoints can be found here as a list.
| Endpoint Name                            | URL Pattern                                |
|------------------------------------------|--------------------------------------------|
| Index Page                               | `''`                                       |
| Admin Ban                                | `'admin-ban/'`                             |
| Admin Check                              | `'admin-check/'`                           |
| View Profile                             | `'profile/'`                               |
| Update Profile                           | `'profile/update/'`                        |
| Get Quiz                                 | `'quiz/<int:quiz_id>/'`                    |
| View Quizzes                             | `'feed/quiz/'`                             |
| Create Quiz                              | `'quiz/create/'`                           |
| Get Question                             | `'quiz/question/'`                         |
| Solve Question                           | `'quiz/question/solve/'`                   |
| Submit Quiz                              | `'quiz/submit/'`                           |
| Start Quiz                               | `'quiz/start/'`                            |
| Get Quiz Results                         | `'quiz/results/'`                          |
| Like Quiz                                | `'quiz/like/'`                             |
| Bookmark Quiz                            | `'quiz/bookmark/'`                         |
| Get Specific Quiz Result                 | `'quiz/result/<int:quiz_result_id>/'`      |
| View Bookmarked Quizzes                  | `'quiz/bookmarks/'`                        |
| View Liked Quizzes                       | `'quiz/likes/'`                            |
| View Created Quizzes                     | `'quiz/created/<str:username>/'`           |
| View Solved Quizzes                      | `'quiz/solved/<str:username>/'`            |
| Get Quiz Review                          | `'quiz/review/<int:quiz_result_id>/'`      |
| Get Quiz Recommendations                 | `'quiz/recommend/<int:quiz_id>/'`          |
| Get Latest Quiz Review                   | `'quiz/review_latest/<int:quiz_id>/'`      |
| Get Quiz Choices                         | `'quiz/choices/<str:word>/<str:quiz_type>/'` |
| Delete Quiz                              | `'quiz/delete/'`                           |
| Update Quiz                              | `'quiz/update/'`                           |
| Cancel Quiz                              | `'quiz/cancel/'`                           |
| Cancel Quiz by ID                        | `'quiz/cancel-id/'`                        |
| Bookmark Word                            | `'word/bookmark/<str:word>/'`              |
| Unbookmark Word                          | `'word/unbookmark/<str:word>/'`            |
| Get Bookmarked Words                     | `'word/bookmarks/'`                        |
| Create Post                              | `'create-post/'`                           |
| Register                                 | `'signup/'`                                |
| Login                                    | `'login/'`                                 |
| Logout                                   | `'logout/'`                                |
| Refresh Token                            | `'refresh/'`                               |
| Get Lexvo Info                           | `'get-lexvo-info/<str:word>/'`             |
| Get Turkish Translation                  | `'get-turkish/<str:word>/'`                |
| Get Word Meanings                        | `'get-meaning/<str:word>/'`                |
| Fetch English Words                      | `'get-english/<str:turkish_word>/'`        |
| Follow User                              | `'profile/follow/'`                        |
| Unfollow User                            | `'profile/unfollow/'`                      |
| Get Post Details                         | `'post/'`                                  |
| Get Comment by ID                        | `'comment/'`                               |
| Like Post                                | `'post/like/'`                             |
| Unlike Post                              | `'post/unlike/'`                           |
| Get Liked Posts                          | `'post/liked/'`                            |
| Add Comment                              | `'post/comment/add/'`                      |
| Add Reply to Comment                     | `'post/comment/reply/'`                    |
| Delete Comment                           | `'post/comment/delete/'`                   |
| Like Comment                             | `'post/comment/like/'`                     |
| Unlike Comment                           | `'post/comment/unlike/'`                   |
| Create Post (Duplicate)                  | `'post/create/'`                           |
| Delete Post                              | `'post/delete/'`                           |
| Get Posts of User                        | `'post/my-posts/'`                         |
| Update Post                              | `'post/update/<int:post_id>/'`             |
| Activities by User                       | `'user-activities/'`                       |
| Activities for User as Object            | `'user-activities-as-object/'`             |
| Get User Post Feed                       | `'feed/'`                                  |
| Bookmark Post                            | `'bookmark/'`                              |
| Unbookmark Post                          | `'unbookmark/'`                            |
| Get Bookmarked Posts                     | `'get_bookmarked_posts/'`                  |
| View Other Profile                       | `'profile/<str:username>/'`                |
| View Followers                           | `'profile/followers/<str:username>/'`      |
| View Following                           | `'profile/following/<str:username>/'`      |
| Search View                              | `'search/'`                                |
| Get Image Details                        | `'image-details/<str:query>/'`             |
| Get Direct Image                         | `'image/<str:query>/'`                     |
| Get Image URL                            | `'image/url/<str:query>/'`                 |
| Bookmark Comment                         | `'comments/bookmark/'`                     |
| Unbookmark Comment                       | `'comments/unbookmark/'`                   |
| Get Bookmarked Comments                  | `'comments/bookmarked/'`                   |
| Get Liked Comments                       | `'comments/liked/'`                        |


## Individual Documentation - Group 6

### Frontend Team
#### Ali Tarık Şahin 
 
During milestone 3, I focused on improving the frontend functionality and ensuring integration with the backend. I connected the quiz creation functionality to the backend, implemented image upload features for the quiz creation page, and ensured that quiz-related skeletons and quiz images were properly displayed. Additionally, I resolved bugs such as fixing tests for forum post composition and improved frontend usability by integrating features like quiz option recommendations and adding image functionalities to quiz questions. I also contributed to testing and coverage improvements, including co-authoring quiz review tests and addressing documentation and implementation standards. Also, I took part in management related issues contributing to the overall workflow of the group progress.
##### Code and Management related Significant Issues
 
| Task                                | Link                                | Duration |
|-------------------------------------|-------------------------------------------|----------|
| Lab 8 Testing and Coverages |  [issue716](https://github.com/bounswe/bounswe2024group6/issues/716)    |  2 hours     | 
| Lab 8 - Standard(s) being followed (e.g. its documentation, implementation)|[issue719](https://github.com/bounswe/bounswe2024group6/issues/719)|  2 hours  |
| Lab: Final Presentation Plan  |  [issue753](https://github.com/bounswe/bounswe2024group6/issues/753)     |  2 hours     | 
| Connect Quiz Creation Functionality to Backend |  [issue742](https://github.com/bounswe/bounswe2024group6/issues/742)    |  3 hours     | 
| Frontend: Connect Quiz Creation     |  [issue772](https://github.com/bounswe/bounswe2024group6/issues/772)     |  5 hours     |
| Frontend: Add Image Upload Functionality to Quiz Creation Page |  [issue841](https://github.com/bounswe/bounswe2024group6/issues/841)    |  4 hours     | 
| Frontend: Bug Fixes     |  [issue851](https://github.com/bounswe/bounswe2024group6/issues/851)     |  2 hours     | 
| Frontend: Add Image Adding Functionality to Quiz Questions     |  [issue915](https://github.com/bounswe/bounswe2024group6/issues/915)  |  8 hours    |
| Frontend: Fix Quiz Related Skeletons |  [issue947](https://github.com/bounswe/bounswe2024group6/issues/947)    |  2 hours     | 
| Frontend: Show Quiz Image in Quiz Details Page    |  [issue949](https://github.com/bounswe/bounswe2024group6/issues/949)  |  3 hours     | 
| Frontend: Connect Quiz Options Recommendation   |  [issue847](https://github.com/bounswe/bounswe2024group6/issues/847)  |  3 hours     | 
| Frontend: Fix the Tests For Forum Post Composition   |  [issue936](https://github.com/bounswe/bounswe2024group6/issues/936)  |  2 hours     | 
| Create Quiz Review Test / Co-author for the related PR |  [issue984](https://github.com/bounswe/bounswe2024group6/issues/984)  |  2 hours     | 

##### Pull Requests

| Pull Requests                                         | Link                                                          | Action    |
|-------------------------------------------------------|---------------------------------------------------------------|-----------|
| fix(frontend): Displayed images on quiz details page  | [#950](https://github.com/bounswe/bounswe2024group6/pull/950) | Assigned  |
| fix(frontend): Added quiz related skeletons           | [#948](https://github.com/bounswe/bounswe2024group6/pull/948) | Assigned  |
| fix(frontend): Post compose tests are fixed           | [#937](https://github.com/bounswe/bounswe2024group6/pull/937) | Assigned  |
| Frontend: Add Image Adding Functionality to Quiz Questions | [#916](https://github.com/bounswe/bounswe2024group6/pull/916) | Assigned  |
| fix(frontend): Fixed quiz view and end                | [#852](https://github.com/bounswe/bounswe2024group6/pull/852) | Assigned  |
| feat(frontend): Recommend options while creating the quiz questions | [#850](https://github.com/bounswe/bounswe2024group6/pull/850) | Assigned  |
| Image Uploading                                       | [#844](https://github.com/bounswe/bounswe2024group6/pull/844) | Assigned  |
| feat(frontend): Connect quiz creation to backend      | [#790](https://github.com/bounswe/bounswe2024group6/pull/790) | Assigned  |
| feat(frontend): added quiz review test      | [#985](https://github.com/bounswe/bounswe2024group6/pull/985) | Assigned  |
| feat(frontend): added quiz review test                            | [#985](https://github.com/bounswe/bounswe2024group6/pull/985) | Reviewed  |
| Fix some Tests & Notification Page                                | [#983](https://github.com/bounswe/bounswe2024group6/pull/983) | Reviewed  |
| feat: add image to quiz headers                                   | [#981](https://github.com/bounswe/bounswe2024group6/pull/981) | Reviewed  |
| fix(frontend): fixed various things                               | [#980](https://github.com/bounswe/bounswe2024group6/pull/980) | Reviewed  |
| Show Description in Forum Card                                    | [#970](https://github.com/bounswe/bounswe2024group6/pull/970) | Reviewed  |
| Show Quiz Tags on Mobile                                          | [#962](https://github.com/bounswe/bounswe2024group6/pull/962) | Reviewed  |
| Admin Mobile-Backend Connection Fixes                             | [#954](https://github.com/bounswe/bounswe2024group6/pull/954) | Reviewed  |
| feat(frontend): complete activity stream notifications            | [#911](https://github.com/bounswe/bounswe2024group6/pull/911) | Reviewed  |
| feat(frontend): implement admin quiz delete and modify tags functionality | [#909](https://github.com/bounswe/bounswe2024group6/pull/909) | Reviewed  |
| fix(frontend): deduplicate tags in tag search autocomplete        | [#903](https://github.com/bounswe/bounswe2024group6/pull/903) | Reviewed  |
| feat(frontend): add searchable custom tags in quiz feed filtering | [#898](https://github.com/bounswe/bounswe2024group6/pull/898) | Reviewed  |
| feat(frontend): creating custom tags when creating quiz           | [#897](https://github.com/bounswe/bounswe2024group6/pull/897) | Reviewed  |
| feat(frontend): implement admin post/comment delete and modify tags functionality | [#893](https://github.com/bounswe/bounswe2024group6/pull/893) | Reviewed  |
| feat(frontend): show bookmarked comments in profile               | [#887](https://github.com/bounswe/bounswe2024group6/pull/887) | Reviewed  |
| feat(frontend): show is_banned information on profile             | [#886](https://github.com/bounswe/bounswe2024group6/pull/886) | Reviewed  |
| feat(frontend): added liked posts and comments to profile         | [#877](https://github.com/bounswe/bounswe2024group6/pull/877) | Reviewed  |
| Frontend 804: implemented all post-comment logic recursively      | [#871](https://github.com/bounswe/bounswe2024group6/pull/871) | Reviewed  |
| Frontend 855: implemented all profile image related features      | [#869](https://github.com/bounswe/bounswe2024group6/pull/869) | Reviewed  |
| feat(frontend): added liked quizzes to profile                    | [#843](https://github.com/bounswe/bounswe2024group6/pull/843) | Reviewed  |
| feat(frontend): added quiz recommendation feature                 | [#801](https://github.com/bounswe/bounswe2024group6/pull/801) | Reviewed  |
| Frontend 793: added quiz review functionality                     | [#796](https://github.com/bounswe/bounswe2024group6/pull/796) | Reviewed  |
| Frontend 777: initial guest view and some other features          | [#789](https://github.com/bounswe/bounswe2024group6/pull/789) | Reviewed  |
| feat(frontend): added followers and following list to profile as a popup | [#774](https://github.com/bounswe/bounswe2024group6/pull/774) | Reviewed  |
| feat(frontend): connected quiz forum with backend                 | [#741](https://github.com/bounswe/bounswe2024group6/pull/741) | Reviewed  |


##### Unit Tests
* [Compose Forum Post Tests](https://github.com/bounswe/bounswe2024group6/blob/main/frontend/src/pages/forumCompose.test.tsx)
* [Quiz Review Tests](https://github.com/bounswe/bounswe2024group6/blob/main/frontend/src/pages/quiz-review.test.tsx)

#### Yunus Emre Özdemir

##### Responsibilities
Throughout this milestone, I took on significant responsibilities in frontend development and testing, focusing on implementation of core features and administrative functionalities. My main areas of responsibility included:

1. **Core Feature Development**
   - Implemented the Search functionality, creating a comprehensive search interface
   - Developed the Guest View, ensuring appropriate access control
   - Implemented the Dictionary feature, enhancing language learning capabilities
   - Created the Bookmark Word functionality for personalized learning

2. **Administrative Features**
   - Developed comprehensive admin control features including:
     - User ban management system
     - Post/Comment moderation tools
     - Quiz moderation capabilities
     - Tag modification functionalities

3. **Tag System Enhancement**
   - Implemented custom tag creation for posts and quizzes
   - Developed searchable tag filtering for both forum and quiz sections

4. **User Interface Features**
   - Implemented profile-related features:
     - Ban status display
     - Bookmarked comments visualization
   - Integrated new activity stream notifications
   - Enhanced role management through cookie implementation

##### Main Contributions

1. **Major Implementations**
    - Developed the Search System
    - Created the Guest View Interface
    - Implemented the Dictionary Feature
    - Established the Admin Control

2. **Feature Enhancements**
    - Implemented the Tag Management System:
      - Custom tag creation
      - Searchable filtering
    - Enhanced User Profiles:
      - Word/Comment Bookmark functionality
      - Ban status integration
    - Improved activity notifications

3. **Testing and Documentation**
    - Wrote comprehensive unit tests for Guest and Admin views
    - Contributed to standards documentation
    - Conducted user testing for frontend features

4. **Collaborative Contributions**
    - Participated in lab assignments and documentation
    - Managed multiple feature-related pull requests
    - Contributed to milestone planning and implementation

##### Code-Related Significant Issues

| Task                                                                                   | Link                                                                                                     | Duration   |
|----------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------|------------|
| Frontend: Implement Search                                                   | [#797](https://github.com/bounswe/bounswe2024group6/issues/797)                                         | 3 hours    |
| Frontend: Complete Guest View                                                  | [#803](https://github.com/bounswe/bounswe2024group6/issues/803)                                         | 5 hours    |
| Frontend: Implement Dictionary                                                   | [#806](https://github.com/bounswe/bounswe2024group6/issues/806)                                         | 4 hours    |
| Frontend: Bookmark Word Functionality                                                   | [#809](https://github.com/bounswe/bounswe2024group6/issues/809)                                         | 1 hour    |
| Frontend: Keep Role in Cookies and Implement isAdmin Hook                                                   | [#821](https://github.com/bounswe/bounswe2024group6/issues/821)                                         | 30 minutes    |
| Frontend: Implement Admin Ban User Functionality                                                   | [#823](https://github.com/bounswe/bounswe2024group6/issues/823)                                         | 30 minutes    |
| Frontend: Implement Admin Post/Comment Delete and Modify Tags Functionality                                                 | [#824](https://github.com/bounswe/bounswe2024group6/issues/824)                                         | 45 minutes    |
| Frontend: Implement Admin Quiz Delete and Modify Tags Functionality                                                  | [#825](https://github.com/bounswe/bounswe2024group6/issues/825)                                         | 45 minutes    |
| Frontend: Creating Custom Tags When Creating Post                                                  | [#826](https://github.com/bounswe/bounswe2024group6/issues/826)                                         | 30 minutes    |
| Frontend: Searchable Custom Tags in Forum Filtering                                                   | [#827](https://github.com/bounswe/bounswe2024group6/issues/827)                                         | 30 minutes    |
| Frontend: Show isBanned Information on Profile                                                   | [#882](https://github.com/bounswe/bounswe2024group6/issues/882)                                         | 20 minutes    |
| Frontend: Show Bookmarked Comments in Profile                                                  | [#884](https://github.com/bounswe/bounswe2024group6/issues/884)                                         | 20 minutes    |
| Frontend: Creating Custom Tags When Creating Quiz                                                   | [#894](https://github.com/bounswe/bounswe2024group6/issues/894)                                         | 30 minutes    |
| Frontend: Searchable Custom Tags in Quiz Feed Filtering                                                   | [#895](https://github.com/bounswe/bounswe2024group6/issues/895)                                         | 30 minutes    |
| Frontend: Complete Activity Stream Notifications                                                   | [#901](https://github.com/bounswe/bounswe2024group6/issues/901)                                         | 1 hour    |
| Frontend: Deduplicate Tags in Tag Search Autocomplete                                                   | [#902](https://github.com/bounswe/bounswe2024group6/issues/902)                                         | 15 minutes    |
| Frontend: Write Guest and Admin View Unit Tests                                                   | [#934](https://github.com/bounswe/bounswe2024group6/issues/934)                                         | 1.5 hours    |


##### Management-Related Significant Issues

| Task                                                                                   | Link                                                                                                     | Duration   |
|----------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------|------------|
| Lab 8 - Standard(s) being followed (e.g. its documentation, implementation)                                                   | [#719](https://github.com/bounswe/bounswe2024group6/issues/719)                                         | 2 hours    |
| Lab: User Tests for Frontend                                                   | [#754](https://github.com/bounswe/bounswe2024group6/issues/754)                                         | 2 hours    |

##### Pull Requests

| Pull Requests                                     | Link                                                                 | Action    |
|---------------------------------------------------|----------------------------------------------------------------------|-----------|
| feat(frontend): implement search  | [#799](https://github.com/bounswe/bounswe2024group6/pull/799)       | Assigned  |
| feat(frontend): complete guest view  | [#805](https://github.com/bounswe/bounswe2024group6/pull/805)       | Assigned  |
| feat(frontend): implement dictionary  | [#808](https://github.com/bounswe/bounswe2024group6/pull/808)       | Assigned  |
| feat(frontend): implement bookmark word functionality  | [#818](https://github.com/bounswe/bounswe2024group6/pull/818)       | Assigned  |
| feat(frontend): creating custom tags when creating post  | [#873](https://github.com/bounswe/bounswe2024group6/pull/873)       | Assigned  |
| feat(frontend): searchable custom tags in custom filtering  | [#874](https://github.com/bounswe/bounswe2024group6/pull/874)       | Assigned  |
| feat(frontend): keep role in cookies and implement isAdmin hook  | [#875](https://github.com/bounswe/bounswe2024group6/pull/875)       | Assigned  |
| feat(frontend): implement admin ban user functionality  | [#881](https://github.com/bounswe/bounswe2024group6/pull/881)       | Assigned  |
| feat(frontend): show is_banned information on profile  | [#886](https://github.com/bounswe/bounswe2024group6/pull/886)       | Assigned  |
| feat(frontend): show bookmarked comments in profile  | [#887](https://github.com/bounswe/bounswe2024group6/pull/887)       | Assigned  |
| feat(frontend): implement admin post/comment delete and modify tags functionality  | [#893](https://github.com/bounswe/bounswe2024group6/pull/893)       | Assigned  |
| feat(frontend): creating custom tags when creating quiz  | [#897](https://github.com/bounswe/bounswe2024group6/pull/897)       | Assigned  |
| feat(frontend): add searchable custom tags in quiz feed filtering  | [#898](https://github.com/bounswe/bounswe2024group6/pull/898)       | Assigned  |
| fix(frontend): deduplicate tags in tag search autocomplete  | [#903](https://github.com/bounswe/bounswe2024group6/pull/903)       | Assigned  |
| feat(frontend): implement admin quiz delete and modify tags functionality  | [#909](https://github.com/bounswe/bounswe2024group6/pull/909)       | Assigned  |
| feat(frontend): complete activity stream notifications  | [#911](https://github.com/bounswe/bounswe2024group6/pull/911)       | Assigned  |
| feat(frontend): write guest and admin view unit tests  | [#939](https://github.com/bounswe/bounswe2024group6/pull/939)       | Assigned  |
| Lab 7 Pull Request  | [#507](https://github.com/bounswe/bounswe2024group6/pull/507)       | Contributed  |
| Lab 8 Pull Request  | [#712](https://github.com/bounswe/bounswe2024group6/pull/712)       | Contributed  |
| Frontend 739: connected quiz related pages with backend  | [#764](https://github.com/bounswe/bounswe2024group6/pull/764)       | Reviewed  |
| Frontend 765: added created and solved quizzes to profile page  | [#768](https://github.com/bounswe/bounswe2024group6/pull/768)       | Reviewed  |
| feat(frontend): added saved posts and quizzes to profile  | [#802](https://github.com/bounswe/bounswe2024group6/pull/802)       | Reviewed  |
| fix(backend): check authentication in user post feed  | [#816](https://github.com/bounswe/bounswe2024group6/pull/816)       | Reviewed  |
| Frontend 804: started implementing comment pages  | [#820](https://github.com/bounswe/bounswe2024group6/pull/820)       | Reviewed  |
| Frontend 855: implemented all profile image related features  | [#869](https://github.com/bounswe/bounswe2024group6/pull/869)       | Reviewed  |
| feat(backend): is_banned field on profile endpoint  | [#883](https://github.com/bounswe/bounswe2024group6/pull/883)       | Reviewed  |
| Frontend: Add Image Adding Functionality to Quiz Questions  | [#916](https://github.com/bounswe/bounswe2024group6/pull/916)       | Reviewed  |
| Frontend 926: added skeletons to pages  | [#935](https://github.com/bounswe/bounswe2024group6/pull/935)       | Reviewed  |
| fix(frontend): post compose tests are fixed  | [#937](https://github.com/bounswe/bounswe2024group6/pull/937)       | Reviewed  |
| Frontend 924: implementation of resume/start  | [#940](https://github.com/bounswe/bounswe2024group6/pull/940)       | Reviewed  |
| Profile Page Fixes for PostCard and CommentCard pages  | [#943](https://github.com/bounswe/bounswe2024group6/pull/943)       | Reviewed  |
| fix(frontend): made forum recursive AGAIN  | [#944](https://github.com/bounswe/bounswe2024group6/pull/944)       | Reviewed  |
| fix(frontend): Displayed images on quiz details page  | [#950](https://github.com/bounswe/bounswe2024group6/pull/950)       | Reviewed  |
| fix(frontend): fixed profileEdit.test  | [#953](https://github.com/bounswe/bounswe2024group6/pull/953)       | Reviewed  |

##### Unit Tests

In this milestone, I significantly expanded the unit test coverage for the Forum component by implementing comprehensive test suites for different user roles. The updated `forum.test.tsx` now includes separate test suites for guest users, authenticated users, and admin users, providing better test isolation and more thorough validation of role-specific functionality.

Code can be found here: [https://github.com/bounswe/bounswe2024group6/blob/main/frontend/src/pages/forum.test.tsx](https://github.com/bounswe/bounswe2024group6/blob/main/frontend/src/pages/forum.test.tsx)

Key improvements include:

1. Implemented a robust mock setup function (setupAuthMocks) that configures authentication states for different user roles, making the tests more maintainable and reducing code duplication.

2. Added dedicated test suites for each user role:
   - Guest users: Verified basic rendering functionality and confirmed appropriate restrictions on interactions like the inability to like posts
   - Authenticated users: Validated additional permissions such as the ability to like posts while ensuring admin features remain hidden
   - Admin users: Tested admin-specific functionality including the visibility of admin controls

3. Enhanced existing tests with better assertions and more specific test cases, improving the overall test coverage and reliability.

These improvements ensure that the Forum component's behavior is correctly validated across different user roles, helping maintain the application's security and user experience requirements. The modular test structure also makes it easier to add new test cases for future feature additions.

#### Elif Nur Deniz
##### Responsibilities
Throughout this milestone, I focused on frontend development, design enhancements, and feature implementation to improve the user experience and ensure smooth functionality. My responsibilities included:
1. **Feature Development**:
  * Developed key features, profile image functionality, recursive post-comment pages, and quiz recommendations.
  * Finalised user profiles by adding solved/created quizzes, liked posts/quizzes, and saved content management.
  * Connected almost all quiz-related frontend pages to the backend, ensuring seamless functionality and integration.
2. **Design Enhancements**:
  * Improved quiz feed with filtering and sorting options and redesigned the end-of-quiz interface for better usability.
  * Implemented skeleton loaders across pages for a smoother user experience during loading.
3. **Bug Fixing and Testing**:
  * Fixed issues with post first-level comments, access token/guest view, and profile edit tests.
  * Conducted unit tests, including the quiz review test, to ensure reliability and functionality.
4. **Planning**:
  * Documented primary and domain-specific features in Lab 8 to guide feature development and testing.
  * Coordinated tasks efficiently to meet milestone deadlines and ensure smooth pull request management.

##### Main Contributions

###### Code Related Significant Issues
| Task    | Duration   |
|------------------------|------------|
|[Create Quiz Review Test](https://github.com/bounswe/bounswe2024group6/issues/984)|2 hours|
|[Last Touches](https://github.com/bounswe/bounswe2024group6/issues/966)|1.5 hours|
|[Fix Edit Profile Test](https://github.com/bounswe/bounswe2024group6/issues/945)|1 hours|
|[Fix Post's First Level Comments Issue](https://github.com/bounswe/bounswe2024group6/issues/942)|45 minutes|
|[Add Skeletons While Page Is Loading](https://github.com/bounswe/bounswe2024group6/issues/926)|2 hours|
|[Implement Quiz Start/Resume Logic](https://github.com/bounswe/bounswe2024group6/issues/924)|1.5 hours|
|[Implement Profile Image Feature](https://github.com/bounswe/bounswe2024group6/issues/855)|3 hours|
|[Implement liked quizzes and posts](https://github.com/bounswe/bounswe2024group6/issues/819)|3 hours|
|[Implement Recursive Post-Comment Pages](https://github.com/bounswe/bounswe2024group6/issues/804)|4 hours|
|[Frontend: Implement Saved Tab Functionality in Profile](https://github.com/bounswe/bounswe2024group6/issues/800)|45 minutes|
|[Quiz Recommendation Feature](https://github.com/bounswe/bounswe2024group6/issues/798)|2 hours|
|[Frontend: Quiz Review](https://github.com/bounswe/bounswe2024group6/issues/793)|2 hours|
|[Add Filtering And Sorting To Quiz Feed](https://github.com/bounswe/bounswe2024group6/issues/791)|45 minutes|
|[FRONTEND: End Of the Quiz Should Be Fixed](https://github.com/bounswe/bounswe2024group6/issues/777)|3 hours|
|[Handle Guest View](https://github.com/bounswe/bounswe2024group6/issues/776)|3 hours|
|[Implement Followers-Following List In Profile](https://github.com/bounswe/bounswe2024group6/issues/770)|2 hours|
|[Add Solved and Created Quizzes To Profile](https://github.com/bounswe/bounswe2024group6/issues/765)|4 hours|
|[Frontend: Connect Quiz Related Pages To Backend](https://github.com/bounswe/bounswe2024group6/issues/739)|8 hours|

###### Non-Code Related Significant Issues
| Task    | Duration   |
|------------------------|------------|
|[Lab 8 - Primary and Domain Specific Features Documentation](https://github.com/bounswe/bounswe2024group6/issues/717)|2 hours|

##### Unit Tests
* Quiz Review Test: [[1](https://github.com/bounswe/bounswe2024group6/pull/985)]
* Edit Profile Test: [[2](https://github.com/bounswe/bounswe2024group6/pull/953)]

##### Pull Requests
| Pull Requests                                     | Action    |
|---------------------------------------------------|-----------|
|[feat(frontend): connected quiz forum with backend](https://github.com/bounswe/bounswe2024group6/pull/741)|assigned|
|[Frontend 739: connected quiz related pages with backend](https://github.com/bounswe/bounswe2024group6/pull/764)|assigned|
|[Frontend 765: added created and solved quizzes to profile page](https://github.com/bounswe/bounswe2024group6/pull/768) |assigned|
|[feat(frontend): added followers and following list to profile as a popup](https://github.com/bounswe/bounswe2024group6/pull/774)|assigned|
|[Frontend 777: inital guest view and some other features](https://github.com/bounswe/bounswe2024group6/pull/789)|assigned|
|[Frontend 793: added quiz review functionality](https://github.com/bounswe/bounswe2024group6/pull/796)|assigned|
|[feat(frontend): added quiz recommendation feature](https://github.com/bounswe/bounswe2024group6/pull/801) |assigned|
|[feat(frontend): added saved posts and quizzes to profile](https://github.com/bounswe/bounswe2024group6/pull/802)|assigned|
|[Frontend 804: started implementing comment pages](https://github.com/bounswe/bounswe2024group6/pull/820) |assigned|
|[Frontend 819: fixed issues related to access token/guest](https://github.com/bounswe/bounswe2024group6/pull/840)|assigned|
|[feat(frontend): added liked quizzes to profile](https://github.com/bounswe/bounswe2024group6/pull/843)|assigned|
|[Frontend 855: implemented all profile image related features](https://github.com/bounswe/bounswe2024group6/pull/869)|assigned|
|[Frontend 804: implemented all post-comment logic recursively](https://github.com/bounswe/bounswe2024group6/pull/871) |assigned|
|[feat(frontend): added liked posts and comments to profile](https://github.com/bounswe/bounswe2024group6/pull/877)|assigned|
|[Frontend 926: added skeletons to pages](https://github.com/bounswe/bounswe2024group6/pull/935)|assigned|
|[Frontend 924: implementation of resume/start](https://github.com/bounswe/bounswe2024group6/pull/940)|assigned|
|[fix(frontend): made forum recursive AGAIN](https://github.com/bounswe/bounswe2024group6/pull/944)|assigned|
|[fix(frontend): fixed profileEdit.test ](https://github.com/bounswe/bounswe2024group6/pull/953)|assigned|
|[fix(frontend): fixed various things](https://github.com/bounswe/bounswe2024group6/pull/980) |assigned|
|[feat(frontend): added quiz review test](https://github.com/bounswe/bounswe2024group6/pull/985) |assigned|
|[1](https://github.com/bounswe/bounswe2024group6/pull/873)|reviewed|
|[2](https://github.com/bounswe/bounswe2024group6/pull/818)|reviewed|
|[3](https://github.com/bounswe/bounswe2024group6/pull/808)|reviewed|
|[4](https://github.com/bounswe/bounswe2024group6/pull/805)|reviewed|
|[5](https://github.com/bounswe/bounswe2024group6/pull/799)|reviewed|
|[6](https://github.com/bounswe/bounswe2024group6/pull/939)|reviewed|
|[7](https://github.com/bounswe/bounswe2024group6/pull/881)|reviewed|
|[8](https://github.com/bounswe/bounswe2024group6/pull/875)|reviewed|
|[9](https://github.com/bounswe/bounswe2024group6/pull/874)|reviewed|
|[10](https://github.com/bounswe/bounswe2024group6/pull/948)|reviewed|
|[11](https://github.com/bounswe/bounswe2024group6/pull/852)|reviewed|
|[12](https://github.com/bounswe/bounswe2024group6/pull/850)|reviewed|
|[13](https://github.com/bounswe/bounswe2024group6/pull/844)|reviewed|
|[14](https://github.com/bounswe/bounswe2024group6/pull/790)|reviewed|
|[15](https://github.com/bounswe/bounswe2024group6/pull/927)|reviewed|
|[16](https://github.com/bounswe/bounswe2024group6/pull/836)|reviewed|
|[17](https://github.com/bounswe/bounswe2024group6/pull/813)|reviewed|
|[18](https://github.com/bounswe/bounswe2024group6/pull/784)|reviewed|
|[19](https://github.com/bounswe/bounswe2024group6/pull/767)|reviewed|
|[20](https://github.com/bounswe/bounswe2024group6/pull/761)|reviewed|
|[21](https://github.com/bounswe/bounswe2024group6/pull/760)|reviewed|


##### Additional Information 
* I always tried to start early to my tasks in order to have enough time for improvements, catching errors and revising features with my teammates. 
* Me and my frontend teammates were careful and detail oriented with the designs. We spend a lot of time discussing and improving page designs. Thus, we cared more than just functionality.
* I was involved in all the feature development processes. I knew the requirements and all the missing parts in the project and I constantly gave feedback to both backend and frontend team.


### Backend Team
#### Kaan Yolcu 
##### Responsibilities
- Semantically multiple choice generation
- Management of Wordnet , Lexvo and Pexels API
- Image generation with queries
- Integration of image uploading to quizzes, questions and multiple choices , for this part a long modifying process happened for quiz endpoints.
- Modified docker configurations for image integration
- Search , Image and Word unit tests written for testing

##### Main Contributions
Uploading and generating images are integrated so that many file and endpoint had to be modified including docker configurations . Wordnet and Lexvo endpoints used for capturing the semantical relation between words and written many endpoints,  functions in addition to the milestone 2 delivirables . The system needed to be speed up also that has to be used a cache . And contributed to many hotfixes that frontend team has requested.
##### Code Related Significant Issues

 
| Task                                | Link                                | Duration |
|-------------------------------------|-------------------------------------------|----------|
| Image generation endpoitns with external API |  [issue735](https://github.com/bounswe/bounswe2024group6/issues/735)     |  2 hours     | 
| Uploading and Generating Image Integration with Quiz Endpoints |  [issue738](https://github.com/bounswe/bounswe2024group6/issues/738)    |  6 hours | 
| Multiple choice optimization with Wordnet and more Semantically   |  [issue755](https://github.com/bounswe/bounswe2024group6/issues/755)     |  6 hours     |
| Update Quiz Activity Stream |  [issue834](https://github.com/bounswe/bounswe2024group6/issues/834)     |  1 hours     | 
|Caching for Speed Up the Application |  [issue946](https://github.com/bounswe/bounswe2024group6/issues/946)     |  3 hours     | 
| Fix: Authentication remove for guest user profile views |[issue959](https://github.com/bounswe/bounswe2024group6/issues/959)| 30 minutes |
| Image generation Endpoint with URL  |  [issue963](https://github.com/bounswe/bounswe2024group6/issues/963)   |  30 minutes     | 
| Unit Tests for Image Endpoints  |  [issue975](https://github.com/bounswe/bounswe2024group6/issues/975)     |  1 hours     | 
| Unit Tests for Search Endpoints  |  [issue978](https://github.com/bounswe/bounswe2024group6/issues/978)     |  1 hours     | 

##### Management Related Significant Issues



##### Pull Requests

| Pull Requests                                         | Link                                                          | Action    |
|-------------------------------------------------------|---------------------------------------------------------------|-----------|
| search unit tests  | [#979](https://github.com/bounswe/bounswe2024group6/pull/979) | Assigned  |
| image unit tests          | [#976](https://github.com/bounswe/bounswe2024group6/pull/976) | Assigned  |
| removed authentication for guest users         | [#968](https://github.com/bounswe/bounswe2024group6/pull/960) | Assigned  |
| additional image generation endpoint returning URL       | [#964](https://github.com/bounswe/bounswe2024group6/pull/964) | Assigned  |
| caching mechanism for speed up application | [#958](https://github.com/bounswe/bounswe2024group6/pull/958) | Assigned  |
| choice fix | [#879](https://github.com/bounswe/bounswe2024group6/pull/879) | Assigned  |
| quiz endpoints updated with image uploading and generation functionality also made necessary docker configurations and updated serializers and done other various things           | [#788](https://github.com/bounswe/bounswe2024group6/pull/788) | Assigned  |
| multiple choice generation functionality | [#788](https://github.com/bounswe/bounswe2024group6/pull/771) | Assigned  |
| added only the first meaning when fetching the meaning  | [#740](https://github.com/bounswe/bounswe2024group6/pull/740) | Assigned  |
| image generatipn endpoint with an external API | [#736](https://github.com/bounswe/bounswe2024group6/pull/736) | Assigned  |


##### Unit Tests
* [Image and Quiz Tests](https://github.com/bounswe/bounswe2024group6/blob/main/backend/app/tests/unit/test_8_images.py)
* [Search Tests](https://github.com/bounswe/bounswe2024group6/blob/main/backend/app/tests/unit/test_8_search_test.py)
  

#### Oktay Özel

##### Responsibilities
Throughout this milestone, I took on significant responsibilities in backend development and testing, focusing on implementation of forum related features and hot fixes functionalities as well as testing. In this milestone I have especially focused on testing and developed 54 tests as well as refactoring the testing base to a seperate directory instead of a single page. I have seperated unit and integration tests so that we had a clean code. at the end.


##### Code-Related Significant Issues


| Task                                      | Link                                                                         | Duration   |
|-------------------------------------------|------------------------------------------------------------------------------|------------|
| bookmark feature for comments, and posts        | [Issue #849](https://github.com/bounswe/bounswe2024group6/issues/849)         | 2 hour      |
| Refactoring all tests and cover all backend with tests            | [Issue #864](https://github.com/bounswe/bounswe2024group6/issues/864)         | 1 day     |
| Profile Picture addition endpoints and functionality | [Issue #865](https://github.com/bounswe/bounswe2024group6/issues/865)         | 3 hours     |
| Reply Comments, Recursive comments and endpoints                | [Issue #888](https://github.com/bounswe/bounswe2024group6/issues/888)         | 2 hours     |
| Testing Comments during the Lab      | [Issue #751](https://github.com/bounswe/bounswe2024group6/issues/751)         |  2 hours     |
|Milestone 3 Preperation and Report   | [Issue #991](https://github.com/bounswe/bounswe2024group6/issues/991)         |  2 hours     |



| Task                                                 | Link                                                                                       | Duration   |
|------------------------------------------------------|--------------------------------------------------------------------------------------------|------------|
| Merge and Integration of Pull Requests               | [Commit](https://github.com/bounswe/bounswe2024group6/commit/fc778710ee62dbbf3d20d9fd5c5ef651521b1eb9) (PR #885), [Commit](https://github.com/bounswe/bounswe2024group6/commit/0f0fc96160d7e94a6272577741eec3625e8ab99f) (PR #862), [Commit](https://github.com/bounswe/bounswe2024group6/commit/43d9fc6e9356bc0ac0a95a833f4b835d11e9374e) (PR #863) | 5 hours      |
| 54 Unit and Integration tests in total as well as testing structure refactoring                        | [Commit](https://github.com/bounswe/bounswe2024group6/commit/dc7e48c4cfeabfebcaf3656e69ac7617986a60de) (follow_unfollow_tests), [Commit](https://github.com/bounswe/bounswe2024group6/commit/a51475a4983d10003bd076c9c4369740ffff5ed5) (tests for posts and comments)    | 3 hours     |
| Bookmark and Comment Features                        | [Commit](https://github.com/bounswe/bounswe2024group6/commit/be6b80293a64bba3c41659810699d7359b76829a) (is_bookmarked update), [Commit](https://github.com/bounswe/bounswe2024group6/commit/b290a9c85301fdfa68901f9a3db336b2d9582af0) (Comment Bookmark model serializer) | 2 hours     |
| Refactoring and Code Cleanup                         | [Commit](https://github.com/bounswe/bounswe2024group6/commit/d6e5a77a5337380fcb7441e187e7c525053d15f7) (Add tests folder), [Commit](https://github.com/bounswe/bounswe2024group6/commit/69a80130c3193b8d1b2d45aef94ac1e406855904) (.env_example), [Commit](https://github.com/bounswe/bounswe2024group6/commit/9c4641e9c0b286361bca82d4ed0763cd8e54f7fd) (separating view files) | 6 hours     |
| Profile and Guest Access Features                    | [Commit](https://github.com/bounswe/bounswe2024group6/commit/addcaa477f8fe7bd3491088af610f76cd6da455f) (profile picture), [Commit](https://github.com/bounswe/bounswe2024group6/commit/2fc8397e3e896b4e4c540001c5fb276e2adc4915) (guest access to post feed)  | 2 hours     |
| Hotfixes and Corrections                             | [Commit](https://github.com/bounswe/bounswe2024group6/commit/1b421d0228da9530c6a00b23d42726d128c80865) (typo in import), [Commit](https://github.com/bounswe/bounswe2024group6/commit/f6438d9770749ca994e2b5f15f86dac716ee4f6e) (missing imports), [Commit](https://github.com/bounswe/bounswe2024group6/commit/81bcb8a66845ab87b1ab9c2c84308b4291298beb) (hot fix static import)  | 3 hours      |

##### Unit Tests
I have implemented 54 tests in total.
* test_1_authentication_flow.py
* test_2_authentication_and_profile.py
* 
* test_1_authentication_views.py
* test_2_profile_views.py
* test_3_post_views.py
* test_4_comments.py
* test_5_comment_bookmarks.py
* test_6_feed_views.py
* test_7_follow_unfollow.py
* test_8_images.py


##### Summary

Throughout the project, I have served as a Backend Team member. I was responsible from all the forum, profile, post, comment, like, bookmark endpoints. I also have created 54 unit and integration tests for the implemented endpoints. I also have formed the backbone of the project and initial codes. My tasks was not limited to this, I also have implemented other key functionalities like activity streams, authentication, user model etc. I also have given support to project design, diagrams, organizing weekly meetings throughout the project. While we are establising the connection of backend and frontend-mobile, I have given the necessary support and immediate bug fixes to frontend and backend teams.

#### Aras Taşçı
##### Responsibilities
As a member of the backend team, my main responsibilities were to ensure seamless communication between the "quiz" part of the backend and the frontend. I also took responsibility for the backend related managemental issues, such as the app's deployment and maintenance and provided creative solutions for urgent problems to ensure continuous development. I was quick to respond to the requests of our web / mobile teams and always kept in touch with them, making sure our development process was advancing. I worked closely with the frontend team to ensure smooth integration of APIs and resolved issues promptly.

I also contributed to project management through efficient backend deployments (although they didn't have their respective issues). In the previous milestone, I provided various auxiliary tools for backend deployment, such as a shell script for the team to use to deploy the backend with ease. For this milestone, to ensure we get the needed computational power (as the other machine kept running out of memory because of its low RAM (it was just 1 GiB)), we switched the backend from the t1 micro instance in AWS EC2 to a more powerful and and affordable instance in DigitalOcean with Oguz. From there on, I managed the deployment process as it was before - I was the go-to guy in any backend-related problem and took responsibility for handling all problems on-the-go.
##### Main Contributions

###### Code-Related Significant Issues
Below are the issues I were assigned to, in tabular format. You can see I was very versatile in the backend, touching all aspects of the project, from quizzes to comments, from implementing activity streams for every activity we have in the app to implementing new features such as bookmarking words: 
| Issue Title                                                                                     | Link                                                                                      | Action    | Time Taken  |
|-------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------|-----------|-------------|
| Backend: Implement Administrator Functionalities                                               | [#748](https://github.com/bounswe/bounswe2024group6/issues/748)                          | Assigned  | 2 hours     |
| Backend: Swagger Documentation                                                                 | [#749](https://github.com/bounswe/bounswe2024group6/issues/749)                          | Assigned  | 1.5 hours   |
| Backend: Cancelling Quiz Attempts                                                              | [#758](https://github.com/bounswe/bounswe2024group6/issues/758)                          | Assigned  | 1 hour      |
| Backend: Finalizing Guest Quiz Requirements                                                    | [#759](https://github.com/bounswe/bounswe2024group6/issues/759)                          | Assigned  | 1.5 hours   |
| Backend: Implement Bookmarking Words Endpoints                                                | [#762](https://github.com/bounswe/bounswe2024group6/issues/762)                          | Assigned  | 1 hour      |
| Backend: Automatically Create Quizzes from Incorrectly Answered Questions                     | [#769](https://github.com/bounswe/bounswe2024group6/issues/769)                          | Assigned  | 2 hours     |
| Add Missing Fields To Quiz Results                                                            | [#766](https://github.com/bounswe/bounswe2024group6/issues/766)                          | Assigned  | 1.5 hours   |
| Backend: Admin Ban Endpoint                                                                    | [#786](https://github.com/bounswe/bounswe2024group6/issues/786)                          | Assigned  | 1.5 hours   |
| Backend: Remove Authentication for Post Details                                               | [#782](https://github.com/bounswe/bounswe2024group6/issues/782)                          | Assigned  | 1 hour      |
| Backend: Remove Auth in get_comments_by_id Endpoint                                            | [#812](https://github.com/bounswe/bounswe2024group6/issues/812)                          | Assigned  | 30 mins     |
| Backend: Additional Activity Streams                                                          | [#814](https://github.com/bounswe/bounswe2024group6/issues/814)                          | Assigned  | 1.5 hours   |
| Backend: Check Authentication in User Post Feed                                               | [#815](https://github.com/bounswe/bounswe2024group6/issues/815)                          | Assigned  | 1 hour      |
| Add Unfinished Quiz Label                                                                     | [#817](https://github.com/bounswe/bounswe2024group6/issues/817)                          | Assigned  | 1 hour      |
| Backend: Implement Endpoint to Check if the Current User is Admin                             | [#822](https://github.com/bounswe/bounswe2024group6/issues/822)                          | Assigned  | 1.5 hours   |
| Backend: Return isBanned Field in Profile                                                     | [#880](https://github.com/bounswe/bounswe2024group6/issues/880)                          | Assigned  | 1 hour      |
| Backend: Profile Get Posts' Author As Well                                                    | [#922](https://github.com/bounswe/bounswe2024group6/issues/922)                          | Assigned  | 1 hour      |
| Change Cancel Quiz Endpoint                                                                   | [#925](https://github.com/bounswe/bounswe2024group6/issues/925)                          | Assigned  | 1 hour     |
| Backend: Comments in Profile Endpoint Correctly Returning Context Related Fields              | [#931](https://github.com/bounswe/bounswe2024group6/issues/931)                          | Assigned  | 1.5 hours   |
| Backend: Unit Tests for Quiz Endpoints                                                        | [#977](https://github.com/bounswe/bounswe2024group6/issues/977)                          | Assigned  | 2 hours     |


###### Management-Related Significant Issues


| Issue Title                                                                                     | Link                                                                                      | Action    | Time Taken  |
|-------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------|-----------|-------------|
| Backend: Modify Main Docker-Compose File According to Backend Dev YAML File Changes           | [#973](https://github.com/bounswe/bounswe2024group6/issues/973)                          | Assigned  | 1 hour      |
| API and API Documentation Acceptance Criteria                                                 | [#718](https://github.com/bounswe/bounswe2024group6/issues/718)                          | Assigned  | 2 hours     |
---

##### Pull Requests

| Pull Request Title                                          | Link                                                                                      | Action    | Time Taken  |
|-------------------------------------------------------------|-------------------------------------------------------------------------------------------|-----------|-------------|
| chore: put database content in repo                        | [#989](https://github.com/bounswe/bounswe2024group6/pull/989)                            | Assigned  | 1 hour      |
| chore(backend): quiz tests                                  | [#986](https://github.com/bounswe/bounswe2024group6/pull/986)                            | Assigned  | 2 hours     |
| chore: modify docker-compose.yml file according to new docker configuration | [#974](https://github.com/bounswe/bounswe2024group6/pull/974)                            | Assigned  | 1.5 hours   |
| fix: pass context to commentserializer in profile serializer | [#932](https://github.com/bounswe/bounswe2024group6/pull/932)                            | Assigned  | 1.5 hours   |
| feat: cancel quiz given quiz_id                            | [#927](https://github.com/bounswe/bounswe2024group6/pull/927)                            | Assigned  | 1.5 hours   |
| impr: give author info on profile posts                    | [#923](https://github.com/bounswe/bounswe2024group6/pull/923)                            | Assigned  | 1 hour      |
| feat(backend): is_banned field on profile endpoint         | [#883](https://github.com/bounswe/bounswe2024group6/pull/883)                            | Assigned  | 1.5 hours   |
| feat(backend): automatic quiz creation from wrong questions | [#878](https://github.com/bounswe/bounswe2024group6/pull/878)                            | Assigned  | 2 hours     |
| feat(backend): Check if the Current User is Admin          | [#837](https://github.com/bounswe/bounswe2024group6/pull/837)                            | Assigned  | 1.5 hours   |
| feat(backend): Add Unfinished Progress Label to Quiz Details | [#836](https://github.com/bounswe/bounswe2024group6/pull/836)                            | Assigned  | 1 hour      |
| misc(backend): Requested Activity Streams                  | [#835](https://github.com/bounswe/bounswe2024group6/pull/835)                            | Assigned  | 1.5 hours   |
| fix(backend): check authentication in user post feed       | [#816](https://github.com/bounswe/bounswe2024group6/pull/816)                            | Assigned  | 1 hour      |
| fix(backend): comments are viewable by anyone              | [#813](https://github.com/bounswe/bounswe2024group6/pull/813)                            | Assigned  | 1 hour      |
| feat(backend): admins now have banhammers                  | [#787](https://github.com/bounswe/bounswe2024group6/pull/787)                            | Assigned  | 1.5 hours   |
| fix(backend): proper anonymous user handling in post details endpoint | [#785](https://github.com/bounswe/bounswe2024group6/pull/785)                            | Assigned  | 1 hour      |
| impr: remove auth for post details                         | [#784](https://github.com/bounswe/bounswe2024group6/pull/784)                            | Assigned  | 1 hour      |
| impr(backend): Add Missing Fields to Quiz Results          | [#767](https://github.com/bounswe/bounswe2024group6/pull/767)                            | Assigned  | 1.5 hours   |
| feat(backend): Bookmarking Words                          | [#763](https://github.com/bounswe/bounswe2024group6/pull/763)                            | Assigned  | 1.5 hours   |
| feat(backend): Finalize guest-quiz requirements            | [#761](https://github.com/bounswe/bounswe2024group6/pull/761)                            | Assigned  | 1.5 hours   |
| feat(backend): implement quiz canceling                   | [#760](https://github.com/bounswe/bounswe2024group6/pull/760)                            | Assigned  | 2 hours     |
| feat(backend): Implement Admin Functionalities            | [#757](https://github.com/bounswe/bounswe2024group6/pull/757)                            | Assigned  | 2 hours     |
| feat(mobile): add unit tests and remove old ones          | [#990](https://github.com/bounswe/bounswe2024group6/pull/990)                            | Reviewed  | -           |
| search unit tests                                          | [#979](https://github.com/bounswe/bounswe2024group6/pull/979)                            | Reviewed  | -           |
| image unit tests                                           | [#976](https://github.com/bounswe/bounswe2024group6/pull/976)                            | Reviewed  | -           |
| Image url returning endpoint                               | [#964](https://github.com/bounswe/bounswe2024group6/pull/964)                            | Reviewed  | -           |
| Removed Authentication for Guest Users                    | [#960](https://github.com/bounswe/bounswe2024group6/pull/960)                            | Reviewed  | -           |
| Frontend 819: fixed issues related to access token/guest   | [#840](https://github.com/bounswe/bounswe2024group6/pull/840)                            | Reviewed  | -           |
| Let admins delete comments of everyone (BACKEND)          | [#795](https://github.com/bounswe/bounswe2024group6/pull/795)                            | Reviewed  | -           |
| Quiz endpoints are updated with Image Uploading           | [#788](https://github.com/bounswe/bounswe2024group6/pull/788)                            | Reviewed  | -           |
| added image endpoints                                      | [#736](https://github.com/bounswe/bounswe2024group6/pull/736)                            | Reviewed  | -           |


##### Unit Tests
Below is the list of unit tests I wrote:

1. **test_get_quiz**: Verify if a quiz is correctly retrieved by its ID.
2. **test_view_quizzes**: Ensure quizzes feed returns the correct data.
3. **test_create_quiz_success**: Test the successful creation of a quiz.
4. **test_create_quiz_missing_title**: Verify that creating a quiz without a title fails.
5. **test_get_question**: Check if a specific question is correctly retrieved.
6. **test_solve_question**: Test the process of solving a quiz question.
7. **test_submit_quiz**: Validate quiz submission and result calculation.
8. **test_start_quiz**: Verify if a quiz starts correctly and returns progress details.
9. **test_get_quiz_results**: Ensure quiz results retrieval works as expected.
10. **test_like_quiz**: Test liking and unliking quizzes functionality.
11. **test_bookmark_quiz**: Check bookmarking and unbookmarking quizzes functionality.
12. **test_view_bookmarked_quizzes**: Validate retrieval of bookmarked quizzes.
13. **test_view_liked_quizzes**: Verify retrieval of liked quizzes.
14. **test_view_created_quizzes**: Test if created quizzes are correctly listed.
15. **test_view_solved_quizzes**: Check retrieval of solved quizzes.
16. **test_delete_quiz_unauthorized**: Test unauthorized quiz deletion attempt.
17. **test_delete_quiz_as_staff**: Verify quiz deletion as a staff user.
18. **test_update_quiz_unauthorized**: Test unauthorized quiz update attempt.
19. **test_update_quiz_authorized**: Verify authorized quiz update.
20. **test_cancel_quiz**: Check cancellation of a quiz progress.
21. **test_cancel_quiz_id**: Verify cancellation of quizzes by their ID.


#### Halil Özkan

##### Responsibilities

As a member of the backend team, my main responsibilities included ensuring that our backend systems communicated effectively with the frontend. I was tasked with fixing bugs, adding new features, and improving existing functionalities to enhance the overall performance and user experience of our application. Additionally, I played a key role in reviewing and merging pull requests from my teammates, which helped maintain the integrity and quality of our codebase. I also managed deployment processes and collaborated closely with other team members to address any backend-related issues promptly.

---

##### Main Contributions

###### Code-Related Significant Issues

I worked on several important backend issues that were crucial for the stability and functionality of our application. Below is a detailed overview of these issues:

| Issue Title                                                                                     | Link                                                                                      | Status      |
|-------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------|-------------|
| **Final report final release notes**                                                            | [#992](https://github.com/bounswe/bounswe2024group6/issues/992)                          | Open        |
| *Description:* Prepared the final release notes summarizing all major updates and changes.      |                                                                                           |             |
| **Backend: Search Posts return the is_bookmark and is_liked fields wrong bug**                  | [#968](https://github.com/bounswe/bounswe2024group6/issues/968)                          | To Do       |
| *Description:* Fixed a bug where search posts were incorrectly returning `is_bookmark` and `is_liked` fields. |                                                                                           |             |
| **API and API Documentation Acceptance Criteria**                                               | [#718](https://github.com/bounswe/bounswe2024group6/issues/718)                          | Open        |
| *Description:* Defined and reviewed the acceptance criteria for our API and its documentation to ensure clarity and completeness. |                                                                                           |             |
| **Add quiz level to search**                                                                    | [#906](https://github.com/bounswe/bounswe2024group6/issues/906)                          | Closed      |
| *Description:* Added a new feature that allows users to filter search results based on quiz levels. |                                                                                           |             |
| **To see liked posts liked comments**                                                           | [#860](https://github.com/bounswe/bounswe2024group6/issues/860)                          | Closed      |
| *Description:* Enabled functionality for users to view posts and comments they have liked.     |                                                                                           |             |
| **Backend: Returning the 'profile_picture' field in User Search**                               | [#831](https://github.com/bounswe/bounswe2024group6/issues/831)                          | To Do       |
| *Description:* Implemented the feature to include the `profile_picture` field when searching for users. |                                                                                           |             |
| **Fix get_comment_by_id**                                                                        | [#810](https://github.com/bounswe/bounswe2024group6/issues/810)                          | Closed      |
| *Description:* Resolved an issue where fetching a comment by its ID was not working correctly.  |                                                                                           |             |
| **Update Feed**                                                                                 | [#778](https://github.com/bounswe/bounswe2024group6/issues/778)                          | Closed      |
| *Description:* Updated the feed functionality to display the most recent and relevant posts.   |                                                                                           |             |

###### Pull Requests

I actively contributed to the project by submitting and reviewing pull requests (PRs). These PRs included new features, bug fixes, and improvements to our backend systems. Below is a detailed list of my contributions through PRs:

| Pull Request Title                                 | Link                                                                                      | Status  | Notes                                                  |
|----------------------------------------------------|-------------------------------------------------------------------------------------------|---------|--------------------------------------------------------|
| **added quiz level on search**                     | [#907](https://github.com/bounswe/bounswe2024group6/pull/907)                            | Merged  | Added the ability to filter search results by quiz level, enhancing user experience. |
| **reply to comments functionality**                | [#863](https://github.com/bounswe/bounswe2024group6/pull/863)                            | Merged  | Implemented a feature that allows users to reply to comments, improving interaction. |
| **added necessary endpoints**                      | [#862](https://github.com/bounswe/bounswe2024group6/pull/862)                            | Merged  | Approved and integrated new backend endpoints to support additional features. |
| **fix in search**                                  | [#858](https://github.com/bounswe/bounswe2024group6/pull/858)                            | Merged  | Improved the accuracy and performance of the search functionality by addressing existing issues. |
| **is_bookmarked**                                  | [#856](https://github.com/bounswe/bounswe2024group6/pull/856)                            | Merged  | Fixed the bookmarking fields to ensure they correctly reflect user actions. |
| **fixed the problem**                              | [#811](https://github.com/bounswe/bounswe2024group6/pull/811)                            | Merged  | Resolved identified issues and received approval for the changes. |
| **Backend 750**                                    | [#779](https://github.com/bounswe/bounswe2024group6/pull/779)                            | Merged  | Approved and implemented backend improvements to enhance system performance. |
| **update search**                                  | [#756](https://github.com/bounswe/bounswe2024group6/pull/756)                            | Closed  | Changes were requested before the PR was closed without merging. |

---

##### Summary

Throughout the project, I played a significant role in enhancing the backend infrastructure of our application. By addressing critical bugs and implementing new features, I ensured that our backend systems were reliable, efficient, and aligned with the project's goals. My work on issues such as fixing the search functionality, enabling users to view liked posts and comments, and adding profile picture fields in user searches contributed directly to improving the user experience.

In addition to solving problems, I actively developed new features through pull requests. Adding quiz levels to the search functionality and enabling reply features for comments were key enhancements that made our application more interactive and user-friendly. I also took the initiative to review and merge PRs from teammates, ensuring that all code changes met our quality standards and were seamlessly integrated into the main codebase.

By managing both the resolution of high-priority bugs and the development of new features, I helped maintain a stable and scalable backend environment. My contributions not only fixed existing issues but also paved the way for future improvements and feature additions. Collaborating closely with my team, I ensured that our backend systems supported the overall functionality and performance of the application, leading to a successful and well-rounded final product.


### Mobile Team
#### Anıl Köse
##### Responsibilities
- Creation and maintenance of Forum pages
- Review and merge mobile PRs and issues
- Routing mechanisms Quiz and Search pages
- Release checks, and final fixes for the final product and presentation
- Hosting a meeting
- Writing lab report 
- Conducting user tests for the mobile application


| Task                                | Link                                | Duration |
|-------------------------------------|-------------------------------------------|----------|
| Lab Report: 3rd of December, 2024 |  [#714](https://github.com/bounswe/bounswe2024group6/issues/714)     |  2 hours     | 
| Mobile: Add PressableText Component to the Forum Screens  |  [#775](https://github.com/bounswe/bounswe2024group6/issues/775)    |  1 hours | 
| Mobile: Add PressableText Component to the Quiz Screens |  [#780](https://github.com/bounswe/bounswe2024group6/issues/780)    |  1 hours     | 
| Mobile: Add Bookmark Forum Comment Feature   |  [#889](https://github.com/bounswe/bounswe2024group6/issues/755)     |  1 hours     |
| [Mobile]: Custom Tag Feature for Post Creation |  [#896](https://github.com/bounswe/bounswe2024group6/issues/896)     |  1 hours     | 
|[MOBILE]: Show the pictures of comment authors in the Forum Post Page. |  [#900](https://github.com/bounswe/bounswe2024group6/issues/900)     |  2 hours     | 
| [Mobile]: Redirect the user to the comment author's profile page |[#905](https://github.com/bounswe/bounswe2024group6/issues/905)| 1 hour 30 minutes |
| [MOBILE]: Add Guest User Restrictions to the Forum and Quiz Pages  |  [#910](https://github.com/bounswe/bounswe2024group6/issues/910)   | 1 hour 30 minutes     | 
| [Mobile]: Final Fixes and Checks before release  |  [#951](https://github.com/bounswe/bounswe2024group6/issues/951)     |  2 hours     | 
| Mobile[LAB]: User Tests For Mobile  |  [#752](https://github.com/bounswe/bounswe2024group6/issues/752)     |  2 hours     | 


##### Pull Requests

| Pull Requests                                         | Link                                                          | Action    |
|-------------------------------------------------------|---------------------------------------------------------------|-----------|
| MOBILE: Bookmark Comment Functionality for Forum Post  | [#891](https://github.com/bounswe/bounswe2024group6/pull/891) | Assigned  |
| MOBILE: Add custom tags during post creation process          | [#889](https://github.com/bounswe/bounswe2024group6/pull/889) | Assigned  |
| Show the comments' authors profile pictures in the Forum Post Page         | [#904](https://github.com/bounswe/bounswe2024group6/pull/960) | Assigned  |
| MOBILE: Redirect the user to comment author's profile page when the username is clicked in Forum Post Comments.       | [#908](https://github.com/bounswe/bounswe2024group6/pull/908) | Assigned  |
| MOBILE: mobile add guest user restrictions to the forum and quiz pages | [#919](https://github.com/bounswe/bounswe2024group6/pull/919) | Assigned  |
| MOBILE: mobile final fixes and checks before release | [#957](https://github.com/bounswe/bounswe2024group6/pull/957) | Assigned  |

#### Yağız Güldal
##### Responsibilities
* The profile tab of the mobile app
* The search tab of the mobile app
* The notification tab of the mobile app
* Admin Functionalities in the mobile app
* Guest View for search, notification and profile tabs in the mobile app
* Planning and presenting during the customer milestones
* Distribution of tasks between team members during labs and development

##### Main Contributions
Down below is the list of the most significant contributions I have made between the 2nd Customer Milestone and the 3rd. Youc an find a full list of my contributions in my [Personal Wiki & Efforts Page](https://github.com/bounswe/bounswe2024group6/wiki/Personal-Wiki-&-Efforts:-Yağız-Güldal).

###### Code-Related Significant Issues
| Task                                | Issue Link                                | Duration |
|-------------------------------------|-------------------------------------------|----------|
| Bookmarkable Words + Dictionary | [Issue #710](https://github.com/bounswe/bounswe2024group6/issues/710) | 6 hours |
| Admin Options | [Issue #737](https://github.com/bounswe/bounswe2024group6/issues/737) | 6 hours |
| Guest View for Search, Profile, Home Tabs | [Issue #848](https://github.com/bounswe/bounswe2024group6/issues/848) | 2.5 hours |
| Updating Notification Messages | [Issue #853](https://github.com/bounswe/bounswe2024group6/issues/853) | 2 hours |
| Profile Pictures on Search | [Issue #867](https://github.com/bounswe/bounswe2024group6/issues/867) | 1 hour |
| Replace Placeholders in Profile Tab | [Issue #921](https://github.com/bounswe/bounswe2024group6/issues/921) | 3 hours |
| Display Quiz Tags in Quiz Card | [Issue #961](https://github.com/bounswe/bounswe2024group6/issues/961) | 1 hour |
| Show Post Description in ForumCard | [Issue #965](https://github.com/bounswe/bounswe2024group6/issues/965) | 30 minutes |

###### Management-Related Significant Issues
| Task                                | Issue Link                                | Duration |
|-------------------------------------|-------------------------------------------|----------|
| Primary and Domain Specific Features Documentation | [Issue #717](https://github.com/bounswe/bounswe2024group6/issues/717) | 1 hours |
| Final Presentation Plan | [Issue #753](https://github.com/bounswe/bounswe2024group6/issues/753) | 1 hour |

##### Pull Requests
I will only be listing the Pull Requests I opened and the ones I reviewed significantly before merging. There were some Pull Requests that I had to merge without thorough reviewing upon a request by other team members, as they needed it to continue progresing quickly. 

| Pull Request | Link | Role |
| ------------ | ---- | ---- | 
| Bookmarkable Words and Dictionary | [PR #711](https://github.com/bounswe/bounswe2024group6/pull/711) | Author |
| Bookmarking Words Connection to Backend (Mobile) | [PR #783](https://github.com/bounswe/bounswe2024group6/pull/783) | Author |
| Search Page Connection (Mobile) | [PR #792](https://github.com/bounswe/bounswe2024group6/pull/792) | Author |
| Let admins delete comments of everyone (BACKEND) | [PR #795](https://github.com/bounswe/bounswe2024group6/pull/795) | Author |
| Profile Picture Editing & Display in Mobile | [PR #830](https://github.com/bounswe/bounswe2024group6/pull/830) | Author |
| Fix ModalDictionary not displaying Bookmark info correctly (Mobile) | [PR #833](https://github.com/bounswe/bounswe2024group6/pull/833) | Author |
| Home Page Always Notification Fix | [PR #846](https://github.com/bounswe/bounswe2024group6/pull/846) | Author |
| Guest Views for Notifications, Profile, and Search Pages & Components  | [PR #866](https://github.com/bounswe/bounswe2024group6/pull/866) | Author |
| Show Profile Pictures in the Search Page (Mobile) | [PR #868](https://github.com/bounswe/bounswe2024group6/pull/868) | Author |
| Mobile Notifications & Admin Pages| [PR #912](https://github.com/bounswe/bounswe2024group6/pull/912) | Author |
| Mobile: Remove Level from register & Fix Quiz Level on Search | [PR #918](https://github.com/bounswe/bounswe2024group6/pull/918) | Author |
| Add onPress to pressable text | [PR #929](https://github.com/bounswe/bounswe2024group6/pull/929) | Author |
| Profile Page Fixes for PostCard and CommentCard pages | [PR #943](https://github.com/bounswe/bounswe2024group6/pull/943) | Author |
| Admin Mobile-Backend Connection Fixes | [PR #954](https://github.com/bounswe/bounswe2024group6/pull/954) | Author |
| Show Quiz Tags on Mobile | [PR #962](https://github.com/bounswe/bounswe2024group6/pull/962) | Author |
| Show Description in Forum Card | [PR #970](https://github.com/bounswe/bounswe2024group6/pull/970) | Author |
| Fix some Tests & Notification Page | [PR #983](https://github.com/bounswe/bounswe2024group6/pull/983) | Author |
| feat(mobile): image suggestion on mobile | [PR #967](https://github.com/bounswe/bounswe2024group6/pull/967) | Reviewer |
| feat(mobile): make quiz options scrollable | [PR #955](https://github.com/bounswe/bounswe2024group6/pull/955) | Reviewer |
| fix(mobile): Fix the problem with Image display on quiz question update | [PR #941](https://github.com/bounswe/bounswe2024group6/pull/941) | Reviewer |
| MOBILE: 910 mobile add guest user restrictions to the forum and quiz pages | [PR #919](https://github.com/bounswe/bounswe2024group6/pull/919) | Reviewer |
| feat(mobile): enable image upload on quiz creation | [PR #913](https://github.com/bounswe/bounswe2024group6/pull/913) | Reviewer |
| Show the comments' authors profile pictures in the Forum Post Page  | [PR #904](https://github.com/bounswe/bounswe2024group6/pull/904) | Reviewer |
| MOBILE: Add custom tags during post creation process  | [PR #899](https://github.com/bounswe/bounswe2024group6/pull/899) | Reviewer |
| MOBILE: Bookmark Comment Functionality for Forum Post | [PR #891](https://github.com/bounswe/bounswe2024group6/pull/891) | Reviewer |
| feat(mobile): Provide Wrong Answers on Quiz Creation | [PR #890](https://github.com/bounswe/bounswe2024group6/pull/890) | Reviewer |
| feat(mobile): connect quiz bookmark feature to the backend on quiz pages | [PR #870](https://github.com/bounswe/bounswe2024group6/pull/870) | Reviewer |
| feat(mobile): connect quiz like feature to the backend on quiz pages | [PR #857](https://github.com/bounswe/bounswe2024group6/pull/857) | Reviewer |
| refactor(mobile): update quiz creation integration | [PR #838](https://github.com/bounswe/bounswe2024group6/pull/838) | Reviewer |
| misc(backend): Requested Activity Streams| [PR #835](https://github.com/bounswe/bounswe2024group6/pull/835) | Reviewer |
| feat(mobile): Pressable Text addition to the texts across Forum and Quiz pages | [PR #781](https://github.com/bounswe/bounswe2024group6/pull/781) | Reviewer |
| feat(backend): Bookmarking Words | [PR #763](https://github.com/bounswe/bounswe2024group6/pull/763) | Reviewer |
| feat(mobile): Integrate Quiz Creation with Suggestion System Using Lexvo | [PR #747](https://github.com/bounswe/bounswe2024group6/pull/747) | Reviewer |
| feat(mobile): Enable Type Information on Quiz Question Creation | [PR #721](https://github.com/bounswe/bounswe2024group6/pull/721) | Reviewer |


##### Unit Tests

I created the unit tests found in the files `commentcard.test.tsx`, `postcard.test.tsx`, `quizcard.test.tsx`, `usercard.test.tsx`. All of these files can be found under the folder [mobile/bulingo/__tests__](https://github.com/bounswe/bounswe2024group6/tree/main/mobile/bulingo/__tests__). Each file contains two unit tests, totaling to 8 unit tests. You can find the description of the unit tests in the table below. All of these tests were written in the previous milestone, but all of them were broken with the introduction of the guest and admin views, so I had to manually fix them.

| Source | Description |
| ------ | ----------- | 
| CommentCard | "it renders the commentcard and checks like button press when not logged in" |
| CommentCard | "it renders commentcard and includes the username correctly" |
| PostCard | "it renders the post card and handles presses, including guest view" |
| PostCard | "it renders post card and includes all the input text" |
| QuizCard | "it renders the quiz card and does not handle presses if it is not logged in" |
| QuizCard | "it renders quiz card and includes all the input text" |
| UserCard | "it renders the user card and does not handles presses when not logged in" |
| UserCard | "it renders the user card and includes all the input text" |


#### Ahmet Oğuz Engin
##### Resposibilities
- Improve the quiz pages based on the comments and requests made during milestone 2.
- Complete the remaining connections of quiz features to the backend.
- Actively participate in discussions and planning for new quiz features (Image + Lexvo-based Suggestion System).
- Update existing backend connections as the backend gets updated.
- Enhance the UI and UX.
- Align quiz features and design to match the frontend as closely as possible.

##### Main Contributions 
###### Code-Related Significant Issues
| Task                                                                                   | Link                                                                                                     | Duration   |
|----------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------|------------|
| Mobile: Type Information on Quiz Question Creation | [#720](https://github.com/bounswe/bounswe2024group6/issues/720) | 80 mins |
| Mobile: Integrate Quiz Creation with Suggestion System Using Lexvo | [#743](https://github.com/bounswe/bounswe2024group6/issues/743) | 330 mins |
| Mobile: Connect Quiz Like Feature to The Backend on Quiz Pages | [#828](https://github.com/bounswe/bounswe2024group6/issues/828) | 70 mins |
| Mobile: Update Quiz Creation Backend Integration Implementation | [#829](https://github.com/bounswe/bounswe2024group6/issues/829) | 35 mins |
| Mobile: Update Quiz Result Backend Integration Implementation | [#839](https://github.com/bounswe/bounswe2024group6/issues/839) | 25 mins |
| Mobile: Connect Quiz Bookmark Feature to The Backend on Quiz Pages | [#859](https://github.com/bounswe/bounswe2024group6/issues/859) | 90 mins |
| Mobile: Provide Wrong Answers on Quiz Creation | [#872](https://github.com/bounswe/bounswe2024group6/issues/872) | 120 mins |
| Mobile: Enable Image Upload on Quiz Creation | [#892](https://github.com/bounswe/bounswe2024group6/issues/892) | 170 mins |
| Mobile: Display Quiz Images on Mobile | [#917](https://github.com/bounswe/bounswe2024group6/issues/917) | 40 mins |
| Mobile: Make Quiz Options Scrollable | [#933](https://github.com/bounswe/bounswe2024group6/issues/933) | 45 mins |
| Mobile: Fix the Bug on Quiz Creation Page | [#938](https://github.com/bounswe/bounswe2024group6/issues/938) | 20 mins |
| Mobile: Image Suggestion on Mobile | [#956](https://github.com/bounswe/bounswe2024group6/issues/956) | 20 mins |
| Mobile: Display Quiz Card on Quiz Details Page | [#969](https://github.com/bounswe/bounswe2024group6/issues/969) | 20 mins |
| Mobile: Add Image to Quiz Headers | [#971](https://github.com/bounswe/bounswe2024group6/issues/971) | 120 mins |
| Mobile: Fix Old Unit Test and Add New Unit Tests | [#987](https://github.com/bounswe/bounswe2024group6/issues/987) | 35 mins |
| Backend: Revert Changes in 'get-meaning' Endpoint Logic | [#745](https://github.com/bounswe/bounswe2024group6/issues/745) | 30 mins |


###### Management-Related Significant Issues:

| Task                                                                                   | Link                                                                                                     | Duration   |
|----------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------|------------|
| Lab 8 Testing and Coverages | [#716](https://github.com/bounswe/bounswe2024group6/issues/716) | 100 mins |
| Mobile[LAB]: User Tests For Mobile | [#752](https://github.com/bounswe/bounswe2024group6/issues/752) | 120 mins |


##### Pull Requests

| Pull Requests                                     | Link                                                                 | Action    |
|---------------------------------------------------|----------------------------------------------------------------------|-----------|
| feat(mobile): Enable Type Information on Quiz Question Creation | [#721](https://github.com/bounswe/bounswe2024group6/pull/721) | Assigned |
| feat(mobile): Integrate Quiz Creation with Suggestion System Using Lexvo | [#747](https://github.com/bounswe/bounswe2024group6/pull/747) | Assigned |
| Revert "Merge pull request #740 from bounswe/BACKEND-DEV" | [#746](https://github.com/bounswe/bounswe2024group6/pull/746) | Assigned |
| feat(mobile): connect quiz like feature to the backend on quiz pages | [#857](https://github.com/bounswe/bounswe2024group6/pull/857) | Assigned |
| refactor(mobile): update quiz creation integration | [#838](https://github.com/bounswe/bounswe2024group6/pull/838) | Assigned |
| refactor(mobile): update quiz result integration | [#842](https://github.com/bounswe/bounswe2024group6/pull/842) | Assigned |
| feat(mobile): connect quiz bookmark feature to the backend on quiz pages | [#870](https://github.com/bounswe/bounswe2024group6/pull/870) | Assigned |
| feat(mobile): Provide Wrong Answers on Quiz Creation | [#890](https://github.com/bounswe/bounswe2024group6/pull/890) | Assigned |
| feat(mobile): enable image upload on quiz creation | [#913](https://github.com/bounswe/bounswe2024group6/pull/913) | Assigned |
| feat(mobile): display quiz images on mobile | [#920](https://github.com/bounswe/bounswe2024group6/pull/920) | Assigned |
| feat(mobile): make quiz options scrollable | [#955](https://github.com/bounswe/bounswe2024group6/pull/955) | Assigned |
| fix(mobile): Fix the problem with Image display on quiz question update | [#941](https://github.com/bounswe/bounswe2024group6/pull/941) | Assigned |
| feat(mobile): image suggestion on mobile | [#967](https://github.com/bounswe/bounswe2024group6/pull/967) | Assigned |
| feat(mobile): add quiz card on quiz details page  | [#972](https://github.com/bounswe/bounswe2024group6/pull/972) | Assigned |
| feat: add image to quiz headers  | [#981](https://github.com/bounswe/bounswe2024group6/pull/981) | Assigned |
| Mobile: Fix Old Unit Test and Add New Unit Tests  | [#987](https://github.com/bounswe/bounswe2024group6/pull/987) | Assigned |
| Multiple Choice Generation Endpints for the Quizzes   | [#771](https://github.com/bounswe/bounswe2024group6/pull/771) | Reviewed |
| Profile Picture Editing & Display in Mobile   | [#830](https://github.com/bounswe/bounswe2024group6/pull/830) | Reviewed |
| Fix ModalDictionary not displaying Bookmark info correctly (Mobile)   | [#833](https://github.com/bounswe/bounswe2024group6/pull/833) | Reviewed |
| Show Profile Pictures in the Search Page (Mobile)   | [#868](https://github.com/bounswe/bounswe2024group6/pull/868) | Reviewed |
| Add onPress to pressable text   | [#929](https://github.com/bounswe/bounswe2024group6/pull/929) | Reviewed |
| Home Page Always Shows Notification Fix   | [#846](https://github.com/bounswe/bounswe2024group6/pull/846) | Reviewed |
| Bookmarking Words Connection to Backend (Mobile) | [#783](https://github.com/bounswe/bounswe2024group6/pull/783) | Reviewed |
| Lab 8 Pull Request | [#712](https://github.com/bounswe/bounswe2024group6/pull/712) | Contributed |

##### Unit Tests:

###### 1. [quizDetails.test.tsx](https://github.com/bounswe/bounswe2024group6/blob/main/mobile/bulingo/__tests__/quizDetails.test.tsx)

###### Mocking Dependencies:
- Mocks TokenManager.authenticatedFetch to simulate API responses.
###### Error Handling Test:
- Verifies that the component displays the correct error message when data fetching fails.

###### Key Test Case:

Simulates an API error and verifies the component renders the error message:
"Error: An error occurred while fetching quiz details. Please try again."

###### Contribution to Testing:
Ensures the component gracefully handles API failures and informs users appropriately.
Validates that the component’s core functionality (error handling and rendering) works under negative scenarios.

###### 2. [quizReview.test.tsx](https://github.com/bounswe/bounswe2024group6/blob/main/mobile/bulingo/__tests__/quizReview.test.tsx)
This test file validates the functionality of the QuizReviewQuestion component, ensuring it handles data fetching, rendering, navigation, and user interactions.

###### Mocking Dependencies:
- Mocks TokenManager.authenticatedFetch to simulate fetching quiz review data.
- Mocks expo-router for navigation behavior.
- Mocks animations and timers to simulate user interactions in real-time.

###### Key Test Cases:
- Data Loading:
Verifies that quiz questions (e.g., “Mercimek”) and their choices are rendered correctly after the API fetch.
- API Error Handling:
Ensures that when an API error occurs, the appropriate error message is displayed:
"Error: Failed to fetch quiz review."
- Navigation Between Questions:
Tests "Next" and "Previous" button interactions to ensure the component transitions correctly between quiz questions.

###### Contribution to Testing:

- Verifies that the component:
    - Renders quiz data accurately when the API fetch is successful.
    - Handles API errors gracefully.
    - Enables seamless navigation between questions.
- Ensures robustness against both positive and negative test scenarios.


## Project Artifacts
Below, you can find links to the various project artifacts we have produced throughout this project.

* [User Manual](https://github.com/bounswe/bounswe2024group6/blob/main/USER_MANUAL.md)
* [System Manual](https://github.com/bounswe/bounswe2024group6/blob/main/SYSTEM_MANUAL.md)
* [Software Requirements Specification (SRS)](https://github.com/bounswe/bounswe2024group6/wiki/Requirements-%E2%80%90-451)
* Software design documents (using UML)
  * [Use Case Diagrams](https://github.com/bounswe/bounswe2024group6/wiki/Use-case-diagram-%E2%80%90-451)
  * [Class Diagrams](https://github.com/bounswe/bounswe2024group6/wiki/Class-Diagrams)
  * [Sequence Diagrams](https://github.com/bounswe/bounswe2024group6/wiki/CMPE-451-%E2%80%90-Sequence-Diagrams)
* User Scenarios
  * [User Scenario 1](https://github.com/bounswe/bounswe2024group6/wiki/User-Scenario-1) 
  * [User Scenario 2](https://github.com/bounswe/bounswe2024group6/wiki/User-Scenario-2)
  * [User Scenario 3](https://github.com/bounswe/bounswe2024group6/wiki/User-Scenario-3)
  * [User Scenario 4](https://github.com/bounswe/bounswe2024group6/wiki/User-Scenario-4)
  * [User Scenario 5](https://github.com/bounswe/bounswe2024group6/wiki/User-Scenario-5)
* Mockups
  * [Frontend](https://github.com/bounswe/bounswe2024group6/wiki/Front%E2%80%90End-Mockups)
  * [Mobile](https://github.com/bounswe/bounswe2024group6/wiki/Mobile-Mockups)
  * [Project Plan](https://github.com/bounswe/bounswe2024group6/wiki/General-Project-Plan)
* Unit Tests
  * [Frontend](https://github.com/bounswe/bounswe2024group6/tree/main/frontend/src/pages) (The files ending with .test.tsx)
  * [Mobile](https://github.com/bounswe/bounswe2024group6/tree/main/mobile/bulingo/__tests__)
  * [Backend](https://github.com/bounswe/bounswe2024group6/tree/main/backend/app/tests/unit)
* User Tests
  * [Mobile](https://github.com/bounswe/bounswe2024group6/wiki/User-Tests-for-Mobile)
  * [Frontend](https://github.com/bounswe/bounswe2024group6/wiki/Frontend-User-Tests)
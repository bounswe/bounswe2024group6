# Customer Milestone 2 Review
## **Requirements Addressed in This Milestone**
  The List and description of the requirements addressed in this milestone.

  1.1.1.1 Guests shall be able to sign up.  
  1.1.1.4 Guest shall be able to log in.  
  1.1.2.1 Logged-in Users shall be able to log out.  
  1.1.2.2 Logged-in Users shall be able to view their profile.  
  1.1.2.4 Logged-in Users shall be able to view their bookmarked forum posts while viewing their profile.  
  1.1.2.6 Logged-in Users shall be able to view their own forum posts/comments while viewing their profile.  
  1.1.2.8 Logged-in Users shall be able to view their own created quizzes while viewing their profile.  
  1.1.2.9 Logged-in Users shall be able to view their own solved quizzes & results while viewing their profile.  
  1.1.2.10 Logged-in Users shall be able to view their followers while viewing their profile.  
  1.1.2.11 Logged-in Users shall be able to view the people following them while viewing their profile.  
  1.1.2.14 Logged-in Users shall be able to go to the forum post when viewing a post in someone's profile.  
  1.1.2.15 Logged-in Users shall be able to follow other users.  
  1.1.2.16 Logged-in Users shall be able to unfollow other users.  
  1.1.2.17 Logged-in Users shall be able to view the created, solved quizzes and the forum posts of another user when viewing their profile.  
  1.1.2.18 Logged-in Users shall be able to view the following/followers of another user from their profile.  
  1.2.2.1 Logged-in Users shall be able to do everything that guests can.  
  1.2.2.2 Logged-in Users shall be able to create a quiz.  
  1.2.2.4 Logged-in Users shall be able to add tags to a quiz (including difficulty tags) while creating a quiz.  
  1.2.2.5 Logged-in Users shall be able to take a quiz.  
  1.2.2.6 Logged-in Users shall be able to cancel a quiz while taking it.  
  1.3.2.1 Logged-in users shall be able to do everything that a guest can.  
  1.3.2.3 Logged-in users shall be able to create new posts in the forum.  
  1.3.2.4 Logged-in users shall be able to add tags to the post while creating new posts in the forum.  
  1.3.2.5 Logged-in users shall be able to create new comments under posts.  
  1.3.2.6 Logged-in users shall be able to bookmark posts and comments in the forum.  
  1.3.2.8 Logged-in users shall be able to like/unlike posts and comments.  

## Deliverables

### **Summary of Deliverables**
The deliverables for Milestone 2 demonstrate significant progress in terms of backend, frontend, and mobile app integration. Each area has been evaluated for its contribution to the overall project plan, revealing successes and areas for improvement. While the project is on track to meet the milestone requirements, some gaps need to be addressed to ensure seamless execution of future goals.

---

**Deliverables and Status**

| **Deliverable**                           | **Status**                  | **Impact on Project Plan**                                                                                     |
|-------------------------------------------|-----------------------------|-----------------------------------------------------------------------------------------------------------------|
| **Backend API Implementation**            | Completed for most endpoints | Enabled integration with frontend and mobile apps but some endpoints like `search` and `linking` require refinement. |
| **Frontend Integration**                  | Completed with minor issues | Improved app functionality and user experience, but minor adjustments needed for seamless backend integration.  |
| **Mobile App Integration**                | Completed with redesign     | Delivered functional mobile pages; redesign impacted timelines but is now aligned with customer expectations.   |
| **Testing**                               | Comprehensive               | Unit and integration tests significantly enhanced reliability and reduced bugs across all platforms.            |
| **Activity Streams (Notifications)**      | Implemented                 | Provides structured notifications using Activity Streams 2.0, enhancing user engagement and interaction.        |
| **Experimental Features (Word of the Day)** | Partially completed         | Showcased potential for unique app value; incomplete functionality had minimal impact on core deliverables.     |

---

**Detailed Impact Analysis**

**1. Backend Development**
- **Status**: Backend development has seen significant progress with key APIs for user management, quizzes, posts, and notifications implemented. However, endpoints for advanced functionalities like `search` and `linking` are still under development.
- **Impact**: While the implemented APIs support most core functionalities, delays in completing advanced endpoints may hinder the rollout of features critical to user engagement. For example, the absence of a robust search feature limits the discoverability of content.

---

**2. Frontend Development**
- **Status**: The frontend application is highly functional, with pages completed for quizzes, posts, and user profiles. Integration with backend APIs is stable, though some edge cases (e.g., error handling for API failures) require further attention.
- **Impact**: The user experience is largely positive, with responsive designs and intuitive navigation. However, minor inconsistencies, such as delayed error feedback, may affect user satisfaction.


---

**3. Mobile App Development**
- **Status**: The mobile app has undergone a significant redesign to align with customer feedback. Core pages have been completed, and integration with backend APIs is operational.
- **Impact**: The redesign caused minor delays but significantly improved user experience, ensuring the app meets customer expectations. Features like dark mode and quiz continuation have enhanced accessibility and usability.

---

**4. Testing and Stability**
- **Status**: Comprehensive testing has been conducted, including unit tests for individual components and integration tests for cross-module interactions. Backend tests have achieved high coverage, with most functionalities validated under various conditions.
- **Impact**: Testing has reduced bugs and improved reliability, ensuring a stable foundation for integration. However, the lack of system-level tests means some interactions between frontend, backend, and mobile may not have been fully validated.

---

**5. Experimental Features**
- **Status**: Experimental features like "Word of the Day" are partially implemented and have been well-received during presentations. These features add unique value to the app, demonstrating innovation and creativity.
- **Impact**: While non-critical, these features enhance the app’s appeal and provide an opportunity to showcase future possibilities. Their partial implementation has had minimal impact on core deliverables.


---

**Risks and Mitigation**

| **Risk**                                 | **Impact**                                | **Mitigation**                                                                 |
|------------------------------------------|------------------------------------------|-------------------------------------------------------------------------------|
| Delayed API Completion                   | Limits integration with frontend/mobile  | Allocate more resources to backend team and prioritize critical endpoints.   |
| Inconsistent Error Handling              | Reduces user satisfaction                | Conduct detailed testing and implement standardized error-handling mechanisms. |
| Insufficient System-Level Testing        | Misses cross-platform issues             | Implement end-to-end tests to validate full workflows across platforms.      |
| Redesign Delays for Mobile App           | Affects alignment with project timeline  | Increase collaboration between mobile and design teams to minimize bottlenecks. |

---

**Overall Impact on Project Plan**
The structured project plan has successfully guided the team, ensuring timely progress for most deliverables. While some delays have occurred (e.g., advanced backend functionalities and mobile redesign), these have been effectively managed without compromising the overall timeline. The project remains on track to meet its milestones, with strong collaboration and a clear focus on resolving remaining issues.

---


### **Status of Requirements**

| Requirement | Status |
| ---------- | ------ |
| **1.1.1.1** Guests shall be able to sign up. |  Completed      |
| **1.1.1.2** Guests may need to verify their email when they sign up. |  Not Planned      |
| **1.1.1.3** Guest may be able to reset their passwords through the 'Forget Password' functionality. |    Not Planned   |
| **1.1.1.4** Guest shall be able to log in. |    Completed    |
| **1.1.2.1** Logged-in Users shall be able to log out. |   Completed     |
| **1.1.2.2** Logged-in Users shall be able to view their profile. |      Completed  |
| **1.1.2.3** Logged-in Users shall be able to change their password. |    Not Started    |
| **1.1.2.4** Logged-in Users shall be able to view their bookmarked forum posts/comments while viewing their profile. |     Completed   |
| **1.1.2.5** Logged-in Users shall be able to view their bookmarked quizzes while viewing their profile. |        Completed |
| **1.1.2.6** Logged-in Users shall be able to view their own forum posts/comments while viewing their profile. |     Completed   |
| **1.1.2.7** Logged-in Users shall be able to change their profile picture while viewing their profile. |       In progress |
| **1.1.2.8** Logged-in Users shall be able to view their own created quizzes while viewing their profile. |     Completed   |
| **1.1.2.9** Logged-in Users shall be able to view their own solved quizzes & results while viewing their profile. |   Completed     |
| **1.1.2.10** Logged-in Users shall be able to view their followers while viewing their profile. |   In Progress     |
| **1.1.2.11** Logged-in Users shall be able to view the people following them while viewing their profile. |     In progress   |
| **1.1.2.12** Logged-in Users shall be able to search for other users using their usernames. |    In Progress    |
| **1.1.2.13** Logged-in Users shall be able to go to the quiz page when viewing a quiz in someone's profile. | In progress       |
| **1.1.2.14** Logged-in Users shall be able to go to the forum post when viewing a post in someone's profile. |      In progress  |
| **1.1.2.15** Logged-in Users shall be able to follow other users. |    Completed    |
| **1.1.2.16** Logged-in Users shall be able to unfollow other users. |    Completed    |
| **1.1.2.17** Logged-in Users shall be able to view the created, solved quizzes and the forum posts/comments of another user when viewing their profile. |    Completed    |
| **1.1.2.18** Logged-in Users shall be able to view the following/followers of another user from their profile. |   In progress    |
| **1.1.3.1** Admins shall be able to do everything that a user can. |   Not started     |
| **1.1.3.2** Admins shall be able to ban users. |      Not started  |
| **1.2.1.1** Guests shall be able to view the quiz feed. |   Not started     |
| **1.2.1.2** Guests shall be able to see quiz statistics and details. |     Not started   |
| **1.2.1.3** Guests shall be able to use the search functionality to find quizzes. |    In progress    |
| **1.2.2.1** Logged-in Users shall be able to do everything that guests can. |    Completed   |
| **1.2.2.2** Logged-in Users shall be able to create a quiz. |      Completed  |
| **1.2.2.3** Logged-in Users shall be able to add questions to a quiz with the help of Lexvo while creating a quiz. |     In progress   |
| **1.2.2.4** Logged-in Users shall be able to add tags to a quiz (including difficulty tags) while creating a quiz. |     In progress   |
| **1.2.2.5** Logged-in Users shall be able to take a quiz. |      Completed  |
| **1.2.2.6** Logged-in Users shall be able to cancel a quiz while taking it. |    Completed    |
| **1.2.3.1** Admins shall be able to do everything that a logged-in user can. |     Not started   |
| **1.2.3.2** Admins shall be able to delete any quiz. |      Not started  |
| **1.2.3.3** Admins shall be able to change the tags of any quiz. |   Not started     |
| **1.3.1.1** Guests shall be able to view the forum feed. |     Completed   |
| **1.3.1.2** Guests shall be able to view the comments under a forum post. |     Completed  |
| **1.3.1.3** Guests shall be able to search use the search functionality to find forum posts. |    In progress    |
| **1.3.2.1** Logged-in users shall be able to do everything that a guest can. |       Completed |
| **1.3.2.2** Logged-in users shall have their feeds customized. |     Not started  |
| **1.3.2.3** Logged-in users shall be able to create new posts in the forum. |    Completed    |
| **1.3.2.4** Logged-in users shall be able to add tags to the post while creating new posts in the forum. |       Completed |
| **1.3.2.5** Logged-in users shall be able to create new comments under posts. |     Completed   |
| **1.3.2.6** Logged-in users shall be able to bookmark posts and comments in the forum. |    Completed   |
| **1.3.2.7** Logged-in users shall be able to delete their own comments. |     Not started   |
| **1.3.2.8** Logged-in users shall be able to like/unlike posts and comments. |     Completed   |
| **1.3.3.1** Admins shall be able to do everything that a logged-in user can. |   Not started     |
| **1.3.3.2** Admins shall be able to delete any thread. |     Not started   |
| **1.3.3.3** Admins shall be able to delete any post. |     Not started   |
| **1.3.3.4** Admins shall be able to adjust the tags of a thread. |    Not started    |



### UX Design
 
Our implementation includes several features specifically designed to improve the experience for language learners by meeting their unique needs. One important feature is the tagging system in quizzes, which helps users focus on specific language skills such as grammar, vocabulary, or pronunciation. With tags like “verbs” or “idioms,” learners can easily find quizzes that match their goals or areas they want to improve, making the learning process more effective and personalized.

Another key feature is the level system, which ensures that the content matches the learner’s skill level. For example, beginners at A1 level can access simpler exercises, while advanced users at C1 level can take on more complex challenges. This system makes sure learners are working on tasks that suit their abilities, keeping them motivated and engaged.

The quiz review system adds another layer of support by allowing learners to revisit their answers and see where they made mistakes. Correct answers are shown in green, while incorrect ones are highlighted in red, giving clear and immediate feedback. This helps learners understand their errors and reinforces correct knowledge, improving retention over time. The review system also lets users track their progress and go back to difficult questions, which is crucial for learning a new language.

The tagging system in the forum promotes interaction and collaboration among learners. Forums are valuable in language learning, as they provide a space to ask questions, share advice, and discuss topics. By using tags, learners can quickly find threads that match their interests or challenges.

These features are all designed to meet the specific needs of language learners. By focusing on what learners need most, we create a simple, useful, and effective experience that helps them succeed in mastering a new language.

In addition to features specific to language learning, we have added quiz continuation and dark mode to make the app easier and more enjoyable to use. These features help users feel more comfortable and make the app more accessible in different situations.

Quiz continuation lets users return to a quiz from where they stopped. If someone is interrupted while taking a quiz, they don’t have to start over. This makes it easier for users to fit learning into their busy schedules and keep their progress without frustration.

Dark mode is another feature that helps users by reducing eye strain, especially in dim light. It changes the app’s colors to make it easier on the eyes, so users can study comfortably at any time. Dark mode also gives users the option to choose a style they prefer, making the app feel more modern and personalized.

These features may not be specific to language learning, but they make the app more convenient and user-friendly for everyone.
 

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
#### Implementation in Milestone 2 (Notifications)

Activity Streams 2.0 implementation is used in the notifications feature we have recently added. Notifications and Activity Streams 2.0 are closely related, as the standard provides a structured framework for representing activities that can serve as the basis for generating notifications. Notifications are often a direct output of social activities, such as when a user likes, comments, or follows.

In bulingo, users can like posts, follow each other, and interact with content. Activity Streams 2.0 serves as an ideal framework for structuring these activities. For example, when a user likes a post, the action can be represented with an actor (the user), a verb ("like"), and an object (the post). Similarly, following another user can be captured as an activity where the actor performs the "follow" action on a target (another user). These structured activities can then be used to generate notifications for bulingo participants, ensuring consistency and clarity in how interactions are communicated.

### API Documentation

**Table of Contents**
1. [Profile Endpoints](#profile-endpoints)
2. [Quiz Endpoints](#quiz-endpoints)
3. [Post Endpoints](#post-endpoints)
4. [Comment Endpoints](#comment-endpoints)
5. [Word Translation Endpoints](#word-translation-endpoints)
6. [Search Endpoint](#search-endpoint)

---

**Profile Endpoints**

**View Profile**
**URL:** `/profile/`  
**Method:** GET  
**Description:** Retrieve the authenticated user's profile.

**Response Example:**
```json
{
    "id": 1,
    "username": "user123",
    "email": "user123@example.com",
    "profile": {
        "bio": "Hello world!",
        "followers_count": 10,
        "following_count": 5
    }
}
```

**Status Codes:**
- 200 OK: Successfully retrieved profile.
- 401 Unauthorized: User authentication failed.

---

**Update Profile**
**URL:** `/profile/update/`  
**Method:** POST  
**Description:** Update the authenticated user's profile.

**Request Example:**
```json
{
    "bio": "Updated bio",
    "profile_picture": "new_picture_url"
}
```

**Response Example:**
```json
{
    "id": 1,
    "username": "user123",
    "email": "user123@example.com",
    "profile": {
        "bio": "Updated bio",
        "profile_picture": "new_picture_url"
    }
}
```

**Status Codes:**
- 200 OK: Successfully updated profile.
- 400 Bad Request: Validation failed.

---

**View Other Profile**
**URL:** `/profile/<username>/`  
**Method:** GET  
**Description:** Retrieve another user's profile by their username.

**Response Example:**
```json
{
    "id": 2,
    "username": "another_user",
    "profile": {
        "bio": "Another user's bio",
        "followers_count": 20,
        "following_count": 10
    }
}
```

**Status Codes:**
- 200 OK: Successfully retrieved profile.
- 404 Not Found: User not found.

---

**View Followers**
**URL:** `/profile/followers/<username>/`  
**Method:** GET  
**Description:** Retrieve a list of followers for a specific user.

**Response Example:**
```json
[
    {
        "id": 3,
        "username": "follower1",
        "profile_picture": "follower1_pic_url"
    },
    {
        "id": 4,
        "username": "follower2",
        "profile_picture": "follower2_pic_url"
    }
]
```

**Status Codes:**
- 200 OK: Successfully retrieved followers.
- 404 Not Found: User not found.

---

**Quiz Endpoints**

**Get Quiz**
**URL:** `/quiz/<int:quiz_id>/`  
**Method:** GET  
**Description:** Retrieve a specific quiz by its ID.

**Response Example:**
```json
{
    "quiz": {
        "id": 1,
        "title": "Sample Quiz",
        "description": "A basic sample quiz.",
        "questions": [
            {
                "id": 101,
                "question_text": "What is 2+2?",
                "choices": ["1", "2", "3", "4"],
                "correct_choice": "4"
            }
        ]
    }
}
```

**Status Codes:**
- 200 OK: Successfully retrieved quiz.
- 404 Not Found: Quiz not found.

---

**View Quizzes**
**URL:** `/feed/quiz/`  
**Method:** GET  
**Description:** Retrieve all available quizzes.

**Response Example:**
```json
[
    {
        "id": 1,
        "title": "Sample Quiz",
        "description": "A basic sample quiz.",
        "question_count": 10
    },
    {
        "id": 2,
        "title": "Advanced Quiz",
        "description": "A more challenging quiz.",
        "question_count": 20
    }
]
```

**Status Codes:**
- 200 OK: Successfully retrieved quizzes.

---

**Create Quiz**
**URL:** `/quiz/create/`  
**Method:** POST  
**Description:** Create a new quiz.

**Request Example:**
```json
{
    "quiz": {
        "title": "New Quiz",
        "description": "This is a new quiz."
    },
    "questions": [
        {
            "question_text": "What is the capital of France?",
            "choices": ["Paris", "London", "Berlin", "Madrid"],
            "correct_choice": "Paris"
        }
    ]
}
```

**Response Example:**
```json
{
    "id": 3,
    "title": "New Quiz",
    "description": "This is a new quiz."
}
```

**Status Codes:**
- 201 Created: Quiz successfully created.
- 400 Bad Request: Validation failed.

---

**Submit Quiz**
**URL:** `/quiz/submit/`  
**Method:** POST  
**Description:** Submit a quiz for evaluation.

**Request Example:**
```json
{
    "quiz_progress_id": 1
}
```

**Response Example:**
```json
{
    "result_url": "/quiz/result/10"
}
```

**Status Codes:**
- 200 OK: Successfully submitted quiz.
- 400 Bad Request: Quiz already submitted or validation failed.

---

**Post Endpoints**

**Create Post**
**URL:** `/post/create/`  
**Method:** POST  
**Description:** Create a new post.

**Request Example:**
```json
{
    "title": "My New Post",
    "content": "This is the content of my post."
}
```

**Response Example:**
```json
{
    "id": 101,
    "title": "My New Post",
    "content": "This is the content of my post."
}
```

**Status Codes:**
- 201 Created: Post successfully created.
- 400 Bad Request: Validation failed.

---

**Word Translation Endpoints**

**Get Turkish Translation**
**URL:** `/get-turkish/<str:word>/`  
**Method:** GET  
**Description:** Retrieve a Turkish translation for the given English word.

**Response Example:**
```json
{
    "word": "hello",
    "turkish_translation": "merhaba"
}
```

**Status Codes:**
- 200 OK: Successfully retrieved translation.
- 404 Not Found: Word not found.

---

**Solve Quiz Question**
**URL:** `/quiz/question/solve/`  
**Method:** POST  
**Description:** Submit an answer for a specific quiz question.

**Request Example:**
```json
{
    "quiz_progress_id": 1,
    "question_number": 2,
    "answer": 4
}
```

**Response Example:**
```json
{
    "detail": "Question progress updated."
}
```

**Status Codes:**
- 200 OK: Successfully updated question progress.
- 400 Bad Request: Validation failed.

---

**Start Quiz**
**URL:** `/quiz/start/`  
**Method:** POST  
**Description:** Start or resume a quiz.

**Request Example:**
```json
{
    "quiz_id": 1
}
```

**Response Example:**
```json
{
    "quiz_progress_id": 5,
    "questions": [
        {
            "question_number": 1,
            "question": "What is the capital of France?",
            "choices": ["Paris", "London", "Berlin", "Madrid"],
            "previous_answer": null
        }
    ]
}
```

**Status Codes:**
- 200 OK: Successfully started or resumed quiz.
- 400 Bad Request: Validation failed.

---

**Get Bookmarked Posts**
**URL:** `/get_bookmarked_posts/`  
**Method:** GET  
**Description:** Retrieve all bookmarked posts for the user.

**Response Example:**
```json
[
    {
        "id": 101,
        "title": "Bookmarked Post 1",
        "content": "This is the content of the first bookmarked post."
    },
    {
        "id": 102,
        "title": "Bookmarked Post 2",
        "content": "This is the content of the second bookmarked post."
    }
]
```

**Status Codes:**
- 200 OK: Successfully retrieved bookmarked posts.

---

**Get Turkish Translation**
**URL:** `/get-turkish/<str:word>/`  
**Method:** GET  
**Description:** Retrieve the Turkish translation for a specific word.

**Response Example:**
```json
{
    "word": "hello",
    "turkish_translation": "merhaba"
}
```

**Status Codes:**
- 200 OK: Successfully retrieved translation.
- 404 Not Found: Word not found.

---

**Search**
**URL:** `/search/`  
**Method:** GET  
**Description:** Perform a search across posts, quizzes, and users.

**Request Example:** (Query parameters)
```
?query=example
```

**Response Example:**
```json
{
    "posts": [
        {"id": 1, "title": "Example Post", "content": "This is an example post."}
    ],
    "quizzes": [
        {"id": 2, "title": "Example Quiz", "description": "This is an example quiz."}
    ],
    "users": [
        {"id": 3, "username": "exampleuser"}
    ]
}
```

**Status Codes:**
- 200 OK: Successfully retrieved search results.

---


## Testing

### Mobile Testing
The main goal of this testing phase was to check if the app’s features work well, are easy to use, and show the correct information. The testing focused on several important parts of the app, such as the CommentCard, PostCard, QuizCard, and UserCard, as well as more detailed features like the quiz review screen. Each component was tested carefully to make sure it worked as expected when used and displayed all the data correctly.

For interactive features, the tests checked actions like pressing like, bookmark, and follow buttons to confirm that they triggered the right functions. For example, the like button on the comment and post cards was tested to see if it responded properly to user actions. Navigation features, like moving between quiz questions on the review screen, were also tested to make sure they worked smoothly without any problems. In the quiz review section, the correct answer and wrong answer buttons were also checked to ensure they had the right colors, green for correct answers and red for incorrect ones so that users could get clear feedback.

Another key part of the testing was making sure the app displayed information correctly. Tests verified that input data like usernames, comments, post titles, tags, and quiz details were shown properly. For example, in the QuizCard component, important details such as the quiz title, author, difficulty level, and number of likes were checked to ensure they appeared as expected.

The testing results were very positive. The app worked well in all tests, with interactive features performing as they should and information being displayed without any issues. Even when errors were simulated, like API failures during the quiz review, the app handled them smoothly, showing the right messages to the user and avoiding crashes. The correct and wrong answer buttons also always showed the right colors, which confirmed the app provides clear and accurate feedback. This showed that the app is stable and provides a good experience for users in different situations.

In conclusion, the mobile testing showed that the app is both functional and user-friendly. It handles interactions smoothly, displays data accurately, uses proper color coding for answers, and deals with errors effectively. This testing process has proven that app’s reliable and ready for use.


#### Test Results
```
 RUNS  __tests__/postcard.test.tsx
 RUNS  __tests__/commentcard.test.tsx
 RUNS  __tests__/quizReview.test.tsx
 RUNS  __tests__/quizCard.test.tsx
 RUNS  __tests__/userCard.test.tsx
 PASS  __tests__/postcard.test.tsx
 PASS  __tests__/quizCard.test.tsx
 PASS  __tests__/quizReview.test.tsx
 PASS  __tests__/commentcard.test.tsx
 PASS  __tests__/userCard.test.tsx (6.567 s)



Test Suites: 5 passed, 5 total
Tests:       13 passed, 13 total
Snapshots:   0 total
Time:        7.164 s
Ran all test suites.
```
---

### Frontend Testing
Our frontend testing strategy employs a comprehensive approach focusing on unit testing and integration testing. The testing framework utilizes Vitest, a next-generation testing framework designed for Vite-based applications, along with React Testing Library for component testing.

**Key Components of Testing Strategy**:

1. **Unit Testing**
   - Individual component testing focusing on isolated functionality
   - Mock data and dependencies to ensure controlled test environments
   - Testing of user interactions and component state changes
   - Validation of component rendering and DOM updates

2. **Integration Testing**
   - API integration testing with mock servers
   - Form submission and data flow testing

3. **Mock Data Implementation**
   - Usage of MSW (Mock Service Worker) for API mocking
   - Custom handlers for simulating backend responses
   - Consistent test data across different test suites

**Testing Tools and Libraries**

- **Vitest**: Main testing framework
- **React Testing Library**: Component testing and DOM manipulation
- **MSW (Mock Service Worker)**: API mocking
- **@testing-library/user-event**: User interaction simulation
- **@testing-library/jest-dom**: DOM assertion utilities

#### Frontend Test Implementation

**1. Forum Component Tests**
The forum component tests (`forum.test.tsx`) focus on:
- Navigation bar rendering
- Post card component rendering
- Content display verification
- Like functionality testing

**2. Forum Compose Tests**
The forum compose tests (`forumCompose.test.tsx`) validate:
- Form element rendering
- Input field functionality
- Form validation
- Submission handling

**3. Profile Edit Tests**
The profile edit tests (`profileEdit.test.tsx`) verify:
- Profile update form rendering
- Bio input functionality
- Level selection
- Form submission handling

#### Frontend Test Results

The test execution results show successful completion of all test suites:

```bash
yunusozdemir@192 frontend % npm run test

> frontend@0.0.0 test
> vitest


 DEV  v2.1.6 /Users/yunusozdemir/bounswe/bounswe2024group6/frontend

 ✓ src/pages/forum.test.tsx (4) 552ms
 ✓ src/pages/forumCompose.test.tsx (5) 1144ms
 ✓ src/pages/profileEdit.test.tsx (3) 569ms

 Test Files  3 passed (3)
      Tests  12 passed (12)
   Start at  10:35:56
   Duration  2.45s (transform 164ms, setup 348ms, collect 2.09s, tests 2.27s, environment 749ms, prepare 318ms)

```

#### Mock Implementation

The project utilizes MSW for API mocking with custom handlers:

**API Endpoints Mocked**:
   - GET /feed
   - POST /post/like/

The mock server setup ensures reliable and consistent testing environments across all test suites.




### Backend Testing

#### **Testing Strategy**
1. **Unit Testing**:
   - Test individual functions, methods, and classes to ensure they work as expected.
   - Focus on edge cases, error handling, and validation.

   
2. **Integration Testing**:
   - Test the interactions between different modules or services.
   - Ensure seamless communication with databases, APIs, and other external systems.
   - Use mock objects to simulate dependencies where necessary.
   
 3. **Future Enhancements**:
   - **Generated Unit Test Reports in CI/CD Pipeline**:
     - Automate detailed test reports after each development build, including test results and code coverage metrics, to be implemented later.


#### Backend Test Results
Here are our unit test results:
```
$ python manage.py test

Creating test database for alias 'default'...

----------------------------------------------------------------------
TEST RESULTS:
======================================================================
tests.test_user (app.tests.UserRegistrationTest)
----------------------------------------------------------------------
test_register_user ... ok
test_login_user ... ok
test_logout_user ... ok
test_refresh_token ... ok
test_view_profile ... ok
test_update_profile ... ok
test_create_post ... ok
test_get_posts_of_user ... ok
test_like_post ... ok
test_unlike_post ... ok
test_delete_post ... ok
test_create_post_without_tags ... ok
test_like_post_already_liked ... ok
test_unlike_post_not_liked ... ok
test_delete_post_not_author ... ok
test_create_post_invalid_tags ... ok
test_get_posts_of_user_no_posts ... ok
test_create_quiz ... ok
test_submit_quiz ... ok
test_get_quiz ... ok
test_start_quiz ... ok
test_like_quiz ... ok

tests.test_lexvo (app.tests.lexvo_tests)
----------------------------------------------------------------------
test_get_turkish_translation ... ok
test_get_word_meanings ... ok
test_fetch_english_words ... ok
test_error_handling ... ok
test_meaning_formats ... ok
test_caching_behavior ... ok

----------------------------------------------------------------------
Ran 29 tests in 7.543s

OK

----------------------------------------------------------------------

```

---



## Planning and Team Process

### Changes Since Milestone 1
We have made the following changes since Customer Milestone 1:

* **Started writing and using unit tests.** We know that testing is an integral part of software development, but we didn't really have the time to 
write tests for Customer Milestone 1. Since we only used mock data for it, it wasn't that big an issue as the way the app behaved was deterministic, we could check everything manually. However, with the backend up and running, we needed to make sure everything was working as expected, and the unit tests helped a great deal in that regard. They have helped us figure out some of our mistakes and when we had made breaking changes to the software.
* **Increased collaboration between teams.** In our project, we have three distinct teams (backend, frontend and mobile) with different responsibilities. Everyone contributes to the reports and designs, but everyone has only a single domain they write code for (some exceptions exist). This works well when developing code in a vacuum, since everyone can work on the domain they have the most experience with, and each member doesn't have to learn as much. However, while connecting the web and mobile apps to the backend, the teams got a lot closer and we had to monitor/test each other's work, which helped us identify a lot of points we had different understandings of.
* **Seperated the frontend and backend deployments for development.** We realized that this was a big issue after Customer Milestone 1. Whenever either of the two teams made a mistake, the development of every other team got affected. Therefore, we decided split the deployments so that each team can autonomously work on their own codebase. This turned out to be extremely helpful, and we never ran into issues with coupling after this. We still deployed the final versions to the same machine before the second customer milestone, but from here on out we will be using a separate deployment for developmnet purposes.


We are planning on making the following changes to our development process for Customer Milestone 3. The list is quite short as we only have three weeks until Customer Milestone 3, and we think we already have a pretty good formula in place.

* **Write more integration tests.** The unit tests were a nice addition, but they only test components in isolation. We also need more integration tests that test how components interact. This will help us see if our app is able to perform according to our requirements, many of which utilize multiple components in tandem. We hope this will help us avoid mistakes related to our core requirements.

Also, we'd like to mention the following: As we built our APK using the main branch without merging the forum branch into it, our APK file is missing the backend connection implementation of the forum pages. If you check the pull request #675, you can see the PR was opened before the deadline for Pre-release of the Software. The TA Kutay has told us to note this down in the milestone report 2.

### Project Completion Plan

#### Milestones and Deadlines

#### 1. Full Functionality and Design Compliance
**Deadline: December 11th**  
- Complete all backend functionality, ensuring seamless integration with the mobile and web frontends.  
- Finalize the connection between client-side applications and backend APIs.  
- Ensure the client-side applications strictly adhere to the project’s design principles and specifications.  
- Successfully deploy the backend with no interruptions or errors.

---

#### 2. Feedback and Final Adjustments
**Deadline: December 13th**  
- Conduct a team meeting to thoroughly review the project and identify any missing features or issues.  
- Gather feedback from the professor and assistants to ensure the project meets their expectations and requirements.  
- Address any feedback promptly to polish the project further.  

---

#### 3. Final Milestone
**Deadline: December 17th**  
- Ensure that all project components—backend, frontend, and mobile applications—are functioning flawlessly.  
- Verify that the deployment is stable and no bugs or issues remain.  
- Deliver a fully functional and polished product by the final milestone date.

---

#### Summary of Plan
This structured approach ensures that we meet all deadlines and deliver a complete, functional, and polished project on time. By addressing feedback and testing comprehensively, we aim to exceed expectations and achieve excellence in our final product.

### Project Plan Documentation
- **Documentation Link**: [Project Plan for Milestone 3](https://app.clickup.com/9018699392/v/g/8crwvm0-398https://app.clickup.com/9018699392/v/g/8crwvm0-398)
- **Screenshots**: ![Ekran Resmi 2024-11-29 13.44.05](https://hackmd.io/_uploads/H1lOofwX1e.png)


## Evaluation

### Customer Feedbacks and Reflections
We got valuable feedbacks regarding our Milestone 2 presentation. 
As for the positive feedbacks, our customer liked our UI design and described it as "nice and sleek", so we'll be sticking to the design. As for the improvements, our customer didn't think having fixed tags is a good idea, so we'll be allowing users to create useful tags for their posts and quizzes. In order to improve the user experience, the customer thought annotating words in quizzes and posts with information from WikiData (like images for tangible objects) are considered doable and valuable. Seeing related posts in quizzes and not allowing the same quiz to be solved back-to-back is also a suggested as a valuable feature that might improve the learning experience. We also received some new notification ideas, such as getting a "**x** that you follow successfully completed the quiz **y**!" which sheds light upon the community aspect of the app. As for the quizzes, the types of questions being more descriptive would also be better. Also, putting aside quizzes and posts, bookmarking new **words** would be a good feature that improves the learning experience.

### Tools and Processes Evaluation
- **Evaluation**: Summarize the tools and processes used to manage the team project.
- Github: We have utilized github to store our code and maintain the development process. In the wiki part we store our project plans and all non-code documents about the project.
- **Whatsapp Group Chat**: For faster communication we have created a whatsapp group and communicated via that group. Also each subteam namely backend, frontend and mobile has their own seperate whatsapp groups.
- **Weekly Group Meeting**: Every sunday at 12 we are gathering up either face to face or via Google Meets and discuss our own set up deadlines and each team explains what is done during the week, and what is going to be done next week. Each meeting is hosted by one member of the group and that member is responsible for keeping track of the weekly jobs progress.
- **Weekly Lab Meeting**: Each Tuesday at 15.00 we are gathering up for the lab lecture and apart from doing the lab we are discussing the ideas and finding solutions to the problems encountered. Gathering two times each week is being very beneficial for the advancement of the project.
- **Before Milestone Checkpoints**: We are gathering up two times before each milestone. For this milestone we did them Thursday night and Sunday all day. In the first, meeting we have tried to integrate backend with mobile and frontend. Here we adressed the integration problems and connected them as much as we can. Afterwards each team handled the suitability issues. For example backend team started to take their own deployment. Afterwards, on Sunday while mobile and frontend teams are integrating backend. Backend team supported them via doing small adjustments.
- **Code Review Mechanism**: Each piece of code written has been reviewed by another member of the group. So that we have ensured everything is going well. 
- **Feedback Mechanism**: Frontend and Mobile teams adressed the integribility issues while backend team was correcting it. We have established a feedback mechanism on Whatsapp and at the end we made sure everything works as expected.
- **Postman**: We have listed our available endpoints on postman. So that who need an api could see how a request can be formed for that spesific api.
- **Testing**: We have applied some testing procedures as Aras mentioned above to ensure high quality.

---

# Individual Contributions 

## Ali Tarık Şahin


### Responsibilities

- Conducted research and implemented features, including **login/register pages**, **quiz components**, and **notification systems**.
- Designed user-facing components and improved user experience with **night mode**, **skeleton loaders**, and other dynamic elements.
- Integrated frontend functionality with backend systems, ensuring secure and efficient operations.
- Maintained code quality by fixing bugs, writing unit tests, and refining existing features.



### Main Contributions

- **Feature Development**: Created core components like **quiz pages**, **authentication systems**, and **notifications**.
- **Integration**: Connected frontend features to backend APIs for seamless functionality.
- **Improvements**: Fixed bugs (e.g., **token management**, **autofill issues**) and enhanced the user interface.
- **Code Quality**: Wrote unit tests for key features and improved overall platform reliability.

### API Contributions
I was responsible for authentication endpoints, and also was responsible for connecting post creation and post listing endpoints to Frontend, Also wrote and used the type conversion utils so that fetched data can be converted to understandable and usable format in Frontend side.

#### Authentication Endpoints
  ```
    import wretch from "wretch";
    import Cookies from "js-cookie";
    import { BASE_URL } from "../../lib/baseURL";


    // Base API setup for making HTTP requests
    const api = wretch(`${BASE_URL}`).accept("application/json");


    /**
     * Stores a token in cookies.
     * @param {string} token - The token to be stored.
     * @param {"access" | "refresh"} type - The type of the token (access or refresh).
     */
    const storeToken = (token: string, type: "access" | "refresh") => {
      Cookies.set(type + "Token", token);
    };

    /**
     * Retrieves a token from cookies.
     * @param {"access" | "refresh"} type - The type of the token to retrieve (access or refresh).
     * @returns {string | undefined} The token, if found.
     */
    const getToken = (type: string) => {
      return Cookies.get(type + "Token");
    };

    /**
     * Removes both access and refresh tokens from cookies.
     */
    const removeTokens = () => {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
    };

    const register = (email: string, username: string, password: string) => {
        return api.post({ email, username, password }, "/signup/");
      };

      const login = (username: string,  password: string) => {
        return api.post({ username , password }, "/login/");
      };

      const logout = () => {
        const refreshToken = getToken("refresh");
        const accessToken = getToken("access");
        return api
          .auth(`Bearer ${accessToken}`)
          .post({ refresh: refreshToken }, "/logout/");
      };

      const handleJWTRefresh = () => {
        const refreshToken = getToken("refresh");
        return api.post({ refresh: refreshToken }, "/refresh/");
      };


    export const AuthActions = () => {
      return {
        login,
        handleJWTRefresh,
        register,
        storeToken,
        getToken,
        logout,
        removeTokens,
      };
    };

  ```
  #### Post Fecthing and Formatting
  ```
   useEffect(() => {
    setIsLoading(true);
    axios
      .post(
        `${BASE_URL}/post/`,
        {
          post_id: postID,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        const postData: PostResponse = response.data.post;
        setPost(convertPostResponseToPost(postData));
        setComments(convertPostResponseToPost(postData).comments);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [postID]);
  
  ```
  - When you give your credentials and login, you get refresh and access tokens
  ```
  {
  refresh: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eiOjZ9.P391ANTbH_7K6ljyNe3EMH66f1-KsAo0lgwovPEgmFs', 
  access: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eI6Nn0.F38TDs3Ia7SeogW8P_UaZv-dz7qx6JWjJaH7kv_ag7o'
  }

  ```
 -  When you get into forum page, access token is provided as a Bearer token and you get the feed.
   ```
{
    {
        id: 4, 
        title: "Did you know that waltz means 'vals' in Turkish?", 
        description: 'I just learned this from my English teacher. Appar… like "to waltz around something" or "waltz off".', 
        author: 'yunus'
    }
    {
        id: 1, 
        title: 'Useful Tests for Academic English', 
        description: 'Here are some tests for those of you looking to ge…peaking, listening and reading related questions.', 
        author: 'yagizguldal'
    }
    {
        id: 3, 
        title: 'HELP: What does it mean to be "over" someone?', 
        description: "Hello everyone. I just came across this phrase whi…beaten 'her' in some kind of race or competition?", 
        author: 'yunus'
    }
    {
        id: 5, 
        title: 'Careful with Countable Words', 
        description: '"There are less people in the room now." sounds co…e appropriate in here since people are countable.', 
        author: 'elifnd'
    } 
    {
        id: 2, 
        title: 'Learning how to use this app is a piece of cake!', 
        description: "Hey, I'm new here. I wanted share this idiom that …'m sure many of you have already heard it before.", 
        author: 'elifnd'
    }
}

  ```
  

### Code Related and Non-Code Related Significant Issues: 
| Task                                | Link                                | Duration |
|-------------------------------------|-------------------------------------------|----------|
|[Lab] Research: Activity Streams 2.0 |  [issue447](https://github.com/bounswe/bounswe2024group6/issues/447)    |  3 hours     | 
| Initial Designs of Quiz Components and Pages |  [issue454](https://github.com/bounswe/bounswe2024group6/issues/454) |  10 hours     | 
| [Lab] Frontend: Implement Night Mode Feature    |  [issue490](https://github.com/bounswe/bounswe2024group6/issues/490)  |  90 mins     | 
|[FRONTEND]: Create Login-Register Pages |  [issue499](https://github.com/bounswe/bounswe2024group6/issues/499)    |  8 hours     |
| [Lab] Documentation: User Experience Decisions |  [issue513](https://github.com/bounswe/bounswe2024group6/issues/513)    |  2 hours     | 
| Connect Frontend Features to the Backend     |  [issue536](https://github.com/bounswe/bounswe2024group6/issues/536)     |  10 hours     | 
| Add Favicon and Update the Tab Name     |  [issue614](https://github.com/bounswe/bounswe2024group6/issues/614)  |  1 hour    |
| Fix Autofilling in Login and Register |  [issue619](https://github.com/bounswe/bounswe2024group6/issues/619)    |  2 hours     | 
| Fix Token Validation, Refreshing and Route Protection     |  [issue625](https://github.com/bounswe/bounswe2024group6/issues/625)  |  3 hours     | 
| Add Skeletons to The Pages Where Data Fetching is Required   |  [issue634](https://github.com/bounswe/bounswe2024group6/issues/634)  |  3 hours    |
| Fix the Logo Functionality in the Navbar |  [issue638](https://github.com/bounswe/bounswe2024group6/issues/638)    |  1 hour     | 
| Adjust the Skeletons and the Display of the Comments Page   |  [issue641](https://github.com/bounswe/bounswe2024group6/issues/641)  |  30 mins     | 
| Create Notification Box   |  [issue651](https://github.com/bounswe/bounswe2024group6/issues/651)  |  3 hours     |
| Write Unit Tests for Compose Post Functionality   |  [issue680](https://github.com/bounswe/bounswe2024group6/issues/680)  |  5 hours     |

### Pull Requests

| Pull Requests                                     | Link                                                                 | Action    |
|---------------------------------------------------|----------------------------------------------------------------------|-----------|
| Frontend-454 Developed Quiz Solving Pages  | [#475](https://github.com/bounswe/bounswe2024group6/pull/475)       | Assigned  |
| Frontend 499: Create Login-Register Pages  | [#500](https://github.com/bounswe/bounswe2024group6/pull/500)       | Assigned  |
| Frontend 536: Connect Frontend Features to Backend | [#546](https://github.com/bounswe/bounswe2024group6/pull/546)       | Assigned  |
| Frontend 536: Like Functionality             | [#555](https://github.com/bounswe/bounswe2024group6/pull/555)       | Assigned  |
| added favoicon and made tab name dynamic | [#618](https://github.com/bounswe/bounswe2024group6/pull/618)       | Assigned  |
| fix(frontend): Enhancements made in login-register pages  | [#622](https://github.com/bounswe/bounswe2024group6/pull/622)       | Assigned  |
| Frontend 625: Fix Authentication              | [#626](https://github.com/bounswe/bounswe2024group6/pull/626)       | Assigned  |
| feat(frontend): Skeletons Added to Profile, Forum and Comments sections | [#635](https://github.com/bounswe/bounswe2024group6/pull/635)       | Assigned  |
| fix(frontend): fixed Logo behavior         | [#639](https://github.com/bounswe/bounswe2024group6/pull/639)       | Assigned  |
| fix(frontend): fixed the view of comments and forum      | [#642](https://github.com/bounswe/bounswe2024group6/pull/642)       | Assigned  |
| feat(frontend): created notifications box, removed the original page | [#652](https://github.com/bounswe/bounswe2024group6/pull/652)       | Assigned  |
| Frontend 680: Wrote Unit Tests | [#684](https://github.com/bounswe/bounswe2024group6/pull/684)       | Assigned  |
| feat(frontend): Initial Designs of Quiz Components and Pages  | [#498](https://github.com/bounswe/bounswe2024group6/pull/498)       | Reviewed  |
| Fix(frontend): Fixed the background issue with the profile avatar   | [#541](https://github.com/bounswe/bounswe2024group6/pull/541)       | Reviewed  |
| feat(frontend): implemented forum sorting methods   | [#548](https://github.com/bounswe/bounswe2024group6/pull/548)       | Reviewed  |
| feat(frontend): sorted posts in profile and fixed difficulty tag issue | [#549](https://github.com/bounswe/bounswe2024group6/pull/549)       | Reviewed  |
| feat(frontend): implement notifications functionality   | [#609](https://github.com/bounswe/bounswe2024group6/pull/609)       | Reviewed  |
| feat(frontend): implement comments section of the posts   | [#612](https://github.com/bounswe/bounswe2024group6/pull/612)       | Reviewed  |
| feat(frontend): implemented popover user cards | [#636](https://github.com/bounswe/bounswe2024group6/pull/636)       | Reviewed  |
| feat(frontend): added bookmarked posts to profile   | [#643](https://github.com/bounswe/bounswe2024group6/pull/643)       | Reviewed  |
| fix(frontend): displayed correct follower count on related places | [#645](https://github.com/bounswe/bounswe2024group6/pull/645)       | Reviewed  |
| Frontend 647 | [#653](https://github.com/bounswe/bounswe2024group6/pull/653)       | Reviewed  |
| feat(frontend): last touches | [#683](https://github.com/bounswe/bounswe2024group6/pull/683)       | Reviewed  |
| feat(frontend): added edit-profile tests   | [#694](https://github.com/bounswe/bounswe2024group6/pull/694)       | Reviewed  |

## Aras Tasci
### Responsibilities and Main Contributions
#### Quizzes
I was responsible for the whole quiz-related endpoints. I designed and implemented how quizzes would be stored in the database, their relations with users, creating, viewing, and solving them. I also implemented it in a way such that users can solve the same quiz multiple times and continue from their recent quiz progress.

### Hotfixes and Minor Improvements
I've also handled some hot problems we got in development in various areas such as **profiles** and **posts** when an urgent fix was requested from other teams. I also improved the database word population speed by performing a `bulk_create` using Django's ORM instead of using individual `create` calls, which vastly increased our backend deployment speed, improving our workflow quality.

### Managemental-Related Issues
After we've decided that backend should be deployed separately for development purposes, I handled the development server deployment and provided various auxiliary tools for it. I deployed the backend to an EC2 instance in AWS and wrote a shell script for the backend team to use and deploy the backend with ease.
### API Contributions
One of the more complex APIs I've implemented was the `quiz/start/` endpoint in which the frontend would give the backend only a `quiz_id` and the API decided whether the quiz had an ongoing attempt or not, and gave a `quiz_progress_id` and the previously selected answers (if it is a fresh attempt, they are all 0 which means no answer yet) accordingly. Here's the code:
```
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def start_quiz(request):
    quiz = get_object_or_404(Quiz, id=request.data['quiz_id'])     

    # get quiz progresses, if the highest is not completed, retrieve that
    quiz_progresses = QuizProgress.objects.filter(quiz=quiz, user=request.user, completed = False)
    if quiz_progresses.count() > 1:
        return Response({'error': 'Multiple quiz progresses found'}, status=status.HTTP_400_BAD_REQUEST)
    elif quiz_progresses.count() == 1:
        quiz_progress = quiz_progresses[0]
        question_progress = QuestionProgress.objects.filter(quiz_progress=quiz_progress)
        if question_progress.count() == 0:
            return Response({'error': 'No question progress found'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            data = {'questions': []}
            for question_progress in question_progress:
                data['questions'].append({'question': question_progress.question.question_text, 
                            'choices': [question_progress.question.choice1, question_progress.question.choice2, 
                            question_progress.question.choice3, question_progress.question.choice4], 
                            'question_number': question_progress.question.question_number,
                            'previous_answer': question_progress.answer})
            data["quiz_progress_id"] = quiz_progress.id
            data["quiz_title"] = quiz.title
            data["question_count"] = quiz.question_count
            return Response(data, status=status.HTTP_200_OK)
    
    # no quiz progress found, create a new one
    # get highest quiz attempt yet
    quiz_progresses = QuizProgress.objects.filter(quiz=quiz, user=request.user)
    quiz_attempt = 1
    if quiz_progresses.count() > 0:
        quiz_attempt = max([quiz_progress.quiz_attempt for quiz_progress in quiz_progresses]) + 1
    quiz_progress = QuizProgress.objects.create(quiz=quiz, user=request.user, quiz_attempt=quiz_attempt)

    for question in Question.objects.filter(quiz=quiz):
        question_progress = QuestionProgress.objects.create(quiz_progress= quiz_progress, question= question)
        
    # send all questions to the user
    questions = Question.objects.filter(quiz=quiz)
    data = {"questions": []}
    for question in questions:
        question_progress = get_object_or_404(QuestionProgress, question=question, quiz_progress= quiz_progress)
        data["questions"].append({'question': question.question_text, 
                        'choices': [question.choice1, question.choice2, 
                        question.choice3, question.choice4], 
                        'question_number': question.question_number,
                        'previous_answer': question_progress.answer})
    data["quiz_progress_id"] = quiz_progress.id
    data["quiz_title"] = quiz.title
    data["question_count"] = quiz.question_count

    return Response(data, status=status.HTTP_200_OK)
```
- Request:
  ```
  {
    'quiz_id': 1
  }
  ```
- Response
```
  {
  "questions": [
    {
      "question": "Translate 'elma' to English.",
      "choices": ["Apple", "Banana", "Orange", "Grape"],
      "question_number": 1,
      "previous_answer": "Apple"
    },
    {
      "question": "Translate 'köpek' to English.",
      "choices": ["Dog", "Cat", "Horse", "Fish"],
      "question_number": 2,
      "previous_answer": null
    }
  ],
  "quiz_progress_id": 123,
  "quiz_title": "Turkish to English Vocabulary Quiz",
  "question_count": 2
  }

 ```
### Code Related and Non-Code Related Significant Issues

| Task                                                                                   | Link                                                                                                     | Duration   |
|----------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------|------------|
| Merge dev branch to main for Release                                                   | [#691](https://github.com/bounswe/bounswe2024group6/issues/691)                                         | 15 mins    |
| Fix Multiple Quizzes Returning in Solved Quizzes Endpoint                              | [#678](https://github.com/bounswe/bounswe2024group6/issues/678)                                         | 30 mins    |
| Unit Tests for Quiz Endpoints                                                          | [#672](https://github.com/bounswe/bounswe2024group6/issues/672)                                         | 2 hours    |
| Get Latest Quiz Review Endpoint                                                        | [#666](https://github.com/bounswe/bounswe2024group6/issues/666)                                         | 1.5 hours  |
| Optimize Backend Word Database Population                                              | [#664](https://github.com/bounswe/bounswe2024group6/issues/664)                                         | 2 hours    |
| Implement Quiz Recommendation Endpoint                                                 | [#657](https://github.com/bounswe/bounswe2024group6/issues/657)                                         | 2 hours    |
| Provide Additional Info in Quiz Results Endpoint                                       | [#627](https://github.com/bounswe/bounswe2024group6/issues/627)                                         | 1.5 hours  |
| Followers / Following Endpoints                                                       | [#613](https://github.com/bounswe/bounswe2024group6/issues/613)                                         | 2 hours    |
| Auxiliary Quiz Endpoints                                                               | [#610](https://github.com/bounswe/bounswe2024group6/issues/610)                                         | 1 hour     |
| Remove Authentication for Quiz Feed                                                   | [#601](https://github.com/bounswe/bounswe2024group6/issues/601)                                         | 30 mins    |
| Improve Quiz Endpoints                                                                 | [#585](https://github.com/bounswe/bounswe2024group6/issues/585)                                         | 2 hours    |
| Review Quiz Endpoints                                                                  | [#582](https://github.com/bounswe/bounswe2024group6/issues/582)                                         | 2.5 hours  |
| Create Docker Compose Configuration for BACKEND-DEV Branch                            | [#579](https://github.com/bounswe/bounswe2024group6/issues/579)                                         | 1.5 hours  |
| Fix `docker-compose.yml` Not Having Database Volume                                    | [#530](https://github.com/bounswe/bounswe2024group6/issues/530)                                         | 1 hour     |
| Create Comment Model                                                                   | [#524](https://github.com/bounswe/bounswe2024group6/issues/524)                                         | 1.5 hours  |
| Implement Quiz Progress Functionality                                                  | [#520](https://github.com/bounswe/bounswe2024group6/issues/520)                                         | 2 hours    |
| Implement Create / Get Endpoints for Questions / Quizzes                               | [#519](https://github.com/bounswe/bounswe2024group6/issues/519)                                         | 2.5 hours  |
| Deploying Backend Separately                                                           | [#515](https://github.com/bounswe/bounswe2024group6/issues/515)                                         | 1.5 hours  |
| Hosted Lab Meeting 6                                                                   | [#494](https://github.com/bounswe/bounswe2024group6/issues/494)                                         | 2 hours    |
| Profile Update Serializer Request Check                                               | [#649](https://github.com/bounswe/bounswe2024group6/issues/649)                                         | 30 mins    |
| Add Author to Post Details Endpoint                                                   | [#632](https://github.com/bounswe/bounswe2024group6/issues/632)                                         | 1 hour     |


### Pull Requests

| Pull Requests                                     | Link                                                                 | Action    |
|---------------------------------------------------|----------------------------------------------------------------------|-----------|
| fix: quiz tests                                   | [#696](https://github.com/bounswe/bounswe2024group6/pull/696)       | Assigned  |
| Backend: Merge Dev to Main                       | [#692](https://github.com/bounswe/bounswe2024group6/pull/692)       | Assigned  |
| fix: return unique quiz instances in solved quizzes endpoint | [#679](https://github.com/bounswe/bounswe2024group6/pull/679)       | Assigned  |
| tests: unit tests for quiz endpoints             | [#673](https://github.com/bounswe/bounswe2024group6/pull/673)       | Assigned  |
| feat: implement review latest quiz attempt for a given quiz endpoint | [#671](https://github.com/bounswe/bounswe2024group6/pull/671)       | Assigned  |
| impr(backend): optimize backend word population  | [#665](https://github.com/bounswe/bounswe2024group6/pull/665)       | Assigned  |
| feat(backend): quiz recommendation               | [#659](https://github.com/bounswe/bounswe2024group6/pull/659)       | Assigned  |
| feat(backend): improve quiz result endpoint and add quiz review endpoint | [#628](https://github.com/bounswe/bounswe2024group6/pull/628)       | Assigned  |
| feat(backend): Auxiliary Quiz Endpoints          | [#611](https://github.com/bounswe/bounswe2024group6/pull/611)       | Assigned  |
| BACKEND-585: Improvements on Quiz Endpoints      | [#596](https://github.com/bounswe/bounswe2024group6/pull/596)       | Assigned  |
| BACKEND-519: Preliminary quiz endpoints          | [#573](https://github.com/bounswe/bounswe2024group6/pull/573)       | Assigned  |
| BACKEND-530: Modify docker-compose for database volume and create separate yml for BACKEND-DEV | [#533](https://github.com/bounswe/bounswe2024group6/pull/533)       | Assigned  |
| Added lexvo endpoints                            | [#689](https://github.com/bounswe/bounswe2024group6/pull/689)       | Reviewed  |
| Various fixes for Posts, Comments, and Profile   | [#594](https://github.com/bounswe/bounswe2024group6/pull/594)       | Reviewed  |
| Backend 478: Lexvo Endpoints                                      | [#581](https://github.com/bounswe/bounswe2024group6/pull/581)       | Reviewed  |
| Backend 458: Preliminary Lexvo Endpoints                                      | [#458](https://github.com/bounswe/bounswe2024group6/pull/458)       | Reviewed  |

## Yunus Emre Özdemir

### Responsibilities

Throughout this milestone, I took on significant responsibilities in frontend development and testing, focusing on both feature implementation and quality assurance. My main areas of responsibility included:

1. **Core Feature Development**
   - Led the implementation of the Quiz Creation functionality, dedicating substantial effort to create a robust and user-friendly quiz creation interface
   - Developed the Comments Section for posts, enhancing user interaction capabilities
   - Implemented the Notifications system, improving user engagement and platform interactivity

2. **Testing Infrastructure**
   - Established the Frontend Testing Environment, laying the groundwork for systematic quality assurance
   - Created comprehensive Forum Page Tests, ensuring reliability of core platform features

3. **User Interaction Features**
   - Implemented various social features including:
     - Follow/Unfollow functionality
     - Post Like/Unlike system
     - Bookmark functionality
     - Night Mode feature for improved user experience

4. **Project Management**
   - Participated in milestone planning and demo preparation
   - Handled complex merge conflict resolutions across multiple pull requests

### Main Contributions

1. **Major Implementations**
    - Created the Quiz Creation Page
    - Implemented the Comments Section
    - Developed the Notifications System
    - Established Testing Infrastructure

2. **Feature Enhancements**
    - Implemented Night Mode
    - Added Forum Page Tests
    - Developed social interaction features:
      - Like/Unlike functionality
      - Bookmark system
      - Follow/Unfollow capability

3. **Technical Maintenance**
    - Resolved critical configuration issues:
      - Package-lock.json management
      - BaseURL configuration

4. **Collaborative Contributions**
    - Actively contributed to multiple lab assignments
    - Conducted code reviews

### API Contributions

As a frontend developer, I have integrated several key API endpoints into the application. Below is a detailed documentation of the endpoints used, including example requests/responses and their contextual usage in the project.

1. **User Activities / Notifications Endpoint**
    **Usage Context:**
    This endpoint is implemented in the notifications feature of the application. It retrieves all activity notifications for the currently authenticated user, including:
    - When someone follows the user
    - When someone likes the user's post
    
    **Example Request:**
    ```http
    GET http://161.35.208.249:8000/user-activities-as-object/
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    ```
    
    **Example Response:**
    ```json
    {
        "activities": [
            {
                "actor": "elifnd",
                "verb": "liked",
                "object_type": "Post",
                "object_id": 4,
                "timestamp": "2024-11-26T11:13:28.559514Z",
                "affected_username": "yunus"
            },
            {
                "actor": "yagizguldal",
                "verb": "followed",
                "object_type": "Profile",
                "object_id": 1,
                "timestamp": "2024-11-25T17:09:17.296163Z",
                "affected_username": "yunus"
            }
        ]
    }
    ```
    
    **Implementation Details**
        The endpoint response is processed to create user-friendly notification messages. Each activity is transformed into a formatted notification with:
    - Interactive links to user profiles and posts
    - Time-ago formatting for timestamps
    - Different message formats based on activity type (follow/like)
    ```ts
    useEffect(() => {
        axios
          .get(`${BASE_URL}/user-activities-as-object/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            console.log(response.data.activities);
            setNotifications(
              response.data.activities.map((activity, i) => ({
                id: i,
                content:
                  activity.verb == "followed" ? (
                    <div>
                      <a
                        href={`/profile/${activity.actor}`}
                        className="text-blue-500"
                      >
                        {activity.actor}
                      </a>{" "}
                      followed you
                    </div>
                  ) : activity.verb == "liked" ? (
                    <div>
                      <a
                        href={`/profile/${activity.actor}`}
                        className="text-blue-500"
                      >
                        {activity.actor}
                      </a>{" "}
                      liked your{" "}
                      <a
                        href={`/post/${activity.object_id}`}
                        className="text-blue-500"
                      >
                        post
                      </a>
                    </div>
                  ) : (
                    <div>Unknown activity</div>
                  ),
                timePassed: formatTimeAgo(activity.timestamp),
              }))
            );
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);
      ```
2. **Post Details Endpoint**
    **Usage Context:**
    This endpoint is used in the Comments/Post page to fetch detailed information about a specific post, including:
    - Post metadata (title, description, creation date)
    - Like count and bookmark status
    - Associated tags
    - Nested comments with replies
    - Like status for the authenticated user
    
    **Example Request:**
    ```http
    POST http://161.35.208.249:8000/post/
    Authorization: Bearer {token}
    Content-Type: application/json

    {
        "post_id": "4"
    }
    ```
    
    **Example Response:**
    ```json
    {
        "post": {
            "id": 4,
            "title": "Did you know that waltz means 'vals' in Turkish?",
            "description": "I just learned this from my English teacher. Apparently it can also be used in different phrases, like \"to waltz around something\" or \"waltz off\".",
            "created_at": "2024-11-26T11:07:35.864797Z",
            "like_count": 3,
            "tags": [
                "#Vocabulary",
                "#C2"
            ],
            "is_liked": false,
            "author": "yunus",
            "is_bookmarked": false,
            "comments": [
                {
                    "id": 3,
                    "post": 4,
                    "author": "ali",
                    "body": "Oh so that's what that means. I saw this word on a Magic the Gathering card called 'Macabre Waltz', but never really gave it much thought. Neat.",
                    "created_at": "2024-11-26T12:39:11.340266Z",
                    "parent": null,
                    "replies": [],
                    "is_liked": false,
                    "like_count": 0
                }
            ]
        }
    }
    ```
    
    **Implementation Details:**
    The response data is processed and used to:
    - Display the post content and metadata
    - Handle interaction states (likes, bookmarks)
    - Enable real-time updates of comment threads
    ```ts
    useEffect(() => {
        setIsLoading(true);
        axios
          .post(
            `${BASE_URL}/post/`,
            {
              post_id: postID,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            console.log(response.data);
            const postData: PostResponse = response.data.post;
            setPost(convertPostResponseToPost(postData));
            setComments(convertPostResponseToPost(postData).comments);
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }, [postID]);
    ```

### Code Related Significant Issues

| Task                                                                                   | Link                                                                                                     | Duration   |
|----------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------|------------|
| Lab Frontend: Implement Night Mode Feature                                                   | [#490](https://github.com/bounswe/bounswe2024group6/issues/490)                                         | 1.5 hours    |
| Frontend: Create Quiz Creation Page                                                   | [#525](https://github.com/bounswe/bounswe2024group6/issues/525)                                         | 6 hours    |
| Implement Comments Section of the Posts                                                   | [#560](https://github.com/bounswe/bounswe2024group6/issues/560)                                         | 4 hours    |
| Make Notifications Functional                                                   | [#561](https://github.com/bounswe/bounswe2024group6/issues/561)                                         | 4 hours    |
| Frontend: Create Testing Environment                                                   | [#572](https://github.com/bounswe/bounswe2024group6/issues/572)                                         | 3 hours    |
| Frontend: Create Forum Page Tests                                                   | [#577](https://github.com/bounswe/bounswe2024group6/issues/577)                                         | 2 hours    |
| Frontend: Persist Like Button Color On Page Refresh                                                  | [#588](https://github.com/bounswe/bounswe2024group6/issues/588)                                         | 20 minutes    |
| Frontend: Implement Post Unlike Functionality                                                  | [#590](https://github.com/bounswe/bounswe2024group6/issues/590)                                         | 20 minutes    |
| Frontend: Connect Bookmark Functionality to Backend                                                   | [#595](https://github.com/bounswe/bounswe2024group6/issues/595)                                         | 30 minutes    |
| Frontend: Implement Follow/Unfollow Functionality                                                   | [#604](https://github.com/bounswe/bounswe2024group6/issues/604)                                         | 30 minutes    |

### Management Related Significant Issues

| Task                                                                                   | Link                                                                                                     | Duration   |
|----------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------|------------|
| Planning: Customer Milestone 2 Demo Plan                                                   | [#509](https://github.com/bounswe/bounswe2024group6/issues/509)                                         | 2 hours    |
| Frontend: Resolve Merge Conflicts in PRs #478, #493, #500, #522                                                   | [#523](https://github.com/bounswe/bounswe2024group6/issues/523)                                         | 1 hour    |

### Pull Requests

We didn't immediately merge [Lab 5](https://github.com/bounswe/bounswe2024group6/pull/478) and [Lab 6](https://github.com/bounswe/bounswe2024group6/pull/493) PRs. With further feature development in [#500](https://github.com/bounswe/bounswe2024group6/pull/500) and [#522](https://github.com/bounswe/bounswe2024group6/pull/522), conflicts arised between these four PRs. Going with the chronological order, I manually resolved conflicts between the PRs and main, eventually merging all of them. This is documented in [Issue #523](https://github.com/bounswe/bounswe2024group6/issues/523).

| Pull Requests                                     | Link                                                                 | Action    |
|---------------------------------------------------|----------------------------------------------------------------------|-----------|
| feat(frontend): create quiz creation page  | [#529](https://github.com/bounswe/bounswe2024group6/pull/529)       | Assigned  |
| feat(frontend): create testing environment  | [#576](https://github.com/bounswe/bounswe2024group6/pull/576)       | Assigned  |
| feat(frontend): add forum page tests  | [#587](https://github.com/bounswe/bounswe2024group6/pull/587)       | Assigned  |
| feat(frontend): persist is_liked information on refresh  | [#589](https://github.com/bounswe/bounswe2024group6/pull/589)       | Assigned  |
| feat(frontend): implement unlike functionality  | [#593](https://github.com/bounswe/bounswe2024group6/pull/593)       | Assigned  |
| feat(frontend): connect bookmark functionality to backend  | [#597](https://github.com/bounswe/bounswe2024group6/pull/597)       | Assigned  |
| feat(frontend): implement follow/unfollow functionality  | [#607](https://github.com/bounswe/bounswe2024group6/pull/607)       | Assigned  |
| feat(frontend): implement notifications functionality  | [#609](https://github.com/bounswe/bounswe2024group6/pull/609)       | Assigned  |
| feat(frontend): implement comments section of the posts  | [#612](https://github.com/bounswe/bounswe2024group6/pull/612)       | Assigned  |
| fix: delete package-lock.json  | [#698](https://github.com/bounswe/bounswe2024group6/pull/698)       | Assigned  |
| fix: change baseURL  | [#699](https://github.com/bounswe/bounswe2024group6/pull/699)       | Assigned  |
| Lab 5 Pull Request  | [#478](https://github.com/bounswe/bounswe2024group6/pull/478)       | Contributed  |
| Lab 6 Pull Request  | [#493](https://github.com/bounswe/bounswe2024group6/pull/493)       | Contributed  |
| Frontend 499: Create Login-Register Pages  | [#500](https://github.com/bounswe/bounswe2024group6/pull/500)       | Contributed  |
| fix(frontend): changed navbar icon's functionality  | [#522](https://github.com/bounswe/bounswe2024group6/pull/522)       | Contributed  |
| feat(frontend): edited compose post and forum tags  | [#527](https://github.com/bounswe/bounswe2024group6/pull/527)       | Reviewed  |
| feat(frontend): redesigned quiz component and added photo to it  | [#532](https://github.com/bounswe/bounswe2024group6/pull/532)       | Reviewed  |
| feat(frontend): added photo feature to quiz details page  | [#535](https://github.com/bounswe/bounswe2024group6/pull/535)       | Reviewed  |
| feat(frontend): Added filtering functionality to forum  | [#567](https://github.com/bounswe/bounswe2024group6/pull/567)       | Reviewed  |
| feat(frontend): implemented other/own users' profile views  | [#580](https://github.com/bounswe/bounswe2024group6/pull/580)       | Reviewed  |
| feat(frontend): created edit-profile page, added missing types to Profile  | [#598](https://github.com/bounswe/bounswe2024group6/pull/598)       | Reviewed  |
| added favoicon and made tab name dynamic  | [#618](https://github.com/bounswe/bounswe2024group6/pull/618)       | Reviewed  |


## Kaan Yolcu
### Responsibilities
- Integration Lexvo and Wordnet
- Finding word database for our application
- Extracting and making the word data ready for use
- Implement a robust system for lexvo , database and frontend integration 
- Testing Follow and Lexvo related endpoints

### Main Contributions
- Finding word database with CEFR levels
- Implemented scripts that fetches at least 10,000 words from lexvo
- Implemented scripts that extracts translations. meanings and related words
- Implemented scripts populating the database and written  various word endpoints.
- Fulfilled many frontend request and modified various endpoints for that like profile , comments and and reorganized that models
- Written a detailed project plan for milestone 3.
- Tested follow/unfollow and lexvo endpoints

### API Contributions

The most complex API contribution of mine was fetching the word data such as translation , related words, sentences and meaning from lexvo populating it to the database . If the word data is not available in the database fetch the data from lexvo and put it into response after various extractions and data cleaning and requesting endpoints using many APIs.


```
@api_view(['GET'])
def get_word_details(request, word):
    word_instances = Word.objects.filter(word=word)
    for word_instance in word_instances:
        print(f"The meaning of '{word_instance.word}' is: {word_instance.meaning}")

    if word_instance:
        if word_instance.meaning == "Meaning not available" and word_instance.sentence == "Sentence not available":
            
            try:
                word_info = lexvo_manager.get_final_info(word)
            except Exception as e:
                return Response({
                    "error": f"Error fetching data for word '{word}': {str(e)}"
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            meanings = []
            if word_info.get("meanings") is None or word_info["meanings"] == []:
                related_meanings = fetch_related_meanings(word)
                word_instance.meaning = ', '.join(related_meanings) if related_meanings else "Meaning not available"
            else:
                for meaning in word_info["meanings"]:
                    meanings.append(meaning["label"])
                
                word_instance.meaning = meanings
            
            word_instance.sentence = "Sentence not available" 
            word_instance.save()

            if word_info.get("turkish_translations"):
                for translation_uri in word_info["turkish_translations"]:
                    translation, created = Translation.objects.get_or_create(
                        word=word_instance,
                        translation=translation_uri.split('/')[-1]  
                    )

            if word_info["meanings"]:
                for meaning in word_info["meanings"]:
                    for related_word in meaning["broader"] + meaning["narrower"] + meaning["nearlySameAs"]:
                        related_word_instance, created = Word.objects.get_or_create(word=related_word)
                        
                        Relationship.objects.get_or_create(
                            word=word_instance,
                            related_word=related_word_instance,
                            relation_type='broader'  
                        )

            return Response({
                "word": word_instance.word,
                "meaning": word_instance.meaning,
                "sentence": word_instance.sentence,
                "translations": [translation.translation for translation in word_instance.translations.all()],
                "relationships": [
                    {
                        "related_word": relationship.related_word.word,
                        "relation_type": relationship.relation_type
                    } for relationship in word_instance.relationships.all()
                ]
            })
        else:
            return Response({
                "word": word_instance.word,
                "meaning": word_instance.meaning,
                "sentence": word_instance.sentence,
                "translations": [translation.translation for translation in word_instance.translations.all()],
                "relationships": [
                    {
                        "related_word": relationship.related_word.word,
                        "relation_type": relationship.relation_type
                    } for relationship in word_instance.relationships.all()
                ]
            })

    else:
        try:
            word_info = lexvo_manager.get_final_info(word)
        except Exception as e:
            return Response({
                "error": f"Error fetching data for word '{word}': {str(e)}"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        new_word = Word.objects.create(
            word=word,
            meaning=word_info["meanings"][0]["label"] if word_info["meanings"] else "Meaning not available",
            sentence="Sentence not available",  
        )

        if word_info.get("turkish_translations"):
            for translation_uri in word_info["turkish_translations"]:
                Translation.objects.create(
                    word=new_word,
                    translation=translation_uri.split('/')[-1] 
                )

        if word_info["meanings"]:
            for meaning in word_info["meanings"]:
                for related_word in meaning["broader"] + meaning["narrower"] + meaning["nearlySameAs"]:
                    related_word_instance, created = Word.objects.get_or_create(word=related_word)
                    Relationship.objects.get_or_create(
                        word=new_word,
                        related_word=related_word_instance,
                        relation_type='broader'  
                    )

        return Response({
            "word": new_word.word,
            "meaning": new_word.meaning,
            "sentence": new_word.sentence,
            "translations": [translation.translation for translation in new_word.translations.all()],
            "relationships": [
                {
                    "related_word": relationship.related_word.word,
                    "relation_type": relationship.relation_type
                } for relationship in new_word.relationships.all()
            ]
        })
- Request:
  ```
  curl http://0.0.0.0:8000/get-word-details/abandon
  ```
- Response
```
  {
    "word": "abandon",
    "meaning": "a feeling of extreme emotional intensity;, give up with the intent of never claiming again;, the trait of lacking restraint or control; reckless freedom from inhibition or worry;, stop maintaining or insisting on; of ideas or claims;, leave behind empty; move out of;, leave someone who needs or counts on you; leave in the lurch;, forsake, leave behind;",
    "sentence": "The mother deserted her children, You must vacate your office by tonight, Abandon your life to God\"; \"She gave up her children to her ex-husband when she moved to Tahiti\"; \"We gave the drowning victim up for dead, He abandoned the thought of asking for her hand in marriage\"; \"Both sides have to give up some claims in these negotiations, she danced with abandon, the wildness of his anger, We abandoned the old car in the empty parking lot",
    "translations": [
        "bırakmak",
        "kovmak",
        "terk etmek"
    ],
    "relationships": [
        {
            "related_word": "foreswear",
            "relation_type": "narrower"
        },
        {
            "related_word": "leave",
            "relation_type": "broader"
        },
        {
            "related_word": "leave",
            "relation_type": "broader"
        },
        {
            "related_word": "maroon",
            "relation_type": "narrower"
        },
        {
            "related_word": "ditch",
            "relation_type": "narrower"
        },
        {
            "related_word": "walk",
            "relation_type": "narrower"
        },
        {
            "related_word": "expose",
            "relation_type": "narrower"
        },
        {
            "related_word": "discard",
            "relation_type": "broader"
        },
        {
            "related_word": "forfeit",
            "relation_type": "narrower"
        },
        {
            "related_word": "dispense",
            "relation_type": "narrower"
        },
        {
            "related_word": "chuck",
            "relation_type": "narrower"
        },
        {
            "related_word": "consign",
            "relation_type": "narrower"
        },
        {
            "related_word": "unrestraint",
            "relation_type": "broader"
        },
        {
            "related_word": "passion",
            "relation_type": "broader"
        },
        {
            "related_word": "foreswear",
            "relation_type": "narrower"
        },
        {
            "related_word": "leave",
            "relation_type": "broader"
        },
        {
            "related_word": "leave",
            "relation_type": "broader"
        },
        {
            "related_word": "maroon",
            "relation_type": "narrower"
        },
        {
            "related_word": "ditch",
            "relation_type": "narrower"
        },
        {
            "related_word": "walk",
            "relation_type": "narrower"
        },
        {
            "related_word": "expose",
            "relation_type": "narrower"
        },
        {
            "related_word": "discard",
            "relation_type": "broader"
        },
        {
            "related_word": "forfeit",
            "relation_type": "narrower"
        },
        {
            "related_word": "dispense",
            "relation_type": "narrower"
        },
        {
            "related_word": "chuck",
            "relation_type": "narrower"
        },
        {
            "related_word": "consign",
            "relation_type": "narrower"
        },
        {
            "related_word": "unrestraint",
            "relation_type": "broader"
        },
        {
            "related_word": "passion",
            "relation_type": "broader"
        }
    ]
}```
### Code Realted Significant Issues

| Task                                                                                   | Link                                                                                                     | Duration   |
|----------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------|------------|
| Backend: Populate Database with Words, Translations and Categories|[#458](https://github.com/bounswe/bounswe2024group6/issues/458) |16-17 hours |
| Retrieve Translations , Meanings and Related Words | [#437](https://github.com/bounswe/bounswe2024group6/issues/437) | 2 hours|
| Fix: Comment , Post and Profile related significant fields in Endpoint requests and responses |[#583](https://github.com/bounswe/bounswe2024group6/issues/583)|2 hours |
| Configure Post Related Endpoints Specific To User | [#578](https://github.com/bounswe/bounswe2024group6/issues/578) | 1 hours |
| Lexvo Test Endpoints| [#688](https://github.com/bounswe/bounswe2024group6/issues/688) | 1.5 hour|

### Management-related significant issues
| Task                                                                                   | Link                                                                                                     | Duration   |
|----------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------|------------|
| Prepare Software Quality Plan| [#709](https://github.com/bounswe/bounswe2024group6/issues/709)| 1.5 hours |
| Project Plan For Milestone 3 | [#709](https://github.com/bounswe/bounswe2024group6/issues/709)| 1 hours|

### Pull Requests

| Pull Requests                                     | Link                                                                 | Action    |
|---------------------------------------------------|----------------------------------------------------------------------|-----------|
| Added separate endpoints for translations and meaning|[#608](https://github.com/bounswe/bounswe2024group6/pull/608)| Assigned|
| Fixed Various Endpoints of Comments , FeedViews , ProfileViews and Posts| [#594](https://github.com/bounswe/bounswe2024group6/pull/594)|Assigned|
| Added Lexvo Endpoints | [#689](https://github.com/bounswe/bounswe2024group6/pull/689)| Assigned|
| Added user specific fields to bookmark like and view-profile | [#581](https://github.com/bounswe/bounswe2024group6/pull/581)| Assigned|
| Various Scripts , Endpoints and Uitlity Functions Implemented for Lexvo and Words we will gonna use |[#582](https://github.com/bounswe/bounswe2024group6/pull/502/files)| Assigned|
| impr(backend): optimize backend word population  | [#665](https://github.com/bounswe/bounswe2024group6/pull/665)       | Contributor |
| BACKEND-530: Modify docker-compose for database volume and create separate yml for BACKEND-DEV | [#533](https://github.com/bounswe/bounswe2024group6/pull/533)       | Contributor |
| fix: return unique quiz instances in solved quizzes endpoint | [#679](https://github.com/bounswe/bounswe2024group6/pull/679)       | Reviewer  |
| tests: unit tests for quiz endpoints             | [#673](https://github.com/bounswe/bounswe2024group6/pull/673)       | Reviewer |
| feat: implement review latest quiz attempt for a given quiz endpoint | [#671](https://github.com/bounswe/bounswe2024group6/pull/671)       | Reviewer |
| feat(backend): quiz recommendation               | [#659](https://github.com/bounswe/bounswe2024group6/pull/659)       | Reviewer  |
| BACKEND-585: Improvements on Quiz Endpoints      | [#596](https://github.com/bounswe/bounswe2024group6/pull/596)       | Reviewer  |
| BACKEND-519: Preliminary quiz endpoints          | [#573](https://github.com/bounswe/bounswe2024group6/pull/573)       | Reviewer  |



## **Halil Özkan**

### **Responsibilities**
- Developed core backend features, focusing on creating and refining endpoints for posts, profiles, and comments.
- Implemented functionality for basic search and improved user experience through additional fields like `isLiked` and `isBookmarked` in post data.
- Collaborated on milestone reports and user story preparation to align with project goals.

---

### **Main Contributions**
- Implemented a **search endpoint** that supports post, user, quiz, and comment searches, enabling dynamic data retrieval across the application.
- Designed the **Get User Post Feed** endpoint to provide users with a personalized feed including likes, bookmarks, and comments.
- Enhanced the **View Other Profile** endpoint, allowing users to view detailed profiles of others, including related posts and activities.
- Integrated additional fields (`isLiked` and `isBookmarked`) into post data to improve user engagement tracking.
- Implemented the feed page by integrating posts dynamically and ensuring consistent data flow.
- Collaborated on milestone reports and prepared two user stories for lab discussions, contributing to the project's documentation and planning.

---

### **API Contributions**

Here is my most important API contributions:

#### **Get User Post Feed**
The **Get User Post Feed** endpoint delivers a personalized feed with up to 100 random posts, including data on likes, bookmarks, tags, and associated comments.

```python
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_post_feed(request):
    user = request.user  

    posts = Post.objects.all()

    if posts.exists():
        random_posts = random.sample(list(posts), min(len(posts), 100))
    else:
        random_posts = []

    feed_data = [
        {
            "id": post.id,
            "title": post.title,
            "description": post.description,
            "author": post.author.username, 
            "created_at": post.created_at,
            "like_count": post.like_count,
            "tags": [tag for tag in post.tags],
            "is_liked": post.liked_by.filter(id=user.id).exists(),  
            "is_bookmarked": Bookmark.objects.filter(user=user, post=post).exists(),  
            "comments": CommentSerializer(
                Comment.objects.filter(post=post),
                many=True
            ).data,
        }
        for post in random_posts
    ]

    return Response({"feed": feed_data}, status=status.HTTP_200_OK)
```

---

#### **Search Endpoint**
The **Search Endpoint** allows users to query posts, users, quizzes, and comments, optionally filtering by type.

```python
class SearchView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        query = request.query_params.get('q', None)
        filter_type = request.query_params.get('type', None)
        results = {}

        if not query:
            return Response({"error": "A search query is required."}, status=400)

        # Search users by username
        if not filter_type or filter_type == "users":
            users = User.objects.filter(Q(username__icontains=query))
            results['users'] = UserSerializer(users, many=True).data

        # Search posts by title
        if not filter_type or filter_type == "posts":
            posts = Post.objects.filter(Q(title__icontains=query))
            results['posts'] = PostSerializer(posts, many=True).data

        # Search comments by body
        if not filter_type or filter_type == "comments":
            comments = Comment.objects.filter(Q(body__icontains=query))
            results['comments'] = CommentSerializer(comments, many=True).data

        # Search quizzes by title
        if not filter_type or filter_type == "quizzes":
            quizzes = Quiz.objects.filter(Q(title__icontains=query))
            results['quizzes'] = QuizSerializer(quizzes, many=True).data

        return Response(results)
```

---

#### **View Other Profile**
The **View Other Profile** endpoint retrieves detailed profile information for a specified user.

```python
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_other_profile(request, username):
    user = get_object_or_404(User, username=username)
    profile = get_object_or_404(Profile, user=user)
    serializer = ProfileSerializer(profile, context={'request': request})
    return Response(serializer.data, status=status.HTTP_200_OK)
```

---

### **Significant Issues**

| **Task**                                        | **Issue Link**                                                                 | **Duration** |
|-------------------------------------------------|--------------------------------------------------------------------------------|--------------|
| Implemented Basic Search Endpoint               | [#617](https://github.com/bounswe/bounswe2024group6/issues/617)               | 3 hours      |
| Created Post Details Endpoint                   | [#571](https://github.com/bounswe/bounswe2024group6/issues/571)               | 4 hours      |
| Fixed `/post/comment/add` Bug                   | [#570](https://github.com/bounswe/bounswe2024group6/issues/570)               | 2 hours      |
| Enhanced View Other Profile Feature             | [#554](https://github.com/bounswe/bounswe2024group6/issues/554)               | 3 hours      |
| Added `isLiked` and `isBookmarked` Fields       | [#550](https://github.com/bounswe/bounswe2024group6/issues/550)               | 2.5 hours    |
| Backend Feed Page Integration                   | [#501](https://github.com/bounswe/bounswe2024group6/issues/501)               | 5 hours      |

---

### **Management-Related Contributions**
| **Task**                                        | **Issue Link**                                                                 | **Duration** |
|-------------------------------------------------|--------------------------------------------------------------------------------|--------------|
| Prepared 2 User Stories for Lab                 | [#489](https://github.com/bounswe/bounswe2024group6/issues/489)               | 1.5 hours    |
| Contributed to Lab 5 Report                    | [#479](https://github.com/bounswe/bounswe2024group6/issues/479)               | 1 hour       |

---

### **Pull Requests**

| **Pull Request**                                | **Link**                                                                        | **Action**   |
|-------------------------------------------------|--------------------------------------------------------------------------------|--------------|
| Search Algorithm for User, Quiz, Post, Comment | [#621](https://github.com/bounswe/bounswe2024group6/pull/621)                  | Contributor  |
| Delete Duplicate Code                          | [#558](https://github.com/bounswe/bounswe2024group6/pull/558)                  | Contributor  |
| View Other Profiles                            | [#557](https://github.com/bounswe/bounswe2024group6/pull/557)                  | Contributor  |
| Backend 554                                     | [#556](https://github.com/bounswe/bounswe2024group6/pull/556)                  | Contributor  |
| Like/Unlike Problem Solution                   | [#553](https://github.com/bounswe/bounswe2024group6/pull/553)                  | Contributor  |
| Activity Streams and Post Endpoints            | [#516](https://github.com/bounswe/bounswe2024group6/pull/516)                  | Reviewer     |


## Oktay Özel
### Contributions

I have implemented most of the forum, post, comment, like, unlike, reply comment endpoints. Model and Serializers urls and testings for those have been implemented by me. I also have given the mobile and frontend teams with the support via hot fixes and endpoint information. I have took active role in the design of the app as well.
                                                


### Pull Requests and Commits

| Responsibility         | Commit or Pull Request                                                                                          | Duration |
|-------------------------|----------------------------------------------------------------------------------------------------------------|----------|
| Like-Unlike Posts       | [Pull Request #472](https://github.com/bounswe/bounswe2024group6/pull/472), [Pull Request #481](https://github.com/bounswe/bounswe2024group6/pull/481) |   1h       |
| Lab report              | [Commit 1](https://github.com/bounswe/bounswe2024group6/commit/c5aa66082a8971ea855bc2929fb2527da95cc185)       |    1h      |
| Activity Streams and Notifications    | [Pull Request #511](https://github.com/bounswe/bounswe2024group6/pull/511), [Pull Request #510](https://github.com/bounswe/bounswe2024group6/pull/510), [Commit 1](https://github.com/bounswe/bounswe2024group6/commit/2b21e7cd1cf713bf0aa27833d46ad57ac4677925), [Commit 2](https://github.com/bounswe/bounswe2024group6/commit/a25e2ab04a4749829ffa4a9ae9b278159196fd18), [Commit 3](https://github.com/bounswe/bounswe2024group6/commit/02fdfbb7941721128f9f207b289d7e4e753b7325) |    3h      |
| Post Endpoints.         | [Commit 1](https://github.com/bounswe/bounswe2024group6/commit/f59bb45198b0e417fe5456ab56063a8f1fca6b38), [Commit 2](https://github.com/bounswe/bounswe2024group6/commit/8ae98d499805686f1cbbbce7484a9e6dd4125973), [Commit 3](https://github.com/bounswe/bounswe2024group6/commit/c178957995cb7e8d418212d47f9e2bde3aca9a5e) |     3h     |
| Update Models        | [Commit 1](https://github.com/bounswe/bounswe2024group6/commit/48432398785d5ee175232d64d024e509e6cfb9ea)       |     1h     |
| Follow Unfollow         | [Commit 1](https://github.com/bounswe/bounswe2024group6/commit/ee8dbba2bfe3b281de4535b5b41239a1ce6a1702), [Commit 2](https://github.com/bounswe/bounswe2024group6/commit/be9a839feb2c6806a5fa8c0634ccf8d4937a25c4), [Commit 3](https://github.com/bounswe/bounswe2024group6/commit/269d8e2e6226e419175159d102e19460149be0e2) |     2h     |
| Comments Endpoints      | [Commit 1](https://github.com/bounswe/bounswe2024group6/commit/8272987211a1c05b58ab56a2f7d256efbe115914)       |    1h      |
| User Feed Endpoints     | [Commit 1](https://github.com/bounswe/bounswe2024group6/commit/66ff0c563d90dfd72c33d7288244dbd8e3ed820a), [Commit 2](https://github.com/bounswe/bounswe2024group6/commit/8463d82caa006d7be40df47f7881efb1ba4b9e2e) |     1h     |
| Bookmark Model          | [Commit 1](https://github.com/bounswe/bounswe2024group6/commit/2fb88b844bc32a75755c4b3508ce0ae41e6f36e7)       |    1h      |
| Bookmark Endpoint       | [Commit 1](https://github.com/bounswe/bounswe2024group6/commit/dcff7126f16cc9b3544784f3820c933368da3ecd), [Commit 2](https://github.com/bounswe/bounswe2024group6/commit/e7b684a21d96afe0bcb13c6152c1d21304e2619b), [Pull Request #534](https://github.com/bounswe/bounswe2024group6/pull/534) |   2h       |
| Refactoring and Cleaning| [Commit 1](https://github.com/bounswe/bounswe2024group6/commit/734527f8eb37607636fe5a52e5defd9f8cfdbff2), [Commit 2](https://github.com/bounswe/bounswe2024group6/commit/532eec4aa7edf80e4ea0100f12885d4761f126fa) |     30 min    |
| Refresh Token Endpoint  | [Commit 1](https://github.com/bounswe/bounswe2024group6/commit/7cd507a0cfc3ff8bca1a3edd57aecceefac2bbba)       |     1h     |
| Testing: Authentication | [Commit 1](https://github.com/bounswe/bounswe2024group6/commit/ae9ec060156f44b6486124814ce5b86fdec0a056)       |     1h     |
| Testing: Profile Views  | [Commit 1](https://github.com/bounswe/bounswe2024group6/commit/1e95f97d9cfd4cc47e0e55f5d4b8a1d9493bd48e), [Pull Request #538](https://github.com/bounswe/bounswe2024group6/pull/538) |     1h     |
| Hot Fixes               | [Commit 1](https://github.com/bounswe/bounswe2024group6/commit/03e69728d28f33547c940e2ed3c086b6f304609d), [Commit 2](https://github.com/bounswe/bounswe2024group6/commit/df216aed18dd05ba0af6855cb759a078f6660dfd), [Commit 3](https://github.com/bounswe/bounswe2024group6/commit/626a368af5b568b1a9b8c01bdd75055b0b5f7f1b), [Commit 4](https://github.com/bounswe/bounswe2024group6/commit/2bd15e5c0c2ce8220c1996a5e44b22da8fb7b881), [Commit 5](https://github.com/bounswe/bounswe2024group6/commit/0c5f5a14205d9dee9d086c82916556ee4db413c1), [Commit 6](https://github.com/bounswe/bounswe2024group6/commit/899f2a04c3594544bcfad238444789b989ca5c93), [Commit 7](https://github.com/bounswe/bounswe2024group6/commit/adde841bc7d34cb4980f4db22e9789df5e7da564), [Commit 8](https://github.com/bounswe/bounswe2024group6/commit/c43420480a874039c730f2d9dfebfa04bfd01c95), [Commit 9](https://github.com/bounswe/bounswe2024group6/commit/847468df5932e511da77ebe0d757fbe1b80f6947), [Commit 10](https://github.com/bounswe/bounswe2024group6/commit/5fcd950f41414878a47895e50a301df8fdc7bc67) |      10h    |
| Attend group Meetgings | | 5h|
| Presentation Preparation | | 1h|

## Elif Nur Deniz
### Responsibilities
Throughout this milestone, I focused on frontend development, design enhancements, and feature implementation to improve the user experience and ensure smooth functionality. My responsibilities included:
1. **Feature Development**:
  * Designed and implemented quiz-related components, such as the quiz feed, quiz card, and quiz results page.
  * Created functionalities like bookmarking posts, sorting and filtering forum posts, and improving profile page features.
  * Developed interactive elements, including user popovers, profile edit pages, and quiz continuation features. 
  * Connected frontend features with backend APIs, including all profile page features, quiz functionalities, and fixed problems in user interactions like follow/unfollow, bookmark etc.
2. **Design Enhancements**:
  * Improved the frontend design for a polished milestone presentation.
  * Fixed dark mode display issues across various pages.
  * Enhanced user interaction through intuitive navigation and UI adjustments.
3. **Bug Fixing and Testing**:
  * Fixed significant issues, such as updating follower counts, missing usernames, non-functional tags, and many more.
  * Conducted unit testing for profile pages and other features to ensure code reliability.
4. **Planning**:
  * Reviewed and coordinated backend JSON request/response formats for profile, post and quiz-related data. Reported all missing elements and pointed possible future errors.
  * Decided on the application tags, documented them and added them in the related fields in the code.
  * Listed milestone requirements for reports and participated in demo preparation.
  * Participated in milestone planning and demo preparation.

### Main Contributions
* Created core components like quiz pages, profile pages.
* Enabled bookmarking posts and created a tab to display bookmarked posts on the profile page alongside with created posts.
* Added functionalities like sorting forum posts by date and like count and filtering posts by tags.
* Developed a popover feature for user details in posts.
* Connected frontend features to backend APIs for seamless functionality.
* Improved frontend UI for the milestone presentation, continuously searched for design/applications related issues and fixed many of them.
* Implemented unit tests for profile-related features, including edit and view functionalities.
* Reviewed backend JSON responses for consistency and reliability.
* Finalized application tags and integrated them into the code.

### API Contributions
I was responsible for creating quiz related pages, connecting post and profile related pages to backend, and enhancing design overall.

**User Card Feature**
```
import React from "react";
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { Suspense, useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../lib/baseURL";
import { Profile, ProfileResponse } from "../../types";
import { convertProfileResponseToProfile } from "./utils";
import { AuthActions } from "../../components/auth/utils.tsx";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

type Props = {
    username: string;
};

export const UserCard = ({
    username,
}: Props) => {
    const [isFollowed, setIsFollowed] = React.useState(false);
    const { getToken } = AuthActions();
    const token = getToken("access");
    const [profile, setProfile] = useState<Profile | null>(null);
    const [followCount, setFollowCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (username) {
            axios
                .get(`${BASE_URL}/profile/${username}/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => {
                    const data: ProfileResponse = response.data;
                    console.log(data);
                    const profile = convertProfileResponseToProfile(data);
                    setIsFollowed(profile.is_followed);
                    setProfile(profile);
                    setFollowCount(profile.followers);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [username, token]);

    const toggleFollow = () => {
        axios
          .post(
            `${BASE_URL}/profile/${isFollowed ? "unfollow" : "follow"}/`,
            {
              username: profile?.username,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            console.log(response.data);
            setFollowCount(response.data.follower_count);
          })
          .catch((error) => {
            console.log(error);
          });
        setIsFollowed(!isFollowed);
      };

    return (
        <Card shadow="none" className="w-[300px] border-none bg-transparent">
            <CardHeader className="justify-between">
                <div className="flex gap-3">
                    <Avatar isBordered radius="full" size="md" src="https://nextui.org/avatars/avatar-1.png" />
                    <div className="flex flex-col items-start justify-center">
                        <h4 className="text-small font-semibold leading-none text-default-600">{profile?.username}</h4>
                        <h5 className="text-small tracking-tight text-default-500">@{profile?.level}</h5>
                    </div>
                </div>
                <div className="flex flex-row items-center gap-2">
                    {profile && profile.username !== Cookies.get("username") &&
                        <Button
                            className={isFollowed ? "bg-transparent text-foreground border-default-200" : ""}
                            color="primary"
                            radius="full"
                            size="sm"
                            variant={isFollowed ? "bordered" : "solid"}
                            onClick={toggleFollow}
                        >
                            {isFollowed ? "Unfollow" : "Follow"}
                        </Button>}
                    <Button color="primary" variant="faded" size="sm" radius="full" onClick={() => navigate(`/profile/${username}`)}>
                        Profile
                    </Button>
                </div>
            </CardHeader>
            <CardBody className="px-3 py-0">
                <p className="text-small pl-px text-default-500">
                    {profile?.bio || "Hey, new learner here!"}
                </p>
            </CardBody>
            <CardFooter className="gap-3">
                <div className="flex gap-1">
                    <p className="font-semibold text-default-600 text-small">{profile?.following}</p>
                    <p className=" text-default-500 text-small">Following</p>
                </div>
                <div className="flex gap-1">
                    <p className="font-semibold text-default-600 text-small">{followCount}</p>
                    <p className="text-default-500 text-small">Followers</p>
                </div>
            </CardFooter>
        </Card>
    );
};
```

**Connecting Profile To Backend**
I did all major connections, added sorted posts and bookmarks to the profile.

```
  // All profile related data and sorting posts based on creation date
  useEffect(() => {
    if (username) {
      setIsLoading(true);
      axios
        .get(`${BASE_URL}/profile/${username}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const data: ProfileResponse = response.data;
          console.log(data);
          const profile = convertProfileResponseToProfile(data);
          const sortedVersion = [...profile.posts].sort((a, b) => {
            return (
              new Date(b.post.created_at).getTime() -
              new Date(a.post.created_at).getTime()
            );
          });
          setFollowCount(profile.followers);
          setIsFollowing(profile.is_followed);
          setSortedPosts(sortedVersion);
          setProfile(profile);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [username, token]);
  

  // Getting bookmarked posts
  useEffect(() => {
    if (username === Cookies.get("username")) {
      console.log("Fetching bookmarked posts");
      axios
        .post(
          `${BASE_URL}/get_bookmarked_posts/`,
          {
            username: profile?.username,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          const bookmarked = response.data.map(convertPostResponseToPost);
          setBookmarkedPosts(bookmarked);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("Not fetching bookmarked posts");
    }
  }, [token]);
```

**Sorting And Filtering Features In Forum**
```
  const [sortFilter, setSortFilter] = useState<string>("Most Recent");
  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortFilter(e.target.value);
  };
  
  const filteredPosts = posts.filter((post) => {
    // Show all posts if no tags are selected
    if (selectedTags.length === 0) return true;

    // Check if the post has at least one tag from the selectedTags
    return post.post.tags.some((tag) => selectedTags.includes(tag));
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortFilter) {
      case "Most Recent":
        return (
          new Date(b.post.created_at).getTime() -
          new Date(a.post.created_at).getTime()
        );
      case "Most Liked":
        return b.engagement.likes - a.engagement.likes;
      default:
        return 0;
    }
  });
  
```

```  
  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  <div className="flex w-[740px] justify-between items-center  mt-4">
        <Select
          onChange={handleSelectionChange}
          placeholder="Sort By"
          defaultSelectedKeys={["Most Recent"]}
          className="w-44 text-black"
        >
          {SortFilters.map((sortFilter) => (
            <SelectItem key={sortFilter}>{sortFilter}</SelectItem>
          ))}
        </Select>
        <div className="flex flex-row gap-2">
          <Select
            placeholder="Difficulty"
            selectionMode="multiple"
            className="w-32 text-black"
          >
            {DifficultyTags.map((tag) => (
              <SelectItem onPress={() => handleTagClick(tag)} key={tag}>
                {tag}
              </SelectItem>
            ))}
          </Select>
          <Select
            placeholder="Categories"
            selectionMode="multiple"
            className="w-32 text-black"
          >
            {Tags.map((tag) => (
              <SelectItem onPress={() => handleTagClick(tag)} key={tag}>
                {tag}
              </SelectItem>
            ))}
          </Select>
        </div>
```
### Code/Non-Code Related Significant Issues
| Task                                                                                                                                                                                       | Duration   |
|----------------------------------------------------------------------------------------|------------|
|[Choosing Tags for Quizzes and Forum](https://github.com/bounswe/bounswe2024group6/issues/448)|2 hours|
|[Redesigning Profile Page](https://github.com/bounswe/bounswe2024group6/issues/453)|2 hours|
|[Initial Designs of Quiz Components and Pages](https://github.com/bounswe/bounswe2024group6/issues/454)|5 hours|
|[Create Quiz Feed](https://github.com/bounswe/bounswe2024group6/issues/485) |3 hours|
|[[Lab]: Prepare 2 User Stories](https://github.com/bounswe/bounswe2024group6/issues/489)|1.5 hours|
|[[Lab] Frontend: Implement Quiz Resume Feature ](https://github.com/bounswe/bounswe2024group6/issues/495) |30 minutes|
|[Planning: Customer Milestone 2 Demo Plan #509](https://github.com/bounswe/bounswe2024group6/issues/509)|2 hours|
|[Change Profile Icon's Funtionality #521](https://github.com/bounswe/bounswe2024group6/issues/521)|30 minutes|
|[Revising Tags in Forum #526](https://github.com/bounswe/bounswe2024group6/issues/526)|2 hours|
|[Revise Quiz Card #528](https://github.com/bounswe/bounswe2024group6/issues/528)|2.5 hours|
|[Connect Frontend Features to the Backend #536](https://github.com/bounswe/bounswe2024group6/issues/536)|6 hours|
|[Creating Profile Related JSON File Template #537](https://github.com/bounswe/bounswe2024group6/issues/537)|30 minutes|
|[Create a Popover For Avatars In Posts And Quizzes #539](https://github.com/bounswe/bounswe2024group6/issues/539)|3 hours|
|[Fix Profile button #540](https://github.com/bounswe/bounswe2024group6/issues/540)|45 minutes|
|[Create Profile Edit Page #542](https://github.com/bounswe/bounswe2024group6/issues/542)|6 hours|
|[Forum Sorting Issue #547](https://github.com/bounswe/bounswe2024group6/issues/547)|2 hours|
|[Make Filtering Functional #551](https://github.com/bounswe/bounswe2024group6/issues/551)|2 hours|
|[Implement visiting the profile pages of other users #559](https://github.com/bounswe/bounswe2024group6/issues/559)|3.5 hours|
|[Fix Profile Page Path Issue #568](https://github.com/bounswe/bounswe2024group6/issues/568)|2 hours|
|[Review Quiz Endpoints #582](https://github.com/bounswe/bounswe2024group6/issues/582)|40 minutes|
|[Review Profile Endpoints #584](https://github.com/bounswe/bounswe2024group6/issues/584)|40 minutes|
|[List Bookmarked Posts In Profile #629](https://github.com/bounswe/bounswe2024group6/issues/629)|6 hours|
|[Missing Usernames in Profile Posts #637](https://github.com/bounswe/bounswe2024group6/issues/637)|40 minutes|
|[Update Follower Count After Follow Operation #644](https://github.com/bounswe/bounswe2024group6/issues/644)|1 hour|
|[Small Changes To Profile And Quizzes #647](https://github.com/bounswe/bounswe2024group6/issues/647)|4 hours|
|[Profile Unit Tests #690](https://github.com/bounswe/bounswe2024group6/issues/690)|1 hour|
|[Creating Implemented Requirements #704](https://github.com/bounswe/bounswe2024group6/issues/704)|40 minutes|

### Pull Requests
| Pull Requests                                     | Link                                                                 | Action    |
|---------------------------------------------------|----------------------------------------------------------------------|-----------|
|added edit-profile tests|[link](https://github.com/bounswe/bounswe2024group6/pull/694)|assigned|
|Design improvements|[1](https://github.com/bounswe/bounswe2024group6/pull/683), [2](https://github.com/bounswe/bounswe2024group6/pull/653)|assigned|
|Fix follower count issue|[link](https://github.com/bounswe/bounswe2024group6/pull/645)|assigned|
|added bookmarked posts to profile|[link](https://github.com/bounswe/bounswe2024group6/pull/643)|assigned|
|implemented popover user cards|[link](https://github.com/bounswe/bounswe2024group6/pull/636)|assigned|
|created edit-profile page, added missing types to Profile|[link](https://github.com/bounswe/bounswe2024group6/pull/598)|assigned|
|implemented other/own users' profile views|[link](https://github.com/bounswe/bounswe2024group6/pull/580)|assigned|
|Added filtering functionality to forum|[link](https://github.com/bounswe/bounswe2024group6/pull/567)|assigned|
| sorted posts in profile and fixed difficulty tag issue|[link](https://github.com/bounswe/bounswe2024group6/pull/549)|assigned|
|implemented forum sorting methods|[link](https://github.com/bounswe/bounswe2024group6/pull/548)|assigned|
|Fixed the background issue with the profile avatar|[link](https://github.com/bounswe/bounswe2024group6/pull/541)|assigned|
| added photo feature to quiz details page|[link](https://github.com/bounswe/bounswe2024group6/pull/535)|assigned|
|redesigned quiz component and added photo to it |[link](https://github.com/bounswe/bounswe2024group6/pull/532)|assigned|
|feat(frontend): edited compose post and forum tags|[link](https://github.com/bounswe/bounswe2024group6/pull/527)|assigned|
|fix(frontend): changed navbar icon's functionality|[link](https://github.com/bounswe/bounswe2024group6/pull/522)|assigned|
|[feat(frontend): Initial Designs of Quiz Components and Pages](https://github.com/bounswe/bounswe2024group6/pull/498)||assigned|
|feat(frontend): reorganised profile page and added options to profile icon in navbar |[link](https://github.com/bounswe/bounswe2024group6/pull/459)|assigned|

I reviewed almost all frontend pull requests.

## Yağız Güldal
### Responsibilities
* Planning and presenting during the customer demo
* The profile section of the mobile app
* The notifications sections of the mobile app
* The search section of the mobile app
* General orchestration and distribution of tasks
### Main Contributions
* Successfully created the scenario and the plan for the demo and presented it.
* Greatly improved the design of the profile page for mobile and made it fit with the overall aesthetic of the frontend app.
* Improved the design of the notifications page of the mobile app.
* Created the design of the search page for the mobile app in-line with the front-end team's designs.
* Connected the notifications page with the backend based on our chosen W3C standard (Activity Streams)
* Connected the profile page to the backend using a variety of endpoints
* Communicated with the backend team about the features and the endpoints needed by the mobile app.
### API Contributions
The most complex thing I had to do in regards to the endpoints were actually getting the profile tab of the mobile app to display the user information correctly. The complexity came not from the nature of a single API endpoint, but from the fact that I had to perform multiple API calls in order to get all the related information. In the profile page of the mobile app, we display general information about the user like their username, follower/following count etc., but we also show the created/solved quizzes and posts/comments. This meant I had to perform three different API calls and handle each of their results correctly. In addition, the `/profile/` endpoint did not return the data in the way I had anticipated when I had first designed the page, so I had to manually combine the posts and comments as they are shown in the same tab in the profile page. I also had to make sure to call the endpoints with the correct username. This is not as trivial an issue as it may seem, as the mobile project structure had to be changed with dynamically navigated routes to accomodate for the structure of the backend api call. These three endpoints are used whenever the user views either their own profile or another user's profile.

The endpoints I used are the following:

| Endpoint | Example Call | Example Result | 
| -------- | ------------ | -------------- |
| /profile | GET http://161.35.208.249:8000/profile/ | {"bio": "Advanced learner, looking to guide others.", "comments": [{"author": "ali", "body": "Oh so that's what that means. I saw this word on a Magic the Gathering card called 'Macabre Waltz', but never really gave it much thought. Neat.", "created_at": "2024-11-26T12:39:11.340266Z", "id": 3, "is_liked": false, "like_count": 0, "parent": null, "post": 4, "replies": [Array]}], "follower_count": 1, "following_count": 1, "is_followed": false, "level": "C2", "name": null, "posts": [], "username": "ali"} | 
| /quiz/created/[username] | GET http://161.35.208.249:8000/quiz/created/ali/ | [{"author": {"id": 8, "username": "ali"}, "average_score": 0, "created_at": "2024-11-26T14:18:49.605284Z", "description": "Delicious fruits", "id": 4, "is_bookmarked": false, "is_liked": false, "level": "A1", "like_count": 0, "question_count": 1, "tags": ["A1"], "times_taken": 0, "title": "Fruit"}] | 
| /quiz/solved/[username] | GET http://161.35.208.249:8000/quiz/solved/ali/ | [{"author": {"id": 5, "username": "elifnd"}, "average_score": 1.3333333333333333, "created_at": "2024-11-26T12:23:03.465957Z", "description": "Do you know what these animals are?", "id": 1, "is_bookmarked": false, "is_liked": false, "level": "C1", "like_count": 0, "question_count": 3, "tags": ["C1"], "times_taken": 6, "title": "Advanced Animals"}, {"author": {"id": 5, "username": "elifnd"}, "average_score": 2, "created_at": "2024-11-26T12:35:51.650537Z", "description": "We eat these (almost) everyday", "id": 3, "is_bookmarked": false, "is_liked": false, "level": "A1", "like_count": 0, "question_count": 3, "tags": ["A1"], "times_taken": 2, "title": "Simple Foods"}] | 


### Code Related Significant Issues
| Task                                | Issue Link                                | Duration |
|-------------------------------------|-------------------------------------------|----------|
| Create Own Profile page for mobile | [Issue #450](https://github.com/bounswe/bounswe2024group6/issues/450) | 5 hours | 
| Create the Other Profile Page  | [Issue #466](https://github.com/bounswe/bounswe2024group6/issues/466) | 2 hours | 
| Move the Mobile App to a new layout | [Issue #467](https://github.com/bounswe/bounswe2024group6/issues/467) | 3 hours |
| Implement the search page - Mobile | [Issue #465](https://github.com/bounswe/bounswe2024group6/issues/465) | 6 hours | 
| Login Token Management for Mobile | [Issue #531](https://github.com/bounswe/bounswe2024group6/issues/531) | 1 hour |
| Unit Tests for Card Components (Mobile) | [Issue #586](https://github.com/bounswe/bounswe2024group6/issues/586) | 2 hours | 
| Connect Profile to Backend (Mobile) | [Issue #603](https://github.com/bounswe/bounswe2024group6/issues/603) | 7 hours | 
| Connect notifications to the Backend (Mobile) | [Issue #631](https://github.com/bounswe/bounswe2024group6/issues/631) | 2 hours | 

### Management Related Significant Issues
| Task                                | Issue Link                                | Duration |
|-------------------------------------|-------------------------------------------|----------|
| Add a new milestone to the Project Plan | [Issue #446](https://github.com/bounswe/bounswe2024group6/issues/446) | 1 hour |
| Take meeting notes and create issues | [Issue #449](https://github.com/bounswe/bounswe2024group6/issues/449) | 2 hours | 
| Host & Create Meeting Notes | [Issue #504](https://github.com/bounswe/bounswe2024group6/issues/504) | 1 hour |
| Milestone 2 Demo Plan | [Issue #509](https://github.com/bounswe/bounswe2024group6/issues/509) | 1 hour |
| Creating Help Document for Backend | [Issue #537](https://github.com/bounswe/bounswe2024group6/issues/537) | 1 hour | 
| Create Prerelease for Milestone 2 | [Issue #707](https://github.com/bounswe/bounswe2024group6/issues/707) | 1 hour |
### Pull Requests
I am omitting some of the pull requests that I was involved in because I merged them upon a request from a team member. (I know that this is bad practice, but we had to cut some corners to meet the customer milestone 2 deadline.)

| Title                               | PR Link                                   | Role     |
|-------------------------------------|-------------------------------------------|----------|
| feat(mobile): Own Profile Page      | [PR #451](https://github.com/bounswe/bounswe2024group6/pull/451) | Author |
| feat(mobile): Tab Layout, Profile Page Design, Quiz Card Component      | [PR #474](https://github.com/bounswe/bounswe2024group6/pull/474) | Author |
| feat(mobile): Search Page     | [PR #503](https://github.com/bounswe/bounswe2024group6/pull/503) | Author |
| feat(mobile): Refactor TokenManager      | [PR #574](https://github.com/bounswe/bounswe2024group6/pull/574) | Author |
| test(mobile: add unit tests for card components      | [PR #591](https://github.com/bounswe/bounswe2024group6/pull/591) | Author |
| feat(mobile): Connect profile pages to backend      | [PR #630](https://github.com/bounswe/bounswe2024group6/pull/630) | Author |
| feat(mobile): Notifications Backend Connection     | [PR #640](https://github.com/bounswe/bounswe2024group6/pull/640) | Author |
| feat(mobile): Notifications on successful login/register     | [PR #654](https://github.com/bounswe/bounswe2024group6/pull/654) | Author |
| fix(mobile): Refresh profile page dynamically     | [PR #655](https://github.com/bounswe/bounswe2024group6/pull/655) | Author |
| fix(mobile): fix reference error in tests      | [PR #669](https://github.com/bounswe/bounswe2024group6/pull/669) | Author |
| fix(mobile): remove debugUserInfo from profile/index     | [PR #677](https://github.com/bounswe/bounswe2024group6/pull/677) | Author |
| fix(mobile): fix the broken userCard test      | [PR #686](https://github.com/bounswe/bounswe2024group6/pull/686) | Author |
| chore(mobile): change base url to digital ocean deployment     | [PR #701](https://github.com/bounswe/bounswe2024group6/pull/701) | Author |
| feat(mobile): Resume Quiz After Interruption | [PR #706](https://github.com/bounswe/bounswe2024group6/pull/706) | Reviewer |
| feat(mobile): Quiz Recommendation According to Solved Quiz Level      | [PR #703](https://github.com/bounswe/bounswe2024group6/pull/703) | Reviewer |
| Backend: Merge DEV branch to main      | [PR #693](https://github.com/bounswe/bounswe2024group6/pull/693) | Reviewer |
| feat(mobile): add unit tests for quiz review page     | [PR #687](https://github.com/bounswe/bounswe2024group6/pull/687) | Reviewer |
| refactor(mobile): remove shadows + redesign buttons      | [PR #681](https://github.com/bounswe/bounswe2024group6/pull/681) | Reviewer |
| eat(mobile): Review Solved Quizzes      | [PR #667](https://github.com/bounswe/bounswe2024group6/pull/667) | Reviewer |
| feat(mobile): Integrating Quiz Solution Logic with Backend     | [PR #658](https://github.com/bounswe/bounswe2024group6/pull/658) | Reviewer |
| feat(mobile): Connect Quiz Details to the Backend      | [PR #623](https://github.com/bounswe/bounswe2024group6/pull/623) | Reviewer |
| feat(mobile): Connect Quiz Creation to the Backend      | [PR #615](https://github.com/bounswe/bounswe2024group6/pull/615) | Reviewer |
| feat(mobile): Connect Quiz Feed to Backend     | [PR #605](https://github.com/bounswe/bounswe2024group6/pull/605) | Reviewer |
| refactor(mobile): Remove Navigation Bar from Login and Register Pages     | [PR #575](https://github.com/bounswe/bounswe2024group6/pull/575) | Reviewer |
| fix(mobile): fix unique key error on Quiz Creation Info     | [PR #566](https://github.com/bounswe/bounswe2024group6/pull/566) | Reviewer |
| ix(mobile): fix unique key error on Quiz Creation Settings     | [PR #564](https://github.com/bounswe/bounswe2024group6/pull/564) | Reviewer |
| feat(mobile): Enable Dark Mode on All Quiz Pages      | [PR #506](https://github.com/bounswe/bounswe2024group6/pull/506) | Reviewer |
| 468 mobile implementation of forum pages    | [PR #484](https://github.com/bounswe/bounswe2024group6/pull/484) | Reviewer |
| fix(mobile): HTTP Request Issue + Register Bug     | [PR #483](https://github.com/bounswe/bounswe2024group6/pull/483) | Reviewer |
| refactor(mobile): redesign login and register pages      | [PR #476](https://github.com/bounswe/bounswe2024group6/pull/476) | Reviewer |
| refactor(mobile): redesign quiz pages      | [PR #456](https://github.com/bounswe/bounswe2024group6/pull/456) | Reviewer |


## Anıl Köse

### Responsibilities

- Designed and implemented the forum pages for the project's mobile application.
- Connected forum pages to the backend for full functionality.
- Redesigned the forum pages to improve user experience.
- Assisted with the deployment of the backend application.
- Set up and ran the Expo Server in global mode for the project.

### Main Contributions

* Developed and implemented the forum pages of the mobile app, ensuring they are functional and visually appealing.
* Connected the forum pages to backend APIs, enabling data exchange and a seamless user experience.
* Redesigned the forum pages with a focus on aesthetics and usability.
* Implemented the night mode feature for improved user accessibility and visual comfort.
* Created reusable components, including post and comment cards, to streamline forum functionality.
* Took notes during the Weekly Meeting 6, contributing to project documentation.
* Participated in the backend deployment process, although not directly involved in coding.
* Resolved issues where the app kept stopping despite a successful build.

### API Contributions

- Integrated forum page functionality with backend APIs to ensure synchronization and efficient data handling.

### Code Related Significant Issues
| Task                                                                                   | Link                                                                                                     | Duration   |
|----------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------|------------|
| Run Expo Server in global mode                                                         | [#457](https://github.com/bounswe/bounswe2024group6/issues/457)                                         |            |
| Meeting Notes: Weekly Meeting 6                                                        | [#461](https://github.com/bounswe/bounswe2024group6/issues/461)                                         |            |
| Create Post Card and Comment Card Components                                           | [#469](https://github.com/bounswe/bounswe2024group6/issues/469)                                         |            |
| Implement Night Mode Feature                                                           | [#492](https://github.com/bounswe/bounswe2024group6/issues/492)                                         |            |
| Redesign Forum Pages                                                                   | [#708](https://github.com/bounswe/bounswe2024group6/issues/708)                                         |            |
| Implementation of Forum Pages                                                          | [#468](https://github.com/bounswe/bounswe2024group6/issues/468)                                         |            |
| Connect Forum Pages to Backend                                                         | [#674](https://github.com/bounswe/bounswe2024group6/issues/674)                                         |            |



## Ahmet Oğuz Engin

### Responsibilities

- Redesign quiz pages to improve similarities between web front-end and mobile
- Enable HTTP requests for mobile app
- Redesing other pages like login, register and home.
- Improve UX by implementing dark mode on quiz pages and resume quiz features
- Improve functionality of quiz pages
- Test quiz pages both manually and using automated tests.
- Communicate with the backend team to finalize the API structure for the quiz endpoints.

### Main Contributions
* Redesigned, implemented, and tested all quiz-related pages.
* Resolved issues with HTTP requests to enable the mobile app to communicate with the backend.
* Connected the login functionality to the backend and redesigned other pages, including login, registration, and the home page.
* Enhanced UX by implementing dark mode for quiz pages and the quiz resume feature.
* Created the notifications page on mobile for Activity Streams 2.0.
* Contributed to the planning of quiz api end-points.
* Contributed to the mobile part of Demo Presentation.
* Took meeting notes, created lab reports, and created issues for task distribution.

### API Contributions
As a mobile developer I've integrated several endpoints to the mobile app to create connection between backend and mobile app. Here are a few examples I've selected:

 
#### **1. Create a Quiz**
**Endpoint:** `POST /quiz/create/`  
**Description:** Create a new quiz along with its questions.
  
**Request:**  
```
json
{
  "quiz": {
    "title": "Food", 
    "description": "Basic Foods", 
    "level": "Beginner"
  },
  "questions": [
    {
      "question_text": "Apple?", 
      "choice1": "Elma", 
      "choice2": "Armut", 
      "choice3": "Muz", 
      "choice4": "Kivi", 
      "correct_choice": 1, 
      "question_number": 1
    },
    {
      "question_text": "Kahve", 
      "choice1": "Tea", 
      "choice2": "Coffe", 
      "choice3": "Water", 
      "choice4": "Juice", 
      "correct_choice": 2, 
      "question_number": 2
    }
  ]
}
```

**Response:**  
```
**201 Created**
json
{
  "id": 1,
  "title": "Food", 
  "description": "Basic Foods",
  "author": {
    "id": 1,
    "username": "oguz" 
  },
  "question_count": 2,
  "level": "Beginner"
}
  ```
  **Implementation Details**
  
  Quiz questions and other quiz related information like title, quiz description, and quiz level is collected from different pages and quiz creation request is created by formatting all this information into the proper form. 
  
  **Format Quiz Data**
  ```
    const prepareQuizData = () => {
    if (quizDetails["title"] === '' || questions.length === 0) {
      alert("Please complete quiz details and add questions before submission.");
      return null;
    }

  const formattedTags = [{"name": quizDetails["level"]}];


    return {
      quiz: {
        title: quizDetails["title"],
        description: quizDetails["description"],
        level: quizDetails["level"],
        tags: formattedTags || [], 
      },
      questions: questions.map((q, index) => ({
        question_number: index + 1,
        question_text: q.name,
        choice1: q.answers[0],
        choice2: q.answers[1],
        choice3: q.answers[2],
        choice4: q.answers[3],
        correct_choice: Number(q.correctAnswer) + 1,
      })),
    };
  };
  ```
  **Send Request**
  ```
   const createQuiz = async () => {
    const quizData = prepareQuizData();
    if (!quizData) return; // Ensure data is prepared
  
    try {
      const response = await TokenManager.authenticatedFetch(`/quiz/create/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quizData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error creating quiz:', errorData);
        alert('Failed to create quiz. Please try again.');
      } else {
        const result = await response.json();
        alert('Quiz created successfully!');
        await clearQuizDetails();
        await clearQuestions();
        router.replace('/(tabs)/quizzes/');
      }
    } catch (error) {
      console.error('Error creating quiz:', error);
      alert('An error occurred while creating the quiz.');
    }
  };
  
  ```
  
#### **2. Start a Quiz**
**Endpoint:** `POST /quiz/start/`  
**Description:** Start a quiz. Retrieve existing progress or initialize a new attempt.
  
**Request:**  
```
json
{
  "quiz_id": 1
}
```

**Response:**  
```
**201 Created**
json
{
  "quiz_progress_id": 123,
  "quiz_title": "Sample Quiz",
  "question_count": 2,
  "questions": [
    {
      "question_number": 1,
      "question": "Apple",
      "choices": ["Elma", "Armut", "Muz", "Kivi"],
      "previous_answer": null
    },
    {
      "question_number": 2,
      "question": "Kahve",
      "choices": ["Tea", "Coffe", "Water", "Juice"],
      "previous_answer": null
    }
  ]
}
  ```
  **Implementation Details**
  
The quiz id is passed from previous page. The request is sent using this id. Response is parsed and converted to proper format to show the question and answers. 
  
  **Send Request and Get The Response**
  ```
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        if (error) 
        { return; }
          
        setLoading(true);
        const response = await TokenManager.authenticatedFetch(`/quiz/start/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ quiz_id: Number(quizId) }),
        });
        
        const data = await response.json();
        if (response.ok) {
          setQuizData(data);
          
          const updatedChoices = Array(data.question_count).fill(null).map((_, index) => {
            if (data.questions[index].previous_answer !== null) {
              return data.questions[index].previous_answer - 1;
            } else {
              return -1;
            }
          });
          
          setSelectedChoices(updatedChoices);
        } else {
          setError(data.error || 'Failed to fetch quiz data');
        }
      } catch (error: any) {
        setError(error.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);
  
  ```
  
I've also integrated other quiz endpoints and login but since it'll take too much space I'll share only two.

### Code Realted Significant Issues
| Task                                                                                   | Link                                                                                                     | Duration   |
|----------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------|------------|
| Redesign quiz pages.  | [#452](https://github.com/bounswe/bounswe2024group6/issues/452) | 320 mins |
| Do research regarding HTTP error.   | [#462](https://github.com/bounswe/bounswe2024group6/issues/462)  | 100 mins |
| Redesign login and register pages.  | [#463](https://github.com/bounswe/bounswe2024group6/issues/463) | 120 mins |
| Implement a notifications page | [#480](https://github.com/bounswe/bounswe2024group6/issues/480) | 70 mins |
| Find and fix register page bug. | [#482](https://github.com/bounswe/bounswe2024group6/issues/482) | 60 mins |
| Connect login page to backend and apply the solution for HTTP error and test it| [#462](https://github.com/bounswe/bounswe2024group6/issues/462)  | 90 mins |
| Implement night mode for quiz question page | [#492](https://github.com/bounswe/bounswe2024group6/issues/492) | 70 mins | 
| Improve similarities of mobile with web UI | [#491](https://github.com/bounswe/bounswe2024group6/issues/491) | 60 mins |
| Enable dark mode on quiz pages. | [#505](https://github.com/bounswe/bounswe2024group6/issues/505) | 220 mins |
| Resolve the bug on quiz creation page | [#563](https://github.com/bounswe/bounswe2024group6/issues/563) | 40 mins |
| Connect Quiz Feed to Backend | [#599](https://github.com/bounswe/bounswe2024group6/issues/599) | 150 mins |
| Connect Quiz Creation to the Backend | [#606](https://github.com/bounswe/bounswe2024group6/issues/606) | 180 mins |
| Connect Quiz Details to the Backend | [#620](https://github.com/bounswe/bounswe2024group6/issues/620) | 100 mins |
| Integrating Quiz Solution Logic with Backend Systems | [#624](https://github.com/bounswe/bounswe2024group6/issues/624) | 300 mins |
| Connect Quiz Results to Backend | [#656](https://github.com/bounswe/bounswe2024group6/issues/656) | 120 mins |
| Enable Review Feature for Solved Quizzes on Mobile | [#660](https://github.com/bounswe/bounswe2024group6/issues/660) | 120 mins |
| Solve the bug which causes App to stop | [#670](https://github.com/bounswe/bounswe2024group6/issues/670) | 300 mins |
| Create Unit Tests for Testing Quiz Review | [#682](https://github.com/bounswe/bounswe2024group6/issues/682) |150 mins |
| Quiz Recommendation According to Solved Quiz Level | [#702](https://github.com/bounswe/bounswe2024group6/issues/702) | 80 mins |
| Resume Quiz After Interruption | [#705](https://github.com/bounswe/bounswe2024group6/issues/705) | 80 mins |
| Review a PR that includes the profile page, quiz card, and tab layout features | [#466](https://github.com/bounswe/bounswe2024group6/issues/466), [#467](https://github.com/bounswe/bounswe2024group6/issues/467)	| 80 mins |
| Review the PR including search page. | [#465](https://github.com/bounswe/bounswe2024group6/issues/465) | 60 mins |
| Create a quiz recommendation end point - Review | [#659](https://github.com/bounswe/bounswe2024group6/pull/659) | 25 mins | 
| Connect Profile to Backend - Review | [#603](https://github.com/bounswe/bounswe2024group6/issues/603)  | 40 mins |

### Management Related Significant Issues
| Task                                                                                   | Link                                                                                                     | Duration   |
|----------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------|------------|
| Document User Experience Decisions to Improve UX | [#513](https://github.com/bounswe/bounswe2024group6/issues/513) | 90 mins |
| Took meeting notes. | [#486](https://github.com/bounswe/bounswe2024group6/issues/486) | 60 mins |
| Created the lab report. | [#497](https://github.com/bounswe/bounswe2024group6/issues/497) | 60 mins |

### Pull Requests

| Pull Requests                                     | Link                                                                 | Action    |
|---------------------------------------------------|----------------------------------------------------------------------|-----------|
| refactor(mobile): redesign quiz pages | [#456](https://github.com/bounswe/bounswe2024group6/pull/456) | Assigned |
| fix(mobile): HTTP Request Issue + Register Bug | [#483](https://github.com/bounswe/bounswe2024group6/pull/483) | Assigned |
| refactor(mobile): redesign login and register pages | [#480](https://github.com/bounswe/bounswe2024group6/issues/480) | Assigned |
| Lab 6 Pull Request -  Improve Similarities with Web UI -  Implement Night Mode Feature  | [#493](https://github.com/bounswe/bounswe2024group6/pull/493) | Assigned |
| feat(mobile): Enable Dark Mode on All Quiz Pages | [#506](https://github.com/bounswe/bounswe2024group6/pull/506) | Assigned |
| fix(mobile): fix unique key error on Quiz Creation Settings | [#564](https://github.com/bounswe/bounswe2024group6/pull/564)  | Assigned |
| feat(mobile): Connect Quiz Feed to Backend | [#605](https://github.com/bounswe/bounswe2024group6/pull/605)  | Assigned |
| feat(mobile): Connect Quiz Creation to the Backend | [#615](https://github.com/bounswe/bounswe2024group6/pull/615)  | Assigned |
| feat(mobile): Connect Quiz Details to the Backend | [#623](https://github.com/bounswe/bounswe2024group6/pull/623)  | Assigned |
| feat(mobile): Integrating Quiz Solution Logic with Backend | [#658](https://github.com/bounswe/bounswe2024group6/pull/658)  | Assigned |
| feat(mobile): Review Solved Quizzes | [#667](https://github.com/bounswe/bounswe2024group6/pull/667)  | Assigned |
| refactor(mobile): remove shadows + redesign buttons | [#681](https://github.com/bounswe/bounswe2024group6/pull/681)  | Assigned |
| feat(mobile): add unit tests for quiz review page | [#687](https://github.com/bounswe/bounswe2024group6/pull/687)  | Assigned |
| feat(mobile): Quiz Recommendation According to Solved Quiz Level  | [#703](https://github.com/bounswe/bounswe2024group6/pull/703)  | Assigned |
| feat(mobile): Resume Quiz After Interruption  | [#706](https://github.com/bounswe/bounswe2024group6/pull/706)  | Assigned |
| feat(mobile): Tab Layout, Profile Page Design, Quiz Card Component  | [#474](https://github.com/bounswe/bounswe2024group6/pull/474)  | Reviewed |
| feat(mobile): Search Page  | [#503](https://github.com/bounswe/bounswe2024group6/pull/503)  | Reviewed |
| feat(mobile): Connect profile pages to backend  | [#630](https://github.com/bounswe/bounswe2024group6/pull/630)  | Reviewed |
| feat(mobile): Notifications on successful login/register  | [#654](https://github.com/bounswe/bounswe2024group6/pull/654)  | Reviewed |
| fix(mobile): Refresh profile page dynamically | [#655](https://github.com/bounswe/bounswe2024group6/pull/655)  | Reviewed |
| feat(backend): quiz recommendation  | [#659](https://github.com/bounswe/bounswe2024group6/pull/659)  | Reviewed |
| feat(backend): improve quiz result endpoint and add quiz review endpoint | [#628](https://github.com/bounswe/bounswe2024group6/pull/628)  | Reviewed |

### Requirements I've Worked On
1.1.1.1 Guests shall be able to sign up.  
1.1.1.4 Guest shall be able to log in.  
1.2.2.2 Logged-in Users shall be able to create a quiz.  
1.2.2.4 Logged-in Users shall be able to add tags to a quiz (including difficulty tags) while creating a quiz.  
1.2.2.5 Logged-in Users shall be able to take a quiz.  
1.2.2.6 Logged-in Users shall be able to cancel a quiz while taking it.  
1.3.2.1 Logged-in users shall be able to do everything that a guest can.  
2.1.1 The project should be available in English and Turkish (to cater to beginner level learners as well).  
2.2.1 The system shall respond to requests within 3 seconds.  
2.4.2 The users shall be able to enter the system from a smartphone or tablet, both through the Android app and through a web browser.  

### Additional Notes

We've worked closely with Aras Tasci while implementing quiz functionalities and shared our ideas to make the quiz functionality better. That's why I have some reviews on the backend, even though I'm part of the mobile team.

Also, I've rebased branches both to solve conflicts and to help the reviewer so she can better test the functionalities with the already merged ones. That's why some PRs include force-pushes, like this one [#456](https://github.com/bounswe/bounswe2024group6/pull/456).

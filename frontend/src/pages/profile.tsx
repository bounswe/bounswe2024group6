import Navbar from "../components/common/navbar.tsx";
import { Avatar, Button, Divider, Card } from "@nextui-org/react";
import { Suspense, useState } from "react";
import PostCard from "../components/post/post-card.tsx";
import PostCardSkeleton from "../components/post/post-card-skeleton.tsx";

export default function Profile() {
  const [activeSection, setActiveSection] = useState("quizzes");

  const mockData = {
    id: 1,
    username: "oktay_ozel",
    level: "B2",
    followers: 100,
    following: 50,
    image: "https://nextui.org/avatars/avatar-1.png",
    posts: [
      {
        id: 2,
        author: {
          username: "oktay_ozel",
          profile_image:
            "https://private-user-images.githubusercontent.com/57640531/310137517-cbe7aa9f-3457-4f64-b37b-c3e46d4e448b.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjkzMjk2NzUsIm5iZiI6MTcyOTMyOTM3NSwicGF0aCI6Ii81NzY0MDUzMS8zMTAxMzc1MTctY2JlN2FhOWYtMzQ1Ny00ZjY0LWIzN2ItYzNlNDZkNGU0NDhiLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDEwMTklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMDE5VDA5MTYxNVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWY1YTNiM2MxZDY0ZTdjYmNlZTU2NmU5NTUyZDZjMjI4NGZmZjNmNGI2OWI2ZjljODg1MzFmOThhOTEwYjFmYzgmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.GctR1cVt7p3T5MUGBCWRNT_9kdB5SRXamcQVh5pLMOc",
        },
        post: {
          title: "Petrichor: The Smell of Rain",
          content:
            "Petrichor is the pleasant, earthy smell that comes after rain. Example: 'She loved the petrichor that filled the air after the storm.'",
          category: "Vocabulary",
          timestamp: "5 hours ago",
        },
        engagement: {
          likes: 90,
          comments: 3,
          bookmark: 3,
        },
      },
      {
        id: 3,
        author: {
          username: "oktay_ozel",
          profile_image:
            "https://private-user-images.githubusercontent.com/57640531/310137517-cbe7aa9f-3457-4f64-b37b-c3e46d4e448b.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjkzMjk2NzUsIm5iZiI6MTcyOTMyOTM3NSwicGF0aCI6Ii81NzY0MDUzMS8zMTAxMzc1MTctY2JlN2FhOWYtMzQ1Ny00ZjY0LWIzN2ItYzNlNDZkNGU0NDhiLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDEwMTklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMDE5VDA5MTYxNVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWY1YTNiM2MxZDY0ZTdjYmNlZTU2NmU5NTUyZDZjMjI4NGZmZjNmNGI2OWI2ZjljODg1MzFmOThhOTEwYjFmYzgmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.GctR1cVt7p3T5MUGBCWRNT_9kdB5SRXamcQVh5pLMOc",
        },
        post: {
          title: "Serendipity: A Fortunate Discovery",
          content:
            "Serendipity is the occurrence of events by chance in a happy or beneficial way. Example: 'They met by serendipity and became lifelong friends.'",
          category: "Vocabulary",
          timestamp: "2 hours ago",
        },
        engagement: {
          likes: 75,
          comments: 5,
          bookmark: 4,
        },
      },
    ],
    quizzes: [
      {
        id: 1,
        title: "Basic Vocabulary Quiz",
        description: "Test your knowledge on basic vocabulary words!",
        author: "oktay_ozel",
        upvote: 5,
        level: "Beginner",
      },
      {
        id: 2,
        title: "Advanced Vocabulary Quiz",
        description: "Challenge yourself with advanced vocabulary words.",
        author: "oktay_ozel",
        upvote: 9,
        level: "Advanced",
      },
    ],
  };

  // useEffect(() => {}

  const quizCards = (
    <div className="p-5">
      <p className="p-3 mb-3">Not implemented yet</p>
      <div className="border p-3 mb-3 rounded-md">Quiz 1</div>
      <div className="border p-3 mb-3 rounded-md">Quiz 2</div>
      <div className="border p-3 mb-3 rounded-md">Quiz 3</div>
    </div>
  );

  const postCards = (
    <div className="flex flex-col gap-4 items-center">
      {mockData.posts.map((post) => (
        <Suspense key={post.id} fallback={<PostCardSkeleton />}>
          <PostCard
            key={post.id}
            id={post.id}
            username={post.author.username}
            content={post.post.content}
            timePassed={post.post.timestamp}
            likeCount={post.engagement.likes}
            tags={[post.post.category]} // if exists
          />
        </Suspense>
      ))}
    </div>
  );

  return (
    <div className="h-full w-full items-center overflow-hidden flex flex-col">
      <Navbar />
      <div className="flex justify-center gap-6 items-center w-full px-32 py-5">
        <div className="flex items-center px-5 bg-white rounded-lg">
          <Avatar src={mockData.image} className="mr-3 w-24 h-24" />
          <div className="mx-4">
            <h3 className="text-xl font-semibold">{mockData.username}</h3>
            <p className="text-gray-500">@{mockData.level}</p>
          </div>
        </div>
        <Button
          variant="light"
          className="border-2 rounded-lg font-bold text-blue-900 px-8 py-6 "
        >
          {mockData.following} Following
        </Button>
        <Button
          variant="light"
          className="border-2 rounded-lg font-bold text-blue-900 px-8 py-6 "
        >
          {mockData.followers} Followers
        </Button>
        <Button
          variant="light"
          className="border-2 rounded-lg font-bold text-blue-900 px-8 py-6 "
        >
          Solved Quizzes
        </Button>
      </div>
      <Divider className="my-4 w-1/2 border-t-4 p-[0.75px] rounded-2xl border-gray-400" />
      <Card className="border-1 border-blue-900 items-center py-2 shadow-small mx-auto my-3">
        <div className="flex flex-row w-full justify-between items-center">
          <Button
            variant="light"
            className={`text-blue-900 opacity-90 font-semibold text-lg bg-white mx-4 h-full  ${
              activeSection === "quizzes" ? "font-bold opacity-100" : ""
            }`}
            onClick={() => setActiveSection("quizzes")}
          >
            Quizzes
          </Button>
          <p className="text-blue-900 font-bold bg-white rounded-md mx-2">|</p>
          <Button
            variant="light"
            className={`text-blue-900 opacity-90 font-semibold text-lg bg-white mx-4 h-full ${
              activeSection === "posts" ? "font-bold opacity-100" : ""
            }`}
            onClick={() => setActiveSection("posts")}
          >
            Posts
          </Button>
        </div>
      </Card>
      <div className="flex flex-col p-5 items-center">
        {activeSection === "quizzes" ? quizCards : postCards}
      </div>
    </div>
  );
}

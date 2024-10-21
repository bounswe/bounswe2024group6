export type Comment = {
    id: number;
    author: {
      username: string;
      profile_image: string;
    };
    comment: string;
    timestamp: string;
    likes: number;
  };
  
  export type Post = {
    id: number;
    author: {
      username: string;
      profile_image: string;
    };
    post: {
      title: string;
      content: string;
      tags: string[];
      timestamp: string;
    };
    engagement: {
      likes: number;
      comments: number;
    };
    comments: Comment[];
  };
  
  export type Quiz = {
    id: number;
    title: string;
    description: string;
    author: string;
    upvote: number;
    level: string;
  };
  
  export type Profile = {
    id: number;
    username: string;
    level: string;
    followers: number;
    following: number;
    image: string;
    posts: Post[];
    quizzes: Quiz[];
  };
  
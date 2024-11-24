export type Comment = {
    id: number;
    author: {
      username: string;
      profile_image: string;
    };
    comment: string;
    timestamp: string;
    likes: number;
    is_liked: boolean;
    is_bookmarked: boolean;
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
      created_at: string;
    };
    engagement: {
      likes: number;
      comments: number;
      is_liked: boolean;
      is_bookmarked: boolean;
    };
    comments: Comment[];
  };

  export type PostResponse = {
    author: string;
    created_at: string;
    description: string;
    id: number;
    like_count: number;
    tags: string[];
    title: string;
    is_liked: boolean;
    is_bookmarked: boolean;
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
    bio: string;
    followers: number;
    following: number;
    image: string;
    posts: Post[];
    quizzes: Quiz[];
    is_followed: boolean;
  };

  export type ProfileResponse = {
    comments: Comment[]; // TODO: to be removed
    follower_count: number; 
    following_count: number;
    is_followed: boolean;
    level: string;
    bio: string;
    name: string;
    username: string;
    posts: PostResponse[];
    image?: string; // TODO: to be made required
    quizzes?: Quiz[]; // TODO: to be made required
  };
  
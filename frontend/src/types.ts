export type Comment = {
  id: number;
  author: string;
  content: string;
  created_at: string;
  like_count: number;
  is_liked: boolean;
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
  comments?: Comment[]; // TODO: to be made required
};

export type Quiz = {
  id: number;
  author: {
    username: string;
    profile_image: string;
  };
  quiz: {
    title: string;
    description: string;
    tags: string[];
    timestamp: string;
    created_at: string;
    level: string;
    times_taken: number;
  };
  engagement: {
    like_count: number;
    is_liked: boolean;
    is_bookmarked: boolean;
  };
};

export type QuizResponse = {
  id: number;
  title: string;
  description: string;
  author: {
    username: string;
    id: number;
  };
  like_count: number;
  level: string;
  created_at: string;
  is_liked: boolean;
  is_bookmarked: boolean;
  times_taken: number;
  tags: string[];
};

export type QuizDetails = {
  id: number;
  title: string;
  description: string;
  author: {
    username: string;
    profile_image: string;
  };
  average_score: number;
  created_at: string;
  is_liked: boolean;
  is_bookmarked: boolean;
  like_count: number;
  question_count: number;
  level: string;
  times_taken: number;
  tags: string[];
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

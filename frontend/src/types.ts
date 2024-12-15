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

export type CommentResponse = {
  author: string;
  created_at: string;
  body: string;
  id: number;
  like_count: number;
  tags: string[];
  is_liked: boolean;
  replies?: Comment[]; // TODO: to be made required
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
    picture: string;
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
  title_image: string;
  tags: string[];
};

export type QuizDetail = {
  id: number;
  title: string;
  description: string;
  author: {
    username: string;
    profile_image: string;
  };
  average_score: number;
  created_at: string;
  timestamp: string;
  is_liked: boolean;
  is_bookmarked: boolean;
  like_count: number;
  question_count: number;
  level: string;
  times_taken: number;
  tags: string[];
  quiz_result_id: number;
  is_solved: boolean;
};

export type QuizDetailsResponse = {
  quiz: {
    id: number;
    title: string;
    description: string;
    author: {
      username: string;
      id: number;
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
  quiz_result_id: number;
  is_solved: boolean;
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
  profile_picture: string;
  level: string;
  bio: string;
  name: string;
  username: string;
  posts: PostResponse[];
  image?: string; // TODO: to be made required
  quizzes?: Quiz[]; // TODO: to be made required
};


export type QuizCreationModel = {
  quiz: QuizHeader;
  questions: Question[];
};

export type QuizHeader = {
  title: string;
  description: string;
  tags: {
    name: string;
  }[];
  level: string;
  title_image?: File;
};

export type Question = {
  question_number: number;
  question_text: string;
  choice1: string;
  choice2: string;
  choice3: string;
  choice4: string;
  correct_choice: number;
};

export type UserCardType = {
  id: number;
  username: string;
  level: string;
  bio: string;
  followers: number;
  following: number;
  image: string;
  is_followed: boolean;
};


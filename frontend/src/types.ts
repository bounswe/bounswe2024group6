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

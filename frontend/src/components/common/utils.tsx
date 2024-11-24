import { Post } from "../../types";

import type { PostResponse, Profile, ProfileResponse } from "../../types.ts";

export const formatTimeAgo = (timestamp: string): string => {
  const now = new Date();
  const postDate = new Date(timestamp);
  const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays}d ago`;
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths}mo ago`;
  
  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears}y ago`;
};

export const convertPostResponseToPost = (postResponse: PostResponse): Post => {
  return {
    id: postResponse.id,
    author: {
      username: postResponse.author,
      profile_image: '',
    },
    post: {
      title: postResponse.title,
      content: postResponse.description,
      tags: postResponse.tags,
      timestamp: formatTimeAgo(postResponse.created_at),
      created_at: postResponse.created_at,
    },
    engagement: {
      likes: postResponse.like_count,
      comments: 0,
      is_liked: postResponse.is_liked,
      is_bookmarked: postResponse.is_bookmarked,
    },
    comments: postResponse.comments || [],
  };
};

export const convertProfileResponseToProfile = (profileResponse: ProfileResponse): Profile => {
  return {
    id: 0,
    username: profileResponse.username,
    level: profileResponse.level,
    bio: profileResponse.bio,
    followers: profileResponse.follower_count,
    following: profileResponse.following_count,
    image: profileResponse.image || '',
    posts: profileResponse.posts.map(convertPostResponseToPost),
    quizzes: profileResponse.quizzes || [],
    is_followed: profileResponse.is_followed,
  };
};

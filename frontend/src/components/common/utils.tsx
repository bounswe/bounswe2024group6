import { Post } from "../../types";

import type { PostResponse, Profile, ProfileResponse, Quiz, QuizResponse, QuizDetail, QuizDetailsResponse, CommentResponse  } from "../../types.ts";

export const formatTimeAgo = (timestamp: string): string => {
  const now = new Date();
  const postDate = new Date(timestamp);
  const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000) + 3; // xd

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

export const convertCommentResponseToPost = (commentResponse: CommentResponse): Post => {
  return {
    id: commentResponse.id,
    author: {
      username: commentResponse.author,
      profile_image: "",
    },
    post: {
      title: "", // Comments don't have titles
      content: commentResponse.body,
      tags: commentResponse.tags,
      timestamp: formatTimeAgo(commentResponse.created_at),
      created_at: commentResponse.created_at,
    },
    engagement: {
      likes: commentResponse.like_count,
      comments: commentResponse.replies ? commentResponse.replies.length : 0,
      is_liked: commentResponse.is_liked,
      is_bookmarked: false, // Comments can't be bookmarked
    },
    comments: commentResponse.replies || [], // Nested comments, if any
  };
};

export const convertQuizResponseToQuiz = (quizResponse: QuizResponse): Quiz => {
  return {
    id: quizResponse.id,
    author: {
      username: quizResponse.author.username,
      profile_image: "", 
    },
    quiz: {
      title: quizResponse.title,
      description: quizResponse.description,
      tags: quizResponse.tags,
      timestamp: formatTimeAgo(quizResponse.created_at),
      created_at: quizResponse.created_at,
      picture: quizResponse.title_image,
      level: quizResponse.level,
      times_taken: quizResponse.times_taken,
    },
    engagement: {
      like_count: quizResponse.like_count,
      is_liked: quizResponse.is_liked,
      is_bookmarked: quizResponse.is_bookmarked,
    },
  };
};

export const convertQuizDetailsResponseToQuizDetails = (
  response: QuizDetailsResponse
): QuizDetail => {
  const { quiz, quiz_result_id, is_solved } = response;

  return {
    id: quiz.id,
    title: quiz.title,
    description: quiz.description,
    author: {
      username: quiz.author.username,
      profile_image: "",
    },
    average_score: parseFloat(quiz.average_score.toFixed(2)),
    created_at: quiz.created_at,
    timestamp: formatTimeAgo(quiz.created_at),
    is_liked: quiz.is_liked,
    is_bookmarked: quiz.is_bookmarked,
    like_count: quiz.like_count,
    question_count: quiz.question_count,
    level: quiz.level,
    times_taken: quiz.times_taken,
    tags: quiz.tags,
    quiz_result_id: quiz_result_id,
    is_solved: is_solved,
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
    image: profileResponse.profile_picture || 'https://nextui.org/avatars/avatar-1.png',
    posts: profileResponse.posts.map(convertPostResponseToPost),
    quizzes: profileResponse.quizzes || [],
    is_followed: profileResponse.is_followed,
  };
};

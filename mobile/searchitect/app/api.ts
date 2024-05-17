import axios from 'axios';

const BASE_URL = 'http://10.0.2.2:8000/';

export const registerUser = (userData: { username: string; email: string; password: string }): Promise<RegisterResponse> => {
  return new Promise((resolve, reject) => {
    axios.post<RegisterResponse>(`${BASE_URL}signup/`, userData)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

export const loginUser = (credentials: { username: string; password: string }): Promise<LoginResponse> => {
  return new Promise((resolve, reject) => {
    axios.post<LoginResponse>(`${BASE_URL}login/`, credentials)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

export const searchQuery = (query: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.post(`${BASE_URL}search/`, { query: query })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

export const getBuildingView = (entityId: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.post(`${BASE_URL}building/`, { entity_id: entityId })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

export const getArchitectView = (entityId: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.post(`${BASE_URL}architect/`, { entity_id: entityId })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

export const getStyleView = (entityId: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.post(`${BASE_URL}style/`, { entity_id: entityId })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

export const getPostsByIds = (postId: number): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.post(`${BASE_URL}get_posts_by_ids/`, { post_id: postId })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

export const updateUserProfile = (profileData: { username: string; email: string; phone_number: string; bio: string }): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.post(`${BASE_URL}update_user_profile/`, profileData)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

export const getUserProfile = (username: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.get(`${BASE_URL}user_profile/`, { params: { username } })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

export const createPost = (postData: { title: string; text: string; image_url: string; tag_name: string }): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.post(`${BASE_URL}create_post/`, postData)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

export const likePost = (postId: number): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.post(`${BASE_URL}like_post/`, { post_id: postId })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

export const getLikeBack = (postId: number): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.post(`${BASE_URL}get_like_back/`, { post_id: postId })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

export const commentPost = (commentData: { post_id: number; comment_text: string }): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.post(`${BASE_URL}comment_post/`, commentData)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

export const bookmarkPost = (postId: number): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.post(`${BASE_URL}bookmark_post/`, { post_id: postId })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

export const followUser = (username: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.post(`${BASE_URL}follow_user/`, { username })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

export const unfollowUser = (username: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.post(`${BASE_URL}unfollow_user/`, { username })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

export const listFollowers = (username: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.post(`${BASE_URL}list_followers/`, { username })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

export const listFollowing = (username: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.post(`${BASE_URL}list_following/`, { username })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

export const getGuestFeed = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.get(`${BASE_URL}guest_feed/`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

export const getAuthFeed = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.get(`${BASE_URL}auth_feed/`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  token: string;
  user: User;
}

interface LoginResponse {
  token: string;
  user: User;
}
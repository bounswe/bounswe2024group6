import TokenManager  from '../TokenManager'; // Ensure TokenManager is properly implemented


// const BASE_URL = 'http://54.93.52.38/'; // Replace with your actual API base URL

// Helper for authenticated requests
const makeAuthenticatedRequest = async (endpoint: string, method: string, body: any = null) => {

    try {
        const response = await TokenManager.authenticatedFetch(endpoint, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: body ? JSON.stringify(body) : null,
        });

        console.log(response.status)
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || response.statusText);
        }

        return await response.json();
    } catch (error: any) {
        console.error(`Error in ${endpoint}:`, error.message || error);
        throw error;
    }
};

// **Posts**
export const getPostDetails = async (postId: number) => {
    return await makeAuthenticatedRequest('post/', 'POST', { post_id: postId });
};

export const createPost = async (title: string, description: string, tags: string[]) => {
    return await makeAuthenticatedRequest('post/create/', 'POST', { title, description, tags });
};

export const deletePost = async (postId: number) => {
    return await makeAuthenticatedRequest('post/delete/', 'POST', { post_id: postId });
};

export const likePost = async (postId: number) => {
    return await makeAuthenticatedRequest('post/like/', 'POST', { post_id: postId });
};

export const unlikePost = async (postId: number) => {
    return await makeAuthenticatedRequest('post/unlike/', 'POST', { post_id: postId });
};

export const getPostsOfUser = async () => {
    return await makeAuthenticatedRequest('post/my-posts/', 'GET');
};

// **Comments**
export const addComment = async (postId: number, body: string) => {
    return await makeAuthenticatedRequest('post/comment/add/', 'POST', { post_id: postId, body: body });
};

export const deleteComment = async (commentId: number) => {
    return await makeAuthenticatedRequest('post/comment/delete/', 'POST', { comment_id: commentId });
};

export const likeComment = async (commentId: number) => {
    return await makeAuthenticatedRequest('post/comment/like/', 'POST', { comment_id: commentId });
};

export const unlikeComment = async (commentId: number) => {
    return await makeAuthenticatedRequest('post/comment/unlike/', 'POST', { comment_id: commentId });
};

export const getCommentById = async (commentId: number) => {
    return await makeAuthenticatedRequest('comment/', 'POST', { comment_id: commentId });
};

export const fetchCommentAuthorImage = async (username: string) => {
    return await makeAuthenticatedRequest(`profile/${username}/`, 'GET');
};

export const bookmarkComment = async (commentId: number) => {
    return await makeAuthenticatedRequest('comments/bookmark/', 'POST', { comment_id: commentId });
};

export const unbookmarkComment = async (commentId: number) => {
    return await makeAuthenticatedRequest('comments/unbookmark/', 'POST', { comment_id: commentId });
};


// **Bookmarks**
export const bookmarkPost = async (postId: number) => {
    return await makeAuthenticatedRequest('bookmark/', 'POST', { post_id: postId });
};

export const unbookmarkPost = async (postId: number) => {
    return await makeAuthenticatedRequest('unbookmark/', 'POST', { post_id: postId });
};

export const getBookmarkedPosts = async () => {
    return await makeAuthenticatedRequest('get_bookmarked_posts/', 'GET');
};

// **Activity Streams**
export const getUserActivities = async () => {
    return await makeAuthenticatedRequest('user-activities/', 'GET');
};

export const getUserActivitiesAsObject = async () => {
    return await makeAuthenticatedRequest('user-activities-as-object/', 'GET');
};

// **Feed**
export const getUserPostFeed = async () => {
    return await makeAuthenticatedRequest('feed/', 'GET');
};

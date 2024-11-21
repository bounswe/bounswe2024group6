

const fetchForumPostWithId = async (id : any) => {
    try {
        const response = await fetch(`https://api.example.com/post/${id}`);
        const data = await response.json();
        return {
            id: data.id,
            title: data.title,
            author: data.author,
            likes: data.likes,
            liked: data.liked,
            bookmarked: data.bookmarked,
            tags: data.tags
        };
    } catch (error) {
        console.error('Error fetching post data:', error);
        return null;
    }
};

const likePost = async (postId: number) => {
    try {
        const response = await fetch(`https://api.example.com/post/${postId}/like`, {
            method: 'POST',
        });
        if (!response.ok) {
            throw new Error('Failed to like the post');
        }
        return await response.json();
    } catch (error) {
        console.error('Error liking post:', error);
        return null;
    }
};

const bookmarkPost = async (postId: number) => {
    try {
        const response = await fetch(`https://api.example.com/post/${postId}/bookmark`, {
            method: 'POST',
        });
        if (!response.ok) {
            throw new Error('Failed to bookmark the post');
        }
        return await response.json();
    } catch (error) {
        console.error('Error bookmarking post:', error);
        return null;
    }
};


export { fetchForumPostWithId, likePost, bookmarkPost };


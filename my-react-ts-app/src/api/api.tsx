import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dummyjson.com',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const getPosts = async () => {
  try {
    const response = await api.get('/posts');
    const posts = response.data.posts.map((post) => ({
      ...post,
      imageUrl: `https://picsum.photos/seed/${post.id}/200/300`
    }));
    return { posts };
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const getPost = async (id: number) => {
  try {
    const response = await api.get(`/posts/${id}`);
    const post = {
      ...response.data,
      imageUrl: `https://picsum.photos/seed/${response.data.id}/200/300`
    };
    return post;
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
};

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await api.post('/auth/login', { username, password });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const addPost = async (postData: { title: string; body: string }) => {
  try {
    const response = await api.post('/posts/add', postData);
    return response.data;
  } catch (error) {
    console.error('Error adding post:', error);
    throw error;
  }
};

export const updatePost = async (id: number, postData: { title: string; body: string }) => {
  try {
    const response = await api.put(`/posts/${id}`, postData);
    return response.data;
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

export const deletePost = async (id: number) => {
  try {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};

import React, { useEffect, useState } from 'react';
import { getPosts, addPost, updatePost, deletePost } from '../api/api';
import { Link } from 'react-router-dom';
import '../component/PostList.css';

interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  likes: number;
  dislikes: number;
  userId: number;
  imageUrl: string;
}

const PostsList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostBody, setNewPostBody] = useState('');
  const [editPostId, setEditPostId] = useState<number | null>(null);
  const [editPostTitle, setEditPostTitle] = useState('');
  const [editPostBody, setEditPostBody] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleAddPost = async () => {
    try {
      const newPost = await addPost({ title: newPostTitle, body: newPostBody });
      setPosts([...posts, newPost]);
      setNewPostTitle('');
      setNewPostBody('');
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  const handleUpdatePost = async () => {
    if (editPostId === null) return;
    try {
      const updatedPost = await updatePost(editPostId, { title: editPostTitle, body: editPostBody });
      setPosts(posts.map(post => post.id === editPostId ? updatedPost : post));
      setEditPostId(null);
      setEditPostTitle('');
      setEditPostBody('');
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleDeletePost = async (id: number) => {
    try {
      await deletePost(id);
      setPosts(posts.filter(post => post.id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div>
      <h1>Posts</h1>
      <div className="add-post-form">
        <input
          type="text"
          placeholder="Title"
          value={newPostTitle}
          onChange={(e) => setNewPostTitle(e.target.value)}
        />
        <textarea
          placeholder="Body"
          value={newPostBody}
          onChange={(e) => setNewPostBody(e.target.value)}
        />
        <button onClick={handleAddPost}>Add Post</button>
      </div>
      <ul className="posts-list">
        {posts.map(post => (
          <li key={post.id} className="post-item">
            <img src={post.imageUrl} alt={post.title} className="post-image" />
            <div className="post-details">
              <h2><Link to={`/posts/${post.id}`}>{post.title}</Link></h2>
              <p>{post.body}</p>
              <p>Tags: {post.tags.join(', ')}</p>
              <p>Likes: {post.likes}</p>
              <p>Dislikes: {post.dislikes}</p>
              <p>Author ID: {post.userId}</p>
              <button onClick={() => {
                setEditPostId(post.id);
                setEditPostTitle(post.title);
                setEditPostBody(post.body);
              }}>Edit</button>
              <button onClick={() => handleDeletePost(post.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      {editPostId !== null && (
        <div className="edit-post-form">
          <input
            type="text"
            placeholder="Edit Title"
            value={editPostTitle}
            onChange={(e) => setEditPostTitle(e.target.value)}
          />
          <textarea
            placeholder="Edit Body"
            value={editPostBody}
            onChange={(e) => setEditPostBody(e.target.value)}
          />
          <button onClick={handleUpdatePost}>Update Post</button>
        </div>
      )}
    </div>
  );
};

export default PostsList;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPost } from '../api/api';

interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  userId: number;
}

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (id) {
          const post = await getPost(id);
          setPost(post);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <img src={post.imageUrl} alt={post.title} className="post-image" />
      <p>{post.body}</p>
      <p>Tags: {post.tags.join(', ')}</p>
      <p>Likes: {post.reactions.likes}</p>
      <p>Dislikes: {post.reactions.dislikes}</p>
      <p>Author ID: {post.userId}</p>
    </div>
  );
};

export default PostDetail;

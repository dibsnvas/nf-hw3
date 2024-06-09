import React, { useState } from 'react';
import { addPost, updatePost, deletePost } from '../api/api';
import './Postform.css';

interface PostFormProps {
  post?: any;
  onSave: () => void;
}

const PostForm: React.FC<PostFormProps> = ({ post, onSave }) => {
  const [title, setTitle] = useState(post?.title || '');
  const [tags, setTags] = useState(post?.tags.join(', ') || '');

  const handleSave = async () => {
    const postData = {
      title,
      tags: tags.split(',').map(tag => tag.trim()),
    };

    if (post) {
      await updatePost(post.id, postData);
    } else {
      await addPost(postData);
    }
    onSave();
  };

  const handleDelete = async () => {
    if (post) {
      await deletePost(post.id);
      onSave();
    }
  };

  return (
    <div className="post-form">
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Tags:</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>
      <button onClick={handleSave}>Save</button>
      {post && <button onClick={handleDelete}>Delete</button>}
    </div>
  );
};

export default PostForm;

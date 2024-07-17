
import React, { useState } from 'react';

const Blog = ({ blog, updateBlogLikes }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLike = async () => {
    if (!blog.author || !blog.user) {
      console.error('User information missing for blog');
      return; // Exit if user information is missing
    }
    const updatedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      comments: blog.comments
    };
    updateBlogLikes(blog.id, updatedBlog);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  

  return (
    <div style={blogStyle}>
      <div>
        <strong>{blog.title}</strong> by {blog.author}
        <button onClick={toggleVisibility}>
          {visible ? 'Hide' : 'View'}
        </button>
      </div>
      {visible && (
        <div>
          <p>{blog.url}</p>
          <p>
            {blog.likes} likes
            <button onClick={handleLike}>Like</button>
          </p>
          <p>Added by {blog.user ? blog.user.name : 'Unknown'}</p>
        </div>
      )}
    </div>
  );
};

export default Blog;


import React, { useState } from 'react';

const Blog = ({ blog, user, updateBlogLikes, handleDeleteBlog}) => {
  const [visible, setVisible] = useState(false);
  //console.error(user.name)
  //console.error(user.username)
  //console.error(user.name)
  //console.error(blog.user.username)

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

  const confirmDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${blog.title}" by ${blog.author}?`)) {
      handleDeleteBlog(blog.id);
    }
  };

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
      { blog.user.name === user.name && ( //blog.user && user && 
        <button onClick={confirmDelete}>delete</button>
      )}
    </div>
  );
};

export default Blog;

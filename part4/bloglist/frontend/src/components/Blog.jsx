
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
    handleDeleteBlog(blog.id);
    /*if (window.confirm(`Are you sure you want to delete "${blog.title}" by ${blog.author}?`)) {
      handleDeleteBlog(blog.id);
    }*/
  };

  return (
    <div style={blogStyle} data-testid="blog" data-title={blog.title} data-author={blog.author}>
      <div>
        <strong data-testid="blog-title">{blog.title} </strong> by <span data-testid="blog-author">{blog.author}</span>
        <button onClick={toggleVisibility}>
          {visible ? 'Hide' : 'View'}
        </button>
      </div>
      {visible && (
        <div>
          <p>{blog.url}</p>
          <p>
            <span data-testid="blog-likes">{blog.likes} likes</span>
            <button data-testid="like-button" onClick={handleLike}>Like</button>
          </p>
          <p>Added by <span data-testid="blog-user">{user.username}</span></p>
        </div>
      )}
      { blog.user.id === user._id && ( 
        <button onClick={confirmDelete} data-testid="delete-button">delete</button>
      )}
    </div>
  );
};

export default Blog;

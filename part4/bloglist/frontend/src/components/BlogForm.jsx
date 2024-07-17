// src/components/BlogForm.js
/*import React, { useState } from 'react';
import blogService from '../services/blogs';

const BlogForm = ({ createBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogAuthor, setNewBlogAuthor] = useState('');
  const [newBlogUrl, setNewBlogUrl] = useState('');

  const handleCreateBlog = async (event) => {
    event.preventDefault();
    try {
      const newBlog = await blogService.create({
        title: newBlogTitle,
        author: newBlogAuthor,
        url: newBlogUrl
      });
      createBlog(newBlog);
      setNewBlogTitle('');
      setNewBlogAuthor('');
      setNewBlogUrl('');
    } catch (exception) {
      console.error('Failed to create blog', exception);
    }
  };

  return (
    <div>
      <h3>Create new blog</h3>
      <form onSubmit={handleCreateBlog}>
        <div>
          Title:
          <input
            type="text"
            value={newBlogTitle}
            onChange={({ target }) => setNewBlogTitle(target.value)}
            required
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            value={newBlogAuthor}
            onChange={({ target }) => setNewBlogAuthor(target.value)}
            required
          />
        </div>
        <div>
          URL:
          <input
            type="text"
            value={newBlogUrl}
            onChange={({ target }) => setNewBlogUrl(target.value)}
            required
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default BlogForm;*/

// src/components/BlogForm.js
// src/components/BlogForm.js
import { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    createBlog({ title, author, url });
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        title
        <input
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default BlogForm;



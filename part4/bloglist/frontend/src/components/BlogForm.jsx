
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
          aria-label="title"
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          aria-label="author"
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          aria-label="url"
        />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default BlogForm;



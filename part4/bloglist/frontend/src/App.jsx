
import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [username, setUsername] = useState(''); // Define username state
  const [password, setPassword] = useState(''); // Define password state
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => b.likes - a.likes)) 
      );
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login(username, password);
      setUser(user);
      blogService.setToken(user.token);
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user));
      showNotification('Login successful', 'success');
    } catch (exception) {
      console.error('Wrong credentials');
      showNotification('Wrong username or password', 'error');
    }
  };

  const showNotification = (message) => {
    setNotification(message);
  };

  const removeNotification = () => {
    setNotification(null);
  };

  const handleCreateBlog = async (newBlog) => {
    try {
      const createdBlog = await blogService.create(newBlog);
      setBlogs([...blogs, createdBlog]);
      showNotification(`New blog "${newBlog.title}" added`);
      blogFormRef.current.toggleVisibility(); // Hide blog form after submission
    } catch (exception) {
      console.error('Failed to create blog', exception);
      showNotification('Failed to create blog');
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser');
    setUser(null);
    blogService.setToken(null);
  };

  const updateBlogLikes = async (id, updatedBlog) => {
    try {
      const returnedBlog = await blogService.update(id, updatedBlog);
      setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog));
      showNotification(`Liked "${updatedBlog.title}"`);
    } catch (exception) {
      console.error('Failed to like blog', exception);
      showNotification('Failed to like blog');
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      await blogService.remove(id);
      setBlogs(blogs.filter(blog => blog.id !== id));
      showNotification('Blog deleted successfully');
    } catch (exception) {
      console.error('Failed to delete blog', exception);
      showNotification('Failed to delete blog');
    }
  };

  if (user === null) {
    return (
      <div>
        <Notification message={notification} />
        <h2>Log in to application</h2>
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      </div>
    );
  }

  return (
    <div>
      <Notification message={notification} removeNotification={removeNotification} />
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>Log out</button>
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <BlogForm createBlog={handleCreateBlog} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} 
        blog={blog} 
        user={user}
        updateBlogLikes={updateBlogLikes} 
        handleDeleteBlog={handleDeleteBlog}/> 
      )}
    </div>
  );
};

export default App


// src/components/LoginForm.js
// src/components/LoginForm.js
import React from 'react';

const LoginForm = ({ handleLogin, username, password, setUsername, setPassword }) => {
  const onSubmit = (event) => {
    event.preventDefault(); // Prevent the form from submitting the traditional way
    handleLogin(username, password); // Custom login handling
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        username
        <input
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;



/*import { useState } from 'react';

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Username
        <input
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;*/

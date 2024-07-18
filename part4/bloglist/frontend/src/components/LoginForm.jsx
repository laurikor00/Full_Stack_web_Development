
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
          data-testid='username'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          data-testid='password'
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

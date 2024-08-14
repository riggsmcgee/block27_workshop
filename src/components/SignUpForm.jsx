import { useState } from 'react';

export default function SignUpForm({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  const validateUsername = (username) => {
    if (username.length < 3) {
      alert('Username must be at least 3 characters long.');
    } else if (username.length > 20) {
      alert('Username must be less than 20 characters long.');
    }
    return null;
  };

  const validatePassword = (password) => {
    if (password.length < 6) {
      alert('Password must be at least 6 characters long.');
    } else if (password.length > 20) {
      alert('Password must be less than 20 characters long.');
    }
    return null;
  };
  let response = null;
  //   I can't figure out how to add a line break in the response message. I've tried using \n, <br>, and \n\n, but none of them work. I'm not sure what I'm doing wrong.
  if (message) {
    response = `${message} 
    We're glad to have you, ${username}!`;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        'https://fsa-jwt-practice.herokuapp.com/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      setToken(data.token);
      setMessage(data.message);
      console.log(data.token);
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  }

  return (
    <div className="container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            onBlur={(e) => {
              validateUsername(e.target.value);
            }}
          />
        </label>
        <label>
          Password:
          <input
            type="text  "
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            onBlur={(e) => {
              validatePassword(e.target.value);
            }}
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
      <p>{response}</p>
    </div>
  );
}

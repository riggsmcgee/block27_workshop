import { useState } from 'react';

export default function Authenticate(token) {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  console.log(token);

  return (
    <div className="container">
      <h1>Authenticate</h1>
      <button
        onClick={async function () {
          try {
            const response = await fetch(
              'https://fsa-jwt-practice.herokuapp.com/authenticate',
              {
                headers: {
                  ContentType: 'application/json',
                  Authorization: `Bearer ${token['token']}`,
                },
              }
            );
            const data = await response.json();
            setMessage(data.message);
            console.log(data);
          } catch (error) {
            console.error(error);
          }
        }}
      >
        Check Authentication
      </button>
      <p>{message}</p>
    </div>
  );
}

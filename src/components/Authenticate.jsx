export default function Authenticate(token) {
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
                  contentType: 'application/json',
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            const data = await response.json();
            console.log(data);
          } catch (error) {
            console.error(error);
          }
        }}
      >
        Check Authentication
      </button>
    </div>
  );
}

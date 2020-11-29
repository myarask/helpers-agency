import React from 'react';
import { useAuth0 } from '../react-auth0-spa';

const Home = () => {
  const { user } = useAuth0();

  return (
    <>
      <h1>This is a Home page </h1>
      {user && (
        <p>
          <>You are logged in as </>
          <strong>{user.name}</strong>
          <> and your nickname is </>
          <strong>{user.nickname}</strong>
        </p>
      )}
    </>
  );
};

export default Home;

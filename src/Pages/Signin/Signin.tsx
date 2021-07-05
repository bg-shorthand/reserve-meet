import handleClientLoad, { authApi } from 'gcp/api';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Signin = () => {
  const history = useHistory();

  const signin = async () => {
    authApi.signIn();
    history.push('/main');
  };
  const signout = async () => {
    authApi.signOut();
  };

  return (
    <>
      <h1>RESERVE MEET</h1>
      <button onClick={signin}>Signin</button>
      <button onClick={signout}>Signout</button>
    </>
  );
};

export default Signin;

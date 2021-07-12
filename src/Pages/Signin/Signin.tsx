import authApi from 'api/authApi';
import { useHistory } from 'react-router-dom';

const Signin = () => {
  const history = useHistory();

  const signin = async () => {
    await authApi.signIn();
    history.push('/');
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

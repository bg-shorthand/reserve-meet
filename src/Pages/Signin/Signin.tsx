import authApi from 'api/authApi';
import { useHistory } from 'react-router-dom';

const Signin = () => {
  const history = useHistory();

  const signin = async () => {
    await authApi.signIn();
    history.push('/');
  };

  return (
    <>
      <h1>RESERVE MEET</h1>
      <button onClick={signin}>Signin</button>
    </>
  );
};

export default Signin;

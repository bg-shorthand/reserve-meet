import { handleAuthClick, handleClientLoad, handleSignoutClick, isSign } from 'gcp/gcp';
import { useHistory } from 'react-router-dom';

const Signin = () => {
  const history = useHistory();

  const signin = async () => {
    if (isSign()) {
      history.push('/main');
    } else {
      try {
        await handleAuthClick();
        if (isSign()) history.push('/main');
      } catch {
        alert('알서포트 계정으로 로그인해야 합니다.');
      }
    }
  };
  const signout = async () => {
    if (isSign()) handleSignoutClick();
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

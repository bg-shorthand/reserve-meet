import { handleAuthClick, handleClientLoad, handleSignoutClick, isSign } from 'gcp/gcp';
import { useHistory } from 'react-router-dom';

const Signin = () => {
  const history = useHistory();

  const signin = async () => {
    console.log(isSign);
    if (isSign) {
      history.push('/main');
    } else {
      try {
        await handleAuthClick();
        console.log('target', isSign);
        if (isSign) history.push('/main');
      } catch (e) {
        console.error(e);
        alert('알서포트 계정으로 로그인해야 합니다.');
      }
    }
  };
  const signout = async () => {
    console.log(isSign);
    if (isSign) handleSignoutClick();
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

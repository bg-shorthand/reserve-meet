import authApi from 'api/googleLib/authApi';
import { DefaultProps } from 'const/type';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { isOpenState } from 'state/state';
import StyledButton from 'Components/Button/Button.style';
import { GoogleUser } from 'lib/googleApiLibrary';

const Signin = ({ className }: DefaultProps) => {
  const setIsOpen = useSetRecoilState(isOpenState);
  const history = useHistory();

  const signin = async () => {
    const isSign = await authApi.signIn();
    isSign && history.push('/');
  };

  useEffect(() => {
    const checkInitGapi = () => {
      let timerId: NodeJS.Timeout = setTimeout(() => {}, 100);
      const isInit = !!GoogleUser;

      if (isInit) {
        clearTimeout(timerId);
        console.log(authApi.isSign());
        if (authApi.isSign()) {
          history.push('/');
        } else {
          setIsOpen(pre => ({ ...pre, spinner: false }));
        }
      } else {
        timerId = setTimeout(checkInitGapi, 100);
      }
    };
    checkInitGapi();
  }, []);

  return (
    <section className={className}>
      <h1>RESERVE MEET</h1>
      <StyledButton onClick={signin}>Signin</StyledButton>
    </section>
  );
};

export default Signin;

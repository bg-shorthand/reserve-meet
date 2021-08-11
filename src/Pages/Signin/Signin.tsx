import authApi from 'api/googleLib/authApi';
import { DefaultProps } from 'const/type';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isOpenState, userState } from 'state/state';
import StyledButton from 'Components/Button/Button.style';

const Signin = ({ className }: DefaultProps) => {
  const user = useRecoilValue(userState);
  const isOpen = useSetRecoilState(isOpenState);
  const history = useHistory();

  const signin = async () => {
    await authApi.signIn();
    history.push('/');
  };

  useEffect(() => {
    const isSign = window.localStorage.getItem('isSignin');
    console.log(isSign);
    if (isSign) {
      isOpen(pre => ({ ...pre, spinner: true }));
      history.push('/');
    } else {
      isOpen(pre => ({ ...pre, spinner: false }));
    }
  });

  return (
    <section className={className}>
      <h1>RESERVE MEET</h1>
      <StyledButton onClick={signin}>Signin</StyledButton>
    </section>
  );
};

export default Signin;

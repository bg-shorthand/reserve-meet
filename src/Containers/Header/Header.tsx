import { Link } from 'react-router-dom';
import authApi from 'api/googleLib/authApi';
import { DefaultProps } from 'const/type';
import StyledButton from 'Components/Button/Button.style';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { userState } from 'state/state';
import StyledClock from 'Components/Clock/Clock.style';

const Header = ({ className }: DefaultProps) => {
  const { name, imageUrl } = useRecoilValue(userState);
  const resetUser = useResetRecoilState(userState);

  const signout = () => {
    authApi.signOut();
    resetUser();
  };

  return (
    <header className={className}>
      <h1>
        <Link to="/">Rsupport Reserve Meet</Link>
      </h1>
      <StyledClock />
      {name ? (
        <figure>
          <img src={imageUrl} alt={name} />
          <figcaption>{name} 님</figcaption>
        </figure>
      ) : null}
      <StyledButton onClick={signout}>Signout</StyledButton>
    </header>
  );
};

export default Header;

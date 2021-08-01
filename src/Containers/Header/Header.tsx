import { Link } from 'react-router-dom';
import authApi from 'api/googleLib/authApi';
import { DefaultProps } from 'const/type';
import { useRecoilValue } from 'recoil';
import { userState } from 'state/state';

const Header = ({ className }: DefaultProps) => {
  const isAdmin = useRecoilValue(userState).admin;

  const signout = () => {
    authApi.signOut();
  };

  return (
    <header className={className}>
      <h1>
        <Link to="/">Rsupport Reserve Meet</Link>
      </h1>
      {isAdmin ? <Link to="/admin">Admin</Link> : null}
      <button onClick={signout}>Signout</button>
    </header>
  );
};

export default Header;

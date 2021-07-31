import { Link } from 'react-router-dom';
import authApi from 'api/googleLib/authApi';
import { DefaultProps } from 'const/type';

const Header = ({ className }: DefaultProps) => {
  const signout = () => {
    authApi.signOut();
  };

  return (
    <header className={className}>
      <h1>
        <Link to="/">Rsupport Reserve Meet</Link>
      </h1>
      <button onClick={signout}>Signout</button>
    </header>
  );
};

export default Header;

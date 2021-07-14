import { Link } from 'react-router-dom';
import authApi from 'api/authApi';

const Header = () => {
  const signout = () => {
    authApi.signOut();
  };

  return (
    <header>
      <h1>
        <Link to="/">Rsupport Reserve Meet</Link>
      </h1>
      <button onClick={signout}>Signout</button>
    </header>
  );
};

export default Header;

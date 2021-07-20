import authApi from 'api/authApi';
import { DefaultProps } from 'const/type';
import { useHistory } from 'react-router-dom';

const Signin = ({ className }: DefaultProps) => {
  const history = useHistory();

  const signin = async () => {
    await authApi.signIn();
    history.push('/');
  };

  return (
    <section className={className}>
      <h1>RESERVE MEET</h1>
      <button onClick={signin}>Signin</button>
    </section>
  );
};

export default Signin;

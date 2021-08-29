import { Suspense, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { initClient, loadGoogleApiLibrary } from 'lib/googleApiLibrary';
import GlobalStyle from '../GlobalStyle';
import StyledSignin from 'Pages/Signin/Signin.style';
import Index from 'Pages/Main/Index';
import Spinner from 'Components/Spinner/Spinner';
import ModalDialogs from 'Pages/ModalDialogs/ModalDialogs';
import io from 'socket.io-client';

const App = () => {
  useEffect(() => {
    window.onGoogleApiLibraryLoad = async () => {
      const gapi = window.gapi;
      gapi.load('client:auth2', initClient);
    };

    loadGoogleApiLibrary();

    const socket = io('http://localhost:4001');
    socket.on('test', test => {
      console.log(test);
    });
  }, []);

  return (
    <>
      <GlobalStyle />
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path="/signin" component={StyledSignin} />
          <Route path="/" component={Index} />
          <Redirect to="/" />
        </Switch>
        <ModalDialogs />
      </Suspense>
    </>
  );
};

export default App;

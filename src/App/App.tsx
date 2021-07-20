import { Suspense, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { initClient, loadGoogleApiLibrary } from 'lib/googleApiLibrary';
import GlobalStyle from '../GlobalStyle';
import { RecoilRoot } from 'recoil';
import StyledSignin from 'Pages/Signin/Signin.style';
import Index from 'Pages/Main/Index';
import Spinner from 'Components/Spinner/Spinner';
import ModalDialogs from 'Pages/ModalDialogs/ModalDialogs';

const App = () => {
  useEffect(() => {
    window.onGoogleApiLibraryLoad = () => {
      const gapi = window.gapi;
      gapi.load('client:auth2', initClient);
    };

    loadGoogleApiLibrary();
  }, []);

  return (
    <RecoilRoot>
      <GlobalStyle />
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path="/signin" component={StyledSignin} />
          <Route path="/" component={Index} />
          <Redirect to="/" />
        </Switch>
        <ModalDialogs />
      </Suspense>
    </RecoilRoot>
  );
};

export default App;

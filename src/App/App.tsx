import { Suspense, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { initClient, loadGoogleApiLibrary } from 'lib/googleApiLibrary';
import { RecoilRoot } from 'recoil';
import Signin from 'Pages/Signin/Signin';
import Index from 'Pages/Main/Index';
import Spinner from 'Components/Spinner/Spinner';

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
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path="/signin" component={Signin} />
          <Route path="/" component={Index} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </RecoilRoot>
  );
};

export default App;

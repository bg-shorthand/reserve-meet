import { Suspense, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { initClient, loadGoogleApiLibrary } from 'lib/googleApiLibrary';
import { RecoilRoot } from 'recoil';
import Signin from 'Pages/Signin/Signin';
import Main from 'Pages/Main/Main';
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
          <Route path="/main" component={Main} />
          <Route exact path="/" component={Signin} />
        </Switch>
      </Suspense>
    </RecoilRoot>
  );
};

export default App;

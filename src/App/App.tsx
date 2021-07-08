import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { initClient, loadGoogleApiLibrary } from 'lib/googleApiLibrary';
import Signin from 'Pages/Signin/Signin';
import Main from 'Pages/Main/Main.jsx';

const App = () => {
  useEffect(() => {
    console.log(1);

    window.onGoogleApiLibraryLoad = () => {
      const gapi = window.gapi;
      gapi.load('client:auth2', initClient);
    };

    loadGoogleApiLibrary();
  }, []);

  return (
    <Switch>
      <Route path="/main" component={Main} />
      <Route exact path="/" component={Signin} />
    </Switch>
  );
};

export default App;

import { Route, Switch } from 'react-router-dom';
import Signin from 'Pages/Signin/Signin';
import Main from 'Pages/Main/Main.jsx';
import { useEffect } from 'react';
import handleClientLoad from 'gcp/initClient';
import { loadGoogleScript, onGoogleScriptLoad } from 'lib/googleApiLibrary';

function App() {
  // useEffect(() => {
  //   handleClientLoad();
  // }, []);

  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const API_KEY = process.env.REACT_APP_API_KEY;
  const SCOPES = 'https://www.googleapis.com/auth/calendar';
  const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];

  useEffect(() => {
    onGoogleScriptLoad = () => {
      const gapi = window.gapi;
      gapi.load('auth2', () => {
        // (Ref. 3)
        return (async () => {
          const _googleAuth = await gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            scope: SCOPES,
            discoveryDocs: DISCOVERY_DOCS,
          });
        })();
      });
    };

    // Ensure everything is set before loading the script
    loadGoogleScript(); // (Ref. 9)
  }, []);

  return (
    <Switch>
      <Route path="/main" component={Main} />
      <Route exact path="/" component={Signin} />
    </Switch>
  );
}

export default App;

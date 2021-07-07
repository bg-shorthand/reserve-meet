import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { loadGoogleApiLibrary } from 'lib/googleApiLibrary';
import Signin from 'Pages/Signin/Signin';
import Main from 'Pages/Main/Main.jsx';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const API_KEY = process.env.REACT_APP_API_KEY;
const SCOPES = 'https://www.googleapis.com/auth/calendar';
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];

let GoogleAuth: gapi.auth2.GoogleAuth;
let GoogleUser: gapi.auth2.GoogleUser;

const observeSigninStatus = (isSignedIn: boolean) => {
  if (isSignedIn) {
    console.log('로그인 중');
    window.sessionStorage.setItem('access_token', GoogleUser.getAuthResponse().access_token);
  } else {
    console.log('로그아웃 중');
    window.sessionStorage.removeItem('access_token');
    if (window.location.pathname !== '/') window.location.replace('/');
  }
};

const initClient = async () => {
  await gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    scope: SCOPES,
    discoveryDocs: DISCOVERY_DOCS,
  });
  console.log('init');
  GoogleAuth = gapi.auth2.getAuthInstance();
  GoogleUser = gapi.auth2.getAuthInstance().currentUser.get();
  gapi.auth2.getAuthInstance().isSignedIn.listen(observeSigninStatus);
};

const App = () => {
  useEffect(() => {
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
export { initClient, GoogleAuth, GoogleUser };

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const API_KEY = process.env.REACT_APP_API_KEY;
const SCOPES = 'https://www.googleapis.com/auth/calendar';
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];

let GoogleAuth: gapi.auth2.GoogleAuth;
let GoogleUser: gapi.auth2.GoogleUser;

const observeSigninStatus = (isSignedIn: boolean) => {
  if (isSignedIn) {
    console.log('로그인 중');
  } else {
    console.log('로그아웃 중');
    if (window.location.pathname !== '/signin') window.location.replace('/signin');
  }
};

const loadGoogleApiLibrary = () => {
  (function () {
    const id = 'newScript';
    const src = 'https://apis.google.com/js/api.js';

    const $firstScript = document.querySelector('script');

    if (document.getElementById(id)) return;

    const $script = document.createElement('script');
    $script.id = id;
    $script.src = src;
    $script.onload = window.onGoogleApiLibraryLoad;
    $firstScript && $firstScript.before($script);
  })();
};

const initClient = async () => {
  await gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    scope: SCOPES,
    discoveryDocs: DISCOVERY_DOCS,
  });

  GoogleAuth = gapi.auth2.getAuthInstance();
  GoogleUser = GoogleAuth.currentUser.get();

  GoogleAuth.isSignedIn.listen(observeSigninStatus);
  observeSigninStatus(GoogleAuth.isSignedIn.get());
  gapi.client.setToken(gapi.client.getToken());
  console.log('init');
};

export { GoogleAuth, GoogleUser, loadGoogleApiLibrary, initClient };

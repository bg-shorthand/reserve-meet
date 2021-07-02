/* eslint-disable */
import gapi from 'gcp/api'

var CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
var API_KEY = process.env.REACT_APP_API_KEY;
var SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

let isSign = false;

/**
 *  On load, called to load the auth2 library and API client library.
 */
async function handleClientLoad() {
  await gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client
    .init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      scope: SCOPES,
    })
    .then(
      function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());

        console.log(gapi.auth2.getAuthInstance())
        console.log(gapi.auth2.getAuthInstance().isSignedIn.get())
      },
      function (error) {
        appendPre(JSON.stringify(error, null, 2));
      },
    );
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    console.log('login')
  } else {
    console.log('logout')
  }
}

/**
 *  Sign in the user upon button click.
 */
async function handleAuthClick(event) {
  await gapi.auth2.getAuthInstance().signIn();
  isSign = true;
}

/**
 *  Sign out the user upon button click.
 */
async function handleSignoutClick(event) {
  await gapi.auth2.getAuthInstance().signOut();
  isSign = false;
}

export { initClient, handleClientLoad, handleAuthClick, handleSignoutClick, updateSigninStatus, isSign };

import { initClient } from 'lib/googleApiLibrary';

const SAMPLE_URL = 'https://www.googleapis.com/calendar/v3/calendars/bkhan@rsupport.com/events';

const calendarApi = {
  async getSample() {
    // const res = await fetch(SAMPLE_URL, {
    //   headers: { Authorization: 'Bearer ' + window.sessionStorage.getItem('access_token') },
    // });
    // const sample = await res.json();
    // return sample.items;

    await initClient();
    const res = await window.gapi.client.request({ path: SAMPLE_URL });
    return res;
  },
};

export { calendarApi };

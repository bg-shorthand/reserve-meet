import { GoogleAuth } from 'lib/googleApiLibrary';

const SAMPLE_URL = 'https://www.googleapis.com/calendar/v3/calendars/bkhan@rsupport.com/events';

const calendarApi = {
  async getSample() {
    if (GoogleAuth) {
      return await gapi.client.request({ path: SAMPLE_URL });
    }
  },
};

export { calendarApi };

import { GoogleAuth } from 'lib/googleApiLibrary';

const calendarApi = {
  async getEvents() {
    if (GoogleAuth) {
      return await gapi.client.calendar.events.list({
        calendarId: 'bkhan@rsupport.com',
        singleEvents: true,
        orderBy: 'startTime',
        timeMin: '2021-07-12T00:00:00Z',
        timeMax: '2021-07-17T00:00:00Z',
      });
    }
  },
};

export { calendarApi };

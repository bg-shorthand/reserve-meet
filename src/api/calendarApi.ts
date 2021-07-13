import { GoogleAuth } from 'lib/googleApiLibrary';

const calendarApi = {
  async getEvents(calId: string, start: string, end: string) {
    if (GoogleAuth) {
      return await gapi.client.calendar.events.list({
        calendarId: calId,
        singleEvents: true,
        orderBy: 'startTime',
        timeMin: start,
        timeMax: end,
      });
    }
  },
  async getCalendarList() {
    if (GoogleAuth) {
      return await gapi.client.calendar.calendarList.list({});
    }
  },
  async getCalendars() {
    if (GoogleAuth) {
      return await gapi.client.calendar.calendars.get({ calendarId: 'bkhan@rsupport.com' });
    }
  },
};

export { calendarApi };

import { newEvent } from 'const/type';
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
  async insertEvent(newEvent: newEvent) {
    const { calendarId, summary, floor, room, startDate, startTime, endDate, endTime, attendees } =
      newEvent;
    if (GoogleAuth) {
      return await gapi.client.calendar.events.insert({
        calendarId,
        resource: {
          start: {
            dateTime: startDate + 'T' + startTime + ':00+09:00',
            timeZone: 'Asia/Seoul',
          },
          end: {
            dateTime: endDate + 'T' + endTime + ':00+09:00',
            timeZone: 'Asia/Seoul',
          },
          summary,
          location: floor + '층 ' + room,
          attendees,
        },
      });
    }
  },
  async deleteEvent(calendarId: string, eventId: string) {
    if (GoogleAuth) {
      return await gapi.client.calendar.events.delete({
        calendarId,
        eventId,
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
  async insertCalendar(summary: string) {
    if (GoogleAuth) {
      return await gapi.client.calendar.calendars.insert({
        resource: {
          summary,
        },
      });
    }
  },
};

export { calendarApi };

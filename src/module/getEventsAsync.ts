import { calendarApi } from 'api/calendarApi';
import getDate from './getDate';

let timerId: number;

const getEventsAsync = async (calendarId: string, curDate: string) => {
  clearTimeout(timerId);

  const [start, end] = getDate.today(curDate);
  const res = await calendarApi.getEvents(calendarId, start, end);

  if (res && res.result.items) {
    const newEvents = res.result.items.map(({ id, summary, location, start, end, creator }) => ({
      id: id || '',
      summary: summary || '',
      location: location || '',
      date: start?.dateTime?.slice(0, 10) || '',
      startTime: start?.dateTime?.slice(11, 16) || '',
      endTime: end?.dateTime?.slice(11, 16) || '',
      creatorEmail: creator?.email || '',
    }));
    return newEvents;
  } else {
    timerId = setTimeout(getEventsAsync, 100);
  }
};

export default getEventsAsync;

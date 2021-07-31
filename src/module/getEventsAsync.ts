import { calendarApi } from 'api/googleLib/calendarApi';
import createEventsFromAsyncRes from './createEventsFromAsyncRes';
import getDate from './getDate';

let timerId: number;

const getEventsAsync = async (calendarId: string, curDate: string) => {
  clearTimeout(timerId);

  const [start, end] = getDate.today(curDate);
  const res = await calendarApi.getEvents(calendarId, start, end);

  if (res && res.result.items) {
    const newEvents = createEventsFromAsyncRes(res.result.items);
    return newEvents;
  } else {
    timerId = setTimeout(getEventsAsync, 100);
  }
};

export default getEventsAsync;

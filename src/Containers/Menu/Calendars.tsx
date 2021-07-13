import { calendarApi } from 'api/calendarApi';
import { Calendars } from 'const/type';
import { useEffect, useState } from 'react';

const CalendarList = () => {
  const [calendarList, setCalendarList] = useState<Calendars>([]);

  useEffect(() => {
    let calendarsTimerId: NodeJS.Timeout;

    const getCalendars = async () => {
      const res = await calendarApi.getCalendarList();

      clearTimeout(calendarsTimerId);

      if (res && res.result.items) {
        console.log('claendars', res.result.items);
        const newCalendarList = res.result.items.map(calendar => ({
          summary: calendar.summary ? calendar.summary : '',
          id: calendar.id ? calendar.id : '',
        }));
        setCalendarList([...newCalendarList]);
      } else {
        calendarsTimerId = setTimeout(getCalendars, 100);
      }
    };
    getCalendars();
  }, []);

  return (
    <ul>
      {calendarList.map(calendar => {
        return <li key={calendar.id}>{calendar.summary}</li>;
      })}
    </ul>
  );
};

export default CalendarList;

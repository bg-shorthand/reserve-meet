import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { calendarListState } from 'state/state';
import { calendarApi } from 'api/calendarApi';

const CalendarList = () => {
  const [calendarList, setCalendarList] = useRecoilState(calendarListState);

  useEffect(() => {
    let calendarsTimerId: NodeJS.Timeout;

    const getCalendars = async () => {
      const res = await calendarApi.getCalendarList();

      clearTimeout(calendarsTimerId);

      if (res && res.result.items) {
        const newCalendarList = res.result.items
          .filter(calendar => !calendar.description)
          .map(calendar => ({
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
      <li>
        <Link to="/">Summary</Link>
      </li>
      {calendarList.map(calendar => {
        return (
          <li key={calendar.id}>
            <Link to={`/reserve-state/:${calendar.id}`}>{calendar.summary}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default CalendarList;

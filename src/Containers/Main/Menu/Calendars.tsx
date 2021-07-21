import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { calendarListState, isOpenState } from 'state/state';
import { calendarApi } from 'api/calendarApi';
import { MouseEventHandler } from 'react';

const CalendarList = () => {
  const [calendarList, setCalendarList] = useRecoilState(calendarListState);
  const setIsOpen = useSetRecoilState(isOpenState);

  const openAddCalendarDialogHandler: MouseEventHandler<Element> = () => {
    setIsOpen(pre => ({ ...pre, addCalendar: true }));
  };

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
    <>
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
      <button onClick={openAddCalendarDialogHandler}>달력 추가</button>
    </>
  );
};

export default CalendarList;

import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { calendarListState, isOpenState } from 'state/state';
import { calendarApi } from 'api/googleLib/calendarApi';
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
          <NavLink
            exact
            to="/"
            activeStyle={{
              fontWeight: 700,
            }}
          >
            Summary
          </NavLink>
        </li>
        {calendarList.map(calendar => {
          return (
            <li key={calendar.id}>
              <NavLink
                to={`/reserve-state/:${calendar.id}`}
                activeStyle={{
                  fontWeight: 700,
                }}
              >
                {calendar.summary}
              </NavLink>
            </li>
          );
        })}
      </ul>
      <button onClick={openAddCalendarDialogHandler}>달력 추가</button>
    </>
  );
};

export default CalendarList;

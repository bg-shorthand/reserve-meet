import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { calendarListState, isOpenState, userState } from 'state/state';
import { calendarApi } from 'api/googleLib/calendarApi';
import { useRecoilValue, useSetRecoilState } from 'recoil';

const CalendarList = () => {
  const setCalendarList = useSetRecoilState(calendarListState);
  const isAdmin = useRecoilValue(userState).admin;
  const setIsOpen = useSetRecoilState(isOpenState);

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
        setIsOpen(pre => ({ ...pre, spinner: false }));
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
            회의실 예약
          </NavLink>
        </li>
        {isAdmin ? (
          <li>
            <NavLink to="/admin" activeStyle={{ fontWeight: 700 }}>
              관리자
            </NavLink>
          </li>
        ) : null}
      </ul>
    </>
  );
};

export default CalendarList;

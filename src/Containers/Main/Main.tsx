import { useState } from 'react';
import { Events } from 'const/type';
import { useEffect } from 'react';
import { calendarApi } from 'api/calendarApi';
import getDate from 'module/getDate';
import { useRecoilValue } from 'recoil';
import { userState } from 'state/state';

const Main = () => {
  const [events, setEvents] = useState<Events>([]);
  const { email } = useRecoilValue(userState);

  useEffect(() => {
    let examTimerId: NodeJS.Timeout;

    const exam = async () => {
      console.log(email);
      const [start, end] = getDate.thisWeek();
      clearTimeout(examTimerId);
      if (email) {
        const res = await calendarApi.getEvents(email, start, end);
        if (res && res.result.items) {
          const newEvents = res.result.items.map((v: any) => ({
            summary: v.summary,
            location: v.location,
            time: v.start.dateTime,
            date: v.start.dateTime,
            id: v.id,
          }));
          setEvents(newEvents);
        } else {
          examTimerId = setTimeout(exam, 100);
        }
      }
    };
    exam();
  }, [email]);

  return (
    <section>
      <h1>이번주 일정</h1>
      {events.length ? (
        <ul>
          {events.map(event => {
            return <li key={event.id}>{`${event.summary}, ${event.location}, ${event.time}`}</li>;
          })}
        </ul>
      ) : null}
    </section>
  );
};

export default Main;

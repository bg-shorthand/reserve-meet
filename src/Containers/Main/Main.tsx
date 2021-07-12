import { useState } from 'react';
import { Events } from 'const/type';
import { useEffect } from 'react';
import { calendarApi } from 'api/calendarApi';

const Main = () => {
  const [todayEvents, setTodayEvents] = useState([] as Events);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    const exam = async () => {
      const res = await calendarApi.getEvents();

      clearTimeout(timerId);

      if (res && res.result.items) {
        console.log(res.result.items);
        const newEvents = res.result.items.map((v: any) => ({
          summary: v.summary,
          location: v.location,
          time: v.start.dateTime,
          date: v.start.dateTime,
        }));
        setTodayEvents(newEvents);
      } else {
        timerId = setTimeout(exam, 100);
      }
    };
    exam();
  }, []);

  return (
    <section>
      <h1>이번주 일정</h1>
      <ul>
        {todayEvents.map(event => {
          return <li>{`${event.summary}, ${event.location}, ${event.time}`}</li>;
        })}
      </ul>
    </section>
  );
};

export default Main;

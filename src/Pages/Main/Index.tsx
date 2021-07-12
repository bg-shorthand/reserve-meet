import { useEffect, useState } from 'react';
import { calendarApi } from 'api/calendarApi';
import Menu from 'Containers/Menu/Menu';
import Main from 'Containers/Main/Main';

const Index = () => {
  const [events, setEvents] = useState([{ location: '', summary: '', time: '' }]);

  useEffect(() => {
    let examTimerId: NodeJS.Timeout;

    const exam = async () => {
      const res = await calendarApi.getEvents();
      if (res && res.result.items) {
        clearTimeout(examTimerId);
        console.log(res.result.items);
        const newEvents = res.result.items.map((v: any) => ({
          summary: v.summary,
          location: v.location,
          time: v.start.dateTime,
        }));
        setEvents(newEvents);
      } else {
        clearTimeout(examTimerId);
        examTimerId = setTimeout(exam, 100);
      }
    };
    exam();
  }, []);

  return (
    <>
      <Menu />
      <Main />
      <ul>
        {events.map((event, i) => (
          <li key={i}>{`요약: ${event.summary}, 장소: ${event.location}, 시간: ${event.time}`}</li>
        ))}
      </ul>
    </>
  );
};

export default Index;

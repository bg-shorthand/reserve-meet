import { calendarApi } from 'api/calendarApi';
import { DefaultProps, Events } from 'const/type';
import getDate from 'module/getDate';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import StyledTable from 'Components/Table/Table';
import StyledFloor from 'Components/Floor/Floor.style';

type params = {
  calId: string;
};

const ReserveTable = ({ className }: DefaultProps) => {
  const [events, setEvents] = useState<Events>([]);

  const params: params = useParams();
  const calId = params.calId.slice(1);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    const getEvents = async () => {
      clearTimeout(timerId);

      const [start, end] = getDate.thisMonth();
      const res = await calendarApi.getEvents(calId, start, end);

      if (res && res.result.items) {
        console.log('events', res);
        const newEvents = res.result.items.map(({ id, summary, location, start }) => ({
          id: id ? id : '',
          summary: summary ? summary : '',
          location: location ? location : '',
          date: start ? (start.dateTime ? start.dateTime : '') : '',
          time: start ? (start.dateTime ? start.dateTime : '') : '',
        }));
        setEvents([...newEvents]);
      } else {
        timerId = setTimeout(getEvents, 100);
      }
    };
    getEvents();
  }, [params]);

  return (
    <section className={className}>
      <StyledFloor />
      <h1>예약 현황</h1>
      <ul>
        {events.length
          ? events.map(event => (
              <li key={event.id}>{`${event.summary}, ${event.location}, ${event.date}`}</li>
            ))
          : null}
      </ul>
      <StyledTable
        rooms={[
          '1회의실',
          '2회의실',
          '3회의실',
          '4회의실',
          '5회의실',
          '6회의실',
          '7회의실',
          '8회의실',
        ]}
      />
    </section>
  );
};

export default ReserveTable;

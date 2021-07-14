import { calendarApi } from 'api/calendarApi';
import { DefaultProps, Events } from 'const/type';
import getDate from 'module/getDate';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import StyledTable from 'Components/Table/Table';
import StyledFloor from 'Components/Floor/Floor.style';
import { useRecoilValue } from 'recoil';
import { roomsState } from 'state/state';

type params = {
  calId: string;
};

const ReserveTable = ({ className }: DefaultProps) => {
  const [events, setEvents] = useState<Events>([]);
  const rooms = useRecoilValue(roomsState);

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
      {rooms && <StyledTable rooms={rooms} />}
    </section>
  );
};

export default ReserveTable;

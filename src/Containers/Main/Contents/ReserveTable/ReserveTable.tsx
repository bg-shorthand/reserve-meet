import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { calendarApi } from 'api/calendarApi';
import { useRecoilState, useRecoilValue } from 'recoil';
import { curDateState, eventsState, renderEventsState, roomsState } from 'state/state';
import { DefaultProps } from 'const/type';
import getDate from 'module/getDate';
import StyledTable from 'Components/Table/Table.style';
import StyledFloor from 'Components/Floor/Floor.style';
import DatePicker from 'Components/DatePicker/DatePicker';

type params = {
  calId: string;
};

const ReserveTable = ({ className }: DefaultProps) => {
  const [events, setEvents] = useRecoilState(eventsState);
  const renderEvents = useRecoilValue(renderEventsState);
  const curDate = useRecoilValue(curDateState);
  const rooms = useRecoilValue(roomsState);

  const params: params = useParams();
  const calId = params.calId.slice(1);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    const getEvents = async () => {
      clearTimeout(timerId);

      const [start, end] = getDate.today(curDate);
      const res = await calendarApi.getEvents(calId, start, end);

      if (res && res.result.items) {
        const newEvents = res.result.items.map(({ id, summary, location, start }) => ({
          id: id ? id : '',
          summary: summary ? summary : '',
          location: location ? location : '',
          date: start ? (start.dateTime ? start.dateTime.slice(0, 10) : '') : '',
          time: start ? (start.dateTime ? start.dateTime.slice(11, 17) : '') : '',
        }));
        console.log('newEvents', newEvents);
        setEvents([...newEvents]);
      } else {
        timerId = setTimeout(getEvents, 100);
      }
    };
    getEvents();
  }, [params, curDate]);

  return (
    <section className={className}>
      <DatePicker />
      <StyledFloor />
      <h1>예약 현황</h1>
      <ul>
        {renderEvents.length
          ? events.map(event => (
              <li
                key={event.id}
              >{`${event.summary}, ${event.location}, ${event.date}, ${event.time}`}</li>
            ))
          : null}
      </ul>
      {rooms && <StyledTable rooms={rooms} />}
    </section>
  );
};

export default ReserveTable;

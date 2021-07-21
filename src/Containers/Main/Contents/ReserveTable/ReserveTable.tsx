import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { calendarApi } from 'api/calendarApi';
import { useRecoilState, useRecoilValue } from 'recoil';
import { curDateState, eventsState, renderEventsState, roomsState } from 'state/state';
import { DefaultProps } from 'const/type';
import getDate from 'module/getDate';
import StyledTable from 'Components/Table/Table.style';
import StyledFloor from 'Components/Floor/Floor.style';
import StyledDatePicker from 'Components/DatePicker/DatePicker.style';

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
        console.log(res.result.items);
        const newEvents = res.result.items.map(
          ({ id, summary, location, start, end, creator }) => ({
            id: id || '',
            summary: summary || '',
            location: location || '',
            date: start?.dateTime?.slice(0, 10) || '',
            startTime: start?.dateTime?.slice(11, 16) || '',
            endTime: end?.dateTime?.slice(11, 16) || '',
            creatorEmail: creator?.email || '',
          }),
        );
        setEvents([...newEvents]);
      } else {
        timerId = setTimeout(getEvents, 100);
      }
    };
    getEvents();
  }, [params, curDate]);

  return (
    <section className={className}>
      <h1>예약 현황</h1>
      <StyledDatePicker />
      <StyledFloor />
      {renderEvents.length ? null : <p>일정이 없습니다</p>}
      {rooms && <StyledTable rooms={rooms} curTime={new Date()} />}
    </section>
  );
};

export default ReserveTable;

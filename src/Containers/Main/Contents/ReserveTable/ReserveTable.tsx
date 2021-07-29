import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { calendarApi } from 'api/calendarApi';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { curDateState, eventsState, roomsState } from 'state/state';
import { DefaultProps } from 'const/type';
import getDate from 'module/getDate';
import StyledTable from 'Components/Table/Table.style';
import StyledFloor from 'Components/Floor/Floor.style';
import StyledDatePicker from 'Components/DatePicker/DatePicker.style';
import createEventsFromAsyncRes from 'module/createEventsFromAsyncRes';

type params = {
  calId: string;
};

const ReserveTable = ({ className }: DefaultProps) => {
  const setEvents = useSetRecoilState(eventsState);
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
        const items = res.result.items;
        const newEvents = createEventsFromAsyncRes(items);
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
      {rooms && <StyledTable rooms={rooms} curTime={new Date()} />}
    </section>
  );
};

export default ReserveTable;

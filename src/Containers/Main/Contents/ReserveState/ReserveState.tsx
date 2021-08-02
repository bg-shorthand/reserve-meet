import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { calendarApi } from 'api/googleLib/calendarApi';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { curDateState, eventsState, roomsPerFloorState } from 'state/state';
import { DefaultProps } from 'const/type';
import getDate from 'module/getDate';
import StyledReserveTable from 'Components/ReserveTable/ReserveTable.style';
import StyledFloor from 'Components/Floor/Floor.style';
import StyledDatePicker from 'Components/DatePicker/DatePicker.style';
import createEventsFromAsyncRes from 'module/createEventsFromAsyncRes';

type params = {
  calId: string;
};

const ReserveState = ({ className }: DefaultProps) => {
  const setEvents = useSetRecoilState(eventsState);
  const curDate = useRecoilValue(curDateState);
  const rooms = useRecoilValue(roomsPerFloorState);

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
      {rooms && <StyledReserveTable rooms={rooms} curTime={new Date()} />}
    </section>
  );
};

export default ReserveState;
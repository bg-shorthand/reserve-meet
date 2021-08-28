import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { curDateState, eventsState, roomsPerFloorState } from 'state/state';
import { DefaultProps } from 'const/type';
import StyledReserveTable from 'Components/ReserveTable/ReserveTable.style';
import StyledFloor from 'Components/Floor/Floor.style';
import StyledDatePicker from 'Components/DatePicker/DatePicker.style';
import createEventsFromAsyncRes from 'module/createEventsFromAsyncRes';
import meetingApi from 'api/db/meetingApi';

const ReserveState = ({ className }: DefaultProps) => {
  const setEvents = useSetRecoilState(eventsState);
  const curDate = useRecoilValue(curDateState);
  const rooms = useRecoilValue(roomsPerFloorState);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    const getEvents = async () => {
      const res = await meetingApi.get(curDate);

      clearTimeout(timerId);

      if (res && res.data.meetings) {
        const items = res.data.meetings;
        const newEvents = createEventsFromAsyncRes(items);
        setEvents([...newEvents]);
      } else {
        timerId = setTimeout(getEvents, 100);
      }
    };
    getEvents();
  }, [curDate]);

  return (
    <section className={className}>
      <h1>예약 현황</h1>
      <section>
        <StyledDatePicker />
        <StyledFloor />
      </section>
      {rooms && <StyledReserveTable rooms={rooms} curTime={new Date()} />}
    </section>
  );
};

export default ReserveState;

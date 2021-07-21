import { MouseEventHandler } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { curDateState, curFloorState, isOpenState, newEventState } from 'state/state';
import { DefaultProps } from 'const/type';
import { END_TIME, START_TIME } from 'const/const';
import StyledMeetingSummary from 'Components/MeetingSummary/MeetingSummary.style';

interface props extends DefaultProps {
  rooms: string[];
}
type params = { calId: '' };

const Table = ({ className, rooms }: props) => {
  const params = useParams<params>();
  const curFloor = useRecoilValue(curFloorState);
  const curDate = useRecoilValue(curDateState);
  const setNewEvent = useSetRecoilState(newEventState);
  const setIsOpen = useSetRecoilState(isOpenState);

  const timeTable = (() => {
    const temp: string[] = [];
    for (let i = START_TIME; i <= END_TIME - 1; i++) {
      temp.push(i + ':00');
      temp.push(i + ':30');
    }
    return temp;
  })();

  const setNewEventHandler: MouseEventHandler<Element> = e => {
    const target = e.target as Element;
    if (target.matches('article, article *')) return;

    const calendarId = params.calId;
    const startDate = curDate;
    const endDate = curDate;
    const floor = curFloor + '';
    const [startTime, room] = e.currentTarget.id.split('-');
    const endTime = /00$/.test(startTime)
      ? +startTime.slice(0, 2) + ':30'
      : +startTime.slice(0, 2) + 1 + ':00';

    setNewEvent(pre => ({
      ...pre,
      calendarId: calendarId.slice(1),
      floor,
      room,
      startDate,
      startTime,
      endDate,
      endTime,
    }));
    setIsOpen(pre => ({ ...pre, addEvent: true }));
  };

  return (
    <table className={className}>
      <thead>
        <tr>
          <th>시간</th>
          {rooms.map((room, index) => {
            return <th key={index}>{room}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {timeTable.map((time, i) => {
          return (
            <tr key={i}>
              <th>{time}</th>
              {rooms.map((room, index) => (
                <td key={index} id={time + '-' + room} onClick={setNewEventHandler}>
                  <StyledMeetingSummary time={time} room={room} />
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;

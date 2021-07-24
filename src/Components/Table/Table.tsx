import { MouseEventHandler } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { curDateState, curFloorState, isOpenState, newEventState } from 'state/state';
import { DefaultProps } from 'const/type';
import { END_TIME, START_TIME, TIME_TABLE } from 'const/const';
import StyledMeetingSummary from 'Components/MeetingSummary/MeetingSummary.style';

interface props extends DefaultProps {
  rooms: string[];
  curTime: Date;
}
type params = { calId: '' };

const Table = ({ className, rooms }: props) => {
  const params = useParams<params>();
  const curFloor = useRecoilValue(curFloorState);
  const curDate = useRecoilValue(curDateState);
  const setNewEvent = useSetRecoilState(newEventState);
  const setIsOpen = useSetRecoilState(isOpenState);

  const setNewEventHandler: MouseEventHandler<Element> = e => {
    const target = e.target as Element;
    if (target.matches('article, article *')) return;

    setNewEvent(pre => ({
      ...pre,
      calendarId: params.calId.slice(1),
      floor: curFloor + '',
      room: e.currentTarget.id.split('-')[1],
      startDate: curDate,
      startTime: e.currentTarget.id.split('-')[0],
      endDate: curDate,
      endTime: /00$/.test(e.currentTarget.id.split('-')[0])
        ? +e.currentTarget.id.split('-')[0].slice(0, 2) + ':30'
        : +e.currentTarget.id.split('-')[0].slice(0, 2) + 1 + ':00',
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
        {TIME_TABLE.map((time, i) => {
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

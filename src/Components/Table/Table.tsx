import { END_TIME, START_TIME } from 'const/const';
import { DefaultProps } from 'const/type';
import { MouseEventHandler } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { curDateState, curFloorState, newEventState } from 'state/state';

interface props extends DefaultProps {
  rooms: string[];
}
type params = { calId: '' };

const Table = ({ className, rooms }: props) => {
  const params = useParams<params>();
  const curFloor = useRecoilValue(curFloorState);
  const curDate = useRecoilValue(curDateState);
  const setNewEvent = useSetRecoilState(newEventState);

  const timeTable = (() => {
    const temp: string[] = [];
    for (let i = START_TIME; i <= END_TIME; i++) {
      temp.push(i + ':00');
    }
    return temp;
  })();

  const setNewEventHandler: MouseEventHandler<Element> = e => {
    const calendarId = params.calId;
    const date = curDate;
    const floor = curFloor;
    const [startTime, room] = e.currentTarget.id.split('-');
    const endTime = startTime + 1;

    setNewEvent(pre => ({
      ...pre,
      calendarId: calendarId.slice(1),
      start: date + 'T' + startTime + ':00Z',
      end: date + 'T' + endTime + ':00Z',
      location: floor + '층 ' + room,
    }));
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
                <td key={index} id={time + '-' + room} onClick={setNewEventHandler}></td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;

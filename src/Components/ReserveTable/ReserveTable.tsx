import { MouseEventHandler } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { curDateState, curFloorState, isOpenState, newEventState } from 'state/state';
import { DefaultProps } from 'const/type';
import { COLORS, TIME_TABLE } from 'const/const';
import StyledMeetingSummary from 'Components/MeetingSummary/MeetingSummary.style';
import { useEffect } from 'react';
import addPrefix0 from 'module/addPrefix0';

interface props extends DefaultProps {
  rooms: string[];
  curTime: Date;
}

const ReserveTable = ({ className, rooms }: props) => {
  const curFloor = useRecoilValue(curFloorState);
  const curDate = useRecoilValue(curDateState);
  const setNewEvent = useSetRecoilState(newEventState);
  const setIsOpen = useSetRecoilState(isOpenState);

  const today =
    new Date().getFullYear() +
    '-' +
    addPrefix0(new Date().getMonth() + 1) +
    '-' +
    addPrefix0(new Date().getDate());
  const curHour = addPrefix0(new Date().getHours());
  const curMin = addPrefix0(new Date().getMinutes());

  const setNewEventHandler: MouseEventHandler<Element> = e => {
    const target = e.target as Element;

    if (target.matches('article, article *')) return;
    if (curDate < today) return;
    if (curDate === today && target.id.slice(0, 5) < curHour + ':' + curMin) return;

    setNewEvent(pre => ({
      ...pre,
      calendarId: 'primary',
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

  useEffect(() => {
    const $table = document.querySelector('table');
    const $td = $table?.querySelectorAll('td');

    $td?.forEach(td => {
      if (curDate < today) {
        td.setAttribute('style', 'background-color: rgba(219, 216, 216, 0.2); cursor: not-allowed');
      } else if (curDate === today && td.id.slice(0, 5) < curHour + ':' + curMin) {
        td.setAttribute('style', 'background-color: rgba(219, 216, 216, 0.2); cursor: not-allowed');
      }
    });

    return () => {
      const $table = document.querySelector('table');
      const $td = $table?.querySelectorAll('td');

      $td?.forEach(td => {
        td.setAttribute('style', `background-color: ${COLORS.GRAY_LEVEL_1}`);
      });
    };
  });

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

export default ReserveTable;

import { TIME_TABLE } from 'const/const';
import createEndTimes from 'module/createEndTimes';
import { ChangeEventHandler } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { newEventState, renderEventsState, roomsState } from 'state/state';

const NewEventTable = () => {
  const renderEvents = useRecoilValue(renderEventsState);
  const rooms = useRecoilValue(roomsState);
  const [newEvent, setNewEvent] = useRecoilState(newEventState);
  const { floor, room, startDate, startTime, endTime } = newEvent;

  const changeEndTime: ChangeEventHandler<HTMLSelectElement> = e => {
    setNewEvent(pre => ({ ...pre, endTime: e.currentTarget.value }));
  };

  return (
    <table>
      <tbody>
        <tr>
          <th>장소</th>
          <td>
            <select name="floorForNewEvent" id="floorForNewEvent" value={floor}>
              {rooms.map(rooms => {
                return <option value={rooms.floor}>{rooms.floor}</option>;
              })}
            </select>
            <span>층 </span>
            <select name="roomForNewEvent" id="roomForNewEvent" value={room}>
              {rooms
                .find(room => room.floor === +floor)
                ?.roomsPerFloor.map((room, index) => {
                  return (
                    <option value={room} key={room + index}>
                      {room}
                    </option>
                  );
                })}
            </select>
          </td>
        </tr>
        <tr>
          <th>날짜</th>
          <td>
            <label htmlFor="startDateForNewEvent" className="a11y-hidden"></label>
            <input id="startDateForNewEvent" type="date" value={startDate} />
          </td>
        </tr>
        <tr>
          <th>시작</th>
          <td>
            <select name="startTime" id="startTimeForNewEvent" value={startTime}>
              {TIME_TABLE.map(time => {
                return (
                  <option value={time} key={time}>
                    {time}
                  </option>
                );
              })}
            </select>
          </td>
        </tr>
        <tr>
          <th>종료</th>
          <td>
            {
              <select name="endTime" id="newEventEndTime" value={endTime} onChange={changeEndTime}>
                {createEndTimes(startTime, renderEvents, floor, room).map(time => (
                  <option key={time}>{time}</option>
                ))}
              </select>
            }
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default NewEventTable;

import meetingApi from 'api/db/meetingApi';
import { TIME_TABLE } from 'const/const';
import { Events } from 'const/type';
import addPrefix0 from 'module/addPrefix0';
import compareStartTimeWithEvents from 'module/compareStartTimeWithEvents';
import createEndTimes from 'module/createEndTimes';
import createEventsFromAsyncRes from 'module/createEventsFromAsyncRes';
import { useState } from 'react';
import { useEffect } from 'react';
import { ChangeEventHandler } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { newEventState, renderEventsState, roomsState } from 'state/state';

const NewEventTable = () => {
  const renderEvents = useRecoilValue(renderEventsState);
  const rooms = useRecoilValue(roomsState);
  const [newEvent, setNewEvent] = useRecoilState(newEventState);
  const { floor, room, startDate, startTime, endTime } = newEvent;

  const [reservedEvents, setReservedEvents] = useState<Events>([]);
  const [startTimes, setStartTimes] = useState<string[]>([]);
  const [endTimes, setEndTimes] = useState<string[]>([]);
  const [today, setToday] = useState('');

  const changeFloorHandler: ChangeEventHandler<HTMLSelectElement> = e => {
    const firstRoomPerFloor = rooms.find(room => room.floor === +e.currentTarget.value)
      ?.roomsPerFloor[0];
    setNewEvent(pre => ({ ...pre, floor: e.currentTarget.value, room: firstRoomPerFloor! }));
  };
  const changeRoomHandler: ChangeEventHandler<HTMLSelectElement> = e => {
    setNewEvent(pre => ({ ...pre, room: e.currentTarget.value }));
  };
  const changeDateHandler: ChangeEventHandler<HTMLInputElement> = async e => {
    const date = e.currentTarget.value;
    const res = await meetingApi.get(date);
    const meetings = res.data.meetings;

    if (meetings) setReservedEvents([...createEventsFromAsyncRes(meetings)]);
    else setReservedEvents([]);

    setNewEvent(pre => ({
      ...pre,
      startDate: date,
      endDate: date,
    }));
  };
  const changeStartTimeHandler: ChangeEventHandler<HTMLSelectElement> = e => {
    setNewEvent(pre => ({
      ...pre,
      startTime: e.currentTarget.value,
      endTime:
        e.currentTarget.value >= endTime
          ? e.currentTarget.value.slice(3, 5) === '00'
            ? +e.currentTarget.value.slice(0, 2) + ':30'
            : +e.currentTarget.value.slice(0, 2) + 1 + ':00'
          : pre.endTime,
    }));
  };
  const changeEndTimeHandler: ChangeEventHandler<HTMLSelectElement> = e => {
    setNewEvent(pre => ({ ...pre, endTime: e.currentTarget.value }));
  };

  useEffect(() => {
    const date = new Date();
    const curYear = date.getFullYear();
    const curMonth = addPrefix0(date.getMonth() + 1);
    const curDate = addPrefix0(date.getDate());
    setToday(curYear + '-' + curMonth + '-' + curDate);
    setReservedEvents([...renderEvents]);
  }, []);

  useEffect(() => {
    const date = new Date();
    const curYear = date.getFullYear();
    const curMonth = addPrefix0(date.getMonth() + 1);
    const curDate = addPrefix0(date.getDate());
    const curHour = addPrefix0(date.getHours());
    const curMinute = addPrefix0(date.getMinutes());

    const reservedRooms = reservedEvents.filter(
      ({ location }) => location === floor + '층 ' + room,
    );
    const times = TIME_TABLE.filter(
      time => typeof compareStartTimeWithEvents(time, reservedRooms) === 'string',
    );

    if (startDate === curYear + '-' + curMonth + '-' + curDate) {
      const nextTimes = times.filter(time => time > curHour + ':' + curMinute);
      setStartTimes([...nextTimes]);
    } else {
      setStartTimes([...times]);
    }
  }, [startDate, floor, room, reservedEvents]);

  useEffect(() => {
    setEndTimes(createEndTimes(startTime, renderEvents, floor, room));
  }, [startTime]);

  return (
    <table>
      <tbody>
        <tr>
          <th>장소</th>
          <td>
            <select
              name="floorForNewEvent"
              id="floorForNewEvent"
              value={floor}
              onChange={changeFloorHandler}
            >
              {rooms.map((rooms, index) => {
                return (
                  <option value={rooms.floor} key={rooms.floor + index}>
                    {rooms.floor}
                  </option>
                );
              })}
            </select>
            <span>층 </span>
            <select
              name="roomForNewEvent"
              id="roomForNewEvent"
              value={room}
              onChange={changeRoomHandler}
            >
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
            <input
              id="startDateForNewEvent"
              type="date"
              value={startDate}
              onChange={changeDateHandler}
              min={today}
            />
          </td>
        </tr>
        <tr>
          <th>시작</th>
          <td>
            <select
              name="startTime"
              id="startTimeForNewEvent"
              value={startTime}
              onChange={changeStartTimeHandler}
            >
              {startTimes.map(time => {
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
              <select
                name="endTime"
                id="newEventEndTime"
                value={endTime}
                onChange={changeEndTimeHandler}
              >
                {endTimes.map(time => (
                  <option value={time} key={time}>
                    {time}
                  </option>
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

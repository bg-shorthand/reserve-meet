import meetingApi from 'api/db/meetingApi';
import Select from 'Components/Select/Select';
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
import { newEventState, renderEventsState, roomsState, viewEventIdState } from 'state/state';

const NewEventTable = () => {
  const renderEvents = useRecoilValue(renderEventsState);
  const rooms = useRecoilValue(roomsState);
  const viewEventId = useRecoilValue(viewEventIdState);
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
    setReservedEvents([...renderEvents.filter(event => event.id !== viewEventId)]);
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
    setEndTimes(createEndTimes(startTime, reservedEvents, floor, room));
  }, [floor, reservedEvents, room, startTime]);

  return (
    <table>
      <tbody>
        <tr>
          <th>장소</th>
          <td>
            <Select
              id="floorForNewEvnet"
              value={floor}
              list={rooms.map(room => room.floor + '')}
              onChange={changeFloorHandler}
            />
            <span>층 </span>
            <Select
              id="roomForNewEvent"
              value={room}
              list={rooms.find(room => room.floor === +floor)?.roomsPerFloor!}
              onChange={changeRoomHandler}
            />
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
            <Select
              id="startTimeForNewEvent"
              value={startTime}
              list={startTimes}
              onChange={changeStartTimeHandler}
            />
          </td>
        </tr>
        <tr>
          <th>종료</th>
          <td>
            <Select
              id="newEventEndTime"
              value={endTime}
              list={endTimes}
              onChange={changeEndTimeHandler}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default NewEventTable;

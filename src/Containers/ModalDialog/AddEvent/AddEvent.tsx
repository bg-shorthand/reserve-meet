import { useState, useEffect, ChangeEventHandler, MouseEventHandler } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  eventsState,
  isOpenState,
  newEventState,
  renderEventsState,
  roomsState,
  userState,
} from 'state/state';
import { calendarApi } from 'api/googleLib/calendarApi';
import { DefaultProps, Events, newEvent } from 'const/type';
import ModalDialog from 'Components/ModalDialog/ModalDialog';
import StyledSearchUser from 'Components/SearchUser/SearchUser.style';
import createEventsFromAsyncRes from 'module/createEventsFromAsyncRes';
import StyledCloseButton from 'Components/CloseButton/CloseButton.style';
import StyledButton from 'Components/Button/Button.style';
import createEndTimes from 'module/createEndTimes';
import { TIME_TABLE } from 'const/const';

const AddEvent = ({ className }: DefaultProps) => {
  const renderEvents = useRecoilValue(renderEventsState);
  const rooms = useRecoilValue(roomsState);
  const setEvents = useSetRecoilState(eventsState);
  const [isOpen, setIsOpen] = useRecoilState(isOpenState);
  const [newEvent, setNewEvent] = useRecoilState(newEventState);
  const { floor, room, startDate, startTime, endTime } = newEvent;

  const curUser = useRecoilValue(userState);
  const [attendants, setAttendants] = useState<{ name: string; events: Events }[]>([]);

  const setSummaryHandler: ChangeEventHandler<HTMLInputElement> = e => {
    setNewEvent(pre => ({ ...pre, summary: e.currentTarget.value }));
  };
  const setDescriptionHandler: ChangeEventHandler<HTMLTextAreaElement> = e => {
    setNewEvent(pre => ({ ...pre, description: e.currentTarget.value }));
  };
  const deleteAttendanthandler: MouseEventHandler<HTMLButtonElement> = e => {
    const target = e.target as Element;
    if (target.closest('li')) {
      setAttendants(pre => pre.filter(user => user.name !== target.closest('li')?.id));
    }
  };
  const changeEndTime: ChangeEventHandler<HTMLSelectElement> = e => {
    setNewEvent(pre => ({ ...pre, endTime: e.currentTarget.value }));
  };
  const insertNewEvent = async (newEvent: newEvent) => {
    setIsOpen(pre => ({ ...pre, spinner: true }));
    const temp = await calendarApi.insertEvent(newEvent);
    if (temp && temp.data) {
      const res = temp.data;
      const newEvents = createEventsFromAsyncRes([res]);
      setEvents(pre => [...pre, ...newEvents]);
      setIsOpen(pre => ({ ...pre, addEvent: false }));
    }
    setIsOpen(pre => ({ ...pre, spinner: false }));
  };
  const setAttendantsHandler = async (email: string) => {
    setIsOpen(pre => ({ ...pre, spinner: true }));
    const start = startDate + 'T' + startTime + ':00+09:00';
    const end = startDate + 'T' + endTime + ':00+09:00';
    const res = await calendarApi.getEvents(email!, start, end);

    if (res && res.result.items) {
      const events = createEventsFromAsyncRes(res.result.items);

      if (attendants.find(user => user.name === email)) return;
      if (events) {
        setAttendants(pre => [...pre, { name: email!, events: events }]);
      }
    }
    setIsOpen(pre => ({ ...pre, spinner: false }));
  };

  useEffect(() => {
    if (isOpen.addEvent) {
      setAttendantsHandler(curUser.email);
    } else {
      setAttendants([]);
    }
    setNewEvent(pre => ({ ...pre, summary: '' }));
  }, [isOpen.addEvent]);

  useEffect(() => {
    setNewEvent(pre => ({ ...pre, attendees: attendants.map(user => ({ email: user.name })) }));
  }, [attendants.length]);

  return isOpen.addEvent ? (
    <ModalDialog className={className}>
      <h1>회의 등록</h1>
      <label htmlFor="newEventSummary" className="a11y-hidden">
        회의 이름
      </label>
      <input
        type="text"
        id="newEventSummary"
        placeholder="회의 이름 (ex. 웹개발2팀 세미나)"
        onChange={setSummaryHandler}
      />
      <label htmlFor="newEventDiscription"></label>
      <textarea
        name="newEventDiscription"
        id="newEventDiscription"
        rows={10}
        placeholder="회의 내용"
        onChange={setDescriptionHandler}
      />
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
                <select
                  name="endTime"
                  id="newEventEndTime"
                  value={endTime}
                  onChange={changeEndTime}
                >
                  {createEndTimes(startTime, renderEvents, floor, room).map(time => (
                    <option key={time}>{time}</option>
                  ))}
                </select>
              }
            </td>
          </tr>
        </tbody>
      </table>
      <StyledSearchUser setList={setAttendantsHandler} />
      <ul>
        {attendants.map(user => {
          const { name, events } = user;

          return (
            <li key={name} id={name} className={events.length ? 'imposible' : ''}>
              <p>
                {name}{' '}
                {events.length ? (
                  <span>{`(${events[0].summary} ${events[0].startTime}~${events[0].endTime})`}</span>
                ) : null}
              </p>
              <StyledCloseButton onClick={deleteAttendanthandler} />
            </li>
          );
        })}
      </ul>
      <StyledButton
        disabled={newEvent.summary && !attendants.find(user => user.events.length) ? false : true}
        onClick={() => {
          insertNewEvent(newEvent);
        }}
      >
        {newEvent.summary
          ? !attendants.find(user => user.events.length)
            ? '등록'
            : '참석 불가한 인원이 있습니다.'
          : '회의 이름을 입력하세요'}
      </StyledButton>
    </ModalDialog>
  ) : null;
};

export default AddEvent;

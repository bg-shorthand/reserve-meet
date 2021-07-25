import { useState, useEffect, ChangeEventHandler } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { eventsState, isOpenState, newEventState, renderEventsState } from 'state/state';
import { calendarApi } from 'api/calendarApi';
import { END_TIME } from 'const/const';
import { DefaultProps, Events, newEvent } from 'const/type';
import ModalDialog from 'Components/ModalDialog/ModalDialog';
import StyledSearchUser from 'Components/SearchUser/SearchUser.style';
import createEventsFromAsyncRes from 'module/createEventsFromAsyncRes';

const AddEvent = ({ className }: DefaultProps) => {
  const [isOpen, setIsOpen] = useRecoilState(isOpenState);
  const renderEvents = useRecoilValue(renderEventsState);
  const setEvents = useSetRecoilState(eventsState);
  const [newEvent, setNewEvent] = useRecoilState(newEventState);
  const { floor, room, startDate, startTime, endTime } = newEvent;

  const [attendants, setAttendants] = useState<{ name: string; events: Events }[]>([]);

  const endTimes = () => {
    const res: string[] = [];
    let temp = startTime;
    const nextEvent = renderEvents.find(
      event => event.startTime > startTime && event.location === `${floor}층 ${room}`,
    );

    if (nextEvent) {
      while (temp < nextEvent.startTime) {
        const tempHour = temp.slice(0, 2);
        temp = /00$/.test(temp) ? tempHour + ':30' : +tempHour + 1 + ':00';
        res.push(temp);
      }
    } else {
      while (temp < END_TIME + ':00') {
        const tempHour = temp.slice(0, 2);
        temp = /00$/.test(temp) ? tempHour + ':30' : +tempHour + 1 + ':00';
        res.push(temp);
      }
    }

    return res;
  };

  const setSummaryHandler: ChangeEventHandler<HTMLInputElement> = e => {
    setNewEvent(pre => ({ ...pre, summary: e.currentTarget.value }));
  };
  const changeEndTime: ChangeEventHandler<HTMLSelectElement> = e => {
    setNewEvent(pre => ({ ...pre, endTime: e.currentTarget.value }));
  };
  const insertNewEvent = async (newEvent: newEvent) => {
    const temp = await calendarApi.insertEvent(newEvent);
    if (temp && temp.result) {
      const res = temp.result;
      const newEvents = createEventsFromAsyncRes([res]);
      setEvents(pre => [...pre, ...newEvents]);
      setIsOpen(pre => ({ ...pre, addEvent: false }));
    }
  };

  useEffect(() => {
    setAttendants([]);
  }, [isOpen]);

  useEffect(() => {
    setNewEvent(pre => ({ ...pre, attendees: attendants.map(user => ({ email: user.name })) }));
  }, [attendants.length]);

  return isOpen.addEvent ? (
    <ModalDialog className={className}>
      <h1>Add Event</h1>
      <label htmlFor="newEventSummary" className="a11y-hidden">
        회의 이름
      </label>
      <input
        type="text"
        id="newEventSummary"
        placeholder="회의 이름 (ex. 웹개발2팀 세미나)"
        onChange={setSummaryHandler}
      />
      <table>
        <tbody>
          <tr>
            <th>장소</th>
            <td>{`${floor}층 ${room}`}</td>
          </tr>
          <tr>
            <th>날짜</th>
            <td>{startDate}</td>
          </tr>
          <tr>
            <th>시작</th>
            <td>{startTime}</td>
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
                  {endTimes().map(time => (
                    <option key={time}>{time}</option>
                  ))}
                </select>
              }
            </td>
          </tr>
        </tbody>
      </table>
      <StyledSearchUser setAttendants={setAttendants} />
      <ul>
        {attendants.map(user => {
          const { name, events } = user;

          return (
            <li key={name}>
              <p>{name}</p>
              {events.length ? (
                <p>{`${events[0].summary} ${events[0].startTime
                  .split('T')[1]
                  .slice(0, 5)}~${events[0].endTime.split('T')[1].slice(0, 5)}`}</p>
              ) : null}
            </li>
          );
        })}
      </ul>
      <button
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
      </button>
    </ModalDialog>
  ) : null;
};

export default AddEvent;

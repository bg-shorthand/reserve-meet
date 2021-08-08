import { useState, useEffect, ChangeEventHandler, MouseEventHandler } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { eventsState, isOpenState, newEventState, renderEventsState } from 'state/state';
import { calendarApi } from 'api/googleLib/calendarApi';
import { END_TIME } from 'const/const';
import { DefaultProps, Events, newEvent } from 'const/type';
import ModalDialog from 'Components/ModalDialog/ModalDialog';
import StyledSearchUser from 'Components/SearchUser/SearchUser.style';
import createEventsFromAsyncRes from 'module/createEventsFromAsyncRes';
import { ReactComponent as CloseIcon } from 'asset/svg/close.svg';

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
    const temp = await calendarApi.insertEvent(newEvent);
    if (temp && temp.result) {
      const res = temp.result;
      const newEvents = createEventsFromAsyncRes([res]);
      setEvents(pre => [...pre, ...newEvents]);
      setIsOpen(pre => ({ ...pre, addEvent: false }));
    }
  };
  const setAttendantsHandler = async (email: string) => {
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
  };

  useEffect(() => {
    setAttendants([]);
    setNewEvent(pre => ({ ...pre, summary: '' }));
  }, [isOpen.addEvent]);

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
              <button onClick={deleteAttendanthandler}>
                <CloseIcon />
              </button>
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

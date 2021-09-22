import { useState, useEffect, ChangeEventHandler, MouseEventHandler } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { eventsState, isOpenState, newEventState, userState } from 'state/state';
import { calendarApi } from 'api/googleLib/calendarApi';
import { DefaultProps, Events, newEvent } from 'const/type';
import ModalDialog from 'Components/ModalDialog/ModalDialog';
import StyledSearchUser from 'Components/SearchUser/SearchUser.style';
import createEventsFromAsyncRes from 'module/createEventsFromAsyncRes';
import StyledIconButton from 'Components/IconButton/IconButton.style';
import StyledButton from 'Components/Button/Button.style';
import StyledNewEventTable from 'Components/NewEventTable/NewEventTable.style';
import meetingApi from 'api/db/meetingApi';

const AddEvent = ({ className }: DefaultProps) => {
  const curUser = useRecoilValue(userState);
  const setEvents = useSetRecoilState(eventsState);
  const [isOpen, setIsOpen] = useRecoilState(isOpenState);
  const [newEvent, setNewEvent] = useRecoilState(newEventState);
  const { startDate, startTime, endTime, floor, room } = newEvent;

  const [attendants, setAttendants] = useState<{ name: string; events: Events }[]>([]);
  const [hasEventAlert, setHasEventAlert] = useState<Events>([]);

  const setSummaryHandler: ChangeEventHandler<HTMLInputElement> = e => {
    setNewEvent(pre => ({ ...pre, summary: e.currentTarget.value }));
  };
  const setDescriptionHandler: ChangeEventHandler<HTMLTextAreaElement> = e => {
    setNewEvent(pre => ({ ...pre, description: e.currentTarget.value }));
  };
  const deleteAttendantHandler: MouseEventHandler<HTMLButtonElement> = e => {
    const target = e.target as Element;
    if (target.closest('li')) {
      setAttendants(pre => pre.filter(user => user.name !== target.closest('li')?.id));
    }
  };
  const insertNewEvent = async (newEvent: newEvent) => {
    setIsOpen(pre => ({ ...pre, spinner: true }));

    const res = await meetingApi.get(startDate);
    if (res.data) {
      const reservedEvents = createEventsFromAsyncRes(res.data.meetings);
      const hasEvent = reservedEvents
        .filter(event => event.location === floor + '층 ' + room)
        .filter(event => {
          if (event.startTime > startTime) {
            return event.startTime < endTime;
          } else if (event.startTime < startTime) {
            return event.endTime >= endTime;
          } else {
            return true;
          }
        });
      if (hasEvent.length) {
        setHasEventAlert([...hasEvent]);
        setIsOpen(pre => ({ ...pre, spinner: false }));
        return;
      }
    }

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
      setHasEventAlert([]);
    }
    setNewEvent(pre => ({ ...pre, summary: '', description: '' }));
  }, [isOpen.addEvent]);

  useEffect(() => {
    setNewEvent(pre => ({ ...pre, attendees: attendants.map(user => ({ email: user.name })) }));
  }, [attendants]);

  useEffect(() => {
    setIsOpen(pre => ({ ...pre, spinner: true }));
    attendants.forEach(async user => {
      const email = user.name;
      const start = startDate + 'T' + startTime + ':00+09:00';
      const end = startDate + 'T' + endTime + ':00+09:00';
      const res = await calendarApi.getEvents(email!, start, end);

      if (res && res.result.items) {
        const events = createEventsFromAsyncRes(res.result.items);
        if (
          events.filter(event => {
            if (event.startTime > startTime) {
              return event.startTime < endTime;
            } else if (event.startTime < startTime) {
              return event.endTime >= endTime;
            } else {
              return true;
            }
          }).length
        ) {
          return;
        } else {
          setAttendants(pre => pre.map(user => (user.name === email ? { ...user, events } : user)));
        }
      }
    });
    setIsOpen(pre => ({ ...pre, spinner: false }));
  }, [newEvent.startDate, newEvent.startTime, newEvent.endTime]);

  useEffect(() => {
    setHasEventAlert([]);
  }, [newEvent]);

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
      <StyledNewEventTable />
      {hasEventAlert.length ? (
        <>
          <p className="imposible">이미 예약된 회의실입니다.</p>
          <p className="imposible">
            ({hasEventAlert[0].summary} {hasEventAlert[0].startTime}~{hasEventAlert[0].endTime})
          </p>
        </>
      ) : null}
      <StyledSearchUser setList={setAttendantsHandler} />
      <ul>
        {attendants.map(user => {
          const { name, events } = user;

          return (
            <li key={name} id={name}>
              <p>
                {name}{' '}
                {events.length ? (
                  <span className="imposible">{`(${events[0].summary} ${events[0].startTime}~${events[0].endTime})`}</span>
                ) : null}
              </p>
              <StyledIconButton onClick={deleteAttendantHandler} type="del" />
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

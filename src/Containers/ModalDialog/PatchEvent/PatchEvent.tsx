import ModalDialog from 'Components/ModalDialog/ModalDialog';
import { MouseEventHandler, useEffect, useState, ChangeEventHandler } from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import {
  curDateState,
  eventsState,
  isOpenState,
  newEventState,
  viewEventIdState,
} from 'state/state';
import StyledSearchUser from 'Components/SearchUser/SearchUser.style';
import StyledCloseButton from 'Components/CloseButton/CloseButton.style';
import { DefaultProps, Events, newEvent } from 'const/type';
import { calendarApi } from 'api/googleLib/calendarApi';
import createEventsFromAsyncRes from 'module/createEventsFromAsyncRes';
import StyledButton from 'Components/Button/Button.style';

const PatchEvent = ({ className }: DefaultProps) => {
  const isOpen = useRecoilValue(isOpenState).patchEvent;
  const resetIsOpen = useResetRecoilState(isOpenState);
  const eventId = useRecoilValue(viewEventIdState);
  const [newEvent, setNewEvent] = useRecoilState(newEventState);
  const { summary, description, floor, room, startDate, startTime, endTime, attendees } = newEvent;
  const setEvents = useSetRecoilState(eventsState);
  const curDate = useRecoilValue(curDateState);

  const [attendants, setAttendants] = useState<{ name: string; events: Events }[]>([]);

  const deleteAttendanthandler: MouseEventHandler<HTMLButtonElement> = e => {
    const target = e.target as Element;
    if (target.closest('li')) {
      setAttendants(pre => pre.filter(user => user.name !== target.closest('li')?.id));
    }
  };
  const changeSummaryHandler: ChangeEventHandler<HTMLInputElement> = e => {
    setNewEvent(pre => ({ ...pre, summary: e.target.value }));
  };
  const changeDescriptionHandler: ChangeEventHandler<HTMLTextAreaElement> = e => {
    setNewEvent(pre => ({ ...pre, description: e.target.value }));
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
  const patchEvent = async (newEvent: newEvent) => {
    const res = await calendarApi.patchEvent(eventId, newEvent, curDate);
    const data = res?.data;
    if (data) {
      const newEvents = createEventsFromAsyncRes(data.meetings);
      setEvents([...newEvents]);
      resetIsOpen();
    }
  };

  useEffect(() => {
    if (attendees) {
      setAttendants(attendees.map(user => ({ name: user.email, events: [] })));
    }

    return () => {
      setAttendants([]);
    };
  }, [isOpen]);

  useEffect(() => {
    setNewEvent(pre => ({ ...pre, attendees: attendants.map(user => ({ email: user.name })) }));
  }, [attendants.length]);

  return isOpen ? (
    <ModalDialog className={className}>
      <h1>Patch Event</h1>
      <label htmlFor="newEventSummary" className="a11y-hidden">
        회의 이름
      </label>
      <input
        type="text"
        id="newEventSummary"
        placeholder="회의 이름 (ex. 웹개발2팀 세미나)"
        value={summary}
        onChange={changeSummaryHandler}
      />
      <label htmlFor="newEventDiscription"></label>
      <textarea
        name="newEventDiscription"
        id="newEventDiscription"
        rows={10}
        placeholder="회의 내용"
        value={description}
        onChange={changeDescriptionHandler}
      />
      <table>
        <tbody>
          <tr>
            <th>장소</th>
            <td>{`${floor} ${room}`}</td>
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
            <td>{endTime}</td>
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
          patchEvent(newEvent);
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

export default PatchEvent;

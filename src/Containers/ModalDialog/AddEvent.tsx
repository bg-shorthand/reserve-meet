import { calendarApi } from 'api/calendarApi';
import ModalDialog from 'Components/ModalDialog/ModalDialog';
import { END_TIME } from 'const/const';
import { newEvent } from 'const/type';
import { ChangeEventHandler } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { eventsState, isOpenState, newEventState } from 'state/state';

const AddEvent = () => {
  const [isOpen, setIsOpen] = useRecoilState(isOpenState);
  const setEvents = useSetRecoilState(eventsState);
  const [newEvent, setNewEvent] = useRecoilState(newEventState);
  const { floor, room, startDate, startTime, endDate, endTime } = newEvent;

  const endTimes = () => {
    const res: string[] = [];
    const start = +startTime.slice(0, 2);
    for (let i = start + 1; i <= END_TIME + 1; i++) {
      res.push(i + ':00');
    }
    return res;
  };

  const setSummaryHandler: ChangeEventHandler<HTMLInputElement> = e => {
    setNewEvent(pre => ({ ...pre, summary: e.currentTarget.value }));
  };
  const changeendTime: ChangeEventHandler<HTMLSelectElement> = e => {
    setNewEvent(pre => ({ ...pre, endTime: e.currentTarget.value }));
  };
  const insertNewEvent = async (newEvent: newEvent) => {
    const res = await calendarApi.insertEvent(newEvent);
    console.log(res);
    if (res && res.result) {
      setIsOpen(pre => ({ ...pre, addEvent: false }));
      const { id, summary, location, start } = res?.result;
      setEvents(pre => [
        ...pre,
        {
          id: id ? id : '',
          summary: summary ? summary : '',
          location: location ? location : '',
          date: start ? (start.dateTime ? start.dateTime.slice(0, 10) : '') : '',
          time: start ? (start.dateTime ? start.dateTime.slice(11, 17) : '') : '',
        },
      ]);
    }
  };

  return isOpen.addEvent ? (
    <ModalDialog>
      <h1>Add Event</h1>
      <label htmlFor="newEventSummary">회의 이름</label>
      <input
        type="text"
        id="newEventSummary"
        placeholder="ex) 웹개발2팀 세미나"
        onChange={setSummaryHandler}
      />
      <p>{`장소: ${floor}층 ${room}`}</p>
      <p>{`시작: ${startDate}, ${startTime}`}</p>
      <p>
        {`종료: ${endDate}`}
        <select name="endTime" id="newEventEndTime" value={endTime} onChange={changeendTime}>
          {endTimes().map(time => (
            <option key={time}>{time}</option>
          ))}
        </select>
      </p>
      <button
        onClick={() => {
          insertNewEvent(newEvent);
        }}
      >
        등록
      </button>
    </ModalDialog>
  ) : null;
};

export default AddEvent;

import { calendarApi } from 'api/calendarApi';
import ModalDialog from 'Components/ModalDialog/ModalDialog';
import { END_TIME } from 'const/const';
import { DefaultProps, newEvent } from 'const/type';
import { ChangeEventHandler } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { eventsState, isOpenState, newEventState, renderEventsState, userState } from 'state/state';

const AddEvent = ({ className }: DefaultProps) => {
  const [isOpen, setIsOpen] = useRecoilState(isOpenState);
  const curUser = useRecoilValue(userState);
  const renderEvents = useRecoilValue(renderEventsState);
  const setEvents = useSetRecoilState(eventsState);
  const [newEvent, setNewEvent] = useRecoilState(newEventState);
  const { floor, room, startDate, startTime, endDate, endTime } = newEvent;

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
  const changeendTime: ChangeEventHandler<HTMLSelectElement> = e => {
    setNewEvent(pre => ({ ...pre, endTime: e.currentTarget.value }));
  };
  const insertNewEvent = async (newEvent: newEvent) => {
    const temp = await calendarApi.insertEvent(newEvent);
    if (temp && temp.result) {
      setIsOpen(pre => ({ ...pre, addEvent: false }));
      const { id, summary, location, start, end } = temp?.result;
      setEvents(pre => [
        ...pre,
        {
          id: id ? id : '',
          summary: summary ? summary : '',
          location: location ? location : '',
          date: start ? (start.dateTime ? start.dateTime.slice(0, 10) : '') : '',
          startTime: start ? (start.dateTime ? start.dateTime.slice(11, 16) : '') : '',
          endTime: end ? (end.dateTime ? end.dateTime.slice(11, 16) : '') : '',
          creatorEmail: curUser.email,
        },
      ]);
    }
  };

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
                  onChange={changeendTime}
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

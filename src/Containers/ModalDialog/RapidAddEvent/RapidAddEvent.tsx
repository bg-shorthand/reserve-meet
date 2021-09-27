import meetingApi from 'api/db/meetingApi';
import { calendarApi } from 'api/googleLib/calendarApi';
import StyledButton from 'Components/Button/Button.style';
import ModalDialog from 'Components/ModalDialog/ModalDialog';
import { TIME_TABLE } from 'const/const';
import { DefaultProps } from 'const/type';
import addPrefix0 from 'module/addPrefix0';
import createEventsFromAsyncRes from 'module/createEventsFromAsyncRes';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { MouseEventHandler } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  alertContentState,
  curDateState,
  curFloorState,
  eventsState,
  floorsState,
  isOpenState,
  roomsState,
} from 'state/state';

const RapidAddEvent = ({ className }: DefaultProps) => {
  const [isOpen, setIsOpen] = useRecoilState(isOpenState);
  const curDate = useRecoilValue(curDateState);
  const curFloor = useRecoilValue(curFloorState);
  const floors = useRecoilValue(floorsState);
  const setAlertContent = useSetRecoilState(alertContentState);
  const setEvents = useSetRecoilState(eventsState);
  const rooms = useRecoilValue(roomsState);

  const [reserveSummary, setReserveSummary] = useState('');
  const [reserveDate, setReserveDate] = useState('');
  const [reserveFloor, setReserveFloor] = useState('');

  const setSummaryHandler: ChangeEventHandler<HTMLInputElement> = e => {
    setReserveSummary(e.currentTarget.value);
  };
  const setDateHandler: ChangeEventHandler<HTMLInputElement> = e => {
    setReserveDate(e.currentTarget.value);
  };
  const setFloorHandler: ChangeEventHandler<HTMLSelectElement> = e => {
    setReserveFloor(e.currentTarget.value);
  };
  const setNewEventAndOpenAlertHandler: MouseEventHandler<HTMLButtonElement> = async () => {
    const res = await meetingApi.get(reserveDate);

    if (!res.data.meetings) {
      const temp = new Date();
      const today =
        temp.getFullYear() +
        '-' +
        addPrefix0(temp.getMonth() + 1) +
        '-' +
        addPrefix0(temp.getDate());
      const curHour = addPrefix0(temp.getHours());
      const curMin = addPrefix0(temp.getMinutes());

      const posibleTimes =
        curDate === today ? TIME_TABLE.filter(time => time > curHour + ':' + curMin) : TIME_TABLE;

      const reserveRoom = rooms.find(v => v.floor === curFloor)?.roomsPerFloor[0];

      if (posibleTimes.length) {
        setAlertContent(() => ({
          content: `${posibleTimes[0]}부터 30분간 ${reserveRoom}에 회의를 예약합니다`,
          yesEvent: async () => {
            const temp = await calendarApi.insertEvent({
              calendarId: 'primary',
              summary: reserveSummary,
              description: '',
              startDate: reserveDate,
              startTime: posibleTimes[0],
              endDate: reserveDate,
              endTime:
                posibleTimes[0].split(':')[1] === '00'
                  ? posibleTimes[0].replace('00', '30')
                  : +posibleTimes[0].split(':')[0] + 1 + ':00',
              attendees: [],
              floor: reserveFloor,
              room: reserveRoom!,
            });
            if (temp && temp.data) {
              const res = temp.data;
              const newEvents = createEventsFromAsyncRes([res]);
              setEvents(pre => [...pre, ...newEvents]);
            }
          },
        }));
      } else {
        setAlertContent({ content: '예약 가능한 회의실이 없습니다', yesEvent: null });
      }

      setIsOpen(pre => ({ ...pre, alert: true, rapidAddEvent: false }));
      return;
    }

    const meetings = createEventsFromAsyncRes(res.data.meetings);

    if (meetings) {
      const temp = new Date();
      const today =
        temp.getFullYear() +
        '-' +
        addPrefix0(temp.getMonth() + 1) +
        '-' +
        addPrefix0(temp.getDate());
      const curHour = addPrefix0(temp.getHours());
      const curMin = addPrefix0(temp.getMinutes());

      const meetingsOfCurFloor = meetings.filter(
        meeting => meeting.location.split(' ')[0] === reserveFloor + '층',
      );
      const posibleTimes = meetingsOfCurFloor.length
        ? TIME_TABLE.filter(time => {
            if (curDate === today) {
              return (
                time > curHour + ':' + curMin &&
                meetingsOfCurFloor.filter(
                  meeting => meeting.startTime <= time && meeting.endTime > time,
                ).length <
                  meetingsOfCurFloor.filter((meeting, index, arr) => {
                    const temp = arr.find(v => v.location === meeting.location);
                    if (temp) return arr.indexOf(temp) === index;
                    else return false;
                  }).length
              );
            } else {
              return (
                meetingsOfCurFloor.filter(
                  meeting => meeting.startTime <= time && meeting.endTime > time,
                ).length <
                meetingsOfCurFloor.filter((meeting, index, arr) => {
                  const temp = arr.find(v => v.location === meeting.location);
                  if (temp) return arr.indexOf(temp) === index;
                  else return false;
                }).length
              );
            }
          })
        : curDate === today
        ? TIME_TABLE.filter(time => time > curHour + ':' + curMin)
        : TIME_TABLE;

      const reserveRoom = meetingsOfCurFloor.length
        ? meetingsOfCurFloor
            .filter(
              meeting =>
                !(meeting.startTime <= posibleTimes[0] && meeting.endTime > posibleTimes[0]),
            )[0]
            .location.split(' ')[1]
        : rooms.find(v => v.floor === curFloor)?.roomsPerFloor[0];

      if (posibleTimes.length) {
        setAlertContent(() => ({
          content: `${posibleTimes[0]}부터 30분간 ${reserveRoom}에 회의를 예약합니다`,
          yesEvent: async () => {
            const temp = await calendarApi.insertEvent({
              calendarId: 'primary',
              summary: reserveSummary,
              description: '',
              startDate: reserveDate,
              startTime: posibleTimes[0],
              endDate: reserveDate,
              endTime:
                posibleTimes[0].split(':')[1] === '00'
                  ? posibleTimes[0].replace('00', '30')
                  : +posibleTimes[0].split(':')[0] + 1 + ':00',
              attendees: [],
              floor: reserveFloor,
              room: reserveRoom!,
            });
            if (temp && temp.data) {
              const res = temp.data;
              const newEvents = createEventsFromAsyncRes([res]);
              setEvents(pre => [...pre, ...newEvents]);
            }
          },
        }));
      } else {
        setAlertContent({ content: '예약 가능한 회의실이 없습니다', yesEvent: null });
      }

      setIsOpen(pre => ({ ...pre, alert: true, rapidAddEvent: false }));
    }
  };

  useEffect(() => {
    if (isOpen.rapidAddEvent) {
      setReserveDate(curDate);
      setReserveFloor(curFloor + '');
    } else {
      setReserveDate('');
      setReserveFloor('');
      setReserveSummary('');
    }
  }, [isOpen.rapidAddEvent]);

  return isOpen.rapidAddEvent ? (
    <ModalDialog className={className}>
      <h1>빠른 예약</h1>
      <label htmlFor="RapidReserveSummary" className="a11y-hidden">
        제목
      </label>
      <input
        id="RapidReserveSummary"
        type="text"
        placeholder="회의 이름을 입력하세요"
        value={reserveSummary}
        onChange={setSummaryHandler}
      />
      <div>
        <label htmlFor="RapidReserveDate" className="a11y-hidden">
          예약할 날짜
        </label>
        <input id="RapidReserveDate" type="date" value={reserveDate} onChange={setDateHandler} />
        <label htmlFor="RapidReserveFloor" className="a11y-hidden">
          예약할 층
        </label>
        <select id="RapidReserveDate" value={reserveFloor} onChange={setFloorHandler}>
          {floors.map(floor => {
            return (
              <option value={floor} key={floor}>
                {floor}층
              </option>
            );
          })}
        </select>
      </div>
      <StyledButton onClick={setNewEventAndOpenAlertHandler} disabled={!reserveSummary}>
        {reserveSummary ? '등록' : '회의 이름을 입력하세요'}
      </StyledButton>
    </ModalDialog>
  ) : null;
};

export default RapidAddEvent;

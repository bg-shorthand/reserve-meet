import { useState } from 'react';
import { DefaultProps, Events } from 'const/type';
import { useEffect } from 'react';
import { calendarApi } from 'api/calendarApi';
import getDate from 'module/getDate';
import { useRecoilValue } from 'recoil';
import { userState } from 'state/state';
import { useParams } from 'react-router-dom';
import { TIME_TABLE } from 'const/const';

const WeeklySchedule = ({ className }: DefaultProps) => {
  const [events, setEvents] = useState<Events>([]);
  const [curWeek, setCurWeek] = useState(getDate.sundayToSaturday());

  console.log(curWeek);

  const [startAndEnd, setStartAndEnd] = useState(getDate.thisWeek());
  const [start, end] = startAndEnd;
  const curUser = useRecoilValue(userState);

  const params = useParams<{ calId: string }>();
  const email = params.calId ? params.calId : curUser.email;

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    const getEventsThisWeek = async () => {
      clearTimeout(timerId);
      if (email) {
        const res = await calendarApi.getEvents(email, start, end);
        if (res && res.result.items) {
          const newEvents = res.result.items.map((v: any) => ({
            summary: v.summary,
            location: v.location,
            startTime: v.start ? (v.start.dateTime ? v.start.dateTime.slice(11, 16) : '') : '',
            endTime: v.end ? (v.end.dateTime ? v.end.dateTime.slice(11, 16) : '') : '',
            date: v.start ? (v.start.dateTime ? v.start.dateTime.slice(0, 10) : '') : '',
            id: v.id,
            creatorEmail: v.creator?.email,
          }));
          setEvents(newEvents);
        } else {
          timerId = setTimeout(getEventsThisWeek, 100);
        }
      }
    };
    getEventsThisWeek();
  }, [email]);

  return (
    <section className={className}>
      <h1>이번주 일정</h1>
      {events.length ? (
        <ul>
          {events.map(event => {
            return (
              <li
                key={event.id}
              >{`${event.summary}, ${event.location}, ${event.startTime}~${event.endTime}`}</li>
            );
          })}
        </ul>
      ) : null}
      <table>
        <thead>
          <tr>
            <th>시간</th>
            {curWeek.map(date => (
              <th id={date} key={date}>
                {getDate.changeDateToDay(new Date(date))}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TIME_TABLE.map((time, i) => {
            return (
              <tr key={i}>
                <th>{time}</th>
                {curWeek.map(date => (
                  <td id={date.slice(0, 10) + 'T' + time} key={date}></td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default WeeklySchedule;

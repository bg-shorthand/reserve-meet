import { DefaultProps } from 'const/type';
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { curDateState, eventsState, renderEventsState, userState } from 'state/state';
import { ReactComponent as CloseIcon } from 'asset/svg/close.svg';
import { MouseEventHandler } from 'react';
import { calendarApi } from 'api/calendarApi';
import { useParams } from 'react-router-dom';
import getDate from 'module/getDate';

interface Props extends DefaultProps {
  time: string;
  room: string;
}

const MeetingSummary = ({ time, room, className }: Props) => {
  const [hasMeeting, setHasMeeting] = useState(false);
  const [summary, setSummary] = useState('');
  const [height, setHeight] = useState(0);
  const [isCreator, setIsCreator] = useState(false);
  const [eventId, setEventId] = useState('');

  const renderEvents = useRecoilValue(renderEventsState);
  const curDate = useRecoilValue(curDateState);
  const curUser = useRecoilValue(userState);
  const setEvents = useSetRecoilState(eventsState);

  const params = useParams() as { calId: string };
  const calendarId = params.calId.slice(1);

  const deleteEventHandler: MouseEventHandler<Element> = async e => {
    const eventId = e.currentTarget.closest('article')?.id;
    await calendarApi.deleteEvent(calendarId, eventId || '');

    let timerId: NodeJS.Timeout;

    const getEvents = async () => {
      clearTimeout(timerId);

      const [start, end] = getDate.today(curDate);
      const res = await calendarApi.getEvents(calendarId, start, end);

      if (res && res.result.items) {
        const newEvents = res.result.items.map(
          ({ id, summary, location, start, end, creator }) => ({
            id: id || '',
            summary: summary || '',
            location: location || '',
            date: start?.dateTime?.slice(0, 10) || '',
            startTime: start?.dateTime?.slice(11, 16) || '',
            endTime: end?.dateTime?.slice(11, 16) || '',
            creatorEmail: creator?.email || '',
          }),
        );
        setEvents([...newEvents]);
      } else {
        timerId = setTimeout(getEvents, 100);
      }
    };
    getEvents();
  };

  useEffect(() => {
    const event = renderEvents.find(
      ({ startTime, location }) => startTime === time && location.split(' ')[1] === room,
    );
    if (event) {
      if (event.creatorEmail === curUser.email) setIsCreator(true);

      const startHour = +event.startTime.split(':')[0] * 60;
      const startMin = +event.startTime.split(':')[1];
      const endHour = +event.endTime.split(':')[0] * 60;
      const endMin = +event.endTime.split(':')[1];

      setHeight(((endHour + endMin - startHour - startMin) / 30) * 35 + 1);

      setHasMeeting(true);
      setSummary(event.summary);
      setEventId(event.id);
    }

    return () => {
      setHasMeeting(false);
    };
  }, [renderEvents, room, setHeight, time]);

  return hasMeeting ? (
    <article className={className} style={{ height: height + 'px' }} id={eventId}>
      {summary}
      {isCreator ? (
        <button onClick={deleteEventHandler}>
          <CloseIcon />
        </button>
      ) : null}
    </article>
  ) : null;
};

export default MeetingSummary;

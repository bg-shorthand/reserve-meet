import { useEffect, useState } from 'react';
import { MouseEventHandler } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  curDateState,
  eventsState,
  isOpenState,
  renderEventsState,
  userState,
  viewEventIdState,
} from 'state/state';
import { calendarApi } from 'api/calendarApi';
import { DefaultProps } from 'const/type';
import { ReactComponent as CloseIcon } from 'asset/svg/close.svg';
import getEventsAsync from 'module/getEventsAsync';

interface Props extends DefaultProps {
  time: string;
  room: string;
}

const MeetingSummary = ({ time, room, className }: Props) => {
  const [hasMeeting, setHasMeeting] = useState(false);
  const [summary, setSummary] = useState('');
  const [isCreator, setIsCreator] = useState(false);
  const [eventId, setEventId] = useState('');

  const renderEvents = useRecoilValue(renderEventsState);
  const curDate = useRecoilValue(curDateState);
  const curUser = useRecoilValue(userState);
  const setEvents = useSetRecoilState(eventsState);
  const setIsOpen = useSetRecoilState(isOpenState);
  const setViewEventId = useSetRecoilState(viewEventIdState);

  const params = useParams() as { calId: string };
  const calendarId = params.calId.slice(1);

  const deleteEventHandler: MouseEventHandler<Element> = async e => {
    const eventId = e.currentTarget.closest('article')?.id;
    await calendarApi.deleteEvent(calendarId, eventId || '');

    const newEvents = await getEventsAsync(calendarId, curDate);
    newEvents && setEvents([...newEvents]);
  };
  const openViewEventHandler: MouseEventHandler<Element> = e => {
    const target = e.target as Element;
    if (target.matches('button, button *')) return;

    setViewEventId(eventId);
    setIsOpen(pre => ({ ...pre, viewEvent: true }));
  };

  useEffect(() => {
    const event = renderEvents.find(
      ({ startTime, location }) => startTime === time && location.split(' ')[1] === room,
    );
    if (event) {
      setHasMeeting(true);
      setSummary(event.summary);
      setEventId(event.id);

      if (event.creatorEmail === curUser.email) setIsCreator(true);
    }

    return () => {
      setHasMeeting(false);
    };
  }, [renderEvents, room, time]);

  return hasMeeting ? (
    <article className={className} id={eventId} onClick={openViewEventHandler}>
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

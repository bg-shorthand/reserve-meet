import { useEffect, useState } from 'react';
import { MouseEventHandler } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  curDateState,
  eventsState,
  isOpenState,
  newEventState,
  renderEventsState,
  userState,
  viewEventIdState,
} from 'state/state';
import { calendarApi } from 'api/googleLib/calendarApi';
import { DefaultProps } from 'const/type';
import StyledCloseButton from 'Components/CloseButton/CloseButton.style';
import createEventsFromAsyncRes from 'module/createEventsFromAsyncRes';

interface Props extends DefaultProps {
  time: string;
  room: string;
}

const MeetingSummary = ({ time, room, className }: Props) => {
  const [hasMeeting, setHasMeeting] = useState(false);
  const [summary, setSummary] = useState('');
  const [isCreator, setIsCreator] = useState(false);
  const [isOld, setIsOld] = useState(false);
  const [eventId, setEventId] = useState('');

  const renderEvents = useRecoilValue(renderEventsState);
  const curDate = useRecoilValue(curDateState);
  const curUser = useRecoilValue(userState);
  const setEvents = useSetRecoilState(eventsState);
  const setIsOpen = useSetRecoilState(isOpenState);
  const setViewEventId = useSetRecoilState(viewEventIdState);
  const setNewEvent = useSetRecoilState(newEventState);

  const calendarId = 'primary';

  const deleteEventHandler: MouseEventHandler<Element> = async e => {
    const eventId = e.currentTarget.closest('article')?.id;
    const res = await calendarApi.deleteEvent(calendarId, eventId!, curDate);

    if (res) {
      const data = await res.data;
      const newEvents = createEventsFromAsyncRes(data.meetings);
      data && setEvents([...newEvents]);
    }
  };
  const openViewEventHandler: MouseEventHandler<Element> = e => {
    const target = e.target as Element;
    if (target.matches('button, button *')) return;

    setNewEvent(pre => ({ ...pre, calendarId, summary }));
    setViewEventId(eventId);
    setIsOpen(pre => ({ ...pre, viewEvent: true }));
  };

  useEffect(() => {
    const event = renderEvents.find(
      ({ startTime, location }) => startTime === time && location.split(' ')[1] === room,
    );
    if (event) {
      setIsOpen(pre => ({ ...pre, spinner: true }));
      setHasMeeting(true);
      setSummary(event.summary);
      setEventId(event.id);
      setIsCreator(event.creatorEmail === curUser.email);

      const cur = new Date(new Date().getTime() + 1000 * 60 * 60 * 9).toISOString();
      const curDate = cur.slice(0, 10);
      const curTime = cur.slice(11, 16);
      if (event.date < curDate) setIsOld(true);
      else if (event.date === curDate && event.startTime < curTime) setIsOld(true);
      setIsOpen(pre => ({ ...pre, spinner: false }));
    }

    return () => {
      setHasMeeting(false);
    };
  }, [renderEvents, room, time, curUser.email]);

  return hasMeeting ? (
    <article className={className} id={eventId} onClick={openViewEventHandler}>
      <h1>{summary}</h1>
      {!isOld && isCreator ? <StyledCloseButton onClick={deleteEventHandler} /> : null}
    </article>
  ) : null;
};

export default MeetingSummary;

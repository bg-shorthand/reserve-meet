import { DefaultProps } from 'const/type';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { renderEventsState } from 'state/state';

interface Props extends DefaultProps {
  time: string;
  room: string;
}

const MeetingSummary = ({ time, room, className }: Props) => {
  const [hasMeeting, setHasMeeting] = useState(false);
  const [summary, setSummary] = useState('');
  const [height, setHeight] = useState(0);
  const renderEvents = useRecoilValue(renderEventsState);

  useEffect(() => {
    const event = renderEvents.find(
      ({ startTime, location }) => startTime === time && location.split(' ')[1] === room,
    );
    if (event) {
      const startHour = +event.startTime.split(':')[0] * 60;
      const startMin = +event.startTime.split(':')[1];
      const endHour = +event.endTime.split(':')[0] * 60;
      const endMin = +event.endTime.split(':')[1];

      setHeight(((endHour + endMin - startHour - startMin) / 30) * 35 + 1);

      setHasMeeting(true);
      setSummary(event.summary);
    }

    return () => {
      setHasMeeting(false);
    };
  }, [renderEvents, room, setHeight, time]);

  return hasMeeting ? (
    <article className={className} style={{ height: height + 'px' }}>
      {summary}
    </article>
  ) : null;
};

export default MeetingSummary;

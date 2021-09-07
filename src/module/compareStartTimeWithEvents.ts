import { Events } from 'const/type';

const compareStartTimeWithEvents = (time: string, events: Events) => {
  const reservedEvent = events.filter(
    ({ startTime, endTime }) => startTime <= time && endTime > time,
  );
  return reservedEvent.length ? reservedEvent[0] : time;
};

export default compareStartTimeWithEvents;

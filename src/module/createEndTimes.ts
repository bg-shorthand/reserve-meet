import { END_TIME } from 'const/const';
import { Events } from 'const/type';

const createEndTimes = (startTime: string, renderEvents: Events, floor: string, room: string) => {
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

export default createEndTimes;

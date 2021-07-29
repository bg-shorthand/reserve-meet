import { atom, selector } from 'recoil';
import { Calendars, Events } from 'const/type';
import createRoomsArray from 'module/createRoomsArray';

const userState = atom({
  key: 'userState',
  default: { name: '', imageUrl: '', email: '' },
});

const calendarListState = atom({
  key: 'calendarList',
  default: [] as Calendars,
});

const curFloorState = atom({
  key: 'curFloorState',
  default: 9,
});

const roomsState = selector({
  key: 'roomsState',
  get: ({ get }) => {
    const curFloor = get(curFloorState);
    return createRoomsArray(curFloor);
  },
});

const current = new Date().getTime() + 1000 * 60 * 60 * 9;

const curDateState = atom({
  key: 'curDatestate',
  default: new Date(current).toISOString().slice(0, 10),
});

const eventsState = atom({
  key: 'eventsState',
  default: [] as Events,
});

const renderEventsState = selector({
  key: 'renderEventsState',
  get: ({ get }) =>
    get(eventsState).filter(
      ({ location, date }) =>
        location &&
        location.match(/^[0-9]+/)![0] === get(curFloorState) + '' &&
        date === get(curDateState),
    ),
});

const viewEventIdState = atom({
  key: 'viewEventIdState',
  default: '',
});

const viewEventState = selector({
  key: 'viewEventState',
  get: ({ get }) => {
    const renderEvents = get(renderEventsState);
    const viewEventId = get(viewEventIdState);

    return renderEvents.find(event => event.id === viewEventId);
  },
});

const newEventState = atom({
  key: 'newEventState',
  default: {
    calendarId: '',
    summary: '',
    description: '',
    floor: '',
    room: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    attendees: [{ email: '' }],
  },
});

const isOpenState = atom({
  key: 'isOpenState',
  default: {
    addEvent: false,
    addCalendar: false,
    viewEvent: false,
  },
});

export {
  userState,
  calendarListState,
  curFloorState,
  roomsState,
  curDateState,
  eventsState,
  renderEventsState,
  viewEventIdState,
  viewEventState,
  newEventState,
  isOpenState,
};

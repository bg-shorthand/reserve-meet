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

const curDateState = atom({
  key: 'curDatestate',
  default: new Date().toISOString().slice(0, 10),
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

const newEventState = atom({
  key: 'newEventState',
  default: {
    calendarId: '',
    summary: '',
    floor: '',
    room: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
  },
});

const isOpenState = atom({
  key: 'isOpenState',
  default: {
    addEvent: false,
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
  newEventState,
  isOpenState,
};

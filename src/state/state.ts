import { atom, selector } from 'recoil';
import { Calendars, Events } from 'const/type';
import roomApi from 'api/db/roomApi';
import adminApi from 'api/db/adminApi';
import { MouseEventHandler } from 'react';

const userState = atom({
  key: 'userState',
  default: { name: '', imageUrl: '', email: '', admin: false },
});

const adminsState = atom({
  key: 'adminsState',
  default: selector({
    key: 'adminsStateDefault',
    get: async () => {
      const res = await adminApi.get();
      const admins = (await res.data) as { email: string; _id: string }[];
      return admins;
    },
  }),
});

const calendarListState = atom({
  key: 'calendarList',
  default: [] as Calendars,
});

const roomsState = atom({
  key: 'roomsState',
  default: selector({
    key: 'roomsStateDefault',
    get: async () => {
      const res = await roomApi.get();
      const rooms = (await res.data) as { floor: number; roomsPerFloor: string[]; _id: string }[];
      return rooms;
    },
  }),
});

const floorsState = selector({
  key: 'floorsState',
  get: async ({ get }) => {
    const rooms = get(roomsState);
    return rooms.map(room => room.floor);
  },
});

const curFloorState = atom({
  key: 'curfloorState',
  default: selector({
    key: 'curFloorStateDefault',
    get: async ({ get }) => {
      const floors = get(floorsState);
      return floors[0];
    },
  }),
});

const roomsPerFloorState = selector({
  key: 'roomsPerFloorState',
  get: async ({ get }) => {
    const rooms = get(roomsState);
    const curFloor = get(curFloorState);
    return rooms.find(room => room.floor === curFloor)?.roomsPerFloor;
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
    attendees: [] as { email: string }[],
  },
});

const isOpenState = atom({
  key: 'isOpenState',
  default: {
    addEvent: false,
    addCalendar: false,
    viewEvent: false,
    patchEvent: false,
    alert: false,
    spinner: true,
  },
});

const alertContentState = atom({
  key: 'alertContent',
  default: {
    content: '',
    yesEvent: (() => {}) as MouseEventHandler,
  },
});

export {
  userState,
  adminsState,
  calendarListState,
  roomsState,
  floorsState,
  curFloorState,
  roomsPerFloorState,
  curDateState,
  eventsState,
  renderEventsState,
  viewEventIdState,
  viewEventState,
  newEventState,
  isOpenState,
  alertContentState,
};

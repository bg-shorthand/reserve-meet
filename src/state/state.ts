import { atom, selector } from 'recoil';
import { Calendars, Events } from 'const/type';
import roomApi from 'api/db/roomApi';

const userState = atom({
  key: 'userState',
  default: { name: '', imageUrl: '', email: '', admin: false },
});

const calendarListState = atom({
  key: 'calendarList',
  default: [] as Calendars,
});

const floorsState = atom({
  key: 'floorsState',
  default: selector({
    key: 'floorsStateDefault',
    get: async () => {
      const res = await roomApi.get();
      const rooms = (await res.data) as { floor: number; rooms: string[] }[];
      const floors = rooms.map(room => room.floor);
      return floors;
    },
  }),
});

const curFloorState = atom({
  key: 'curFloorState',
  default: selector({
    key: 'curFloorStateDefault',
    get: async () => {
      const res = await roomApi.get();
      const rooms = (await res.data) as { floor: number; rooms: string[] }[];
      const floors = rooms.map(room => room.floor);
      return floors[0];
    },
  }),
});

const roomsState = selector({
  key: 'roomsState',
  get: async ({ get }) => {
    const curFloor = get(curFloorState);
    const res = await roomApi.get();
    const rooms = (await res.data) as { floor: number; rooms: string[] }[];
    return rooms.find(data => data.floor === curFloor)?.rooms;
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
  },
});

export {
  userState,
  calendarListState,
  floorsState,
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

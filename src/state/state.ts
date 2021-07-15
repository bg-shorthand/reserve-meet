import { atom, selector } from 'recoil';
import { Calendars, Events } from 'const/type';

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

    switch (curFloor) {
      case 9:
        return ['대', 'M2', 'M3'].map(str => str + '회의실');
      case 10:
        return ['대', '중', '소'].map(str => str + '회의실');
      case 11:
        return ['대', 'Studio'].map(str => str + '회의실');
      case 12:
        return ['소1', '소2'].map(str => str + '회의실');
      case 15:
        return ['대', '소3', '소4'].map(str => str + '회의실');
    }
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
        location.match(/^[0-9]+/)![0] === get(curFloorState) + '' && date === get(curDateState),
    ),
});

export {
  userState,
  calendarListState,
  curFloorState,
  roomsState,
  curDateState,
  eventsState,
  renderEventsState,
};

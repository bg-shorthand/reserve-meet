import { atom, selector } from 'recoil';
import { Calendars } from 'const/type';

const userState = atom({
  key: 'userState',
  default: { name: '', imageUrl: '', email: '' },
});

const calendarListState = atom({
  key: 'calendarList',
  default: [] as Calendars,
});

const floorState = atom({
  key: 'floorState',
  default: 'floor9',
});

const roomsState = selector({
  key: 'roomsState',
  get: ({ get }) => {
    const floor = get(floorState);

    switch (floor) {
      case 'floor9':
        return ['대', 'M2', 'M3'].map(str => str + '회의실');
      case 'floor10':
        return ['대', '중', '소'].map(str => str + '회의실');
      case 'floor11':
        return ['대', 'Studio'].map(str => str + '회의실');
      case 'floor12':
        return ['소1', '소2'].map(str => str + '회의실');
      case 'floor15':
        return ['대', '소3', '소4'].map(str => str + '회의실');
    }
  },
});

export { userState, calendarListState, floorState, roomsState };

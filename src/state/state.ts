import { atom } from 'recoil';
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
  default: '',
});

export { userState, calendarListState, floorState };

import { atom } from 'recoil';

const userState = atom({
  key: 'userState',
  default: { name: '', imageUrl: '', email: '' },
});

export { userState };

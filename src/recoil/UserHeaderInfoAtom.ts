import { atom } from 'recoil';

export const UserHeaderInfoAtom = atom({
  key: 'UserHeaderInfoAtom',
  default: {
    userName: '',
    profileThumbNail: '',
    position: '',
    usedVacation: '',
  },
});

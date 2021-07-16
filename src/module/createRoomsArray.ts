const createRoomsArray = (floor: number) => {
  switch (floor) {
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
};

export default createRoomsArray;

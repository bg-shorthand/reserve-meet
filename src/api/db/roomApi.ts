import axios from 'axios';

const url = 'http://localhost:4001/room';

const roomApi = {
  async get() {
    return await axios.get(url);
  },
  async updateRoomsPerFloor(floor: number, roomsPerFloor: string[]) {
    return await axios.put(url + '/' + floor, roomsPerFloor);
  },
};

export default roomApi;

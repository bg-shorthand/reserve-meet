import axios from 'axios';

const url = 'http://localhost:4001/room';

const roomApi = {
  async get() {
    return await axios.get(url);
  },
  async deleteFloor(floor: number) {
    return await axios.delete(url + '/' + floor);
  },
  async addFloor(floor: number) {
    return await axios.post(url, { floor });
  },
  async updateRoomsPerFloor(floor: number, roomsPerFloor: string[]) {
    return await axios.put(url + '/' + floor, roomsPerFloor);
  },
};

export default roomApi;

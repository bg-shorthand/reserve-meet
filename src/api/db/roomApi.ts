import axios from 'axios';

const url = 'http://3.38.93.215:4001/room';

const roomApi = {
  async get() {
    const res = await axios.get(url);
    console.log(res);
    return res;
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

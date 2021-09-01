import axios from 'axios';

const url = 'http://localhost:4001/room';
// const url = process.env.REACT_APP_DB_URL;

const roomApi = {
  async get() {
    const res = await axios.get(url);
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

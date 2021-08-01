import axios from 'axios';

const url = 'http://localhost:4001/room';

const roomApi = {
  async get() {
    return await axios.get(url);
  },
};

export default roomApi;

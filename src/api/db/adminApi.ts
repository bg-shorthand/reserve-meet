import axios from 'axios';

const url = 'http://localhost:4001/admin';

const adminApi = {
  async get() {
    return await axios.get(url);
  },
};

export default adminApi;

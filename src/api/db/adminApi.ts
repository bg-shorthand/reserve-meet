import axios from 'axios';

const url = 'http://3.38.93.215:4001/admin';

const adminApi = {
  async get() {
    return await axios.get(url);
  },
  async delete(email: string) {
    return await axios.delete(url + '/' + email);
  },
  async post(admins: { email: string }[]) {
    return await axios.post(url, admins);
  },
};

export default adminApi;

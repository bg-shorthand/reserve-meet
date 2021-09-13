import axios from 'axios';

const url = 'http://localhost:4001/admin';
// const url = process.env.REACT_APP_DB_URL + '/admin';

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

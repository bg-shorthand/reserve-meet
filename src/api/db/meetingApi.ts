import axios from 'axios';

const url = 'http://localhost:4001/meeting';

const meetingApi = {
  async post(meeting: any) {
    return await axios.post(url, meeting);
  },
  async get(date: string) {
    return await axios.get(url + '/' + date);
  },
  async patch(type: 'delete' | 'patch', curDate: string, eventId: string) {
    return await axios.patch(url, { type, curDate, eventId });
  },
};

export default meetingApi;

import axios from 'axios';

const url = 'http://localhost:4001/meeting';

const meetingApi = {
  async post(meeting: any) {
    return await axios.post(url, meeting);
  },
};

export default meetingApi;

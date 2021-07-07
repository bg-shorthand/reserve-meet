import { GoogleUser, initClient } from 'App/App';

const userApi = {
  async getProfile() {
    await initClient();
    return GoogleUser.getBasicProfile();
  },
};

export { userApi };

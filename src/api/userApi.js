import { GoogleUser, initClient } from 'lib/googleApiLibrary';

const userApi = {
  async getProfile() {
    return GoogleUser.getBasicProfile();
  },
};

export { userApi };

import { GoogleUser } from 'lib/googleApiLibrary';

const userApi = {
  async getProfile() {
    if (GoogleUser) return GoogleUser.getBasicProfile();
  },
};

export { userApi };

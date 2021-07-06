import { GoogleUser, initClient } from './initClient';

const userApi = {
  async getProfile() {
    await initClient();
    let profile;
    if (GoogleUser) {
      profile = await GoogleUser.getBasicProfile();
    } else {
      console.log('noUser');
    }
    return profile;
  },
};

export { userApi };

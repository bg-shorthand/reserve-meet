import { GoogleAuth } from 'lib/googleApiLibrary';

const peopleApi = {
  async searchUser(name: string) {
    if (GoogleAuth) {
      return await gapi.client.people.people.searchDirectoryPeople({
        query: name,
        readMask: 'emailAddresses,names,photos',
        sources: ['DIRECTORY_SOURCE_TYPE_DOMAIN_PROFILE'],
      });
    }
  },
};

export default peopleApi;

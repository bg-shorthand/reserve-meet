import { GoogleAuth } from 'lib/googleApiLibrary';

const authApi = {
  async signIn() {
    try {
      await GoogleAuth.signIn();
    } catch {
      alert('알서포트 계정으로 로그인해야 합니다.');
    }
  },
  async signOut() {
    await GoogleAuth.signOut();
  },
  async isSign() {
    return GoogleAuth.isSignedIn.get();
  },
};

export default authApi;

import { GoogleAuth } from 'lib/googleApiLibrary';

const authApi = {
  async signIn() {
    try {
      const GoogleUser = await GoogleAuth.signIn();
      return !!GoogleUser;
    } catch {
      alert('알서포트 계정으로 로그인해야 합니다.');
    }
  },
  async signOut() {
    await GoogleAuth.signOut();
  },
  isSign() {
    if (GoogleAuth) {
      return GoogleAuth.isSignedIn.get();
    }
  },
};

export default authApi;

import { userApi } from 'api/googleLib/userApi';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { adminsState, userState } from 'state/state';

const CurrentUserInfo = () => {
  const [user, setUser] = useRecoilState(userState);
  const admins = useRecoilValue(adminsState);
  const { name, imageUrl } = user;

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    const getProfile = async () => {
      const profile = await userApi.getProfile();
      if (profile) {
        clearTimeout(timerId);
        const name = profile.getName();
        const imageUrl = profile.getImageUrl();
        const email = profile.getEmail();

        setUser({
          name,
          imageUrl,
          email,
          admin: !!admins.find(admin => admin.email === email),
        });
      } else {
        timerId = setTimeout(getProfile, 100);
      }
    };
    getProfile();
  }, []);

  return (
    <figure>
      <img src={imageUrl} alt={name} />
      <figcaption>{name}</figcaption>
    </figure>
  );
};

export default CurrentUserInfo;

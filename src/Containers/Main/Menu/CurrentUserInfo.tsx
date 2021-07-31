import { userApi } from 'api/userApi';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from 'state/state';

const CurrentUserInfo = () => {
  const [user, setUser] = useRecoilState(userState);
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
        setUser(pre => ({ ...pre, name, imageUrl, email }));
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

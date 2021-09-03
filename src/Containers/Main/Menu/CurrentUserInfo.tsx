import { userApi } from 'api/googleLib/userApi';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { adminsState, isOpenState, userState } from 'state/state';

const CurrentUserInfo = () => {
  const [user, setUser] = useRecoilState(userState);
  const admins = useRecoilValue(adminsState);
  const { name, imageUrl } = user;
  const [isOpen, setIsOpen] = useRecoilState(isOpenState);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    const getProfile = async () => {
      if (!isOpen.spinner) setIsOpen(pre => ({ ...pre, spinner: true }));

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

        if (isOpen.spinner) setIsOpen(pre => ({ ...pre, spinner: false }));
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

import { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { adminsState, alertContentState, isOpenState } from 'state/state';
import { ReactComponent as CloseIcon } from 'asset/svg/close.svg';
import StyledSearchUser from 'Components/SearchUser/SearchUser.style';
import { MouseEventHandler } from 'react';
import adminApi from 'api/db/adminApi';
import { DefaultProps } from 'const/type';

const AdminList = ({ className }: DefaultProps) => {
  const [admins, setAdmins] = useRecoilState(adminsState);
  const setIsOpen = useSetRecoilState(isOpenState);
  const setAlertContent = useSetRecoilState(alertContentState);

  const [newAdmins, setNewAdmins] = useState<{ email: string }[]>([]);

  const setNewAdminsHandler = async (email: string) => {
    const id = email;

    if (id) {
      if (newAdmins.find(admin => admin.email === id) || admins.find(admin => admin.email === id))
        return;
      setNewAdmins(pre => [...pre, { email: id }]);
    }
  };
  const deleteNewAdminsHandler: MouseEventHandler<Element> = e => {
    const email = e.currentTarget.closest('li')?.textContent;
    setNewAdmins(pre => pre.filter(admin => admin.email !== email));
  };
  const deleteAdminHandler: MouseEventHandler<Element> = async e => {
    const target = e.target as Element;
    const email = target.closest('li')?.textContent;
    if (email) {
      setIsOpen(pre => ({ ...pre, alert: true }));
      setAlertContent({
        content: '삭제하시겠습니까?',
        yesEvent: async () => {
          setIsOpen(pre => ({ ...pre, spinner: true }));
          const res = await adminApi.delete(email);
          const newAdmins = await res.data;
          setAdmins([...newAdmins]);
          setIsOpen(pre => ({ ...pre, spinner: false }));
        },
      });
    }
  };
  const postAdminHandler: MouseEventHandler<Element> = async () => {
    if (!newAdmins.length) return;
    await adminApi.post(newAdmins);
    const res = await adminApi.get();
    const data = res.data;
    setAdmins([...data]);
    setNewAdmins([]);
  };

  return (
    <article className={className}>
      <ul>
        {admins.length
          ? admins.map(admin => (
              <li key={admin._id}>
                {admin.email}
                {admins.length > 1 ? (
                  <button onClick={deleteAdminHandler}>
                    <CloseIcon />
                  </button>
                ) : null}
              </li>
            ))
          : null}
      </ul>
      <StyledSearchUser setList={setNewAdminsHandler} />
      <ul>
        {newAdmins.length
          ? newAdmins.map(user => (
              <li key={user.email}>
                {user.email}
                <button onClick={deleteNewAdminsHandler}>
                  <CloseIcon />
                </button>
              </li>
            ))
          : null}
      </ul>
      <button onClick={postAdminHandler}>관리자 추가</button>
    </article>
  );
};

export default AdminList;

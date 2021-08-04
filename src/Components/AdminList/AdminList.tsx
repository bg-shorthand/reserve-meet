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

  const setNewAdminsHandler: MouseEventHandler<Element> = async e => {
    const target = e.target as Element;
    const id = target.closest('li')?.id;

    if (id) {
      if (newAdmins.find(admin => admin.email === id) || admins.find(admin => admin.email === id))
        return;
      setNewAdmins(pre => [...pre, { email: id }]);
    }
  };
  const unsetNewAdminsHandler: MouseEventHandler<Element> = e => {
    const target = e.currentTarget.closest('li')?.textContent;
    setNewAdmins(pre => pre.filter(admin => admin.email !== target));
  };
  const deleteAdminHandler: MouseEventHandler<Element> = async e => {
    const target = e.target as Element;
    const email = target.closest('li')?.textContent;
    if (email) {
      setIsOpen(pre => ({ ...pre, alert: true }));
      setAlertContent({
        content: '삭제하시겠습니까?',
        yesEvent: async () => {
          const res = await adminApi.delete(email);
          const newAdmins = await res.data;
          setAdmins([...newAdmins]);
        },
      });
    }
  };
  const postAdminHandler: MouseEventHandler<Element> = async () => {
    if (!newAdmins.length) return;
    const res = await adminApi.post(newAdmins);
    const data = await res.data;
    setAdmins([...data]);
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
                <button onClick={unsetNewAdminsHandler}>
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

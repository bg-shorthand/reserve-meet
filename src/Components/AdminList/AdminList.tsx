import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { adminsState } from 'state/state';
import { ReactComponent as CloseIcon } from 'asset/svg/close.svg';
import StyledSearchUser from 'Components/SearchUser/SearchUser.style';
import { MouseEventHandler } from 'react';
import adminApi from 'api/db/adminApi';

const AdminList = () => {
  const [admins, setAdmins] = useRecoilState(adminsState);
  const [newAdmins, setNewAdmins] = useState<{ email: string }[]>([]);

  const setNewAdminsHandler: MouseEventHandler<Element> = async e => {
    if (
      newAdmins.find(admin => admin.email === e.currentTarget.id) ||
      admins.find(admin => admin.email === e.currentTarget.id)
    )
      return;
    setNewAdmins(pre => [...pre, { email: e.currentTarget.id }]);
  };
  const deleteAdminHandler: MouseEventHandler<Element> = async e => {
    const target = e.target as Element;
    const email = target.closest('li')?.textContent;
    if (email) {
      const res = await adminApi.delete(email);
      const newAdmins = await res.data;
      setAdmins([...newAdmins]);
    }
  };

  return (
    <>
      <ul>
        {admins.length
          ? admins.map(admin => (
              <li key={admin.id}>
                {admin.email}
                <button onClick={deleteAdminHandler}>
                  <CloseIcon />
                </button>
              </li>
            ))
          : null}
      </ul>
      <StyledSearchUser setList={setNewAdminsHandler} />
      <ul>
        {newAdmins.length ? newAdmins.map(user => <li key={user.email}>{user.email}</li>) : null}
      </ul>
      <button>관리자 추가</button>
    </>
  );
};

export default AdminList;

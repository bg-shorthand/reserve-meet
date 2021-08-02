import { Events } from 'const/type';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { adminsState } from 'state/state';
import { ReactComponent as CloseIcon } from 'asset/svg/close.svg';
import SearchUser from 'Components/SearchUser/SearchUser';
import { MouseEventHandler } from 'react';
import adminApi from 'api/db/adminApi';

const AdminList = () => {
  const [admins, setAdmins] = useRecoilState(adminsState);
  const [attendants, setAttendants] = useState<{ name: string; events: Events }[]>([]);

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
      <SearchUser attendants={attendants} setAttendants={setAttendants} />
      <ul>
        {attendants.length ? attendants.map(user => <li key={user.name}>{user.name}</li>) : null}
      </ul>
      <button>관리자 추가</button>
    </>
  );
};

export default AdminList;

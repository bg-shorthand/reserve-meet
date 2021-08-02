import { Events } from 'const/type';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { adminsState } from 'state/state';
import { ReactComponent as CloseIcon } from 'asset/svg/close.svg';
import SearchUser from 'Components/SearchUser/SearchUser';

const AdminList = () => {
  const [admins, setAdmins] = useRecoilState(adminsState);
  const [attendants, setAttendants] = useState<{ name: string; events: Events }[]>([]);

  return (
    <>
      <ul>
        {admins.map(admin => (
          <li key={admin.id}>
            {admin.email}
            <button>
              <CloseIcon />
            </button>
          </li>
        ))}
      </ul>
      <SearchUser attendants={attendants} setAttendants={setAttendants} />
      <ul>
        {attendants.map(user => (
          <li>{user.name}</li>
        ))}
      </ul>
      <button>관리자 추가</button>
    </>
  );
};

export default AdminList;

import { useRecoilState } from 'recoil';
import { adminsState, roomsState } from 'state/state';
import { ReactComponent as CloseIcon } from 'asset/svg/close.svg';
import SearchUser from 'Components/SearchUser/SearchUser';
import { useState } from 'react';
import { DefaultProps, Events } from 'const/type';

const Admin = ({ className }: DefaultProps) => {
  const [admins, setAdmins] = useRecoilState(adminsState);
  const [rooms, setRooms] = useRecoilState(roomsState);

  const [attendants, setAttendants] = useState<{ name: string; events: Events }[]>([]);

  return (
    <section className={className}>
      <h1>Admin</h1>
      <h2>관리자</h2>
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
      <h2>회의실</h2>
      <table>
        <thead>
          <tr>
            <th>층</th>
            <th>회의실</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map(room => (
            <tr>
              <th>{room.floor}</th>
              <td>
                <ul>
                  {room.rooms.map(room => (
                    <li>
                      {room}
                      <button>
                        <CloseIcon />
                      </button>
                    </li>
                  ))}
                  <li>회의실 추가</li>
                </ul>
              </td>
            </tr>
          ))}
          <tr>
            <button>회의실 추가</button>
          </tr>
        </tbody>
      </table>
      <button>수정</button>
    </section>
  );
};

export default Admin;

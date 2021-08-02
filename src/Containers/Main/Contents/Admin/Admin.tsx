import { useRecoilState } from 'recoil';
import { roomsState } from 'state/state';
import { DefaultProps } from 'const/type';
import { ReactComponent as CloseIcon } from 'asset/svg/close.svg';
import AdminList from 'Components/AdminList/AdminList';

const Admin = ({ className }: DefaultProps) => {
  const [rooms, setRooms] = useRecoilState(roomsState);

  return (
    <section className={className}>
      <h1>Admin</h1>
      <h2>관리자</h2>
      <AdminList />
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

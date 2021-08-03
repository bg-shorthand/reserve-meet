import { ReactComponent as CloseIcon } from 'asset/svg/close.svg';
import { DefaultProps } from 'const/type';
import { useRecoilState } from 'recoil';
import { roomsState } from 'state/state';

const RoomsTable = ({ className }: DefaultProps) => {
  const [rooms, setRooms] = useRecoilState(roomsState);

  return (
    <article className={className}>
      <table>
        <thead>
          <tr>
            <th>층</th>
            <th>회의실</th>
          </tr>
        </thead>
        <tbody>
          {rooms.length
            ? rooms.map(room => (
                <tr key={room._id}>
                  <th>{room.floor}</th>
                  <td>
                    <ul>
                      {room.rooms.length
                        ? room.rooms.map(room => (
                            <li key={room}>
                              {room}
                              <button>
                                <CloseIcon />
                              </button>
                            </li>
                          ))
                        : null}
                    </ul>
                    <button>회의실 추가</button>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
      <button>회의실 추가</button>
      <button>수정</button>
    </article>
  );
};

export default RoomsTable;

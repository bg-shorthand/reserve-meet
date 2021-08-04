import roomApi from 'api/db/roomApi';
import { ReactComponent as CloseIcon } from 'asset/svg/close.svg';
import { DefaultProps } from 'const/type';
import { ChangeEventHandler } from 'react';
import { useState } from 'react';
import { MouseEventHandler } from 'react';
import { useRecoilState } from 'recoil';
import { roomsState } from 'state/state';

const RoomsTable = ({ className }: DefaultProps) => {
  const [rooms, setRooms] = useRecoilState(roomsState);

  const [newRoom, setNewRoom] = useState('');

  const setNewRoomHandler: ChangeEventHandler<HTMLInputElement> = e => {
    setNewRoom(e.currentTarget.value);
  };
  const addRoomPerFloorHandler: MouseEventHandler<Element> = async e => {
    const floor = e.currentTarget.id;
    const preRoomsPerFloor = rooms.find(roomObj => roomObj.floor === +floor)?.roomsPerFloor;

    if (preRoomsPerFloor) {
      const res = await roomApi.updateRoomsPerFloor(+floor, [...preRoomsPerFloor, newRoom]);
      const newRooms = await res.data;
      console.log(newRooms);
      setRooms([...newRooms]);
    }
  };
  const deleteRoomPerFloorHandler: MouseEventHandler<Element> = async e => {
    const floorRoom = e.currentTarget.closest('li')?.id.split('-');

    if (floorRoom) {
      const [floor, room] = floorRoom;
      const newRooms = rooms
        .find(roomObj => roomObj.floor === +floor)
        ?.roomsPerFloor.filter(v => v !== room);
      if (newRooms) {
        const res = await roomApi.updateRoomsPerFloor(+floor, newRooms);
        const data = await res.data;
        setRooms([...data]);
      }
    }
  };

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
            ? rooms.map(roomObj => (
                <tr key={roomObj._id}>
                  <th>{roomObj.floor}</th>
                  <td>
                    <ul>
                      {roomObj.roomsPerFloor.length
                        ? roomObj.roomsPerFloor.map(room => (
                            <li key={room} id={`${roomObj.floor}-${room}`}>
                              {room}
                              <button onClick={deleteRoomPerFloorHandler}>
                                <CloseIcon />
                              </button>
                            </li>
                          ))
                        : null}
                    </ul>
                    <label htmlFor={'addRoomAt' + roomObj.floor} className="a11y-hidden">
                      {roomObj.floor + '층에 추가할 회의실'}
                    </label>
                    <input
                      type="text"
                      id={'addRoomAt' + roomObj.floor}
                      onChange={setNewRoomHandler}
                    />
                    <button id={roomObj.floor + ''} onClick={addRoomPerFloorHandler}>
                      회의실 추가
                    </button>
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

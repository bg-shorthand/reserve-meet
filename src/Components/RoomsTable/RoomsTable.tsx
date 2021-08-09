import roomApi from 'api/db/roomApi';
import { DefaultProps } from 'const/type';
import { ChangeEventHandler } from 'react';
import { useState } from 'react';
import { MouseEventHandler } from 'react';
import { useRecoilState } from 'recoil';
import { roomsState } from 'state/state';
import StyledCloseButton from 'Components/CloseButton/CloseButton.style';

const RoomsTable = ({ className }: DefaultProps) => {
  const [rooms, setRooms] = useRecoilState(roomsState);
  const [newFloor, setNewFloor] = useState('');

  const setNewFloorHandler: ChangeEventHandler<HTMLInputElement> = e => {
    setNewFloor(e.currentTarget.value);
  };
  const deleteFloorhandler: MouseEventHandler<Element> = async e => {
    const floor = e.currentTarget.closest('th')?.textContent;
    if (floor) {
      const res = await roomApi.deleteFloor(+floor);
      const newRooms = await res.data;
      setRooms(newRooms);
    }
  };
  const addFloor: MouseEventHandler<Element> = async () => {
    const res = await roomApi.addFloor(+newFloor);
    const newRooms = await res.data;
    setRooms(newRooms);
  };
  const addRoomPerFloorHandler: MouseEventHandler<Element> = async e => {
    const floor = e.currentTarget.id;
    const $input = document.getElementById('addRoomAt' + floor) as HTMLInputElement;
    let newRoom = $input.value;
    const preRoomsPerFloor = rooms.find(roomObj => roomObj.floor === +floor)?.roomsPerFloor;

    if (!newRoom || preRoomsPerFloor?.find(room => room === newRoom)) return;

    if (preRoomsPerFloor) {
      const res = await roomApi.updateRoomsPerFloor(+floor, [...preRoomsPerFloor, newRoom]);
      const newRooms = await res.data;
      setRooms([...newRooms]);
      newRoom = '';
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
                  <th>
                    {roomObj.floor}
                    <StyledCloseButton onClick={deleteFloorhandler} />
                  </th>
                  <td>
                    <ul>
                      {roomObj.roomsPerFloor.length
                        ? roomObj.roomsPerFloor.map(room => (
                            <li key={room} id={`${roomObj.floor}-${room}`}>
                              {room}
                              <StyledCloseButton onClick={deleteRoomPerFloorHandler} />
                            </li>
                          ))
                        : null}
                    </ul>
                    <li>
                      <label htmlFor={'addRoomAt' + roomObj.floor} className="a11y-hidden">
                        {roomObj.floor + '층에 추가할 회의실'}
                      </label>
                      <input type="text" id={'addRoomAt' + roomObj.floor} />
                      <button id={roomObj.floor + ''} onClick={addRoomPerFloorHandler}>
                        회의실 추가
                      </button>
                    </li>
                  </td>
                </tr>
              ))
            : null}
          <tr>
            <td colSpan={2}>
              <label htmlFor="createFloorInput" className="a11y-hidden">
                새로 만들 층
              </label>
              <input
                type="text"
                id="createFloorInput"
                value={newFloor}
                onChange={setNewFloorHandler}
              />
              <button disabled={!/^[0-9]+$/.test(newFloor)} onClick={addFloor}>
                {!/^[0-9]+$/.test(newFloor)
                  ? newFloor === ''
                    ? '층 추가'
                    : '숫자만 입력하세요'
                  : '층 추가'}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </article>
  );
};

export default RoomsTable;

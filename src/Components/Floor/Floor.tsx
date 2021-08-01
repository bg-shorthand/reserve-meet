import { MouseEventHandler } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { curFloorState, floorsState } from 'state/state';
import { DefaultProps } from 'const/type';

const Floor = ({ className }: DefaultProps) => {
  const [curFloor, setCurFloor] = useRecoilState(curFloorState);
  const floors = useRecoilValue(floorsState);

  const changeFloorHandler: MouseEventHandler<Element> = e => {
    setCurFloor(+e.currentTarget.id);
  };

  return (
    <ul className={className}>
      {floors.map(floor => (
        <li
          key={floor}
          id={floor + ''}
          onClick={changeFloorHandler}
          className={floor === curFloor ? 'cur-floor' : ''}
        >
          {floor + '층'}
        </li>
      ))}
    </ul>
  );
};

export default Floor;

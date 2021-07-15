import { MouseEventHandler } from 'react';
import { useSetRecoilState } from 'recoil';
import { curFloorState } from 'state/state';
import { DefaultProps } from 'const/type';

const Floor = ({ className }: DefaultProps) => {
  const floors = [9, 10, 11, 12, 15];

  const setFloor = useSetRecoilState(curFloorState);

  const changeFloorHandler: MouseEventHandler<Element> = e => {
    setFloor(+e.currentTarget.id);
  };

  return (
    <ul className={className}>
      {floors.map(floor => (
        <li key={floor} id={floor + ''} onClick={changeFloorHandler}>
          {floor + '층'}
        </li>
      ))}
    </ul>
  );
};

export default Floor;

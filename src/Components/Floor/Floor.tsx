import { MouseEventHandler } from 'react';
import { useSetRecoilState } from 'recoil';
import { curFloorState } from 'state/state';
import { DefaultProps } from 'const/type';
import { FLOORS } from 'const/const';

const Floor = ({ className }: DefaultProps) => {
  const setFloor = useSetRecoilState(curFloorState);

  const changeFloorHandler: MouseEventHandler<Element> = e => {
    setFloor(+e.currentTarget.id);
  };

  return (
    <ul className={className}>
      {FLOORS.map(floor => (
        <li key={floor} id={floor + ''} onClick={changeFloorHandler}>
          {floor + '층'}
        </li>
      ))}
    </ul>
  );
};

export default Floor;

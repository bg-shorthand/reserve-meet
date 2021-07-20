import { MouseEventHandler } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { curFloorState } from 'state/state';
import { DefaultProps } from 'const/type';
import { FLOORS } from 'const/const';

const Floor = ({ className }: DefaultProps) => {
  const [curFloor, setCurFloor] = useRecoilState(curFloorState);

  const changeFloorHandler: MouseEventHandler<Element> = e => {
    setCurFloor(+e.currentTarget.id);
  };

  return (
    <ul className={className}>
      {FLOORS.map(floor => (
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

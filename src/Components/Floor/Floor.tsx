import { DefaultProps } from 'const/type';
import { useEffect } from 'react';
import { ButtonHTMLAttributes, MouseEventHandler } from 'react';
import { useRecoilState } from 'recoil';
import { floorState } from 'state/state';

const Floor = ({ className }: DefaultProps) => {
  const floors = [9, 10, 11, 12, 15];

  const [floor, setFloor] = useRecoilState(floorState);

  const changeFloorHandler: MouseEventHandler<Element> = e => {
    setFloor(e.currentTarget.id);
  };

  useEffect(() => {
    console.log(floor);
  }, [floor]);

  return (
    <ul className={className}>
      {floors.map(floor => (
        <li key={floor} id={'floor' + floor} onClick={changeFloorHandler}>
          {floor + '층'}
        </li>
      ))}
    </ul>
  );
};

export default Floor;

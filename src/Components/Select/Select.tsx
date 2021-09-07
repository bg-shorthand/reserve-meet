import { DefaultProps } from 'const/type';
import { ChangeEventHandler } from 'react';

interface Props extends DefaultProps {
  id: string;
  value: string;
  list: string[];
  onChange: ChangeEventHandler;
}

const Select = ({ id, value, list, onChange }: Props) => {
  return (
    <>
      <label htmlFor={id} className="a11y-hidden"></label>
      <select name={id} id={id} value={value} onChange={onChange}>
        {list.map(item => {
          return (
            <option value={item} key={item}>
              {item}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default Select;

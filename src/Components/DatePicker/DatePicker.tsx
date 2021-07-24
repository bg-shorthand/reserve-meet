import { MouseEventHandler } from 'react';
import { ChangeEventHandler } from 'react';
import { useRecoilState } from 'recoil';
import { curDateState } from 'state/state';
import { DefaultProps } from 'const/type';

const DatePicker = ({ className }: DefaultProps) => {
  const [curDate, setCurDate] = useRecoilState(curDateState);

  const selectDateHandler: ChangeEventHandler<HTMLInputElement> = e => {
    setCurDate(e.currentTarget.value);
  };

  const changeDateHandler: MouseEventHandler<HTMLButtonElement> = e => {
    const title = e.currentTarget.title;

    if (title === '이전 날짜') {
      setCurDate(preDate =>
        new Date(new Date(preDate).getTime() - 1000 * 60 * 60 * 24).toISOString().slice(0, 10),
      );
    } else {
      setCurDate(preDate =>
        new Date(new Date(preDate).getTime() + 1000 * 60 * 60 * 24).toISOString().slice(0, 10),
      );
    }
  };

  return (
    <section className={className}>
      <button title="이전 날짜" onClick={changeDateHandler}>
        {'<'}
      </button>
      <label htmlFor="curDatePickerInput" className="a11y-hidden">
        현재 날짜
      </label>
      <input id="curDatePickerInput" type="date" value={curDate} onChange={selectDateHandler} />
      <button title="다음 날짜" onClick={changeDateHandler}>
        {'>'}
      </button>
    </section>
  );
};

export default DatePicker;

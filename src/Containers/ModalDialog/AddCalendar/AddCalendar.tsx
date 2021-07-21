import { calendarApi } from 'api/calendarApi';
import ModalDialog from 'Components/ModalDialog/ModalDialog';
import { ChangeEventHandler } from 'react';
import { MouseEventHandler } from 'react';
import { useState } from 'react';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { calendarListState, isOpenState } from 'state/state';

const AddCalendar = () => {
  const { addCalendar: isOpen } = useRecoilValue(isOpenState);
  const resetIsOpen = useResetRecoilState(isOpenState);
  const setCalendarList = useSetRecoilState(calendarListState);
  const [summary, setSummary] = useState('');

  const setNewCalendarSummaryHandler: ChangeEventHandler<HTMLInputElement> = e => {
    setSummary(e.currentTarget.value);
  };
  const insertCalendarHandler: MouseEventHandler<Element> = async () => {
    await calendarApi.insertCalendar(summary);
    resetIsOpen();

    let calendarsTimerId: NodeJS.Timeout;

    const getCalendars = async () => {
      const res = await calendarApi.getCalendarList();

      clearTimeout(calendarsTimerId);

      if (res && res.result.items) {
        console.log(res.result.items);
        const newCalendarList = res.result.items
          .filter(calendar => !calendar.description)
          .map(calendar => ({
            summary: calendar.summary ? calendar.summary : '',
            id: calendar.id ? calendar.id : '',
          }));
        setCalendarList([...newCalendarList]);
      } else {
        calendarsTimerId = setTimeout(getCalendars, 100);
      }
    };
    getCalendars();
  };

  return isOpen ? (
    <ModalDialog>
      <h1>Add Calendar</h1>
      <label htmlFor="newCalendarSummary" className="a11y-hidden">
        달력 이름
      </label>
      <input
        type="text"
        placeholder="달력 이름을 입력하세요"
        id="newCalendarSummary"
        onChange={setNewCalendarSummaryHandler}
      />
      <button onClick={insertCalendarHandler} disabled={summary ? false : true}>
        등록
      </button>
    </ModalDialog>
  ) : null;
};

export default AddCalendar;

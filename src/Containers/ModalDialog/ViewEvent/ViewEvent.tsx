import ModalDialog from 'Components/ModalDialog/ModalDialog';
import { DefaultProps } from 'const/type';
import addPrefix0 from 'module/addPrefix0';
import { MouseEventHandler } from 'react';
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isOpenState, newEventState, userState, viewEventState } from 'state/state';

const ViewEvent = ({ className }: DefaultProps) => {
  const isOpen = useRecoilValue(isOpenState).viewEvent;
  const viewEvent = useRecoilValue(viewEventState);
  const curUserId = useRecoilValue(userState).email;
  const setIsOpen = useSetRecoilState(isOpenState);
  const setNewEvent = useSetRecoilState(newEventState);

  const [isCreator, setIsCreator] = useState(false);

  const setPatchEventHandler: MouseEventHandler<Element> = () => {
    setNewEvent(pre => ({
      ...pre,
      description: viewEvent?.description || '',
      floor: viewEvent?.location.split(' ')[0].match(/[0-9]+/)![0] || '',
      room: viewEvent?.location.split(' ')[1] || '',
      startDate: viewEvent?.date || '',
      startTime: viewEvent?.startTime || '',
      endDate: viewEvent?.date || '',
      endTime: viewEvent?.endTime || '',
      attendees: viewEvent?.attendees?.map(user => ({ email: user.email! }))!,
    }));
    setIsOpen(pre => ({ ...pre, viewEvent: false, patchEvent: true }));
  };
  useEffect(() => {
    const cur = new Date();
    const curYear = cur.getFullYear();
    const curMonth = addPrefix0(cur.getMonth() + 1);
    const curDate = addPrefix0(cur.getDate());
    const curHour = addPrefix0(cur.getHours());
    const curMin = addPrefix0(cur.getMinutes());

    const isOld =
      viewEvent?.date! < `${curYear}-${curMonth}-${curDate}` ||
      (viewEvent?.date === `${curYear}-${curMonth}-${curDate}` &&
        viewEvent.startTime < `${curHour}:${curMin}`);
    setIsCreator(!isOld && viewEvent?.creatorEmail === curUserId);
  }, [viewEvent]);

  return isOpen ? (
    <ModalDialog className={className}>
      <h1>{viewEvent?.summary}</h1>
      <pre>{`${viewEvent?.description}`}</pre>
      <table>
        <tbody>
          <tr>
            <th>장소</th>
            <td>{viewEvent?.location}</td>
          </tr>
          <tr>
            <th>날짜</th>
            <td>{viewEvent?.date}</td>
          </tr>
          <tr>
            <th>시작</th>
            <td>{viewEvent?.startTime}</td>
          </tr>
          <tr>
            <th>종료</th>
            <td>{viewEvent?.endTime}</td>
          </tr>
          <tr>
            <th>주최자</th>
            <td>{viewEvent?.creatorEmail}</td>
          </tr>
          <tr>
            <th>참석자</th>
            <td>
              <ul>
                {viewEvent?.attendees?.map(user => (
                  <li key={user.email}>{user.email}</li>
                ))}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
      {isCreator ? <button onClick={setPatchEventHandler}>수정</button> : null}
    </ModalDialog>
  ) : null;
};

export default ViewEvent;

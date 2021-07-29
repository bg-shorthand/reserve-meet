import ModalDialog from 'Components/ModalDialog/ModalDialog';
import { DefaultProps } from 'const/type';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { isOpenState, userState, viewEventState } from 'state/state';

const ViewEvent = ({ className }: DefaultProps) => {
  const isOpen = useRecoilValue(isOpenState).viewEvent;
  const viewEvent = useRecoilValue(viewEventState);
  const curUserId = useRecoilValue(userState).email;

  const [isCreator, setIsCreator] = useState(false);

  useEffect(() => {
    setIsCreator(viewEvent?.creatorEmail === curUserId);
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
      {isCreator ? <button>수정</button> : null}
    </ModalDialog>
  ) : null;
};

export default ViewEvent;

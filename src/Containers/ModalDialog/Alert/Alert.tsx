import ModalDialog from 'Components/ModalDialog/ModalDialog';
import { DefaultProps } from 'const/type';
import { useRecoilState, useRecoilValue } from 'recoil';
import { alertContentState, isOpenState } from 'state/state';

const Alert = ({ className }: DefaultProps) => {
  const [isOpen, setIsOpen] = useRecoilState(isOpenState);
  const { content, yesEvent } = useRecoilValue(alertContentState);

  return isOpen.alert ? (
    <ModalDialog className={className}>
      <h1>Alert</h1>
      <p>{content}</p>
      <button
        onClick={e => {
          yesEvent(e);
          setIsOpen(pre => ({ ...pre, alert: false }));
        }}
      >
        네
      </button>
      <button onClick={() => setIsOpen(pre => ({ ...pre, alert: false }))}>아니오</button>
    </ModalDialog>
  ) : null;
};

export default Alert;

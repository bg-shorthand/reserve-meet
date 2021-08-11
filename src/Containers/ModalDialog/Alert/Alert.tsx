import ModalDialog from 'Components/ModalDialog/ModalDialog';
import { DefaultProps } from 'const/type';
import { useRecoilState, useRecoilValue } from 'recoil';
import { alertContentState, isOpenState } from 'state/state';
import StyledButton from 'Components/Button/Button.style';

const Alert = ({ className }: DefaultProps) => {
  const [isOpen, setIsOpen] = useRecoilState(isOpenState);
  const { content, yesEvent } = useRecoilValue(alertContentState);

  return isOpen.alert ? (
    <ModalDialog className={className}>
      <h1>확인</h1>
      <p>{content}</p>
      <div>
        <StyledButton
          onClick={e => {
            yesEvent(e);
            setIsOpen(pre => ({ ...pre, alert: false }));
          }}
        >
          네
        </StyledButton>
        <StyledButton onClick={() => setIsOpen(pre => ({ ...pre, alert: false }))}>
          아니오
        </StyledButton>
      </div>
    </ModalDialog>
  ) : null;
};

export default Alert;

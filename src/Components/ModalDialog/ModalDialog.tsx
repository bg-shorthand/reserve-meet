import Portal from 'Portal';
import { MouseEventHandler } from 'react';
import { useResetRecoilState } from 'recoil';
import { isOpenState } from 'state/state';
import { DefaultProps } from 'const/type';
import StyledDialog from './Dialog/Dialog.style';
import StyledModal from './Modal/Modal.style';

const ModalDialog = ({ className, children }: DefaultProps) => {
  const resetIsOpen = useResetRecoilState(isOpenState);

  const closeModal: MouseEventHandler<Element> = e => {
    if (e.currentTarget !== e.target) return;
    resetIsOpen();
  };

  return (
    <Portal>
      <StyledModal onClick={closeModal}>
        <StyledDialog className={className}>{children}</StyledDialog>
      </StyledModal>
    </Portal>
  );
};

export default ModalDialog;

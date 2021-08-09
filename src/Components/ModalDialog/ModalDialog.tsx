import Portal from 'Portal';
import { MouseEventHandler } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { isOpenState } from 'state/state';
import { DefaultProps } from 'const/type';
import StyledDialog from './Dialog/Dialog.style';
import StyledModal from './Modal/Modal.style';

const ModalDialog = ({ className, children }: DefaultProps) => {
  const resetIsOpen = useResetRecoilState(isOpenState);
  const setIsOpen = useSetRecoilState(isOpenState);

  const closeModal: MouseEventHandler<Element> = e => {
    if (e.currentTarget !== e.target) return;
    resetIsOpen();
    setIsOpen(pre => ({ ...pre, spinner: false }));
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

import { DefaultProps } from 'const/type';
import Portal from 'Portal';
import StyledDialog from './Dialog/Dialog.style';
import StyledModal from './Modal/Modal.style';

const ModalDialog = ({ children }: DefaultProps) => {
  return (
    <Portal>
      <StyledModal>
        <StyledDialog>{children}</StyledDialog>
      </StyledModal>
    </Portal>
  );
};

export default ModalDialog;

import { ReactElement } from 'react';
import StyledModal from './Modal.style';

type props = {
  children: ReactElement;
};

const Modal = ({ children }: props) => {
  return <StyledModal>{children}</StyledModal>;
};

export default Modal;

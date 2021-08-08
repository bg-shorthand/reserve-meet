import { ReactComponent as SpinnerSvg } from 'asset/svg/spinner.svg';
import StyledModal from 'Components/ModalDialog/Modal/Modal.style';
import { useRecoilValue } from 'recoil';
import { isOpenState } from 'state/state';

const Spinner = () => {
  const isOpen = useRecoilValue(isOpenState).spinner;

  return isOpen ? (
    <StyledModal>
      <SpinnerSvg />
    </StyledModal>
  ) : null;
};

export default Spinner;

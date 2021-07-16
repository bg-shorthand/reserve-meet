import Modal from 'Components/ModalDialog/Modal/Modal';
import { ReactComponent as SpinnerSvg } from 'asset/svg/spinner.svg';

const Spinner = () => {
  return (
    <Modal>
      <SpinnerSvg />
    </Modal>
  );
};

export default Spinner;

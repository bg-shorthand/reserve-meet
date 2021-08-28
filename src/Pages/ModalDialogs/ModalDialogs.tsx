import StyledAddevent from 'Containers/ModalDialog/AddEvent/AddEvent.style';
import AddCalendar from 'Containers/ModalDialog/AddCalendar/AddCalendar';
import StyledViewEvent from 'Containers/ModalDialog/ViewEvent/ViewEvent.style';
import StyledPatchEvent from 'Containers/ModalDialog/PatchEvent/PatchEvent.style';
import StyledAlert from 'Containers/ModalDialog/Alert/Alert.style';
import Spinner from 'Components/Spinner/Spinner';

const ModalDialogs = () => {
  return (
    <>
      <Spinner />
      <StyledAddevent />
      <AddCalendar />
      <StyledViewEvent />
      <StyledPatchEvent />
      <StyledAlert />
    </>
  );
};

export default ModalDialogs;

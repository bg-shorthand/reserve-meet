import StyledAddevent from 'Containers/ModalDialog/AddEvent/AddEvent.style';
import AddCalendar from 'Containers/ModalDialog/AddCalendar/AddCalendar';
import StyledViewEvent from 'Containers/ModalDialog/ViewEvent/ViewEvent.style';
import StyledPatchEvent from 'Containers/ModalDialog/PatchEvent/PatchEvent.style';
import Alert from 'Containers/ModalDialog/Alert/Alert';

const ModalDialogs = () => {
  return (
    <>
      <StyledAddevent />
      <AddCalendar />
      <StyledViewEvent />
      <StyledPatchEvent />
      <Alert />
    </>
  );
};

export default ModalDialogs;

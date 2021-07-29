import StyledAddevent from 'Containers/ModalDialog/AddEvent/AddEvent.style';
import AddCalendar from 'Containers/ModalDialog/AddCalendar/AddCalendar';
import StyledViewEvent from 'Containers/ModalDialog/ViewEvent/ViewEvent.style';

const ModalDialogs = () => {
  return (
    <>
      <StyledAddevent />
      <AddCalendar />
      <StyledViewEvent />
    </>
  );
};

export default ModalDialogs;

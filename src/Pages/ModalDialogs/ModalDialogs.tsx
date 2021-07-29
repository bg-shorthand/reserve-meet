import StyledAddevent from 'Containers/ModalDialog/AddEvent/AddEvent.style';
import AddCalendar from 'Containers/ModalDialog/AddCalendar/AddCalendar';
import ViewEvent from 'Containers/ModalDialog/ViewEvent/ViewEvent';

const ModalDialogs = () => {
  return (
    <>
      <StyledAddevent />
      <AddCalendar />
      <ViewEvent />
    </>
  );
};

export default ModalDialogs;

import CurrentUserInfo from 'Containers/Main/Menu/CurrentUserInfo';
import CalendarList from './Calendars';

const Menu = () => {
  return (
    <section>
      <h1>RESERVE MEET</h1>
      <CurrentUserInfo />
      <CalendarList />
    </section>
  );
};

export default Menu;

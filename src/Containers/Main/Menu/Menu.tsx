import { DefaultProps } from 'const/type';
import CurrentUserInfo from 'Containers/Main/Menu/CurrentUserInfo';
import CalendarList from './Calendars';

const Menu = ({ className }: DefaultProps) => {
  return (
    <section className={className}>
      <CurrentUserInfo />
      <CalendarList />
    </section>
  );
};

export default Menu;

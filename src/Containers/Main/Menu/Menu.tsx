import { DefaultProps } from 'const/type';
import CurrentUserInfo from 'Containers/Main/Menu/CurrentUserInfo';
import { MouseEventHandler } from 'react';
import { useRecoilState } from 'recoil';
import { isOpenMenuState } from 'state/state';
import CalendarList from './Calendars';

const Menu = ({ className }: DefaultProps) => {
  const [isOpenMenu, setIsOpenMenu] = useRecoilState(isOpenMenuState);

  const controlMenuHandler: MouseEventHandler<Element> = e => {
    setIsOpenMenu(!isOpenMenu);
  };

  return (
    <section className={className}>
      <CurrentUserInfo />
      <CalendarList />
      <button onClick={controlMenuHandler}>{isOpenMenu ? '<' : '>'}</button>
    </section>
  );
};

export default Menu;

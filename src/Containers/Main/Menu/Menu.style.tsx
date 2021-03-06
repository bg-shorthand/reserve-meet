import { COLORS } from 'const/const';
import { useRecoilValue } from 'recoil';
import { isOpenMenuState } from 'state/state';
import styled from 'styled-components';
import Menu from './Menu';

const StyledMenu = styled(Menu)`
  min-width: ${() => {
    const isOpenMenu = useRecoilValue(isOpenMenuState);
    return isOpenMenu ? '200px' : '0';
  }};
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding-top: 20px;
  background-color: ${COLORS.MENU_BACKGROUND};
  color: ${COLORS.HEADER_WHITE};
  position: relative;
  transition: all 100ms;

  & *:not(button:last-child) {
    margin: 10px;
    ${() => {
      const isOpenMenu = useRecoilValue(isOpenMenuState);
      return isOpenMenu ? '' : 'display: none';
    }}
  }

  img {
    border-radius: 50%;
  }
  figcaption {
    text-align: center;
  }

  button:last-child {
    position: absolute;
    background-color: ${COLORS.MENU_BACKGROUND};
    border-radius: 0 5px 5px 0;
    top: 10px;
    left: 100%;
    height: 50px;
  }
`;

export default StyledMenu;

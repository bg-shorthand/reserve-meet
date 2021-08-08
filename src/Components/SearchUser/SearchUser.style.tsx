import { COLORS } from 'const/const';
import styled from 'styled-components';
import SearchUser from './SearchUser';

const StyledSearchUser = styled(SearchUser)`
  position: relative;
  max-width: 500px;

  & * {
    margin: 0;
    width: 100%;
  }

  & ul {
    background-color: ${COLORS.GRAY_LEVEL_2};
    padding: 5px;
    border-radius: 5px;
    position: absolute;
    top: 0;
    left: 105%;
    box-shadow: 0 5px 10px ${COLORS.BLACK};
    width: fit-content;

    & li {
      display: flex;
      padding: 5px;
      align-items: center;
      cursor: pointer;
    }

    & .selected {
      font-weight: 700;
    }

    & img {
      width: 2em;
      border-radius: 50%;
      margin-right: 1em;
    }
  }
`;

export default StyledSearchUser;

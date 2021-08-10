import { COLORS } from 'const/const';
import styled from 'styled-components';
import AdminList from './AdminList';

const StyledAdminList = styled(AdminList)`
  background-color: ${COLORS.MAIN_GRAY};
  padding: 15px 50px;
  border-radius: 5px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-evenly;

  & > * {
    width: 100%;
  }
  & > article:last-child {
    padding-left: 20px;
    border-left: 1px solid;
    display: flex;
    flex-flow: column nowrap;

    & > article {
      width: 100%;

      & > ul {
        top: 5px;
        left: 0;

        li {
          padding-right: 0;
        }
      }
    }

    & > button {
      align-self: flex-end;
    }
  }

  h3 {
    font-weight: 600;
    margin-bottom: 20px;
  }

  & ul {
    margin: 20px 0;

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-right: 20px;
    }
  }
`;

export default StyledAdminList;

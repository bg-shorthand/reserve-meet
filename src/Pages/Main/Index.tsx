import { Route } from 'react-router';
import { Switch, Redirect } from 'react-router-dom';
import StyledReserveTable from 'Containers/Main/Contents/ReserveTable/ReserveTable.style';
import StyledMenu from 'Containers/Main/Menu/Menu.style';
import StyledWeeklySchedule from 'Containers/Main/Contents/WeeklySchedule/WeeklySchedule.style';
import StyledHeader from 'Containers/Header/Header.style';
import StyledFooter from 'Containers/Footer/Footer.style';
import StyledMain from 'Containers/Main/Main.style';
import Admin from 'Containers/Main/Contents/Admin/Admin';

const Index = () => {
  return (
    <>
      <StyledHeader />
      <StyledMain>
        <StyledMenu />
        <Switch>
          <Route exact path={'/'} component={StyledWeeklySchedule} />
          <Route path={'/reserve-state/:calId'} component={StyledReserveTable} />
          <Route path={'/admin'} component={Admin} />
          <Redirect to={'/'} />
        </Switch>
      </StyledMain>
      <StyledFooter />
    </>
  );
};

export default Index;

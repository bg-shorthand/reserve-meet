import { Route } from 'react-router';
import { Switch, Redirect } from 'react-router-dom';
import ReserveTable from 'Containers/Main/Contents/ReserveState/ReserveTable';
import StyledMenu from 'Containers/Main/Menu/Menu.style';
import Summary from 'Containers/Main/Contents/Summary/Summary';
import StyledHeader from 'Containers/Header/Header.style';
import StyledFooter from 'Containers/Footer/Footer.style';
import StyledMain from 'Containers/Main/Main.style';

const Index = () => {
  return (
    <>
      <StyledHeader />
      <StyledMain>
        <StyledMenu />
        <Switch>
          <Route exact path={'/'} component={Summary} />
          <Route path={'/reserve-state/:calId'} component={ReserveTable} />
          <Redirect to={'/'} />
        </Switch>
      </StyledMain>
      <StyledFooter />
    </>
  );
};

export default Index;

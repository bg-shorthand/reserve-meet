import { Route } from 'react-router';
import { Switch, Redirect } from 'react-router-dom';
import StyledReserveState from 'Containers/Main/Contents/ReserveState/ReserveState.style';
import StyledMenu from 'Containers/Main/Menu/Menu.style';
import StyledHeader from 'Containers/Header/Header.style';
import StyledFooter from 'Containers/Footer/Footer.style';
import StyledMain from 'Containers/Main/Main.style';
import StyledAdmin from 'Containers/Main/Contents/Admin/Admin.style';

const Index = () => {
  return (
    <>
      <StyledHeader />
      <StyledMain>
        <StyledMenu />
        <Switch>
          <Route exact path={'/'} component={StyledReserveState} />
          <Route path={'/admin'} component={StyledAdmin} />
          <Redirect to={'/'} />
        </Switch>
      </StyledMain>
      <StyledFooter />
    </>
  );
};

export default Index;

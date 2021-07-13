import { Route } from 'react-router';
import { Switch, Redirect } from 'react-router-dom';
import ReserveState from 'Pages/ReserveState/ReserveState';
import Menu from 'Containers/Menu/Menu';
import Main from 'Containers/Main/Main';

const Index = () => {
  return (
    <>
      <Menu />
      <Switch>
        <Route exact path={'/'} component={Main} />
        <Route path={'/reserve-state/:calId'} component={ReserveState} />
        <Redirect to={'/'} />
      </Switch>
    </>
  );
};

export default Index;

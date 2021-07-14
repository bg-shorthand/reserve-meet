import { Route } from 'react-router';
import { Switch, Redirect } from 'react-router-dom';
import ReserveTable from 'Containers/Main/Contents/ReserveState/ReserveTable';
import Menu from 'Containers/Main/Menu/Menu';
import Summary from 'Containers/Main/Contents/Summary/Summary';
import Header from 'Containers/Header/Header';
import Footer from 'Containers/Footer/Footer';

const Index = () => {
  return (
    <>
      <Header />
      <main>
        <Menu />
        <Switch>
          <Route exact path={'/'} component={Summary} />
          <Route path={'/reserve-state/:calId'} component={ReserveTable} />
          <Redirect to={'/'} />
        </Switch>
      </main>
      <Footer />
    </>
  );
};

export default Index;

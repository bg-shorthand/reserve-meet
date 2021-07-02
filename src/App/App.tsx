import { Route, Switch } from 'react-router-dom';
import Signin from 'Pages/Signin/Signin';
import Main from 'Pages/Main/Main';
import { handleClientLoad } from 'gcp/gcp';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    handleClientLoad();
  });

  return (
    <Switch>
      <Route path="/main" component={Main} />
      <Route path="/" exact component={Signin} />
    </Switch>
  );
}

export default App;

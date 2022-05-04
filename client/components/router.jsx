import { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home } from './home/_home';
import { AuthContext } from '../utils/auth_context';
import { SignIn } from './sign_in/_sign_in';
import { SignUp } from './sign_up/_sign_up';
import { SnapshotsHome } from './snapshots/_snapshots_home';

export const Router = () => {
  const [authToken] = useContext(AuthContext);

  return (
    <Switch>
      <Route exact path={'/'} component={authToken ? Home : SignIn} />
      <Route exact path={'/signin'} component={SignIn} />
      <Route exact path={'/signup'} component={SignUp} />
      <Route exact path={'/snapshots'} component={authToken ? SnapshotsHome : SignIn} />
      <Route exact path={'/snapshots/:id'} component={authToken ? SnapshotsHome : SignIn} />
      <Route exact path={'/*'} component={authToken ? Home : SignIn} />
    </Switch>
  );
};

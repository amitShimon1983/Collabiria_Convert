import { useReactiveVar } from '@apollo/client';
import React, { FunctionComponent } from 'react';
import { Route } from 'react-router-dom';
import { appContextVar, GraphAuthentication } from '@harmonie/services';
import { Login } from '../../../new_components/auth';

interface GuardRouteProps {
  exact?: boolean;
  path: string;
  handleLogin?: (() => void) | undefined;
}

const GuardRoute: FunctionComponent<GuardRouteProps> = ({ children, exact, path, handleLogin }) => {
  const { isAuthenticate } = useReactiveVar(appContextVar);
  return (
    <Route
      path={path}
      exact={exact}
      render={props => (isAuthenticate ? children : <Login handleLogin={handleLogin} />)}
    />
  );
};

export default GuardRoute;

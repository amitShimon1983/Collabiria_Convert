import { useReactiveVar } from '@apollo/client';
import React, { FunctionComponent } from 'react';
import { Route } from 'react-router-dom';
import { appContextVar } from '@harmonie/services';
import { Login } from '../../../new_components/auth';

interface GuardRouteProps {
  exact?: boolean;
}

const GuardRoute: FunctionComponent<GuardRouteProps> = ({ children, exact }) => {
  const { isAuthenticate } = useReactiveVar(appContextVar);
  return <Route exact={exact} render={props => (isAuthenticate ? children : <Login />)} />;
};

export default GuardRoute;

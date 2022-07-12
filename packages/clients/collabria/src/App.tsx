import React, { FunctionComponent, useState } from 'react';
import { AppContainer, FinishAuth, GuardRoute } from '@harmonie/ui';
import { GraphAuthentication } from '@harmonie/services';
import { BrowserRouter as Router, Switch, Route, Redirect, useLocation } from 'react-router-dom';
import appConfig from './configuration/configuration';
import { CreateTeam, Home, Shell, Team } from './components';
import './App.css';
interface AppProps {}

const App: FunctionComponent<AppProps> = () => {
  const [graphAuthentication, setGraphAuthentication] = useState<GraphAuthentication>();
  const { pathname } = useLocation();

  return (
    <AppContainer
      setGraphAuthentication={setGraphAuthentication}
      appConfig={appConfig}
      needToRefresh={!pathname?.includes('auth')}
    >
      <Router>
        <Switch>
          <GuardRoute
            handleLogin={graphAuthentication?.handleAzureLogin?.bind(graphAuthentication)}
            path={`/home`}
            exact
          >
            <Shell>
              <Home />
            </Shell>
          </GuardRoute>
          <GuardRoute
            path={`/organizations/:organizationObjectId/teams/:teamObjectId`}
            exact
            handleLogin={graphAuthentication?.handleAzureLogin?.bind(graphAuthentication)}
          >
            <Shell>
              <Team />
            </Shell>
          </GuardRoute>
          <GuardRoute
            path={`/organizations/:organizationObjectId/teams/create`}
            exact
            handleLogin={graphAuthentication?.handleAzureLogin?.bind(graphAuthentication)}
          >
            <Shell>
              <CreateTeam />
            </Shell>
          </GuardRoute>
          <Route path={`/collabria/auth/end`} exact>
            <FinishAuth
              successUrl={'/home'}
              faildUrl={'/login'}
              appConfig={appConfig}
              authenticateUser={graphAuthentication?.authenticateUser?.bind(graphAuthentication)}
              url={`${window.location.origin}${appConfig.appBaseName}${appConfig.finishAuthRedirectEndpoint}`}
            />
          </Route>
          <Route path="*" render={() => <Redirect to={`/home`} />} />
        </Switch>
      </Router>
    </AppContainer>
  );
};

export default App;

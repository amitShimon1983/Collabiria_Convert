import React, { FunctionComponent, useState } from 'react';
import { AppContainer, FinishAuth, GuardRoute } from '@harmonie/ui';
import { GraphAuthentication } from '@harmonie/services';
import { BrowserRouter as Router, Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { SharePage } from './component';
import Settings from './component/Settings';
import appConfig from './configuration/configuration';
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
            path={`${appConfig.appBaseName}/shared`}
            exact
          >
            <SharePage />
          </GuardRoute>
          <GuardRoute
            path={`${appConfig.appBaseName}/settings`}
            exact
            handleLogin={graphAuthentication?.handleAzureLogin?.bind(graphAuthentication)}
          >
            <Settings />
          </GuardRoute>
          <Route path={`${appConfig.appBaseName}${appConfig.finishAuthRedirectEndpoint}`} exact>
            <FinishAuth
              faildUrl={`${appConfig.appBaseName}/login`}
              successUrl={`${appConfig.appBaseName}/shared`}
              appConfig={appConfig}
              authenticateUser={graphAuthentication?.authenticateUser?.bind(graphAuthentication)}
              url={`${window.location.origin}${appConfig.appBaseName}${appConfig.finishAuthRedirectEndpoint}`}
            />
          </Route>
          <Route path="*" render={() => <Redirect to={`${appConfig.appBaseName}/shared`} />} />
        </Switch>
      </Router>
    </AppContainer>
  );
};

export default App;
const Home: FunctionComponent = () => <div>Hi</div>;

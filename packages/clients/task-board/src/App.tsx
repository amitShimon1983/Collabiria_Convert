import React, { FunctionComponent, useState } from 'react';
import { AppContainer, GuardRoute } from '@harmonie/ui';
import { GraphAuthentication } from '@harmonie/services';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { SharePage } from './component';
interface AppProps {}

const App: FunctionComponent<AppProps> = () => {
  const [graphAuthentication, setGraphAuthentication] = useState<GraphAuthentication>();
  return (
    <AppContainer
      setGraphAuthentication={setGraphAuthentication}
      appConfig={{}}
      needToRefresh={!'pathname'.includes('auth')}
    >
      <Router>
        <Switch>
          <GuardRoute exact>
            <SharePage />
          </GuardRoute>
        </Switch>
      </Router>
    </AppContainer>
  );
};

export default App;
const Home: FunctionComponent = () => <div>Hi</div>;

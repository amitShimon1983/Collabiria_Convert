import React, { FunctionComponent, useEffect, useState } from 'react';
import { ApolloProvider, ApolloClient } from '@apollo/client';
import { ApolloClientProvider } from '@harmonie/services';

interface StoreProviderProps {
  appConfig: { [key: string]: any };
  needToRefresh: boolean;
}

const StoreProvider: FunctionComponent<StoreProviderProps> = ({ children, appConfig, needToRefresh }) => {
  const [client, setClient] = useState<ApolloClient<any>>();
  useEffect(() => {
    if (!client) {
      const apolloProvider = new ApolloClientProvider(appConfig, needToRefresh);
      setClient(apolloProvider.client);
    }
  }, []);

  return (client && <ApolloProvider client={client}>{children}</ApolloProvider>) || <></>;
};

export default StoreProvider;

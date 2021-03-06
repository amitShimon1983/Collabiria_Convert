import React, { FunctionComponent, useEffect, useState } from 'react';
import { Box, Text, Button } from '@harmonie/ui';
import { useHistory } from 'react-router-dom';
import { appContextVar, AuthProvider } from '@harmonie/services';
interface FinishAuthProps {
  url?: string;
  successUrl: string;
  faildUrl: string;
  authenticateUser: any;
  appConfig: { [key: string]: any };
}

const FinishAuth: FunctionComponent<FinishAuthProps> = ({ url, authenticateUser, appConfig, faildUrl, successUrl }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const appContext = appContextVar();
  const history = useHistory();
  useEffect(() => {
    authenticateUser(url, onLoginSuccess, onLoginFailed);
  }, []);
  const onLoginSuccess = (data: any) => {
    if (data?.userDetailsToken) {
      setIsLoading(false);
      setIsSuccess(data?.isAuthenticate);
      const authProvider = new AuthProvider(appConfig);
      const res = authProvider?.onAuthenticationSuccess(data);
      appContextVar({
        ...appContext,
        user: res?.user,
        isAuthenticate: res?.isAuthenticate,
        isNewUser: res?.isNewUser,
      });
    } else {
      setIsLoading(false);
    }
  };
  const onLoginFailed = (reason: any) => {
    setIsLoading(false);
  };
  const navigateTo = (routeName: string) => {
    history.push(routeName);
  };
  if (isLoading) {
    return <div>We are verifying your identity...</div>;
  }
  const component = isSuccess ? (
    <SuccessLogin navigateTo={() => navigateTo(successUrl)} />
  ) : (
    <ErrorLogin navigateTo={() => navigateTo(faildUrl)} />
  );
  return <Box>{component}</Box>;
};

export default FinishAuth;

const ErrorLogin = ({ navigateTo }: { navigateTo: () => void }) => {
  return (
    <Box>
      <Text>Sorry but we could not verify your identity ❌</Text>
      <Button onClick={navigateTo}>Return</Button>
    </Box>
  );
};

const SuccessLogin = ({ navigateTo }: { navigateTo: () => void }) => {
  setTimeout(() => {
    navigateTo();
  }, 1500);

  return (
    <Box>
      <Text>Successfully Connected ✔️</Text>
    </Box>
  );
};

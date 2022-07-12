import React from 'react';
import { Box, Text } from '@harmonie/ui';
import appConfig from '../configuration/configuration';

const Home = () => {
  const handleLogout = () => {
    const requestUrl = `${appConfig.serverBaseUrl}/api/getTest`;
    fetch(requestUrl, {
      method: 'GET',
      credentials: 'include',
      redirect: 'follow',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch(error => {
      // eslint-disable-next-line no-console
      console.log('error', error);
    });
  };

  return (
    <>
      <Box asColumn padding="xl">
        <Box justify="space-between">
          <Box>
            <button onClick={handleLogout}>getTest</button>
            <Text>Home 222</Text>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Home;

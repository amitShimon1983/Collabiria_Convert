import React, { FunctionComponent } from 'react';
// import { Box, Text, Button } from '@harmon.ie/collabria-frontend-storybook';

interface LoginProps {
  handleLogin?: () => void;
}

const Login: FunctionComponent<LoginProps> = ({ handleLogin }) => {
  return (
    <div>
      <h1>Connect</h1>
      <button onClick={handleLogin}>Connect</button>
    </div>
  );
};

export default Login;

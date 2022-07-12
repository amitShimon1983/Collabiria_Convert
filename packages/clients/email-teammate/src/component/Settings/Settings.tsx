import { AuthProvider } from '@harmonie/services';
import { DefaultButton, Icon } from '@harmonie/ui';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import appConfig from '../../configuration/configuration';
import classes from './Settings.module.scss';

interface SettingsProps {}

const Settings: FunctionComponent<SettingsProps> = () => {
  const [authProvider, setAuthProvider] = useState<AuthProvider>();
  useEffect(() => {
    if (!authProvider) {
      setAuthProvider(new AuthProvider(appConfig));
    }
  }, []);
  const handleLogout = () => {
    authProvider?.handleLogout();
  };
  return (
    <div className={classes['settings-page']}>
      <div className={classes['page-title']}>Settings</div>
      <DefaultButton onClick={handleLogout}>Logout</DefaultButton>
      <div className={classes['settings-back']}>
        <Link to="/">
          <Icon {...{ iconName: 'ChromeClose' }} />
        </Link>
      </div>
    </div>
  );
};

export default Settings;

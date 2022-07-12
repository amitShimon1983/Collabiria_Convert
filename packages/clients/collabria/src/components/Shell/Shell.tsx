import React, { FunctionComponent, useEffect, useState, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { DefaultButton as Button, Stack, ErrorState } from '@harmonie/ui';
import { appContextVar, AuthProvider, useReactiveVar, useGetUser } from '@harmonie/services';
import appConfig from '../../configuration/configuration';
import DisplayExternalSiteButton from '../ExternalSiteButton/OpenExternalSiteButton';
import ExternalSiteEntryPoint from '../ExternalSiteEntryPoint/ExternalSiteEntryPoint';
import OrganizationStack from './OrganizationStack';
import TeamsStack from './TeamsStack';
import LoadingMask from './LoadingMask';
interface ShellProps {}
const Shell: FunctionComponent<ShellProps> = ({ children }) => {
  const history = useHistory();
  const { isNewUser } = useReactiveVar(appContextVar);
  const [hidden, setIsHidden] = useState(true);
  const [authProvider, setAuthProvider] = useState<AuthProvider>();
  const { teamObjectId, organizationObjectId } = useParams<any>();

  const { data, error, loading } = useGetUser();

  const getTeams = useCallback(
    (organizationObjectId?: string) => {
      return data?.teams.filter(({ organization: { _id } }: any) => _id === organizationObjectId);
    },
    [data]
  );

  const getDefaultTeamId = useCallback(
    (organizationObjectId: string) => {
      const [defaultTeam] = getTeams(organizationObjectId);
      return defaultTeam?._id;
    },
    [getTeams]
  );

  const navigateToOrganization = useCallback(
    (organizationObjectId: string) => {
      const teamId = getDefaultTeamId(organizationObjectId);
      history.push(`/organizations/${organizationObjectId}/teams/${teamId || 'create'}`);
    },
    [getDefaultTeamId, history]
  );

  const onNavigateToTeam = useCallback(
    (teamObjectId: string) => {
      history.push(`/organizations/${organizationObjectId}/teams/${teamObjectId}`);
    },
    [organizationObjectId, history]
  );

  const navigateToCreateTeam = useCallback(() => {
    history.push(`/organizations/${organizationObjectId}/teams/create`);
  }, [organizationObjectId, history]);

  useEffect(() => {
    if (data?.organizations && data?.teams && !teamObjectId && !organizationObjectId) {
      const [defaultOrganization] = data.organizations;
      navigateToOrganization(defaultOrganization.organization._id);
    }
  }, [data, navigateToOrganization, teamObjectId, organizationObjectId]);

  useEffect(() => {
    if (!authProvider) {
      setAuthProvider(new AuthProvider(appConfig));
    }
  }, [authProvider]);

  const handleLogout = () => {
    authProvider?.handleLogout();
    history.push('/login');
  };

  const handleRefresh = async () => {
    const requestUrl = `${appConfig.serverBaseUrl}/api/refresh`;
    await fetch(requestUrl, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
    }).catch(error => {
      // eslint-disable-next-line no-console
      console.log('error', error);
    });
  };

  const onDismiss = useCallback(() => {
    setIsHidden(true);
  }, []);

  const openSite = useCallback(() => {
    setIsHidden(false);
  }, []);

  if (loading) {
    return <LoadingMask />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <Stack horizontal tokens={{ childrenGap: 12 }} style={{ height: '100%' }}>
      <OrganizationStack items={data.organizations} onClick={navigateToOrganization} value={organizationObjectId} />
      <TeamsStack
        items={getTeams(organizationObjectId)}
        onClick={onNavigateToTeam}
        onCreate={navigateToCreateTeam}
        value={teamObjectId}
      />
      <Stack style={{ width: '100%' }}>
        <Stack horizontal disableShrink horizontalAlign="end" style={{ width: '100%', padding: '16px 0' }}>
          <Stack horizontal tokens={{ childrenGap: 12 }}>
            <Stack.Item>
              <Button onClick={handleLogout}>Disconnect</Button>
            </Stack.Item>
            <Stack.Item>
              <Button onClick={handleRefresh}>Refresh</Button>
            </Stack.Item>
          </Stack>
        </Stack>
        <Stack style={{ width: '100%', height: '100%' }}>
          {children}
          {isNewUser ||
            (!hidden && (
              <ExternalSiteEntryPoint
                externalSiteUrl={appConfig.externalSiteUrl || ''}
                onDismiss={onDismiss}
                hidden={hidden}
              />
            ))}
          <DisplayExternalSiteButton openExternalSite={openSite}>Share Email</DisplayExternalSiteButton>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Shell;

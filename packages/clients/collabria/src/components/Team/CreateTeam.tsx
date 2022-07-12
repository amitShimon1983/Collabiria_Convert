import React, { useCallback, useState } from 'react';
import { Box, H1, TextField, Button } from '@harmonie/ui';
import { useCreateTeam, useGetUserOrganizations } from '@harmonie/services';
import { appContextVar, useReactiveVar } from '@harmonie/services';

const CreateTeam = () => {
  const { user } = useReactiveVar(appContextVar);
  const [teamName, setTeamName] = useState<string | undefined>('');
  const [creatTeam, { loading }] = useCreateTeam();
  const { data: userOrganizationsData } = useGetUserOrganizations(user?._id, 'Admin');
  const userOrganizations = userOrganizationsData?.getUserOrganizations;
  const onChange = useCallback((event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    setTeamName(newValue);
  }, []);

  const onClick = useCallback(async () => {
    const userOrganizationId = userOrganizations[0]?.organization?._id;
    await creatTeam({
      variables: {
        teamName,
        userObjectId: user?._id,
        organizationObjectId: userOrganizationId,
      },
    });
  }, [teamName]);

  return (
    <Box asColumn={true} flex={0.5} margin="auto">
      <Box asColumn={true}>
        <H1 center={true} bold>
          Create a team
        </H1>
        <Box asColumn={true} style={{ background: 'rgb(189, 189, 189)' }} padding={'xl'} margin={'xs'} bordered={true}>
          <H1 bold>Name</H1>
          <TextField underlined onChange={onChange} style={{ background: 'rgb(189, 189, 189)' }} />
        </Box>
        <Box style={{ background: '#c4c4c4' }} padding={'xl'} margin={'xs'} bordered={true}>
          <H1 bold>Invite collabrians</H1>
        </Box>
      </Box>
      <Box margin={'xs'} bordered={false} reversed={true}>
        <Button
          styles={{
            root: [
              {
                height: 50,
                width: 100,
                borderRadius: 6,
              },
            ],
          }}
          onClick={onClick}
          disabled={loading}
          loading={loading}
        >
          Add team
        </Button>
      </Box>
    </Box>
  );
};

export default CreateTeam;

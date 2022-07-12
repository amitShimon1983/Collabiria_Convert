import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Text, H1, SimpleVirtualList, CustomRowRendererProps, Skeleton } from '@harmonie/ui';
import { ApolloConsumer, GET_TEAM_ROOT_MESSAGES, ApolloClient } from '@harmonie/services';
import LoadingMask from '~/components/Shell/LoadingMask';

const Item = ({ style, index, rowHeight, item }: any) => (
  <Box style={style} key={`item-${index}`} width="100%" align="center" padding="xss">
    <Box padding="xxs,0" align="center" height={rowHeight} style={{ width: 'calc(100% - 6px)' }}>
      <Box padding="0,xs" asColumn clip bordered width="100%" height="100%" justify="center">
        {item ? (
          <>
            <Text bold clip>
              {item.subject} - {index}
            </Text>
            <Text>
              {item.subject} - {index}
            </Text>
          </>
        ) : (
          <Skeleton variant="text" />
        )}
      </Box>
    </Box>
  </Box>
);

const Team = () => {
  const rowHeight = 80;
  const { teamObjectId } = useParams<any>();
  const [loading, setLoading] = useState<string | undefined>();

  const getMoreRows = async (client: ApolloClient<any>, startIndex: number, pageSize: number): Promise<any> => {
    const { loading, error, data } = await client.query({
      query: GET_TEAM_ROOT_MESSAGES,
      variables: {
        teamObjectId,
        skip: startIndex,
        limit: pageSize,
      },
    });
    return {
      loading,
      error,
      data: data?.getTeamRootMessages,
    };
  };

  if (loading !== teamObjectId) {
    setTimeout(() => setLoading(teamObjectId), 100);
    return <LoadingMask />;
  }

  return (
    <ApolloConsumer>
      {(client: ApolloClient<any>) => {
        return (
          <Box asColumn height="100%">
            <H1>Team {teamObjectId}</H1>
            <Box width={240} height={'100%'}>
              <SimpleVirtualList
                rowHeight={rowHeight}
                getMoreRows={(startIndex: number, pageSize: number) => getMoreRows(client, startIndex, pageSize)}
                CustomRowRenderer={(props: CustomRowRendererProps) => <Item {...props} />}
              />
            </Box>
          </Box>
        );
      }}
    </ApolloConsumer>
  );
};

export default Team;

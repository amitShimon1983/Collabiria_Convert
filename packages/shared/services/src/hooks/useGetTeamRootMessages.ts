import { useQuery, gql } from './apollo';

export const GET_TEAM_ROOT_MESSAGES = gql`
  query getTeamRootMessages(
    $teamObjectId: String
    $searchText: String
    $filters: Filters
    $skip: Float
    $limit: Float
  ) {
    getTeamRootMessages(
      args: { teamObjectId: $teamObjectId, searchText: $searchText, filters: $filters, skip: $skip, limit: $limit }
    ) {
      records {
        subject
        bodyPreview
      }
      endCursor
      hasNextPage
      page
      total
    }
  }
`;

export const useGetTeamRootMessages = ({
  teamObjectId,
  searchText,
  filters,
  skip,
  limit,
}: {
  teamObjectId?: string;
  searchText?: string;
  filters?: any;
  skip?: number;
  limit?: number;
}) => {
  return useQuery(GET_TEAM_ROOT_MESSAGES, {
    skip: !teamObjectId,
    variables: {
      teamObjectId,
      searchText,
      filters,
      skip,
      limit,
    },
  });
};

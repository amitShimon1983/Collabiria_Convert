import React, { useMemo } from 'react';
import { gql, useQuery } from '@harmon.ie/collabria-frontend-shared';

export const SEARCH_PEOPLE_QUERY = gql`
  query findPeople($text: String) {
    findPeople(args: { text: $text }) {
      name
      address
    }
  }
`;

const usePeopleSearch = (search?: string) => {
  const { loading, data, error } = useQuery(SEARCH_PEOPLE_QUERY, {
    variables: { text: search },
    skip: !search,
  });

  const res = useMemo(
    () => ({
      data: data?.findPeople,
      error,
      loading,
    }),
    [error, loading, data?.findPeople]
  );

  return res;
};

export default usePeopleSearch;

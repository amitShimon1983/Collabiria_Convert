import { gql, useLazyQuery } from './apollo';
import React, { useState } from 'react';

const GET_PROFILE_PICTURE = gql`
  query GetProfilePicture($principalName: String!) {
    getProfilePicture(args: { principalName: $principalName }) {
      base64ByteArray
      principalName
    }
  }
`;

const pictureMaxInvalidationTime = 604800000; //1 Week

function isPictureValid(timeCached: number) {
  return pictureMaxInvalidationTime > Date.now() - timeCached;
}

export function useProfilePicture(emailAddress: any) {
  const [photoDetails, cachePhotoDetails] = useState(emailAddress);
  const [getProfilePicture, { data, called }] = useLazyQuery(GET_PROFILE_PICTURE, {
    variables: {
      principalName: emailAddress,
    },
  });

  if (!emailAddress?.trim()) {
    return null;
  }

  if (photoDetails && isPictureValid(photoDetails.timeCached)) {
    return photoDetails.base64ByteArray;
  }

  if (!called && emailAddress) {
    getProfilePicture();
  }

  if (data) {
    cachePhotoDetails({ base64ByteArray: data?.getProfilePicture?.base64ByteArray, timeCached: Date.now() });
  }

  return null;
}

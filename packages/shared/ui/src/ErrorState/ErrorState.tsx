import React, { useEffect, useState } from 'react';
import { Text } from 'office-ui-fabric-react';
// import './ErrorState.scss';

const ErrorState = ({
  error,
  isMobile = false,
  className = '',
  absolute = false,
}: {
  error: Error;
  isMobile?: boolean;
  className?: string;
  absolute?: boolean;
}) => {
  const [appError, setAppError] = useState<string>();
  useEffect(() => {
    if (error?.message && !error?.message?.includes('token T in JSON')) {
      setAppError(error?.message);
    } else {
      setAppError('Something went wrong. Please try again later.');
    }
  }, [error]);
  return (
    <div
      className={`${absolute ? 'absolute-error-state' : ''} ${
        isMobile ? 'error-state-mobile' : 'error-state'
      } ${className}`}
    >
      <img src="https://static-teammate.azureedge.net/static/cant-share-mail.svg" alt={'failed'} />
      <Text variant="medium" className={`text`}>
        {appError ? appError : ''}
      </Text>
    </div>
  );
};

export default ErrorState;

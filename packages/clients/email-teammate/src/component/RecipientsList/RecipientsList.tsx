import React, { FunctionComponent, useMemo } from 'react';
import desktopClasses from './RecipientsList.module.scss';
import mobileClasses from './RecipientsListMobile.module.scss';

interface RecipientsListProps {
  emailAddress: any[];
  title: string;
  isMobile: boolean;
}

const RecipientsList: FunctionComponent<RecipientsListProps> = ({ emailAddress, title, isMobile }) => {
  const classes = useMemo(() => (isMobile ? mobileClasses : desktopClasses), [isMobile]);
  return (
    <div className={classes.information}>
      <b>{title}</b>{' '}
      {emailAddress?.map?.((t: any, idx: number) => (
        <span key={t?.emailAddress?.name + idx}>
          {idx > 0 ? ', ' : ' '} {t?.emailAddress?.name} {`<${t?.emailAddress?.address}>`}
        </span>
      ))}
    </div>
  );
};

export default RecipientsList;

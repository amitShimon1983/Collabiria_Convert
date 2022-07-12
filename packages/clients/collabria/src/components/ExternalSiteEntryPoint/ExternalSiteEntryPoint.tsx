import React, { useEffect, useState } from 'react';
import classes from './ExternalSiteEntryPoint.module.scss';
import { Modal, IconButton } from '@harmonie/ui';

interface ExternalSiteEntryPointProps {
  onDismiss?: (ev?: React.MouseEvent<HTMLButtonElement>) => any;
  hidden: boolean;
  externalSiteUrl: string;
}
const ExternalSiteEntryPoint = ({ hidden, onDismiss, externalSiteUrl }: ExternalSiteEntryPointProps) => {
  const [show, setShow] = useState<boolean>();
  useEffect(() => {
    if (hidden) {
      setShow(false);
    }
  }, [hidden]);

  return (
    <Modal
      styles={{ scrollableContent: { overflow: 'hidden' }, main: { display: hidden ? 'none' : '' } }}
      containerClassName={classes.container}
      onDismiss={onDismiss}
      className={classes.content}
      isOpen={show}
      allowTouchBodyScroll={true}
      scrollableContentClassName={classes.content}
    >
      <div className={classes.buttonContainer}>
        <IconButton
          className={classes.button}
          iconProps={{ iconName: 'Cancel' }}
          ariaLabel="Close popup modal"
          onClick={onDismiss}
        />
      </div>
      <iframe className={classes.iframe_container} src={externalSiteUrl}></iframe>
    </Modal>
  );
};
export default ExternalSiteEntryPoint;

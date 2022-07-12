import React, { FunctionComponent } from 'react';
import classes from './DisplayExternalSiteButton.module.scss';
import { DefaultButton as Button } from '@harmonie/ui';

interface DisplayExternalSiteButtonProps {
  openExternalSite: () => void;
  children: React.ReactNode;
}

export const openExternalSiteButtonStyle = () => {
  return {
    root: {
      height: 42,
      borderRadius: 6,
      transition: 'width 1s ease-in-out',
      minWidth: '50px',
    },
    flexContainer: {
      justifyContent: 'unset',
    },
    iconHovered: {
      transform: 'rotate(180deg)',
      transition: '0.4s ease-in-out',
    },
    icon: {
      transform: 'rotate(0deg)',
      transition: '0.4s ease-in-out',
    },
  };
};
const DisplayExternalSiteButton: FunctionComponent<DisplayExternalSiteButtonProps> = ({
  openExternalSite,
  children,
}) => {
  return (
    <div className={classes.container}>
      <Button
        styles={openExternalSiteButtonStyle()}
        className={classes.button}
        iconProps={{ iconName: 'Add' }}
        onClick={() => openExternalSite()}
      >
        <span className={classes.text}>{children}</span>
      </Button>
    </div>
  );
};
export default DisplayExternalSiteButton;

import { Panel, PanelType } from '@harmonie/ui';
import React from 'react';
import classes from './mobileSidePan.module.scss';

export interface SidePanProps {
  isOpen: boolean;
  isFooterAtBottom?: boolean;
  className?: string;
  headerText?: string;
  dismissPanel: (ev: any) => void;
  IconElement?: any;
  styles?: any;
  onRenderNavigationContent?: any;
  onRenderFooterContent?: any;
}
const MobileSidePan: React.FC<SidePanProps> = ({
  isOpen,
  dismissPanel,
  IconElement,
  styles,
  className,
  headerText,
  children,
  onRenderNavigationContent,
  onRenderFooterContent,
  isFooterAtBottom,
}) => {
  return (
    <div className={classes.MobileSidePane}>
      {!!IconElement && IconElement}
      <Panel
        headerText={headerText}
        className={className}
        type={PanelType.smallFixedFar}
        isOpen={isOpen}
        onDismiss={dismissPanel}
        closeButtonAriaLabel="Close"
        styles={styles}
        onRenderNavigationContent={onRenderNavigationContent}
        onRenderFooterContent={onRenderFooterContent}
        allowTouchBodyScroll={true}
        isFooterAtBottom={isFooterAtBottom}
      >
        {children}
      </Panel>
    </div>
  );
};

export default MobileSidePan;

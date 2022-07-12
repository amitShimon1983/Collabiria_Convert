import React, { FunctionComponent } from 'react';

import { Modal } from '@fluentui/react';

interface BaseModalProps {
  onDismiss?: () => void;
  isOpen: boolean;
  isMobile: boolean;
}
function getStyle({ isOpen, isMobile }: { isOpen: boolean; isMobile: boolean }) {
  let style: any = {};
  if (isOpen) {
    style = {
      layer: { transition: 'width 2s, height 4s' },
      main: { borderRadius: '15px', transition: 'width 2s, height 4s' },
      root: { transition: 'width 2s, height 4s' },
    };
    if (isMobile) {
      style = {
        style,
        root: { ...style.root },
        layer: { ...style.layer },
        main: {
          ...style.main,
          width: '100%',
          height: '100%',
          maxHeight: '100%',
          minHeight: '100%',
          minWidth: '100%',
          maxWidth: '100%',
          borderRadius: '0px',
        },
        scrollableContent: { width: '100%', height: '100%' },
      };
    }
    return style;
  }

  return {
    layer: { width: '0px', height: '0px', display: 'none' },
    main: { width: '0px', height: '0px', display: 'none' },
    root: { width: '0px', height: '0px', display: 'none' },
  };
}
const BaseModal: FunctionComponent<BaseModalProps> = ({ isOpen, onDismiss, children, isMobile }) => {
  return (
    <Modal
      isOpen={isOpen}
      onDismiss={onDismiss}
      styles={getStyle({ isOpen, isMobile })}
      allowTouchBodyScroll={isMobile}
    >
      {children}
    </Modal>
  );
};

export default BaseModal;

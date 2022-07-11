import React from 'react';
import { TooltipHost, DirectionalHint, ITooltipHostProps } from '@fluentui/react';

const Tooltip = ({
  closeDelay,
  styles,
  calloutProps,
  id,
  tooltipProps,
  content,
  directionalHint = DirectionalHint.bottomCenter,
  children,
}: ITooltipHostProps) => {
  return (
    <div>
      <TooltipHost
        tooltipProps={tooltipProps}
        content={content}
        closeDelay={closeDelay}
        id={id}
        calloutProps={calloutProps}
        styles={styles}
        directionalHint={directionalHint}
      >
        {children}
      </TooltipHost>
    </div>
  );
};

export default Tooltip;

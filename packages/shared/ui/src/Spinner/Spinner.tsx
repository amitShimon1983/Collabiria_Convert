import React from 'react';
import { Spinner as FabricSpinner, ISpinnerProps, SpinnerSize } from '@fluentui/react';

const Spinner = ({ className, style, label, size = SpinnerSize.large, ariaLive, labelPosition }: ISpinnerProps) => {
  return (
    <FabricSpinner
      className={className}
      style={style}
      size={size}
      label={label}
      ariaLive={ariaLive}
      labelPosition={labelPosition}
    />
  );
};

export default Spinner;

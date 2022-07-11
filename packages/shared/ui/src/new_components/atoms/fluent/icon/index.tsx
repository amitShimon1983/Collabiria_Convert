import { Icon as FluentIcon, IIconProps } from '@fluentui/react';
import React, { FunctionComponent } from 'react';

interface IconButtonProps extends IIconProps {
  iconName?: string;
}

export const Icon: FunctionComponent<IIconProps> = (props: IIconProps) => {
  return <FluentIcon iconName={props.iconName || ''} {...props} />;
};

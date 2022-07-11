import {
  IButtonProps,
  IconButton as FluentIconButton,
  PrimaryButton as FluentPrimaryButton,
  DefaultButton as FluentDefaultButton,
} from '@fluentui/react/lib/Button';
import { IIconProps } from '@fluentui/react/lib';
import React, { FunctionComponent } from 'react';
interface IconButtonProps {
  id?: any;
  styles?: any;
  onClick?: () => void;
  iconProps?: IIconProps;
  title?: string;
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
  menuProps?: any;
}
interface PrimaryButtonProp extends IButtonProps {}
interface DefaultButtonProp extends IButtonProps {}

export const IconButton: FunctionComponent<IconButtonProps> = ({
  id,
  styles,
  onClick,
  iconProps,
  title,
  className,
  ariaLabel,
  disabled,
  menuProps,
  ...rest
}) => {
  return (
    <FluentIconButton
      className={className}
      onClick={onClick}
      iconProps={iconProps}
      title={title}
      ariaLabel={ariaLabel}
      disabled={disabled}
      menuProps={menuProps}
      {...rest}
    />
  );
};
export const DefaultButton: FunctionComponent<DefaultButtonProp> = ({
  onClick,
  iconProps,
  title,
  ariaLabel,
  ...rest
}) => {
  return <FluentDefaultButton onClick={onClick} iconProps={iconProps} title={title} ariaLabel={ariaLabel} {...rest} />;
};
export const PrimaryButton: FunctionComponent<PrimaryButtonProp> = ({
  onClick,
  iconProps,
  title,
  ariaLabel,
  children,
  ...rest
}) => {
  return (
    <FluentPrimaryButton onClick={onClick} iconProps={iconProps} title={title} ariaLabel={ariaLabel} {...rest}>
      {children}
    </FluentPrimaryButton>
  );
};

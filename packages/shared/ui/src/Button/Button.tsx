import React from 'react';
import { DefaultButton, IButtonProps, Spinner, IButtonStyles } from '@fluentui/react';

const componentStyles = {
  root: [
    {
      height: 42,
      borderRadius: 6,
      transition: 'width 1s ease-in-out',
    },
  ],
};

export interface ButtonProps extends IButtonProps {
  loading?: boolean;
  styles?: IButtonStyles;
}

const Button = ({ loading, text, children, styles, ...rest }: ButtonProps) => {
  return (
    <DefaultButton {...rest} styles={styles ? styles : componentStyles}>
      {text || children}
      {loading && <Spinner style={{ marginLeft: 6 }} />}
    </DefaultButton>
  );
};

export default Button;

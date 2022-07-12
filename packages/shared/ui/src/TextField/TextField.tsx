import React from 'react';
import { TextField as TextFieldPersona, ITextFieldProps } from '@fluentui/react';

const TextField = (props: React.PropsWithChildren<ITextFieldProps>) => {
  return <TextFieldPersona {...props} />;
};

export default TextField;

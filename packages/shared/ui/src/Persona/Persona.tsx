import React from 'react';
import { IPersonaProps, Persona as FabricPersona } from '@fluentui/react';
import Highlighter from 'react-highlighter';

type Props = IPersonaProps & {
  search?: string;
  highlightStyle?: any;
  imageUrl?: string;
};

const Persona = ({ search, highlightStyle, imageUrl, ...rest }: Props) => {
  const highlightText = (text: string) => (
    <Highlighter matchElement="span" matchStyle={{ ...highlightStyle }} search={search || ''}>
      {text}
    </Highlighter>
  );
  const onRenderText = (text: string) => (text ? highlightText(text) : null);

  return (
    <FabricPersona
      imageUrl={imageUrl}
      onRenderPrimaryText={(props: any) => onRenderText(props.text)}
      onRenderSecondaryText={(props: any) => onRenderText(props.secondaryText)}
      {...rest}
    />
  );
};
export default Persona;

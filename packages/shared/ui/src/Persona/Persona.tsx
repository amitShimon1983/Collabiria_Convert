import React from 'react';
import {
  IPersonaProps as FabricIPersonaProps,
  Persona as FabricPersona,
  PersonaSize,
  PersonaPresence,
} from '@fluentui/react';
import Highlighter from 'react-highlighter';

export type IPersonaProps = FabricIPersonaProps & {
  search?: string;
  highlightStyle?: any;
  imageUrl?: string;
};

const Persona = ({ search, highlightStyle, imageUrl, ...rest }: IPersonaProps) => {
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

Persona.PersonaSize = PersonaSize;
Persona.PersonaPresence = PersonaPresence;

export default Persona;

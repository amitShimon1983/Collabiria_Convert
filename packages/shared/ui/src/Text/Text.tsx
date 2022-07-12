/* eslint-disable no-unused-vars,@typescript-eslint/no-unused-vars */
import React, { Children, FunctionComponent } from 'react';
import styled, { css } from 'styled-components';
import { getTheme } from '@fluentui/react';
import { utils } from '@harmonie/services';

const textAlignStyle = ({ left, right, center }: any) => {
  let align = 'left';
  align = right ? 'right' : align;
  align = center ? 'center' : align;
  align = left ? 'left' : align;

  return css`
    text-align: ${align};
  `;
};

const truncateStyle = ({ clip }: any) =>
  !clip
    ? ''
    : css`
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: block;
      `;

const colorStyle = ({ color, theme: { palette } }: any) => {
  return color
    ? css`
        color: ${palette[color] || color};
      `
    : '';
};

const wordBreakStyle = ({ breakAll, keepAll }: any) => {
  let wordBreak = 'normal';
  wordBreak = breakAll ? 'break-all' : wordBreak;
  wordBreak = !breakAll && keepAll ? 'keep-all' : wordBreak;

  return css`
    word-break: ${wordBreak};
  `;
};

const lineHeightStyle = ({ lineHeight }: any) => css`
  line-height: ${utils.isNumber(lineHeight) ? `${lineHeight}px` : lineHeight || 'normal'};
`;

const weightStyle = ({ bold }: any) => css`
  font-weight: ${bold ? 'bold !important' : 'normal'};
`;

export interface TextProps {
  level?: string;
  bold?: boolean;
  left?: boolean;
  right?: boolean;
  center?: boolean;
  breakAll?: boolean;
  keepAll?: boolean;
  clip?: boolean;
  color?: string;
  lineHeight?: number;
  style?: any;
}

const StyledText = styled(({ clip, bold, white, ...props }) => <span {...props} />)`
  ${weightStyle}
  ${wordBreakStyle}
  ${truncateStyle}
  ${textAlignStyle}
  ${colorStyle}
  ${lineHeightStyle}
`;

const getFontStyle = (level?: string) => {
  const theme = getTheme();
  // @ts-ignore
  return level ? theme.fonts[level] : {};
};

const Text = ({ level, style, ...rest }: React.PropsWithChildren<TextProps>) => {
  const fontStyle = getFontStyle(level);
  return <StyledText {...rest} style={{ ...fontStyle, ...style }} />;
};

export const H1: FunctionComponent<TextProps> = (props: TextProps) => <StyledText {...props} as="h1" />;
export const H2: FunctionComponent<TextProps> = (props: TextProps) => <StyledText {...props} as="h2" />;
export const H3: FunctionComponent<TextProps> = (props: TextProps) => <StyledText {...props} as="h3" />;
export const H4: FunctionComponent<TextProps> = (props: TextProps) => <StyledText {...props} as="h4" />;
export const H5: FunctionComponent<TextProps> = (props: TextProps) => <StyledText {...props} as="h5" />;
export const H6: FunctionComponent<TextProps> = (props: TextProps) => <StyledText {...props} as="h6" />;

export default Text;

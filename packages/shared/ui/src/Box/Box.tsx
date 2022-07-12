/* eslint-disable no-unused-vars,@typescript-eslint/no-unused-vars */
import React, { FunctionComponent } from 'react';
import styled, { css } from 'styled-components';
import { utils } from '@harmonie/services';
import { mapValue, marginStyle, paddingStyle } from '../utils';

const borderRadius: Record<string, string> = {
  xxs: '0.1875rem', // '3px'
  xs: '0.4375rem', // '7px'
  sm: '0.875rem', // '14px'
  md: '1.5rem', // '24px'
  lg: '2.125rem', // '34px'
  xl: '2.5rem', // '40px'
  xxl: '3.125rem', // '50px'
};

const directionStyle = ({ asRow, asColumn, reversed }: any) => {
  let direction = 'row';
  direction = asRow ? 'row' : direction;
  direction = asColumn ? 'column' : direction;
  direction = reversed ? `${direction}-reverse` : direction;

  return css`
    flex-direction: ${direction};
  `;
};

const shadowStyle = ({ shadow }: any) =>
  shadow
    ? css`
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
      `
    : '';

const borderRadiusStyle = ({ radius }: any) =>
  radius
    ? css`
        border-radius: ${mapValue(borderRadius)(radius)};
      `
    : '';

const backgroundColorStyle = ({ bg }: any) =>
  bg
    ? css`
        ${({ theme: { palette } }) => `background: ${palette[bg] || `url(${bg}) no-repeat`}`};
      `
    : '';

const borderStyle = ({ bordered }: any) =>
  bordered
    ? css`
        ${({ theme: { palette } }) => `border: 1px solid ${palette.neutralLight}`};
      `
    : '';

const widthHeightStyle = ({ width, height }: any) => css`
  width: ${utils.isNumber(width) ? `${width}px` : width || 'auto'};
  height: ${utils.isNumber(height) ? `${height}px` : height || 'auto'};
`;

const flexAlignStyle = ({ clip, sizing = 'border', justify, align }: any) => css`
  justify-content: ${justify};
  align-items: ${align};
  box-sizing: ${sizing}-box;
  overflow: ${clip ? 'hidden' : 'visible'};
  // overflow-x: hidden;
`;

const flexStyle = ({ flex }: any) => css`
  flex: ${flex};
`;

export interface IBox {
  bg?: string;
  asRow?: boolean;
  asColumn?: boolean;
  reversed?: boolean;
  clip?: boolean;
  align?: string;
  justify?: string;
  sizing?: string;
  width?: string | number;
  height?: string | number;
  shadow?: boolean;
  padding?: string;
  margin?: string;
  radius?: string;
  bordered?: boolean;
  flex?: number;
}

export interface BoxProps extends IBox, FunctionComponent<any> {}

const Box = styled(
  ({
    as,
    bg,
    asRow,
    asColumn,
    reversed,
    clip,
    align,
    justify,
    sizing,
    width,
    height,
    shadow,
    padding,
    margin,
    radius,
    bordered,
    flex,
    ...props
  }) => <div {...props} />
)`
  .box-scroller ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background-color: #ffffff;
  }

  .box-scroller ::-webkit-scrollbar-track {
    border-radius: 6px;
    background-color: #ffffff;
  }

  .box-scroller ::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background-color: #e0e0e1;
  }

  display: flex;
  position: relative;
  ${directionStyle}
  ${backgroundColorStyle}
  ${borderStyle}
  ${marginStyle}
  ${paddingStyle}
  ${shadowStyle}
  ${borderRadiusStyle}
  ${widthHeightStyle}
  ${flexAlignStyle}
  ${flexStyle}
`;

export default Box;

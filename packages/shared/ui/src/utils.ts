import { css } from 'styled-components';

const size: Record<string, string> = {
  xxs: '4px',
  xs: '8px',
  sm: '12px',
  md: '16px',
  lg: '20px',
  xl: '24px',
  xxl: '32px',
  xxxl: '40px',
};

const assembleMap: Record<number, (v: string[]) => string[]> = {
  1: (v: string[]) => [...v, ...v, ...v, ...v],
  2: (v: string[]) => [...v, ...v],
  3: (v: string[]) => [...v, v[1]],
  4: (v: string[]) => v,
};

export const mapValue = (set: Record<string, string>) => (value: string) =>
  Number.isFinite(parseInt(value)) ? `${value}px` : set[value] || 'auto';

export const assembleProperty = (propertyValue: string) => {
  const values = propertyValue.split(',');
  return assembleMap[values.length](values).map(mapValue(size)).join(' ');
};

export const marginStyle = ({ margin }: { margin?: string }) =>
  margin
    ? css`
        margin: ${assembleProperty(margin)};
      `
    : '';

export const paddingStyle = ({ padding }: { padding?: string }) =>
  padding
    ? css`
        padding: ${assembleProperty(padding)};
      `
    : '';
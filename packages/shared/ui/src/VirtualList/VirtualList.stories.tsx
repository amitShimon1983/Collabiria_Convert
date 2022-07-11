import React from 'react';
import { Story } from '@storybook/react';
import VirtualList, { CustomRowRendererProps } from './VirtualList';
import { IndexRange } from 'react-virtualized';
import { utils } from '@harmon.ie/collabria-frontend-shared';
import { Box } from '../Box';
import { Skeleton } from '../Skeleton';
import { Text } from '../Text';

const getMoreRows = async ({ stopIndex, startIndex }: IndexRange, pageSize: number): Promise<any> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const moreOptions = utils.times(pageSize).map((index: number) => ({
        name: `Name-${startIndex + index}`,
        address: `address-${startIndex + index}@harmon.ie`,
      }));
      resolve({
        records: moreOptions,
        hasMorePage: stopIndex < 1500,
      });
    }, 2000);
  });
};

export const Template: Story = ({ width, height, pageSize, rowHeight }) => {
  return (
    <Box width={width} height={height}>
      <VirtualList
        pageSize={pageSize}
        rowHeight={rowHeight}
        getMoreRows={(indexRange: IndexRange) => getMoreRows(indexRange, pageSize)}
        CustomRowRenderer={({ index, style, item }: CustomRowRendererProps) => {
          return (
            <Box style={style} key={`item-${index}`} width="100%" align="center" padding="xss">
              <Box padding="0,md" align="center" bordered height={rowHeight} style={{ width: 'calc(100% - 12px)' }}>
                {item ? <Text>{item.address}</Text> : <Skeleton variant="text" />}
              </Box>
            </Box>
          );
        }}
      />
    </Box>
  );
};

export default {
  title: 'Components/VirtualList',
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    height: {
      defaultValue: 500,
      control: { type: 'range', min: 0, max: 1000, step: 100 },
    },
    width: {
      defaultValue: 500,
      control: { type: 'range', min: 0, max: 1000, step: 100 },
    },
    pageSize: {
      defaultValue: 50,
      control: { type: 'range', min: 0, max: 500, step: 10 },
    },
    rowHeight: {
      defaultValue: 50,
      control: { type: 'range', min: 50, max: 500, step: 10 },
    },
  },
};

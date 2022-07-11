import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { utils } from '@harmon.ie/collabria-frontend-shared';
import { IPersonaProps, ISearchBox, SearchBox, Stack } from '@fluentui/react';
import { Story } from '@storybook/react';
import styled from 'styled-components';
import RecipientsList from './RecipientsList';
import { Box } from '../Box';

const SearchBoxWrapper = styled(SearchBox)`
  width: 100%;
  border: solid 1px #c2c2c2;
  border-radius: 5px;

  &:hover {
    border: solid 1px #6061aa;
  }

  .ms-SearchBox-iconContainer {
    color: #ffffff;
  }
`;

const options = utils.times(20).map(index => ({
  name: `Name-${index}`,
  address: `address-${index}@harmon.ie`,
}));

export const Template: Story<IPersonaProps> = (args: any) => {
  const [open, setOpen] = useState<boolean>(false);
  const [inputRef, seInputRef] = useState<ISearchBox | null>(null);
  const [search, setSearch] = useState<string | undefined>('');

  const openCallout = useCallback(() => {
    setOpen(true);
  }, []);

  useEffect(() => {
    if (open && inputRef) {
      (inputRef as any)?._inputElement?.current?.focus();
    }
  }, [open, inputRef]);

  const items = useMemo(
    () =>
      options.filter(
        ({ name, address }: any) =>
          name?.toLowerCase().includes(search?.toLowerCase()) || address?.toLowerCase().includes(search?.toLowerCase())
      ),
    [options, search]
  );

  return (
    <Stack tokens={{ childrenGap: 4 }}>
      {args.searchEnabled && (
        <Box padding="xxs,md" width="100%" height="40px">
          <SearchBoxWrapper
            value={search}
            onChange={(event?: React.ChangeEvent<HTMLInputElement>, newValue?: string) => setSearch(newValue)}
            onFocus={openCallout}
            placeholder="Search"
            autoComplete={'off'}
            // componentRef={ref => seInputRef(ref)}
          />
        </Box>
      )}
      <RecipientsList
        {...args}
        items={items}
        defaultSelectedKey={`address-1@harmon.ie`}
        onClick={recipient => console.log({ recipient })}
        style={{ maxHeight: args.maxHeight }}
        search={search}
      />
    </Stack>
  );
};

export default {
  title: 'Components/RecipientsList',
  component: RecipientsList,
  parameters: {
    layout: 'padded',
    controls: { include: ['maxHeight', 'searchEnabled'] },
  },
  argTypes: {
    maxHeight: {
      defaultValue: 150,
      control: { type: 'number' },
    },
    searchEnabled: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
  },
};

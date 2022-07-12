import { useCustomizations } from '@harmonie/services';
import { CommandBarButton, DirectionalHint, OverflowSet, Tooltip } from '@harmonie/ui';
import React from 'react';

const trayButtons = [
  { name: 'Inbox', key: 'inbox', icon: 'Inbox', path: 'Inbox' },
  { name: 'Drafts', key: 'drafts', icon: 'Edit', path: 'Drafts' },
  {
    name: 'Sent Items',
    path: 'Sent Items',
    key: 'sentitems',
    icon: 'Send',
  },
  {
    name: 'Deleted Items',
    path: 'Deleted Items',
    key: 'deleteditems',
    icon: 'Delete',
  },
];

const onRenderItemStyles = {
  root: {
    padding: '12px',
    width: '100%',
  },
};

const onRenderTray = {
  root: {
    display: 'flex',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    width: '100%',
  },
};
const hostStyles = { root: { width: '100%' } };
interface CollapsedTrayProps {
  onSelectFolder: any;
  selectedFolder: any;
}
const CollapsedTray = ({ onSelectFolder, selectedFolder }: CollapsedTrayProps) => {
  const { sementicColors, customizations } = useCustomizations();
  const { palette } = sementicColors;
  const onRenderItemStylesSelected = {
    root: {
      padding: '12px',
      width: '100%',
      backgroundImage: `linear-gradient(270deg, ${palette?.neutralLighter} 90%, #6264a7 10%)`,
    },
  };
  const onRenderItem = (item: any) => {
    return (
      <Tooltip
        styles={hostStyles}
        content={item.name}
        id={item.name}
        calloutProps={{ directionalHint: DirectionalHint.rightCenter }}
      >
        <CommandBarButton
          role="menuitem"
          aria-label={item.name}
          styles={item.name === selectedFolder.displayName ? onRenderItemStylesSelected : onRenderItemStyles}
          iconProps={{ iconName: item.icon }}
          onClick={item.onClick}
        />
      </Tooltip>
    );
  };

  return (
    <>
      <OverflowSet
        onRenderOverflowButton={props => {
          return <></>;
        }}
        //   trayButtons.map(({ icon, id, displayName, path }) => ({
        //     key: id,
        //     icon: icon,
        //     name: displayName,
        //     onClick: () => onSelectFolder({ displayName, id, path }),
        //   }))
        // }
        role="menubar"
        vertical
        styles={onRenderTray}
        items={trayButtons.map(({ icon, key, name, path }) => ({
          key: key,
          icon: icon,
          name: name,
          onClick: () => onSelectFolder({ displayName: name, id: key, path }),
        }))}
        onRenderItem={onRenderItem}
      />
    </>
  );
};

export default CollapsedTray;

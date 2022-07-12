import React, { useCallback, useState } from 'react';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import { sortBy, keyBy } from 'lodash';
import { FoldersContainer } from './FolderGroups';
import CollapsedTray from './CollapsedTray';
import './SidePane.scss';
import { gql, useBoolean, useDeviceContext, useQuery } from '@harmonie/services';
import { Tooltip, IconButton } from '@harmonie/ui';

const GET_FOLDERS_QUERY = gql`
  {
    getFolders {
      id
      displayName
      parentFolderId
      unreadItemCount
      totalItemCount
      wellKnownName
    }
  }
`;
interface CollapseIconProps {
  onClick: any;
  collapsed: any;
  messageOpen: any;
  messageClose: any;
  style: any;
  iconName: any;
  id: any;
}
export const CollapseIcon = ({
  onClick,
  collapsed,
  messageOpen = 'Collapse the Folder Pane',
  messageClose = 'Expand the Folder Pane',
  style,
  iconName,
  id = 'button',
}: CollapseIconProps) => (
  <Tooltip content={collapsed ? messageOpen : messageClose}>
    <IconButton id={id} iconProps={{ iconName: iconName }} styles={style} onClick={onClick} ariaLabel={'Folder Pane'} />
  </Tooltip>
);

const buildFolderTree = (folders: any) => {
  const sortedFolders = sortBy(folders, f => {
    switch (f.displayName) {
      case 'Inbox':
        return 1;
      case 'Drafts':
        return 2;
      case 'Sent Items':
        return 3;
      case 'Deleted Items':
        return 4;
      case 'Junk Email':
        return 5;
      case 'Archive':
        return 6;
      case 'Notes':
        return 7;
      default:
        return 10;
    }
  });

  const newSortedFolders = sortedFolders.map(sorted => {
    return { ...sorted };
  });

  const byParent = keyBy(newSortedFolders, 'id');

  const root: any[] = [];
  newSortedFolders.forEach((f: any) => {
    const parent = byParent[f.parentFolderId];
    if (!parent) {
      root.push(f);
      f.path = f.displayName;
      return;
    }
    if (!parent.children) {
      parent.children = [];
    }
    parent.children.push(f);
  });

  //DFS on tree to produce flat list good for UI
  const flatList: any[] = [];
  const dfs = (node: any, level: any) => {
    flatList.push({ ...node, level });
    if (node.children) {
      node.children.forEach((child: any) => {
        child.path = `${node.path ? node.path : node.displayName} > ${child.displayName}`;
        dfs(child, level + 1);
      });
    }
  };
  root.forEach(child => dfs(child, 0));
  return root;
};
interface SidePaneProps {
  onSelectFolder: any;
  selectedFolder: any;
  className: any;
  collapseButtonColor: any;
  externalStyle: any;
  iconName: any;
  type: any;
}
const SidePane = ({
  onSelectFolder,
  selectedFolder,
  className,
  collapseButtonColor,
  externalStyle,
  iconName = 'CollapseMenu',
  type = PanelType.smallFixedNear,
}: SidePaneProps) => {
  const { isMobile } = useDeviceContext();
  const [collapsed, setCollapsed] = useState(true);
  const [folders, setFolders] = useState([]);
  const toggleCollapsed = useCallback(() => setCollapsed(!collapsed), [collapsed]);
  const { error } = useQuery(GET_FOLDERS_QUERY, {
    onCompleted(d) {
      const folders: any = buildFolderTree(d.getFolders);
      setFolders(folders);
    },
  });

  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);
  const onSelectFolderMobile = useCallback(
    x => {
      onSelectFolder(x);
      dismissPanel();
    },
    [onSelectFolder, dismissPanel]
  );
  return (
    <div>
      {isMobile && (
        <div style={isMobile ? { position: 'absolute' } : {}} className={`MobileSidePane`}>
          <CollapseIcon
            id={'CollapseIcon'}
            collapsed={collapsed}
            onClick={openPanel}
            messageClose="Minimize the Folder Pane"
            messageOpen="Expand the Folder Pane"
            iconName={iconName}
            style={
              externalStyle
                ? externalStyle
                : {
                    zIndex: 2,
                    icon: { margin: 0, fontSize: 24, color: collapseButtonColor },
                    root: { marginTop: 15, marginLeft: 22 },
                  }
            }
          />
          <Panel
            type={type}
            allowTouchBodyScroll={true}
            styles={{ isOnRightSide: true, marginTop: '50px' } as any}
            isOpen={isOpen}
            onDismiss={dismissPanel}
            closeButtonAriaLabel="Close"
            className={`mobile-menu-panel ${className}`}
          >
            <FoldersContainer
              folders={folders}
              onSelectFolder={onSelectFolderMobile}
              selectedFolder={selectedFolder}
              error={error}
            />
          </Panel>
        </div>
      )}

      <div className={className} style={{ display: 'flex' }}>
        <div className={`SidePane ${collapsed ? 'collapsed' : 'expanded'}`}>
          <CollapseIcon
            id={'CollapseIcon'}
            onClick={toggleCollapsed}
            iconName={iconName}
            collapsed={collapsed}
            messageClose="Minimize the Folder Pane"
            messageOpen="Expand the Folder Pane"
            style={
              externalStyle
                ? externalStyle
                : {
                    zIndex: 2,
                    icon: { margin: 0, fontSize: 24, color: collapseButtonColor },
                    root: { marginTop: 15, marginLeft: 22 },
                  }
            }
          />
          {collapsed ? (
            <CollapsedTray onSelectFolder={onSelectFolder} selectedFolder={selectedFolder} />
          ) : (
            <FoldersContainer
              folders={folders}
              onSelectFolder={onSelectFolder}
              selectedFolder={selectedFolder}
              error={error}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SidePane;

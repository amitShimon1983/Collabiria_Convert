import React, { useCallback, useState } from 'react';
import classes from './FolderGroups.module.scss';
import { mergeStyles } from '@uifabric/merge-styles';
import { useDeviceContext, useCustomizations } from '@harmonie/services';
import { Icon, IconButton, Text, Tooltip } from '@harmonie/ui';

const iconLookup = (wellKnownName: any) => {
  switch (wellKnownName) {
    case 'inbox':
      return 'Inbox';
    case 'sentitems':
      return 'Send';
    case 'deleteditems':
      return 'Trash';
    case 'drafts':
      return 'Edit';
    case 'junkemail':
      return 'Blocked';
    case 'archive':
      return 'Archive';
    default:
      return '';
  }
};

const FolderListToggleIcon = ({ collapsed }: { collapsed: any }) => {
  return (
    <IconButton
      className={`folder-list-toggle-icon ${collapsed ? 'collapsed' : ''}`}
      iconProps={{ iconName: 'ChevronRight' }}
      title="View Folders"
      ariaLabel="View Folders"
    />
  );
};
interface FolderIconPops {
  hasChildren: any;
  toggleExpanded: any;
  wellKnownName: any;
  isExpanded: any;
  level: any;
}
const FolderIcon = ({ hasChildren, toggleExpanded, wellKnownName, isExpanded, level }: FolderIconPops) => {
  const iconName = iconLookup(wellKnownName);
  const onClickToggle = useCallback(
    e => {
      e.stopPropagation();
      toggleExpanded();
    },
    [toggleExpanded]
  );
  return (
    <div className="folder-icon" style={{ marginLeft: level * 10 }}>
      {hasChildren && (
        <div onClick={onClickToggle}>
          <FolderListToggleIcon collapsed={!isExpanded} />
        </div>
      )}
      {!hasChildren && <Icon iconName={iconName} />}
    </div>
  );
};
interface FolderProps {
  folder: any;
  level: any;
  onSelectFolder: any;
  selectedFolder: any;
}
export const Folder = ({ folder, level, onSelectFolder, selectedFolder }: FolderProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const selectFolder = useCallback(() => onSelectFolder(folder), [onSelectFolder, folder]);
  const toggleExpanded = useCallback(() => setIsExpanded(!isExpanded), [isExpanded, setIsExpanded]);
  const hasChildren = folder.children && folder.children.length;
  const isSelected = folder.displayName === selectedFolder.displayName;

  const { sementicColors: colors } = useCustomizations();
  const hoverClass = mergeStyles({
    selectors: {
      ':hover': {
        background: colors.bodyBackgroundHovered,
      },
    },
  });

  const { isMobile } = useDeviceContext();
  const tooltipContent = isMobile ? '' : folder.displayName;

  return (
    <Tooltip content={tooltipContent} id={tooltipContent}>
      <div className={`${classes.folder} ${isSelected && classes.selected}`}>
        <div className={`${classes['main-row']} ${hoverClass}`} onClick={selectFolder}>
          <FolderIcon
            level={level}
            toggleExpanded={toggleExpanded}
            wellKnownName={folder.wellKnownName}
            isExpanded={isExpanded}
            hasChildren={hasChildren}
          />

          <div className="name">{folder.displayName}</div>
          <div className="count">{folder.totalItemCount}</div>
        </div>

        <div className="children">
          {hasChildren &&
            isExpanded &&
            folder.children.map((child: any) => (
              <Folder
                onSelectFolder={onSelectFolder}
                selectedFolder={selectedFolder}
                key={child.id}
                folder={child}
                level={level + 1}
              />
            ))}
        </div>
      </div>
    </Tooltip>
  );
};
interface FoldersContainerProps {
  folders: any[];
  error: any;
  onSelectFolder: any;
  selectedFolder: any;
}
export const FoldersContainer = ({ folders, error, onSelectFolder, selectedFolder }: FoldersContainerProps) => {
  return (
    <div className="folders-container">
      {error && (
        <div className="error">
          <Text>Could not retrieve folders</Text>
        </div>
      )}
      {folders.map((folder: any) => (
        <Folder
          key={folder.id}
          folder={folder}
          level={0}
          onSelectFolder={onSelectFolder}
          selectedFolder={selectedFolder}
        />
      ))}
    </div>
  );
};

import { mergeStyleSets, getTheme, getFocusStyle } from 'office-ui-fabric-react/lib/Styling';

export const SuggestionsTitleStyle = () => {
  return { fontWeight: 600, width: '100%', margin: '6px 12px', display: 'flex', alignItems: 'center' };
};
export const AutocompleteStyles = () => {
  return { width: '100%' };
};
export const SuggestionListStyle = () => ({
  padding: '4px 4px',
  fontSize: '14px',
  cursor: 'default',
  width: '100%',
});

export const SuggestionItemStyle = () => ({ height: 40 });

export const SuggestionItemLoadingStyle = () => ({
  display: 'flex',
  padding: '4px 4px',
  lineHeight: 2,
});

export const SearchBoxStyle = () => {
  const theme = getTheme();
  const { palette } = theme;
  return {
    hasFocus: false,
    root: {
      backgroundColor: palette.neutralLighter,
      border: 'none',
    },
  };
};

export const classNames = () => {
  const theme = getTheme();
  const { palette } = theme;
  return mergeStyleSets({
    itemCell: [
      getFocusStyle(theme, { inset: -1 }),
      {
        minHeight: 24,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '4px 0px',
        width: '100%',
        cursor: 'pointer',
        selectors: {
          '&:hover': { background: palette.neutralLighterAlt },
        },
      },
    ],
    icon: [
      {
        width: '32px',
        fontSize: '14px',
        textAlign: 'center',
      },
    ],
  });
};

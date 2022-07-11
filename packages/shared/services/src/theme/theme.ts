import { createTheme, getTheme, loadTheme } from '@uifabric/styling';
import { addVariants } from '@uifabric/variants';
import { TeamsCustomizations } from '@uifabric/theme-samples';
import { initializeIcons } from '@fluentui/react';
import { initializeFileTypeIcons } from '@uifabric/file-type-icons';

initializeIcons();
initializeFileTypeIcons();

const DarkDefaultPalette = {
  themeDarker: '#6264A7',
  themeDark: '#6264A7',
  themeDarkAlt: '#6264A7',
  themePrimary: '#6264A7',
  themeSecondary: '#0078d4',
  themeTertiary: '#235a85',
  themeLight: '#004c87',
  themeLighter: '#043862',
  themeLighterAlt: '#092c47',
  black: '#ffffff',
  neutralDark: '#faf9f8',
  neutralPrimary: '#f3f2f1',
  neutralPrimaryAlt: '#c8c6c4',
  neutralSecondary: '#a19f9d',
  neutralSecondaryAlt: '#979693',
  neutralTertiary: '#797775',
  neutralTertiaryAlt: '#484644',
  neutralQuaternary: '#3b3a39',
  neutralQuaternaryAlt: '#323130',
  neutralLight: '#292827',
  neutralLighter: '#252423',
  neutralLighterAlt: '#201f1e',
  white: '#11100F',
  redDark: '#F1707B',
};

const hightContrastPalette = {
  themeDarker: '#6264A7',
  themeDark: '#6264A7',
  themeDarkAlt: '#6264A7',
  themePrimary: '#6264A7',
  themeSecondary: '#0078d4',
  themeTertiary: '#235a85',
  themeLight: '#004c87',
  themeLighter: '#043862',
  themeLighterAlt: '#092c47',
  black: '#000000',
  neutralDark: '#faf9f8',
  neutralPrimary: '#f3f2f1',
  neutralPrimaryAlt: '#c8c6c4',
  neutralSecondary: '#a19f9d',
  neutralSecondaryAlt: '#979693',
  neutralTertiary: '#797775',
  neutralTertiaryAlt: '#484644',
  neutralQuaternary: '#3b3a39',
  neutralQuaternaryAlt: '#323130',
  neutralLight: '#292827',
  neutralLighter: '#252423',
  neutralLighterAlt: '#201f1e',
  white: '#ffffff',
  redDark: '#F1707B',
};

const darkThemeValues = {
  palette: DarkDefaultPalette,
  semanticColors: {
    bodyBackground: DarkDefaultPalette.white,
    buttonText: DarkDefaultPalette.black,
    buttonTextPressed: DarkDefaultPalette.neutralDark,
    buttonTextHovered: DarkDefaultPalette.neutralPrimary,
    disabledBackground: DarkDefaultPalette.neutralQuaternaryAlt,
    inputBackgroundChecked: DarkDefaultPalette.themePrimary,
    menuBackground: DarkDefaultPalette.neutralLighter,
    menuItemBackgroundHovered: DarkDefaultPalette.neutralQuaternaryAlt,
    menuItemBackgroundPressed: DarkDefaultPalette.neutralQuaternary,
    menuDivider: DarkDefaultPalette.neutralTertiaryAlt,
    menuIcon: DarkDefaultPalette.themeDarkAlt,
    menuHeader: DarkDefaultPalette.black,
    menuItemText: DarkDefaultPalette.neutralPrimary,
    menuItemTextHovered: DarkDefaultPalette.neutralDark,
  },
  isInverted: true,
};

const highContrastValues = {
  ...darkThemeValues,
  palette: hightContrastPalette,
};

export const DarkTheme = createTheme(darkThemeValues);
export const highContrastTheme = createTheme(highContrastValues);

export const PersonaCoinStyles = function (props: any) {
  return {
    initials: {
      color: props.showUnknownPersonaCoin ? DarkTheme.palette.redDark : DarkTheme.palette.black,
    },
  };
};

export const DarkCustomizations = {
  settings: {
    theme: DarkTheme,
  },
  scopedSettings: {
    Card: {
      styles: {
        root: {
          background: DarkTheme.palette.neutralLighter,
        },
      },
    },
    DetailsList: {
      styles: {
        headerWrapper: {
          selectors: {
            '.ms-DetailsHeader': {
              borderColor: DarkTheme.palette.neutralQuaternary,
            },
          },
        },
      },
    },
    ActionButton: {
      styles: {
        root: {
          backgroundColor: DarkTheme.palette.white,
        },
        rootDisabled: {
          backgroundColor: DarkTheme.palette.neutralLighter,
        },
        rootHovered: {
          backgroundColor: DarkTheme.palette.neutralLight,
        },
        rootPressed: {
          backgroundColor: DarkTheme.palette.neutralQuaternaryAlt,
        },
      },
    },
    DetailsRow: {
      styles: {
        root: {
          selectors: {
            ':hover': {
              background: DarkTheme.palette.neutralLighter,
            },
          },
          borderColor: DarkTheme.palette.neutralQuaternaryAlt,
        },
      },
    },
    Modal: {
      styles: {
        main: {
          backgroundColor: DarkTheme.palette.neutralLighter,
        },
      },
    },
    Overlay: {
      styles: {
        root: {
          background: DarkTheme.palette.blackTranslucent40,
        },
      },
    },
    VerticalDivider: {
      styles: {
        divider: {
          backgroundColor: DarkTheme.palette.neutralQuaternaryAlt,
        },
        wrapper: {
          Backgroundcolor: DarkTheme.palette.green,
        },
      },
    },
    DocumentCard: {
      styles: {
        root: {
          border: `1px solid ${DarkTheme.palette.neutralQuaternaryAlt}`,
          selectors: {
            '.ms-DocumentCardPreview': {
              borderRight: `1px solid ${DarkTheme.palette.neutralQuaternaryAlt}`,
            },
          },
        },
      },
    },
    DocumentCardPreview: {
      styles: {
        root: {
          borderBottom: `1px solid ${DarkTheme.palette.neutralQuaternaryAlt}`,
          borderRight: `1px solid ${DarkTheme.palette.neutralQuaternaryAlt}`,
        },
      },
    },
    Panel: {
      styles: {
        main: {
          backgroundColor: DarkTheme.palette.neutralLighter,
        },
        closeButton: {
          color: DarkTheme.palette.neutralSecondary,
          selectors: {
            ':hover': {
              color: DarkTheme.palette.neutralPrimary,
            },
          },
        },
      },
    },
    PersonaCoin: {
      styles: PersonaCoinStyles,
    },
    Separator: {
      styles: {
        root: {
          selectors: {
            ':before': {
              backgroundColor: DarkTheme.palette.neutralQuaternaryAlt,
            },
            ':after': {
              backgroundColor: DarkTheme.palette.neutralQuaternaryAlt,
            },
          },
        },
      },
    },
    SpinButton: {
      styles: {
        inputTextSelected: {
          color: DarkTheme.palette.black,
          background: DarkTheme.palette.themePrimary,
        },
      },
    },
  },
};

export const HighContrastCustomizations = {
  ...DarkCustomizations,
  settings: {
    ...DarkCustomizations.settings,
    theme: highContrastTheme,
  },
};

addVariants(DarkCustomizations.settings.theme);
addVariants(HighContrastCustomizations.settings.theme);

const getCustomization = (themeName?: string) => {
  switch (themeName) {
    case 'dark':
      return DarkCustomizations;
    case 'contrast':
      return HighContrastCustomizations;
    default:
      return TeamsCustomizations;
  }
};

export function getCustomizations(themeName?: string) {
  const cust = getCustomization(themeName);
  loadTheme(cust.settings.theme);
  return cust;
}

export function getSemanticColors() {
  const theme = getTheme();
  return theme.semanticColors;
}
export function getSemanticTheme() {
  return getTheme();
}

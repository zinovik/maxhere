import { ThemeParameters } from './getTheme';

export enum ThemesNames {
  DefaultLight,
  DefaultDark,
}

export const themes: { [key in ThemesNames]: ThemeParameters } = {
  [ThemesNames.DefaultLight]: {
    backgroundColor: '#ffffff',
    color: '#191919',
    shadow: '#d3d3d3',
    imageDescription: 'darkgrey',
    secondRow: '#f0f0f0',
  },
  [ThemesNames.DefaultDark]: {
    backgroundColor: '#010409',
    color: '#c9d1d9',
    shadow: '#444444',
    imageDescription: 'darkgrey',
    secondRow: '#0d1117',
  },
};

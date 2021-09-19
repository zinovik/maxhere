import { ThemeParameters } from './getTheme';

export enum ThemesNames {
  DefaultLight,
  DefaultDark,
}

export const themes: { [key in ThemesNames]: ThemeParameters } = {
  [ThemesNames.DefaultLight]: {
    background: '#ffffff',
    color: '#191919',
    shadow: '#d3d3d3',
    imageDescription: '#a9a9a9',
    imageBackground: '#ffffff',
    secondRow: '#f0f0f0',
  },
  [ThemesNames.DefaultDark]: {
    background: '#010409',
    color: '#c9d1d9',
    shadow: '#444444',
    imageDescription: '#a9a9a9',
    imageBackground: '#000000e7',
    secondRow: '#0d1117',
  },
};

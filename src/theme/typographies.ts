import Typography from 'typography';

import getTheme from './getTheme';
import { themes, ThemesNames } from './themes';

export const typographies = Object.values(themes).map(
  theme => new Typography(getTheme(theme)),
);

export const typographyLight = new Typography(
  getTheme(themes[ThemesNames.DefaultLight]),
);

export const typographyDark = new Typography(
  getTheme(themes[ThemesNames.DefaultDark]),
);

typographyLight.injectStyles();

export const rhythm = typographyLight.rhythm;

export const scale = typographyLight.scale;

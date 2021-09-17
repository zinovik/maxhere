import Typography from 'typography';

import getTheme from './getTheme';
import { themes } from './themes';

export const typographies = Object.values(themes).map(
  theme => new Typography(getTheme(theme)),
);

const [defaultTypography] = typographies;

export default defaultTypography;

export const rhythm = defaultTypography.rhythm;

export const scale = defaultTypography.scale;

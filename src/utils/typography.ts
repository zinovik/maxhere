import Typography from 'typography';
import Wordpress2016 from 'typography-theme-wordpress-2016';

const emojiFontName = 'Noto Color Emoji';

Wordpress2016.overrideThemeStyles = () => {
  return {
    'a.gatsby-resp-image-link': {
      boxShadow: `none`,
    },
    a: {
      color: 'DarkCyan',
      'box-shadow': 'none',
    },
    h1: {
      fontFamily: ['Montserrat', 'sans-serif', emojiFontName].join(','),
    },
  };
};

Wordpress2016.headerFontFamily.push(emojiFontName);
Wordpress2016.bodyFontFamily.push(emojiFontName);

delete Wordpress2016.googleFonts;

const typography = new Typography(Wordpress2016);

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles();
}

export default typography;

export const rhythm = typography.rhythm;

export const scale = typography.scale;

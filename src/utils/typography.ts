import Typography from 'typography';
import Wordpress2016 from 'typography-theme-wordpress-2016';

const emojiFontName = 'Noto Color Emoji';

Wordpress2016.overrideThemeStyles = () => {
  return {
    a: {
      color: 'DarkCyan',
      boxShadow: 'none',
    },
    'body,a,h1,h2,h3,h4,h5,h6,div,p,span,ul,li': {
      fontFamily: ['Montserrat', 'sans-serif', emojiFontName].join(','),
    },
    'a>p': {
      marginBottom: 0,
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

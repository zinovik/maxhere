import Wordpress2016 from 'typography-theme-wordpress-2016';

const emojiFontName = 'Noto Color Emoji';

export interface ThemeParameters {
  backgroundColor: string;
  color: string;
  shadow: string;
  imageDescription: string;
  secondRow: string;
}
export default ({ backgroundColor, color }: ThemeParameters) => {
  const Wordpress2016Copy = { ...Wordpress2016 };

  Wordpress2016Copy.overrideThemeStyles = () => ({
    a: {
      color: 'DarkCyan',
      boxShadow: 'none',
    },
    'body,h3': {
      fontFamily: ['Montserrat', 'sans-serif', emojiFontName].join(','),
      backgroundColor,
      color,
    },
    blockquote: {
      color,
      borderLeft: `0.32813rem solid ${color}7e`,
    },
    'a>p': {
      marginBottom: 0,
    },
    'a.anchor': {
      scrollMarginTop: '100px',
    },
  });

  Wordpress2016Copy.headerFontFamily.push(emojiFontName);
  Wordpress2016Copy.bodyFontFamily.push(emojiFontName);

  delete Wordpress2016Copy.googleFonts;

  return Wordpress2016Copy;
};

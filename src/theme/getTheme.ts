import Wordpress2016 from 'typography-theme-wordpress-2016';

const emojiFontName = 'Noto Color Emoji';

export interface ThemeParameters {
  background: string;
  color: string;
  shadow: string;
  imageDescription: string;
  imageBackground: string;
  secondRow: string;
}
export default ({ background, color }: ThemeParameters) => {
  const Wordpress2016Copy = { ...Wordpress2016 };

  Wordpress2016Copy.overrideThemeStyles = () => ({
    a: {
      color: 'DarkCyan',
      boxShadow: 'none',
    },
    'body,h2,h3,h4,h5,ul': {
      fontFamily: ['Montserrat', 'sans-serif', emojiFontName].join(','),
      backgroundColor: background,
    },
    'body,h2,h4,h5,ul': {
      color,
    },
    blockquote: {
      color,
      borderLeft: `5px solid ${color}e7`,
    },
    'a>p': {
      marginBottom: 0,
    },
    'a.anchor': {
      scrollMarginTop: '100px',
    },
  });

  return Wordpress2016Copy;
};

import React, { createContext, useReducer, Dispatch } from 'react';
import { typographies } from './typographies';
import { ThemesNames } from './themes';

interface State {
  theme: ThemesNames;
  areStylesInjected?: boolean;
}

interface Action {
  type: ThemesNames;
}

const STORAGE_NAME = 'theme';

export const themeReducer = (state: State, action: Action) => {
  typographies[action.type].injectStyles();

  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_NAME, String(action.type));
  }

  return {
    theme: action.type,
    areStylesInjected: true,
  };
};

const getDefaultThemeBasedOnSystemTheme = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-color-scheme: dark)').matches
    ? ThemesNames.DefaultDark
    : ThemesNames.DefaultLight;

const getCurrentTheme = () => {
  if (typeof localStorage !== 'undefined') {
    const theme = localStorage.getItem(STORAGE_NAME);

    if (theme !== null) return theme;
  }

  return ThemesNames.DefaultLight;

  return getDefaultThemeBasedOnSystemTheme();
};

export const ThemeContext = createContext({
  state: { theme: ThemesNames.DefaultLight },
  dispatch: (() => null) as Dispatch<Action>,
});

export const ThemeProvider = (props: any) => {
  const theme = getCurrentTheme();

  const [state, dispatch] = useReducer(themeReducer, {
    theme,
  });

  if (!state.areStylesInjected) {
    dispatch({
      type: theme,
    });
  }

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

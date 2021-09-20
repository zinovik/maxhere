import React, { createContext, useReducer, useEffect, Dispatch } from 'react';
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

export const themeReducer = (_state: State, action: Action) => {
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

const getSavedTheme = () => {
  if (typeof localStorage === 'undefined') return;

  const theme = Number(localStorage.getItem(STORAGE_NAME));

  return theme === null ? ThemesNames.DefaultLight : theme;

  return getDefaultThemeBasedOnSystemTheme();
};

const initialState = { theme: ThemesNames.DefaultLight };

export const ThemeContext = createContext({
  state: initialState,
  dispatch: (() => null) as Dispatch<Action>,
});

export const ThemeProvider = (props: any) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  useEffect(() => {
    if (state.areStylesInjected) return;

    const theme = getSavedTheme();

    if (theme !== undefined) {
      dispatch({
        type: theme,
      });
    }
  });

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

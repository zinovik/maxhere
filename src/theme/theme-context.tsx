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

export const themeReducer = (state: State, action: Action) => {
  typographies[action.type].injectStyles();

  return {
    theme: action.type,
    areStylesInjected: true,
  };

  return state;
};

const getIsSystemDarkTheme = () => false;
  // typeof window === 'undefined'
  //   ? false
  //   : window.matchMedia('(prefers-color-scheme: dark)').matches;

export const ThemeContext = createContext({
  state: { theme: ThemesNames.DefaultLight },
  dispatch: (() => null) as Dispatch<Action>,
});

export const ThemeProvider = (props: any) => {
  const theme = getIsSystemDarkTheme()
    ? ThemesNames.DefaultDark
    : ThemesNames.DefaultLight;

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

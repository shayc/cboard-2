import React, { useState, useEffect } from 'react';
import {
  initializeIcons,
  ThemeProvider as FluentThemeProvider,
} from '@fluentui/react';

import { useMediaQuery } from '../../hooks/useMediaQuery';
import { darkTheme, lightTheme } from './themes';
import styles from './theme-context.module.css';

initializeIcons();

const ThemeContext = React.createContext();

function ThemeProvider(props) {
  const { children, ...other } = props;

  const { prefersColorSchemeDark } = useMediaQuery();
  const [isDarkMode, setIsDarkMode] = useState(prefersColorSchemeDark);

  useEffect(() => {
    setIsDarkMode(prefersColorSchemeDark);
  }, [prefersColorSchemeDark]);

  useEffect(() => {
    if (isDarkMode) {
      exposeCSSVariables(darkTheme, document.documentElement);
    } else {
      exposeCSSVariables(lightTheme, document.documentElement);
    }
  }, [isDarkMode]);

  const context = React.useMemo(() => {
    return {
      setIsDarkMode,
      isDarkMode,
    };
  }, [isDarkMode]);

  const appTheme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={context} {...other}>
      <FluentThemeProvider
        className={styles.fluentThemeProvider}
        theme={appTheme}
      >
        {children}
      </FluentThemeProvider>
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = React.useContext(ThemeContext);

  if (!context) {
    throw new Error(`useTheme must be used within a ThemeProvider`);
  }

  return context;
}

function exposeCSSVariables(theme, domElement) {
  const cssVariables = Object.entries(theme.palette)
    .map(([key, value]) => `--${key}: ${value}`)
    .join('; ');

  domElement.style = cssVariables;
}

export { ThemeProvider, useTheme };

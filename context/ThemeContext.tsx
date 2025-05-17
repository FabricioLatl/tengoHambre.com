import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { DarkTheme, LightTheme } from '@/constants/colors';

type ThemeContextType = {
  isDark: boolean;
  colors: typeof DarkTheme | typeof LightTheme;
  toggleTheme: () => void;
  setDarkTheme: () => void;
  setLightTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  isDark: true,
  colors: DarkTheme,
  toggleTheme: () => {},
  setDarkTheme: () => {},
  setLightTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(true); // Default to dark theme

  // Initialize theme based on system preference
  useEffect(() => {
    setIsDark(colorScheme === 'dark');
  }, [colorScheme]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const setDarkTheme = () => {
    setIsDark(true);
  };

  const setLightTheme = () => {
    setIsDark(false);
  };

  const colors = isDark ? DarkTheme : LightTheme;

  const value = {
    isDark,
    colors,
    toggleTheme,
    setDarkTheme,
    setLightTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
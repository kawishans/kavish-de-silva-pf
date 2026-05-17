import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'kds-portfolio-theme';

const defaultColors = {
  primary: '#00e0d5',
  secondary: '#ffc200',
};

const ThemeContext = createContext(null);

function readStoredTheme() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function applyThemeToRoot({ isDark, primary, secondary }) {
  const root = document.documentElement;
  root.classList.toggle('dark', isDark);
  root.style.setProperty('--color-primary', primary);
  root.style.setProperty('--color-secondary', secondary);
}

export function ThemeProvider({ children }) {
  const stored = readStoredTheme();

  const [isDark, setIsDark] = useState(() => stored?.isDark ?? true);
  const [primaryColor, setPrimaryColor] = useState(() => stored?.primary ?? defaultColors.primary);
  const [secondaryColor, setSecondaryColor] = useState(
    () => stored?.secondary ?? defaultColors.secondary,
  );

  useEffect(() => {
    applyThemeToRoot({
      isDark,
      primary: primaryColor,
      secondary: secondaryColor,
    });

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        isDark,
        primary: primaryColor,
        secondary: secondaryColor,
      }),
    );
  }, [isDark, primaryColor, secondaryColor]);

  const toggleTheme = useCallback(() => setIsDark((prev) => !prev), []);

  const setColors = useCallback(({ primary, secondary }) => {
    if (primary) setPrimaryColor(primary);
    if (secondary) setSecondaryColor(secondary);
  }, []);

  const resetColors = useCallback(() => {
    setPrimaryColor(defaultColors.primary);
    setSecondaryColor(defaultColors.secondary);
  }, []);

  const value = useMemo(
    () => ({
      isDark,
      primaryColor,
      secondaryColor,
      toggleTheme,
      setPrimaryColor,
      setSecondaryColor,
      setColors,
      resetColors,
      defaultColors,
    }),
    [isDark, primaryColor, secondaryColor, toggleTheme, setColors, resetColors],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

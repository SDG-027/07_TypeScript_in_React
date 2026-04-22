import { useState, createContext } from 'react';

const installedThemes = [
  'halloween',
  'cyberpunk',
  'dim',
  'forest',
  'dark',
  'coffee',
  'corporate',
] as const;

export type UsableThemes = (typeof installedThemes)[number];

export type ThemeContextType = {
  theme: UsableThemes;
  // setTheme: React.Dispatch<React.SetStateAction<string>>;
  changeTheme: (newTheme: UsableThemes) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'halloween',
  changeTheme: (_newTheme: UsableThemes) => {},
});

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState<UsableThemes>('cyberpunk');

  function changeTheme(newTheme: UsableThemes) {
    if (installedThemes.includes(newTheme)) setTheme(newTheme);
  }

  return <ThemeContext value={{ theme, changeTheme }}>{children}</ThemeContext>;
}

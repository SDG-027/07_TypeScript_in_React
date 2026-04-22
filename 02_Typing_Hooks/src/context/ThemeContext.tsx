import { useState, createContext } from 'react';

// `as const` friert das Array ein: TypeScript behandelt es als Tuple mit exakten
// String-Literal-Typen statt als allgemeines `string[]`.
const installedThemes = [
  'halloween',
  'cyberpunk',
  'dim',
  'forest',
  'dark',
  'coffee',
  'corporate',
] as const;

// Indexed Access Type: Greift auf den Typ aller Array-Elemente zu.
// Durch `as const` sind die Elemente Literale — der resultierende Union-Typ lautet:
// 'halloween' | 'cyberpunk' | 'dim' | 'forest' | 'dark' | 'coffee' | 'corporate'
export type UsableThemes = (typeof installedThemes)[number];

// Typ für den Context-Wert. `changeTheme` ist eine Funktion, die `UsableThemes`
// erwartet und nichts zurückgibt — ausgedrückt als Funktionssignatur, nicht als Pfeilfunktion.
export type ThemeContextType = {
  theme: UsableThemes;
  // setTheme: React.Dispatch<React.SetStateAction<string>>;
  changeTheme: (newTheme: UsableThemes) => void;
};

// createContext ist generisch: <ThemeContextType> stellt sicher, dass Provider
// und Consumer exakt diesen Typ verwenden.
export const ThemeContext = createContext<ThemeContextType>({
  theme: 'halloween',
  changeTheme: (_newTheme: UsableThemes) => {},
});

export default function ThemeProvider({ children }) {
  // Das Generic <UsableThemes> schränkt useState ein: state und setter
  // akzeptieren nur Werte, die im Union-Typ enthalten sind.
  const [theme, setTheme] = useState<UsableThemes>('cyberpunk');

  function changeTheme(newTheme: UsableThemes) {
    if (installedThemes.includes(newTheme)) setTheme(newTheme);
  }

  // value ist nun durch ThemeContextType genau typisiert.
  return <ThemeContext value={{ theme, changeTheme }}>{children}</ThemeContext>;
}

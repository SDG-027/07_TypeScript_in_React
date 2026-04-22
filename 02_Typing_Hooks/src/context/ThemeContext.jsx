import { useContext, useEffect, useState, createContext } from 'react';
import { BookingContext } from './BookingContext';

// Einen neuen Context erstellen – der Default-Wert 'halloween' greift nur,
// wenn diese Komponente *keinen* umschließenden Provider hat (Edge Case)
export const ThemeContext = createContext('halloween');

// ThemeProvider ist eine Wrapper-Komponente: Sie stellt allen Kind-Komponenten
// das aktuelle Theme zur Verfügung – ohne dass Props weitergereicht werden müssen
export default function ThemeProvider({ children }) {
  // Lokaler State für das aktuelle Theme
  const [theme, setTheme] = useState('cyberpunk');

  // Wir greifen auf den BookingContext zu, um dessen State hier nutzen zu können.
  // Das zeigt: Ein Provider kann selbst auch Konsument eines anderen Contexts sein
  const { bookingState } = useContext(BookingContext);

  // useEffect reagiert hier auf Änderungen an bookingState.premium.
  // Wann immer sich der Premium-Status ändert, wird dieser Effekt erneut ausgeführt –
  // z. B. um das Theme automatisch anzupassen oder Daten neu zu laden
  useEffect(() => {
    console.log('FIRED');
    // fetch(); // Etwas tun, wenn sich der Premium-State verändert hat
  }, [bookingState.premium]); // <-- Dependency Array: Effekt läuft nur bei Änderung dieses Wertes

  // ThemeContext stellt { theme, setTheme } dem gesamten Komponentenbaum bereit.
  // Jede Kind-Komponente kann mit useContext(ThemeContext) darauf zugreifen
  return <ThemeContext value={{ theme, setTheme }}>{children}</ThemeContext>;
}

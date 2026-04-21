import { useEffect, useState } from 'react';
// 'import type' ist ein TypeScript-Feature: Es importiert nur den Typ, nicht den Wert.
// Zur Laufzeit existiert dieser Import gar nicht – er wird vom Compiler komplett entfernt.
// Gut für die Performance und signalisiert klar: "Das hier ist nur für die Typrüfung."
import type { ComponentStatus, User } from '../types';

// Testdaten, die den Typ 'User[]' (Array aus User-Objekten) erfüllen müssen.
// TypeScript prüft hier, ob jedes Objekt die Felder hat, die in '../types' für 'User' definiert sind.
const userArr: User[] = [
  {
    id: 1,
    username: 'Guybrush',
    info: 'alert',
  },
  {
    id: 2,
    username: 'Anakin',
    info: 'failure',
  },
];

export default function UserList() {
  // useState<User[]> – der Typ wird explizit als Generic angegeben.
  // Nötig, weil der Startwert '[]' leer ist: TypeScript könnte den Typ sonst nicht
  // selbst herleiten und würde 'any[]' annehmen, also aufgeben.
  const [users, setUsers] = useState<User[]>([]);

  // Hier brauchen wir kein Generic – TypeScript leitet den Typ 'boolean'
  // automatisch aus dem Startwert 'true' ab (Type Inference).
  const [loading, setLoading] = useState(true);

  // 'string | null' ist ein Union Type: der Wert ist entweder ein Fehlertext oder null.
  // null = kein Fehler, string = Fehlermeldung liegt vor.
  const [error, setError] = useState<string | null>(null);

  // 'ComponentStatus' ist ein selbst definierter Typ aus '../types' –
  // ein Union Type: type ComponentStatus = 'unset' | 'loading' | 'success' | 'error'
  // Das Generic stellt sicher, dass nur diese erlaubten Strings gesetzt werden dürfen.
  const [status, setStatus] = useState<ComponentStatus>('unset');

  useEffect(() => {
    setError(null);
    setUsers(userArr);
    // Funktions-Updater: Statt einem direkten Wert übergeben wir eine Funktion.
    // TS kennt hier auch den Type von prev.
    setLoading((prev) => !prev);
    setError('Fetch failed');
    setStatus('success');
  }, []);

  return (
    <div>{users.length > 0 && users.map((user) => <p>{user.info}</p>)}</div>
  );
}

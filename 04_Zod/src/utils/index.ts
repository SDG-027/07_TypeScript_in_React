import z from 'zod';

export const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

// Schema für ein Kontaktformular — alle Felder, die der Nutzer ausfüllen soll.
// z.object() definiert die erwartete Struktur: welche Felder es gibt und welche Regeln gelten.
export const FormSchema = z.object({
  // .trim() entfernt Leerzeichen am Anfang und Ende
  name: z
    .string()
    .trim()
    .min(1, { error: 'Name required' })
    .max(64, { error: 'Name too long' }),

  // z.coerce.number() versucht, den Wert automatisch in eine Zahl umzuwandeln.
  // Das ist bei Formularen wichtig, weil HTML-Inputs immer Strings liefern —
  // auch wenn der Nutzer eine Zahl eingetippt hat (z.B. "42" → 42)
  number: z.coerce.number({ error: 'Number required' }),

  // z.email() prüft, ob der String dem Format einer E-Mail-Adresse entspricht
  email: z.email({ error: 'Invalid email' }).trim(),

  message: z
    .string()
    .trim()
    .min(1, { error: 'Message required' })
    .max(2000, { error: 'Message too long' }),
});

// TypeScript-Typ wird direkt aus dem Schema abgeleitet — kein manuelles Interface nötig.
// FormType kann jetzt im restlichen Code (z.B. React-Komponenten) als Typ verwendet werden.
export type FormType = z.infer<typeof FormSchema>;

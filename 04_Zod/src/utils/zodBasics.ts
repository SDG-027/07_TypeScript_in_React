// Zod wird importiert — die Bibliothek für Runtime Validation in TypeScript
import z from 'zod';

// Eine einfache Variable mit einem String-Wert
let myMessage = 'Hallo, Leute!';

// Typfehler: in der Laufzeit haben wir hier keine Unterstützung von TypeScript, nur beim Entwickeln!
myMessage = 123345;

// Ein Schema beschreibt die erwartete Form der Daten — hier: ein String zwischen 12 und 512 Zeichen.
// Das Schema selbst validiert noch nichts — es ist die "Blaupause" für spätere Prüfungen.
const MessageSchema = z.string().min(12).max(512);

// safeParse() prüft die Daten gegen das Schema.
// Das Ergebnis ist entweder { success: true, data: ... } oder { success: false, error: ... }
const test = MessageSchema.safeParse(myMessage);

// Rohdaten — ein Objekt, das wir später gegen UserSchema validieren wollen
const user = {
  id: 123,
  age: 32,
  name: 'Guybrush',
  username: 'mightypirate',
  password: '123',
  // email ist auskommentiert — da das Feld im Schema optional() ist, ist das kein Fehler
  // email: 'mighty@pirate.gov',
  address: {
    street: 'Melee Island 1',
    geo: [52, 13],
  },
};

// Ein wiederverwendbares Schema für Namen — wird unten für 'name' und 'username' genutzt.
// Wiederverwendung von Schemas verhindert Dopplungen und hält den Code konsistent.
const NameSchema = z
  .string()
  .min(1, { error: 'Name required' })
  .max(128, { error: 'Name too long' });

// Basis-Passwortschema mit Längenregeln — wird unten als Ausgangspunkt für weitere .regex()-Checks erweitert.
// Man kann Schemas in Zod wie Bausteine kombinieren und schrittweise ergänzen.
const basePasswordSchema = z
  .string({ error: 'Password must be a string' })
  .min(12, { error: 'Password must be at least 12 characters long' })
  .max(50, { error: 'The length of this Password is excessive.' });

// Das Hauptschema für ein User-Objekt.
// z.object() erwartet ein plain object und definiert für jedes Feld ein eigenes Schema.
const UserSchema = z.object({
  id: z.number(),

  // .positive() stellt sicher, dass das Alter > 0 ist; .max(120) setzt eine plausible Obergrenze
  age: z
    .number()
    .positive({ error: 'Age must be positive' })
    .max(120, { error: 'Too old' }),

  // Hier verwenden wir NameSchema für beide Felder — DRY-Prinzip in Aktion
  name: NameSchema,
  username: NameSchema,

  // .optional() bedeutet: das Feld darf fehlen — ist es vorhanden, muss es eine gültige E-Mail sein
  email: z.email().optional(),

  // basePasswordSchema wird hier um vier .regex()-Prüfungen erweitert.
  // Jede Regex prüft eine eigene Anforderung und liefert eine eigene Fehlermeldung.
  // Die Methoden werden einfach aneinandergekettet — Zod prüft alle Regeln der Reihe nach.
  password: basePasswordSchema
    .regex(/[a-z]/, {
      error: 'Password must include at least one lowercase letter.',
    })
    .regex(/[A-Z]/, {
      error: 'Password must include at least one uppercase letter.',
    })
    .regex(/[0-9]/, { error: 'Password must include at least one number.' })
    .regex(/[!@#$%^&*()_+={}|;:'",.<>?`~]/, {
      error: 'Password must include at least one special character',
    }),

  // Verschachtelte Objekte funktionieren genauso — einfach z.object() innerhalb von z.object()
  address: z.object({
    street: z.string().min(1).max(128),

    // z.tuple() validiert ein Array mit einer festen Anzahl Elemente in einer bestimmten Reihenfolge.
    // Hier: [Breitengrad (number), Längengrad (number)] — im Gegensatz zu z.array(), das variable Längen erlaubt
    geo: z.tuple([
      z.number({ error: 'Expected longitude to be a number' }),
      z.number(),
    ]),
  }),
});

// z.infer<> leitet den TypeScript-Typ direkt aus dem Schema ab.
// So muss man den Typ nicht separat schreiben — Schema und Typ bleiben automatisch synchron.
export type User = z.infer<typeof UserSchema>;

// safeParse gibt ein Objekt zurück — wir destrukturieren direkt in success, data und error.
// success: boolean — war die Validierung erfolgreich?
// data: das validierte Objekt (nur wenn success === true)
// error: ein ZodError mit allen Fehlern (nur wenn success === false)
const { success, data, error } = UserSchema.safeParse(user);
console.log(success);
console.log(data);
console.log(error);

export { MessageSchema };

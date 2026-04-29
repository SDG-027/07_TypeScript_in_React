// Wir importieren die zwei wichtigsten Funktionen aus Vitest:
// - 'test' definiert einen einzelnen Testfall mit Namen und Testlogik
// - 'expect' stellt Assertions bereit, mit denen wir prüfen, ob ein Ergebnis korrekt ist
import { test, expect } from 'vitest';

// Wir importieren die Funktion, die wir testen wollen (das sog. "System under Test")
import { awesum } from './easy_peasy.ts';

// Ein einfacher Testfall: 'test' nimmt zwei Argumente —
// 1. einen beschreibenden Namen (was soll der Test prüfen?)
// 2. eine Callback-Funktion, die die eigentliche Testlogik enthält
test('should return "awe20"', () => {
  // --- ARRANGE: Vorbedingungen aufsetzen ---
  // Wir legen die Eingabewerte und den erwarteten Rückgabewert fest
  const a = 13;
  const b = 7;
  const expected = `awe20`;

  // --- ACT: Die Funktion aufrufen ---
  // Wir rufen 'awesum' mit unseren Testwerten auf und speichern das Ergebnis
  const actual = awesum(a, b);

  // --- ASSERT: Ergebnis überprüfen ---
  // 'expect(actual).toBe(expected)' prüft, ob actual === expected (strikte Gleichheit)
  // Schlägt diese Assertion fehl, markiert Vitest den Test als FAILED
  expect(actual).toBe(expected);
});

// Derselbe Test, aber mit einer "Test Table" (auch: parametrisierter Test)
// Statt mehrere fast-identische Tests zu schreiben, packen wir alle Fälle in ein Array
test(' should return awesome sum ', () => {
  // --- ARRANGE: Mehrere Testfälle als Array von Objekten ---
  // Jedes Objekt ist ein Szenario: Eingaben (a, b) und der erwartete Wert (exp)
  // So können wir Randfälle (z. B. negative Zahlen) mit derselben Logik abdecken
  const testTable = [
    { a: 13, b: 7, exp: 'awe20' }, // Normalfall
    { a: 7, b: 13, exp: 'awe20' }, // Umgekehrte Reihenfolge — ist Addition kommutativ?
    { a: 7, b: -13, exp: 'awe-6' }, // Negativer Summand
  ];

  // Wir iterieren über jeden Testfall mit Destructuring
  for (const { a, b, exp } of testTable) {
    // --- ACT ---
    const actual = awesum(a, b);

    // --- ASSERT ---
    // Dieselbe Assertion wie oben — läuft jetzt aber für jeden Eintrag in der Tabelle
    expect(actual).toBe(exp);
  }
});

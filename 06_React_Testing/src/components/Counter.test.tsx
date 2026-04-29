// Imports aus Vitest: 'test' und 'it' sind gleichwertig (Alias), 'describe' gruppiert Tests
import { test, expect, describe, it } from 'vitest';

// Testing Library stellt drei wichtige Werkzeuge bereit:
// - 'render'     → rendert eine React-Komponente in eine simulierte DOM-Umgebung
// - 'screen'     → erlaubt uns, Elemente im gerenderten DOM zu suchen
// - 'fireEvent'  → simuliert Nutzerinteraktionen wie Klicks
import { fireEvent, render, screen } from '@testing-library/react';

// Die Komponente, die wir testen — das "System under Test"
import Counter from './Counter';

// Ein eigenständiger Test außerhalb einer Gruppe:
//  prüft nur, ob die Komponente grundsätzlich rendert
test('Counter renders', () => {
  // --- ARRANGE + ACT in einem Schritt ---
  // render() mountet die Komponente. Hier brauchen wir keine extra Variablen —
  // wir suchen die Elemente direkt über 'screen'
  render(<Counter />);

  // --- ASSERT ---
  // screen.getByRole() holt aus dem simulierten DOM ein Element heraus das
  // diesen Bedingungen entspricht:
  // 'role: heading' sucht ein <h1>–<h6>-Element, 'name' filtert nach dem sichtbaren Text
  expect(
    screen.getByRole('heading', {
      name: 'Counter Component',
    })
  ).toBeInTheDocument(); // Assertion: das Element muss im DOM existieren

  // Zweite Assertion im selben Test: der Reset-Button muss ebenfalls vorhanden sein
  expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument();
});

// 'describe' fasst zusammengehörige Tests zu einer benannten Gruppe zusammen.
// Das strukturiert die Test-Ausgabe und macht klar, was hier geprüft wird.
describe('Button Functionality', () => {
  // 'it' ist identisch mit 'test' — oft bevorzugt, weil es sich besser liest:
  // "it increments counter when + button is clicked"
  it('increments counter when + button is clicked', () => {
    // Arrange: Komponente rendern, dann den +-Button anhand seiner Rolle + Name suchen
    render(<Counter />);
    const incrementBtn = screen.getByRole('button', { name: '+' });

    // Act: Zwei Klicks simulieren
    fireEvent.click(incrementBtn);
    fireEvent.click(incrementBtn);

    // Assert: Im DOM muss jetzt eine "2" sichtbar sein
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('decrements counter when - button is clicked', () => {
    // Arrange: Komponente mit einem Startwert (prop 'initialValue') rendern
    // So testen wir nicht nur den Standardfall, sondern auch die prop-Übergabe
    render(<Counter initialValue={5} />);
    const decrementBtn = screen.getByRole('button', { name: '-' });

    // Act: Zwei Klicks auf den Minus-Button
    fireEvent.click(decrementBtn);
    fireEvent.click(decrementBtn);

    // Assert: 5 - 2 = 3
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('resets counter to initial value when reset button is clicked', () => {
    // Arrange: Startwert 3, beide relevanten Buttons raussuchen
    render(<Counter initialValue={3} />);
    const incrementBtn = screen.getByRole('button', { name: '+' });

    // 'name: /reset/i' ist ein regulärer Ausdruck — der 'i'-Flag macht die Suche
    // case-insensitive, findet also "Reset", "RESET", "reset" gleichermaßen
    const resetBtn = screen.getByRole('button', { name: /reset/i });

    // Act: Counter auf 5 hochzählen, dann zurücksetzen
    fireEvent.click(incrementBtn);
    fireEvent.click(incrementBtn);
    fireEvent.click(resetBtn);

    // Assert: Nach dem Reset muss der Startwert (3) wieder angezeigt werden
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});

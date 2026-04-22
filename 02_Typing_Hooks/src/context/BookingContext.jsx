import { useEffect, useReducer, createContext } from 'react';

// Der Ausgangszustand der App – useReducer startet immer mit diesem Wert
const initialState = {
  destinations: [],
  premium: false, // wird automatisch gesetzt, sobald >= 2 Destinations vorhanden sind
};

export const BookingContext = createContext(null);

// Der Reducer ist eine *pure function*: gleiche Eingabe → immer gleiche Ausgabe.
// Sie bekommt den aktuellen State und eine Action, und gibt den *neuen* State zurück.
// Wichtig: State wird nie direkt verändert (kein state.destinations.push!) – immer neu erstellt
function reducer(state, action) {
  // action.type bestimmt, was passieren soll; action.payload trägt die nötigen Daten
  switch (action.type) {
    case 'add_destination': {
      // Duplikate verhindern: wenn das Ziel schon vorhanden ist, State unverändert zurückgeben
      if (state.destinations.includes(action.payload)) return state;
      // Spread-Operator: neues Array erstellen statt das bestehende zu mutieren
      const destinations = [...state.destinations, action.payload];
      // Premium-Status wird aus dem neuen State *abgeleitet* – kein separater dispatch nötig.
      // Das ist ein Vorteil von useReducer: mehrere State-Felder können in einer Aktion synchron aktualisiert werden
      const premium = destinations.length >= 2;
      return { ...state, destinations, premium };
    }
    case 'remove_destination': {
      // filter() gibt ein neues Array zurück – das Original bleibt unangetastet
      const destinations = state.destinations.filter(
        (d) => d !== action.payload
      );
      // Premium-Status nach dem Entfernen neu berechnen
      const premium = destinations.length >= 2;
      return { ...state, destinations, premium };
    }

    // Unbekannte Actions werfen einen Fehler – hilft beim Debugging
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

export default function BookingProvider({ children }) {
  // useReducer gibt – ähnlich wie useState – ein Wertepaar zurück:
  // - bookingState: der aktuelle State
  // - dispatch: die Funktion, um Actions an den Reducer zu schicken
  const [bookingState, dispatch] = useReducer(reducer, initialState);

  // Hilfsfunktionen kapseln den dispatch-Aufruf: Kindkomponenten müssen
  // nichts über Action-Typen wissen – sie rufen einfach addDestination(wert) auf
  function addDestination(payload) {
    dispatch({ type: 'add_destination', payload });
  }

  function removeDestination(payload) {
    dispatch({ type: 'remove_destination', payload });
  }

  // Zum Debugging: gibt den aktuellen State bei jeder Änderung in der Konsole aus
  useEffect(() => {
    console.log(bookingState);
  }, [bookingState]);

  // Der Context stellt nach außen nur die Hilfsfunktionen bereit, nicht dispatch selbst –
  // so bleibt die Reducer-Logik zentral und gekapselt
  return (
    <BookingContext value={{ bookingState, addDestination, removeDestination }}>
      {children}
    </BookingContext>
  );
}

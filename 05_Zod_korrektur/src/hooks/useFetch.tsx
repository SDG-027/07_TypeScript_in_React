import { useEffect, useState } from 'react';
import z from 'zod';

// Ein Custom Hook ist eine normale Funktion, deren Name mit "use" beginnt.
// Sie darf React Hooks (wie useState, useEffect) verwenden und bündelt
// wiederverwendbare Logik, die man in mehreren Komponenten einsetzen kann.
// Der Custom Hook muss gemäß der "Rules of Hooks" in den Komponenten verwendet werden!
// Dieser Hook kapselt die gesamte Fetch-Logik – inklusive Validierung mit Zod.
//
// Das Generic <T extends z.ZodType> stellt sicher, dass 'schema' immer ein
// gültiges Zod-Schema ist. TypeScript kann daraus automatisch den Datentyp ableiten.
export default function useFetch<T extends z.ZodType>(url: string, schema: T) {
  // z.infer<typeof schema> leitet den TypeScript-Typ direkt aus dem Zod-Schema ab.
  // Wenn das Schema z.string() ist, wird data automatisch als string | undefined typisiert.
  const [data, setData] = useState<z.infer<typeof schema>>();
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // AbortController ermöglicht es, einen laufenden Fetch abzubrechen.
    // Das ist wichtig, um Memory Leaks zu vermeiden: Wenn die Komponente
    // aus dem DOM entfernt wird, bevor der Fetch fertig ist, soll
    // kein State mehr gesetzt werden
    const controller = new AbortController();

    async function fetchData() {
      setLoading(true);

      try {
        // Das 'signal' verknüpft den Fetch mit dem AbortController.
        // Wird controller.abort() aufgerufen, wird dieser Fetch sofort abgebrochen.
        const res = await fetch(url, { signal: controller.signal });
        if (!res) throw new Error(`Fetch failed; Status Code: ${res.status}`);
        const data = await res.json();

        // schema.safeParse() validiert die Daten gegen das Zod-Schema.
        // Im Gegensatz zu parse() wirft safeParse() keinen Fehler, sondern gibt
        // immer ein Objekt zurück: entweder { success: true, data } oder { success: false, error }.
        const { success, data: zd, error } = schema.safeParse(data);

        if (success) {
          // Validierung erfolgreich: 'zd' ist jetzt typsicher und entspricht dem Schema.
          setData(zd);
        } else {
          // Validierung fehlgeschlagen: z.prettifyError() wandelt den Zod-Fehler
          // in einen lesbaren, mehrzeiligen String um – gut für Debugging.
          setError(z.prettifyError(error));
        }
      } catch (err) {
        // Abgebrochene Fetches werfen einen Fehler mit dem Namen 'AbortError'.
        // Diesen ignorieren wir bewusst – er ist kein echter Fehler, sondern
        // passiert immer beim Cleanup (s.u.) und ist damit erwartet.
        if (err.name !== 'AbortError') setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    // Diese Cleanup-Funktion wird von React aufgerufen, wenn:
    // - die Komponente aus dem DOM entfernt wird (Seiten-Navigation), oder
    // - sich url oder schema geändert haben (vor dem nächsten Effect-Aufruf).
    // controller.abort() bricht den laufenden Fetch ab und verhindert so,
    // dass veraltete Antworten den State überschreiben.
    return () => {
      controller.abort();
    };
  }, [url, schema]); // Der Effect wird neu ausgeführt, wenn sich url oder schema ändert.

  // Der Hook gibt drei Werte zurück, die die Komponente direkt verwenden kann:
  // - data: die validierten Daten (undefined solange noch nicht geladen)
  // - error: Fehlermeldung als String, oder null wenn kein Fehler vorliegt
  // - loading: true während der Fetch läuft
  return { data, error, loading };
}

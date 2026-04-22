import { Outlet } from 'react-router';
import { Footer, NavBar } from '../components';
import { Suspense } from 'react';
import ThemeProvider from '../context/ThemeContext';
import { useContext } from 'react';
import { BookingContext } from '../context/BookingContext';

// Das Promise wird *außerhalb* der Komponente erstellt – einmalig beim ersten Laden des Moduls.
// Dadurch wird der Fetch nicht bei jedem Re-render neu ausgelöst.
// Die Kind-Komponenten lesen das Promise später mit der React 19 use()-Funktion aus
const destinationsPromise = fetch('/travel.json').then((res) => res.json());

export default function MainLayout() {
  const { bookingState } = useContext(BookingContext);

  return (
    // ThemeProvider kann auch hier eingehängt werden – alle Komponenten innerhalb haben Zugriff auf ThemeContext
    <ThemeProvider>
      {/* Das aktive Theme wird direkt auf das Wurzel-Element angewendet (DaisyUI data-theme).
          Der Wert wird aus dem BookingContext *abgeleitet* – kein eigener State nötig */}
      <div
        className="flex min-h-screen flex-col"
        data-theme={bookingState.premium ? 'cyberpunk' : 'halloween'}
      >
        <NavBar />
        <main className="container mx-auto mb-auto px-4 py-8">
          {/* Suspense ist der nötige Begleiter zu lazy()-Komponenten (und use()).
              Solange ein lazy-Chunk oder ein Promise noch lädt, zeigt React den fallback an */}
          <Suspense
            fallback={<span className="loading loading-dots loading-xl"></span>}
          >
            {/* Outlet rendert die jeweils aktive Kind-Route.
                context={destinationsPromise} reicht das Promise an die Kind-Route weiter –
                dort wird es mit useOutletContext() + use() aufgelöst */}
            <Outlet context={destinationsPromise} />
          </Suspense>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

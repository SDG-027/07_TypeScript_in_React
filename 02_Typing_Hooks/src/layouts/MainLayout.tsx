import { Outlet } from 'react-router';
import { Footer, NavBar } from '../components';
import { Suspense } from 'react';
import ThemeProvider from '../context/ThemeContext';
import { useContext } from 'react';
import { BookingContext } from '../context/BookingContext';
// Reiner Typ-Import: `Destination` existiert nur zur Compile-Zeit.
import type { Destination } from '../types';

// Dieser Typ beschreibt, was `<Outlet context={...} />` nach unten weitergibt.
// Child-Routen lesen ihn mit `useOutletContext<MainLayoutContext>()` aus —
// das Generic dort sorgt dafür, dass der zurückgegebene Wert korrekt typisiert ist.
export type MainLayoutContext = {
  destinationsPromise: Promise<Destination[]>;
  hello: string;
};

// Das Promise wird außerhalb der Komponente erstellt — es entsteht einmalig beim
// Modulload und wird nicht bei jedem Render neu erzeugt (kein Re-fetch).
// Der Typ wird explizit annotiert, weil `fetch().then(res => res.json())`
// sonst `Promise<any>` liefern würde.
const destinationsPromise: Promise<Destination[]> = fetch('/travel.json').then(
  (res) => res.json()
);

export default function MainLayout() {
  const { bookingState } = useContext(BookingContext);

  return (
    <ThemeProvider>
      <div
        className="flex min-h-screen flex-col"
        data-theme={bookingState.premium ? 'cyberpunk' : 'halloween'}
      >
        <NavBar />
        <main className="container mx-auto mb-auto px-4 py-8">
          <Suspense
            fallback={<span className="loading loading-dots loading-xl"></span>}
          >
            {/* Das context-Prop von <Outlet> ist in React Router typisiert als `unknown` —
                der tatsächliche Typ wird erst beim Konsumenten über das Generic von
                useOutletContext<MainLayoutContext>() erzwungen, nicht hier. */}
            <Outlet context={{ destinationsPromise, hello: 'world' }} />
          </Suspense>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

import { Outlet } from 'react-router';
import { Footer, NavBar } from '../components';
import { Suspense } from 'react';
import ThemeProvider from '../context/ThemeContext';
import { useContext } from 'react';
import { BookingContext } from '../context/BookingContext';
import type { Destination } from '../types';

export type MainLayoutContext = {
  destinationsPromise: Promise<Destination[]>;
  hello: string;
};

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
            <Outlet context={{ destinationsPromise, hello: 'world' }} />
          </Suspense>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

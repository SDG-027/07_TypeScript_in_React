// lazy ermöglicht Code Splitting: jede Seite wird als eigenes JS-Chunk gebündelt
// und erst dann vom Server geladen, wenn sie tatsächlich aufgerufen wird
import { lazy } from 'react';

import { Routes, Route } from 'react-router';
import MainLayout from './layouts/MainLayout';

// Statt: import Home from './pages/Home'
// lazy() nimmt eine Funktion, die ein dynamisches import() zurückgibt.
// Das Ergebnis ist eine Komponente, die React erst beim ersten Rendern lädt
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Destinations = lazy(() => import('./pages/Destinations'));
const SingleDestination = lazy(() => import('./pages/SingleDestination'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    // Routes schaut sich die aktuelle URL an und rendert die passende Route
    <Routes>
      {/* MainLayout ist das gemeinsame Gerüst - weil wir es sofort brauchen ist hier kein lazy import */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="destinations" element={<Destinations />} />
        <Route path="destinations/:slug" element={<SingleDestination />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="/admin">
        <Route index element={<h1>ADMIN</h1>} />
      </Route>
    </Routes>
  );
}

export default App;

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router';
// import ThemeProvider from './context/ThemeContext.jsx';
import BookingProvider from './context/BookingContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* BrowserRouter ist auch ein Context */}
    {/* - innerhalb der gewrappten Elemente haben wir Zugriff auf die react-router Hooks*/}
    <BrowserRouter>
      {/* BookingProvider wrappt die gesamte App - alle Context-Werte sind in den Kindkomponenten verfügbar*/}
      <BookingProvider>
        {/* ThemeProvider kann hier verwendet werden, oder in einem Abschnitt des Komponentenbaums*/}
        {/* <ThemeProvider>*/}
        <App />
        {/* </ThemeProvider>*/}
      </BookingProvider>
    </BrowserRouter>
  </StrictMode>
);

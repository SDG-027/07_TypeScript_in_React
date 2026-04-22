import { useContext } from 'react';
import { Link } from 'react-router';
// Beide Contexts importieren – diese Komponente ist Konsument von zweien gleichzeitig
import { ThemeContext } from '../../context/ThemeContext';
import { BookingContext } from '../../context/BookingContext';

const DestinationCard = ({ title, image, text, slug }) => {
  // Aus dem ThemeContext holen wir nur das theme – setTheme brauchen wir hier nicht
  const { theme } = useContext(ThemeContext);
  // Aus dem BookingContext holen wir die Hilfsfunktionen und den aktuellen State
  const { addDestination, removeDestination, bookingState } =
    useContext(BookingContext);

  // Aus dem State *ableiten*, ob diese Karte gebucht ist – kein eigener useState nötig.
  // Wenn sich bookingState ändert, rendert React die Komponente neu und isBooked ist automatisch aktuell
  const isBooked = bookingState.destinations.includes(slug);

  // Entscheidet anhand von isBooked, welche Aktion ausgeführt wird –
  // die eigentliche Logik liegt aber im Reducer, nicht hier
  function handleClick() {
    if (isBooked) {
      removeDestination(slug);
    } else {
      addDestination(slug);
    }
  }

  return (
    // data-theme übergibt das aktuelle Theme an DaisyUI – so kann jede Karte individuell gestylt werden
    <article className="card bg-base-100 shadow-md" data-theme={theme}>
      <figure>
        <img src={image} alt="Tokyo" className="h-48 w-full object-cover" />
      </figure>
      <div className="card-body">
        <Link to={`/destinations/${slug}`}>
          <h2 className="card-title hover:text-primary text-lg font-semibold">
            {title}
          </h2>
        </Link>
        <p>{text}</p>
        <div className="card-actions justify-end">
          <button
            type="button"
            // Ternary: je nach isBooked wird eine andere CSS-Klasse gesetzt (DaisyUI btn-error / btn-primary)
            className={`btn ${isBooked ? 'btn-error' : 'btn-primary'}`}
            onClick={handleClick}
          >
            {/* Auch der Button-Text reagiert auf isBooked – alles aus einer einzigen abgeleiteten Variable */}
            {isBooked ? 'Unbook' : 'Book now'}
          </button>
        </div>
      </div>
    </article>
  );
};

export default DestinationCard;

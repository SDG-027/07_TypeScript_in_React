import { useContext } from 'react';
import { Link } from 'react-router';
import { ThemeContext } from '../../context/ThemeContext';
import { BookingContext } from '../../context/BookingContext';

const DestinationCard = ({ title, image, text, slug }) => {
  const { theme } = useContext(ThemeContext);
  const { addDestination, removeDestination, bookingState } =
    useContext(BookingContext);

  const isBooked = bookingState.destinations.includes(slug);

  function handleClick() {
    if (isBooked) {
      removeDestination(slug);
    } else {
      addDestination(slug);
    }
  }

  return (
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
            className={`btn ${isBooked ? 'btn-error' : 'btn-primary'}`}
            onClick={handleClick}
          >
            {isBooked ? 'Unbook' : 'Book now'}
          </button>
        </div>
      </div>
    </article>
  );
};

export default DestinationCard;

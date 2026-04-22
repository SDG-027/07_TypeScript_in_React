import { use } from 'react';
import { useOutletContext, useParams } from 'react-router';

const SingleDestination = () => {
  const { slug } = useParams();
  const destinationsPromise = useOutletContext();
  const destinations = use(destinationsPromise);

  const destination = destinations?.find((d) => d.slug === slug);

  if (!destination) {
    return (
      <div className="py-20 text-center">
        <title>Travel Agency</title>
        <h1 className="text-error text-3xl font-bold">Destination Not Found</h1>
        <p className="text-base-content mt-2">
          Sorry, we couldn't find the destination you're looking for.
        </p>
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4">
      <title>Destinations | Travel Agency</title>
      <h1 className="text-primary text-center text-4xl font-bold">
        {destination.title}
      </h1>
      <img
        src={destination.image}
        alt={destination.title}
        className="rounded-box h-80 w-full object-cover shadow-md"
      />
      <p className="text-lg">{destination.description}</p>
    </div>
  );
};

export default SingleDestination;

import { useOutletContext } from 'react-router';
import { DestinationCard } from '../components';
import { use } from 'react';
import type { MainLayoutContext } from '../layouts/MainLayout';

const Destinations = () => {
  const { destinationsPromise } = useOutletContext<MainLayoutContext>();
  const destinations = use(destinationsPromise);
  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4">
      <title>Destinations | Travel Agency</title>
      <section className="space-y-2 text-center">
        <h1 className="text-primary text-4xl font-bold">
          Explore All Destinations
        </h1>
        <p className="text-base-content text-lg">
          Discover exciting and affordable travel spots curated just for
          software engineering students.
        </p>
      </section>
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {destinations.map(({ title, image, description, slug }) => (
          <DestinationCard
            key={slug}
            title={title}
            image={image}
            text={description}
            slug={slug}
          />
        ))}
      </section>
    </div>
  );
};

export default Destinations;

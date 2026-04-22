import { useOutletContext } from 'react-router';
import { DestinationCard } from '../components';
import { use } from 'react';

const Home = () => {
  const destinationsPromise = useOutletContext();

  const destinations = use(destinationsPromise);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-16">
      <title>Travel Agency</title>
      <meta description="A cool travelling Page" />
      <section className="space-y-4 text-center">
        <h1 className="text-primary text-4xl font-bold">
          Find Your Next Student Adventure
        </h1>
        <search>
          <form
            onSubmit={handleSearch}
            className="md:join flex w-full flex-col justify-center gap-2 px-4 md:flex-row md:gap-0"
          >
            <input
              name="origin"
              type="text"
              placeholder="Origin"
              className="input input-bordered join-item w-full"
            />
            <input
              name="destination"
              type="text"
              placeholder="Destination"
              className="input input-bordered join-item w-full"
            />
            <input
              name="departure"
              type="date"
              className="input input-bordered join-item w-full"
            />
            <input
              name="return"
              type="date"
              className="input input-bordered join-item w-full"
            />
            <button type="submit" className="btn btn-primary join-item">
              Search
            </button>
          </form>
        </search>
      </section>
      <section className="space-y-6 px-4 text-center">
        <h2 className="text-secondary text-3xl font-bold">Why Book With Us?</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <div className="bg-base-200 rounded-box p-4 shadow">
            <h3 className="text-lg font-semibold">Curated Student Trips</h3>
            <p>
              Every destination is selected to inspire, educate, and energize
              student travelers.
            </p>
          </div>
          <div className="bg-base-200 rounded-box p-4 shadow">
            <h3 className="text-lg font-semibold">Affordable Packages</h3>
            <p>
              Group rates and student discounts help you travel smart and save
              money.
            </p>
          </div>
          <div className="bg-base-200 rounded-box p-4 shadow">
            <h3 className="text-lg font-semibold">Flexible Dates</h3>
            <p>Travel plans built around academic calendars and exam breaks.</p>
          </div>
        </div>
      </section>
      <section className="space-y-6 px-4">
        <h2 className="text-secondary text-center text-3xl font-bold">
          Popular Destinations
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {destinations?.slice(0, 3).map((destination) => (
            <DestinationCard
              key={destination.slug}
              title={destination.title}
              image={destination.image}
              text={destination.description}
              slug={destination.slug}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;

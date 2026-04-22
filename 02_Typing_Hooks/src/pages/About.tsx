const About = () => {
  return (
    <div className="space-y-10">
      <title>About | Travel Agency</title>
      <section className="text-center">
        <h1 className="text-primary mb-4 text-4xl font-bold">About Us</h1>
        <p className="mx-auto max-w-2xl text-lg">
          Welcome to{' '}
          <span className="text-primary font-semibold">Travel Agency</span> —
          your gateway to unforgettable experiences! We specialize in
          affordable, student-friendly travel packages tailored for Software
          Engineering students.
        </p>
      </section>
      <section className="grid place-items-center gap-4 md:grid-cols-2">
        <div>
          <h2 className="text-primary mb-2 text-2xl font-semibold">
            Why Travel With Us?
          </h2>
          <ul className="list-inside list-disc space-y-2 text-base">
            <li>Affordable, curated student trips</li>
            <li>Group packages to tech hubs & hackathons</li>
            <li>Safe, reliable, and fun experiences</li>
            <li>Led by students, for students</li>
          </ul>
        </div>
        <img
          src="https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Students traveling on a bus"
          className="rounded-box shadow-md"
        />
      </section>
      <section className="bg-base-200 rounded-box p-6">
        <h2 className="text-primary mb-4 text-2xl font-semibold">
          Our Mission
        </h2>
        <p>
          To connect SE students through shared travel adventures, fostering
          learning, friendships, and unforgettable memories — all while staying
          budget-friendly.
        </p>
      </section>
    </div>
  );
};

export default About;

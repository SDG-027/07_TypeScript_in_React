/** biome-ignore-all lint/correctness/useUniqueElementIds: <explanation> */
const Contact = () => {
  return (
    <div className="mx-auto max-w-2xl space-y-10">
      <title>Contact | Travel Agency</title>
      <section className="text-center">
        <h1 className="text-primary mb-4 text-4xl font-bold">Contact Us</h1>
        <p className="mx-auto max-w-xl text-lg">
          Have questions, ideas, or want to join a trip? Send us a message and
          we’ll get back to you soon!
        </p>
      </section>
      <form className="bg-base-200 rounded-box grid grid-cols-1 gap-6 p-6 shadow-md">
        <div className="form-control w-full">
          <label className="label" htmlFor="name">
            <span className="label-text">Name</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder="Your full name"
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control w-full">
          <label className="label" htmlFor="email">
            <span className="label-text">Email</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control w-full">
          <label className="label" htmlFor="message">
            <span className="label-text">Message</span>
          </label>
          <textarea
            id="message"
            className="textarea textarea-bordered h-32 w-full"
            placeholder="Type your message here..."
          ></textarea>
        </div>
        <div className="text-right">
          <button type="submit" className="btn btn-primary">
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;

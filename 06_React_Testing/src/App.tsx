import { Counter, ContactForm, UserList } from '@/components';

const App = () => {
  return (
    <div className="bg-base-200 min-h-screen" data-theme="forest">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-primary mb-4 text-4xl font-bold">
            Welcome to React Testing with RTL
          </h1>
          <p className="text-base-content/70 text-lg">
            This app demonstrates various components perfect for testing
            scenarios
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-4">
          <div>
            <Counter initialValue={0} step={1} />
          </div>
          <div>
            <ContactForm />
          </div>
          <div className="lg:col-span-2">
            <UserList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

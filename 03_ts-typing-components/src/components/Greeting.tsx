// components/Greeting.tsx
// This component should receive a `name` string prop, if no name is passed, render 'Hello Stranger'
const Greeting = ({ name }: { name?: string }) => {
  return <h1>Hello, {name || 'Stranger'}!</h1>;
};

export default Greeting;

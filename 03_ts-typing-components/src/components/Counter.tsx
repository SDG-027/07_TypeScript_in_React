// components/Counter.tsx
// This component should receive an `initialCount` number prop
// Pass that initial count as the initial value of a piece of state called count
// Render buttons to increase, decrease and reset

import { useState } from 'react';

type Props = {
  initialCount: number;
};

const Counter = ({ initialCount }: Props) => {
  const [count, setCount] = useState(initialCount);

  const handleDecrease = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log(event.currentTarget.value);
    setCount((c) => c - 1);
  };

  return (
    <>
      <p>Initial count: {initialCount}</p>
      <p>Curr count: {count}</p>
      <button
        value={'+'}
        onClick={(event) => {
          console.log(event.currentTarget.value);
          setCount((c) => c + 1);
        }}
      >
        Increase
      </button>
      <button onClick={handleDecrease}>Decrease</button>
      <button onClick={() => setCount(initialCount)}>Reset</button>
    </>
  );
};

export default Counter;

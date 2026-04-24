// components/Toggle.tsx
// This component should receive `isOn` (boolean) and `onToggle` (function that takes no arguments and returns void)
// The onToggle function should change the value of `isOn` meaning you need to pass state down ;)
//
//

type ToggleProps = {
  isOn: boolean;
  onToggle: () => void;
  // strToNum: (s: string) => number;
  setIsOn: React.Dispatch<React.SetStateAction<boolean>>;
};

const Toggle = ({ isOn, onToggle, setIsOn }: ToggleProps) => {
  // return <button onClick={onToggle}>{isOn ? 'ON' : 'OFF'}</button>;
  return (
    <button onClick={() => setIsOn((on) => !on)}>{isOn ? 'ON' : 'OFF'}</button>
  );
};

export default Toggle;

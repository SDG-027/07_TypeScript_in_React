// components/Status.tsx
// This component should receive a `status` prop with one of: "loading", "success" , "error"
//
type StatusProps = {
  status: 'loading' | 'success' | 'error';
};

const Status = ({ status }: StatusProps) => {
  return <p>Status: {status}</p>;
};

export default Status;

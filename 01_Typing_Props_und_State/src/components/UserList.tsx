import { useEffect, useState } from 'react';
import type { ComponentStatus, User } from '../types';

const userArr: User[] = [
  {
    id: 1,
    username: 'Guybrush',
    info: 'alert',
  },
  {
    id: 2,
    username: 'Anakin',
    info: 'failure',
  },
];

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const [status, setStatus] = useState<ComponentStatus>('unset'); // unset, loading, success, error

  useEffect(() => {
    setError(null);
    setUsers(userArr);
    setLoading((prev) => !prev);
    setError('Fetch failed');
    setStatus('success');
  }, []);

  return (
    <div>{users.length > 0 && users.map((user) => <p>{user.info}</p>)}</div>
  );
}

export type User = {
  id: number;
  username: string;
  info: string;
};

export type ComponentStatus = 'unset' | 'loading' | 'success' | 'error';

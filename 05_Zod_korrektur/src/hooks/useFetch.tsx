import { useEffect, useState } from 'react';
import z from 'zod';

export default function useFetch<T extends z.ZodType>(url: string, schema: T) {
  const [data, setData] = useState<z.infer<typeof schema>>();
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      setLoading(true);

      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res) throw new Error(`Fetch failed; Status Code: ${res.status}`);
        const data = await res.json();

        const { success, data: zd, error } = schema.safeParse(data);

        if (success) {
          setData(zd);
        } else {
          setError(z.prettifyError(error));
        }
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url, schema]);

  return { data, error, loading };
}

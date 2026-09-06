import { useState, useEffect } from "react";

export function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abort = new AbortController();

    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch(url, { signal: abort.signal });
        if (!res.ok) throw new Error("Failed to fetch");
        setData(await res.json());
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    return () => abort.abort();
  }, [url]);

  return { data, loading, error };
}

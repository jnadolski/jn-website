import { useState, useEffect } from 'react';

function useDataFetching<T>(dataSource: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(dataSource);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(`Failed to fetch data from ${dataSource}`);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dataSource]);

  return { data, loading, error, setData };
}

export default useDataFetching;

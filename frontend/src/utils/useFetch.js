import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url, initialParams = {}, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async (params = initialParams) => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(url, { params });
      setData(response.data);
    } catch (err) {
      console.error(`Error fetching data from ${url}:`, err);
      setError('获取数据失败，请稍后重试');
      setData(null); // Clear data on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url, ...dependencies]); // Re-run effect if url or dependencies change

  // Allow manual refetching with potentially new parameters
  const refetch = (newParams) => fetchData(newParams);

  return { data, loading, error, refetch };
};

export default useFetch;
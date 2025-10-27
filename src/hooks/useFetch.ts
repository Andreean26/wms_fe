import { useState, useCallback } from 'react';
import type { FetchState, LoadingState } from '../types';

interface UseFetchResult<T> extends FetchState<T> {
  refetch: () => Promise<void>;
}

export function useFetch<T>(
  fetchFn: () => Promise<T>
): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setStatus('loading');
    setError(null);

    try {
      const result = await fetchFn();
      setData(result);
      setStatus('success');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      setStatus('error');
    }
  }, [fetchFn]);

  return {
    data,
    status,
    error,
    refetch,
  };
}

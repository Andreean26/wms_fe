import { useEffect, useRef } from 'react';

interface UsePollingOptions {
  interval: number;
  enabled?: boolean; 
}

export function usePolling(
  callback: () => void | Promise<void>,
  options: UsePollingOptions
): void {
  const { interval, enabled = true } = options;
  const savedCallback = useRef(callback);

  // Update ref jika callback berubah
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!enabled) return;

    savedCallback.current();

    const intervalId = setInterval(() => {
      savedCallback.current();
    }, interval);

    return () => {
      clearInterval(intervalId);
    };
  }, [interval, enabled]);
}

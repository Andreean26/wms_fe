import { useEffect, useRef } from 'react';

interface UsePollingOptions {
  interval: number; // milliseconds
  enabled?: boolean; // allow pause/resume
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

    // Execute immediately on mount
    savedCallback.current();

    // Setup interval
    const intervalId = setInterval(() => {
      savedCallback.current();
    }, interval);

    // Cleanup on unmount
    return () => {
      clearInterval(intervalId);
    };
  }, [interval, enabled]);
}

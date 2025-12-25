import { useState, useCallback } from 'react';
import { OperationResult, logger } from '../utils/errorHandling';

interface AsyncOperationState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseAsyncOperationReturn<T, Args extends unknown[]> {
  execute: (...args: Args) => Promise<void>;
  state: AsyncOperationState<T>;
  reset: () => void;
}

/**
 * Hook for managing async operations with loading and error states
 */
export function useAsyncOperation<T, Args extends unknown[]>(
  operation: (...args: Args) => Promise<OperationResult<T>>
): UseAsyncOperationReturn<T, Args> {
  const [state, setState] = useState<AsyncOperationState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (...args: Args) => {
      setState({ data: null, loading: true, error: null });

      try {
        const result = await operation(...args);

        if (result.success) {
          setState({
            data: result.data ?? null,
            loading: false,
            error: null,
          });
          logger.info('Async operation completed successfully');
        } else {
          setState({
            data: null,
            loading: false,
            error: result.message,
          });
          logger.error('Async operation failed', result);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        setState({
          data: null,
          loading: false,
          error: errorMessage,
        });
        logger.error('Async operation threw error', error);
      }
    },
    [operation]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { execute, state, reset };
}

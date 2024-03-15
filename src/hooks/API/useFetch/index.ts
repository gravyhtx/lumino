import { useState } from 'react';
import type { FetchError, RequestOptions } from '../types';

/**
 * A custom hook for making fetch requests with state management.
 * @template T The expected type of the response data.
 * @returns {FetchResponse<T>} An object containing the response data, error, loading status, and request function.
 * @example
 * const { data, error, loading, request } = useFetch<MyResponseType>();
 * useEffect(() => {
 *   request('/my-api-endpoint');
 * }, [request]);
 */
export const useFetch = <T,>() => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<FetchError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const request = async (url: string, options?: RequestOptions) => {
    setLoading(true);
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const jsonData: T = await response.json() as T; // Type assertion
      setData(jsonData);
      setError(null);
    } catch (err: unknown) { // Use unknown instead of any
      const error = err as Error; // Basic type assertion, could refine based on expected error shapes
      setError({
        message: error.message,
        ...(error.hasOwnProperty('status') && { status: (error as FetchError).status }) // Conditional spread based on presence of status
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    error,
    loading,
    request,
  };
};
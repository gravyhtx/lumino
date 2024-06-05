import { useCallback, useEffect, useState } from "react";

type UseAsyncResult<T> = {
  loading: boolean;
  error: unknown;
  data: T | null;
};

/**
 * Custom hook to handle asynchronous operations.
 *
 * @template T - The type of the value returned by the asynchronous function.
 * @param {() => Promise<T>} callback - The asynchronous function to execute.
 * @param {ReadonlyArray<unknown>} [dependencies=[]] - Dependencies array to control the effect.
 * @param {boolean} [showLogs=false] - Flag to control logging of success and error messages.
 * @returns {UseAsyncResult<T>} - The state of the asynchronous operation including loading, error, and data.
 *
 * @example
 * const fetchUserData = async () => {
 *   const response = await fetch(`/api/users/${userId}`);
 *   if (!response.ok) throw new Error('Network response was not ok');
 *   return response.json();
 * };
 * 
 * const MyComponent: React.FC = () => {
 *   const [userId, setUserId] = useState<string>('1'); // Initial user ID
 *   // Use the useAsync hook to fetch user data whenever userId changes
 *   const { loading, error, data: user } = useAsync(() => fetchUserData(userId), [userId], true);
 *   return (
 *     <div>
 *       <h1>User Data</h1>
 *       {loading && <p>Loading...</p>}
 *       {user && (
 *         <p>Name: {user?.name} | Email: {user?.email}</p>
 *       )}
 *       {error && <p>Error: {error.message}</p>}
 *       <button onClick={() => setUserId('2')}>Load User 2</button>
 *       <button onClick={() => setUserId('3')}>Load User 3</button>
 *     </div>
 *   );
 * };
 */
export function useAsync<T>(
  callback: () => Promise<T>,
  dependencies: ReadonlyArray<unknown> = [],
  showLogs = false
): UseAsyncResult<T> {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);
  const [data, setData] = useState<T | null>(null);

  const callbackMemoized = useCallback(() => {
    setLoading(true);
    setError(null);
    setData(null);
    callback()
      .then((result: T) => { // Explicitly typing the result of the promise as T.
        setData(result);
        if (showLogs) console.log("Success:", result);
      })
      .catch((error: Error) => { // Explicitly typing the caught error as Error.
        setError(error);
        if (showLogs) console.error("Error:", error);
      })
      .finally(() => setLoading(false));
  }, [callback, showLogs, ...dependencies]);

  useEffect(() => {
    callbackMemoized();
  }, [callbackMemoized]);

  return { loading, error, data };
}
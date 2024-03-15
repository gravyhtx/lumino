import { createHeaders } from "~/utils/API/helpers";
import { useFetch } from "../useFetch";
import type { RequestBody } from "../types";

/**
 * Hook to handle common API requests such as GET, POST, PUT, DELETE.
 * It provides methods to make requests with the appropriate HTTP method.
 * @returns {Object} An object with methods to perform get, post, put, delete requests and state for data, error, and loading.
 * @example
 * const { get, post, put, del, data, error, loading } = useApi();
 * 
 * // To make a GET request
 * useEffect(() => {
 *   get('/api/my-resource');
 * }, [get]);
 * 
 * // To make a POST request
 * const handleSubmit = (newData) => {
 *   post('/api/my-resource', newData);
 * };
 */
export const useApi = <T>() => {
  const { data, error, loading, request } = useFetch<T>();

  const get = (url: string) => request(url, { method: 'GET', headers: createHeaders() });
  
  const post = (url: string, body: RequestBody, token?: string) =>
    request(url, {
      method: 'POST',
      headers: createHeaders(token),
      body: JSON.stringify(body),
    });

  const put = (url: string, body: RequestBody, token?: string) =>
    request(url, {
      method: 'PUT',
      headers: createHeaders(token),
      body: JSON.stringify(body),
    });

  const del = (url: string, body: RequestBody, token?: string) =>
    request(url, {
      method: 'DELETE',
      headers: createHeaders(token),
      body: JSON.stringify(body),
    });

  return {
    data,
    error,
    loading,
    get,
    post,
    put,
    del,
  };
};
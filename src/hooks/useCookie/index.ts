import { useState } from 'react';

/**
 * Sets a cookie.
 * 
 * @param name The name of the cookie.
 * @param value The value of the cookie.
 * @param days The number of days until the cookie expires.
 * @param path The path where the cookie is valid.
 */
const setCookie = (name: string, value: string, days: number, path: string): void => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=${path}`;
};

/**
 * Retrieves a cookie by its name.
 * 
 * @param name The name of the cookie to retrieve.
 * @returns The value of the cookie or an empty string if not found.
 */
const getCookie = (name: string): string => {
  return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=');
    return parts[0] === name ? decodeURIComponent(String(parts[1])) : r;
  }, '');
};

/**
 * A React hook for reading, updating, and deleting a cookie.
 * 
 * @param cookieName The name of the cookie.
 * @param initialValue The initial value of the cookie if it doesn't exist.
 * @returns An array containing the cookie value, a function to update the cookie, and a function to delete the cookie.
 * 
 * @example
 * const {user, setUser, deleteUser} = useCookie('user', 'John Doe');
 * // Set a new value
 * setUser('Jane Doe');
 * // Delete the cookie
 * deleteUser();
 */
export const useCookie = (name: string, initialValue: string) => {
  const [cookieValue, setCookieValue] = useState(() => getCookie(name) ?? initialValue);

  const updateCookie = (value: string, days = 365, path = '/') => {
    setCookieValue(value);
    setCookie(name, value, days, path);
  };

  const deleteCookie = (path = '/') => {
    updateCookie('', -1, path);
    setCookieValue('');
  };

  return {cookieValue, updateCookie, deleteCookie};
};
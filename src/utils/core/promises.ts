// ~/utils/core/promises.ts
import { lazy, type LazyExoticComponent, type ComponentType } from 'react';
import * as fs from 'fs';

//* HANDLE PROMISES
//! https://betterprogramming.pub/javascript-tips-3-convert-error-first-callback-functions-to-promises-f2561d2aaefd

/**
 * Promisifies a function that takes a callback with an error-first pattern.
 *
 * @template T - The type of the data returned by the promisified function.
 * @template A - The type of the arguments passed to the promisified function.
 * @param {(...args: [...A, (error: Error | null, data: T) => void]) => void} func - The function to promisify.
 * @returns {(...args: A) => Promise<T>} A new function that returns a promise.
 *
 * @example <caption>Read the contents of a file</caption>
 * const readFilePromise = promisify(fs.readFile);
 * const fileContent = await readFilePromise('file.txt', 'utf8');
 * console.log(fileContent);
 */
export const promisify = <T, A extends unknown[]>(
  func: (...args: [...A, (error: Error | null, data: T) => void]) => void
): ((...args: A) => Promise<T>) => {
  return (...args: A): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
      try {
        func(...args, (error: Error | null, data: T) => {
          if (error) {
            return reject(error);
          }
          resolve(data);
        });
      } catch (error: unknown) {
        reject((error as Error)?.message);
      }
    });
  };
};

/**
 * Promisifies a function that takes a callback with an error-first pattern (async version).
 *
 * @template T - The type of the data returned by the promisified function.
 * @template A - The type of the arguments passed to the promisified function.
 * @param {(...args: [...A, (error: Error | null, data: T) => void]) => void} func - The function to promisify.
 * @returns {(...args: A) => Promise<T>} A new async function that returns a promise.
 *
 * @example <caption>Read the contents of a file asynchronously</caption>
 * const readFilePromiseAsync = promisifyAsync(fs.readFile);
 * const fileContent = await readFilePromiseAsync('file.txt', 'utf8');
 * console.log(fileContent);
 */
export const promisifyAsync = <T, A extends unknown[]>(
  func: (...args: [...A, (error: Error | null, data: T) => void]) => void
): ((...args: A) => Promise<T>) => {
  return async (...args: A): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
      try {
        func(...args, (error: Error | null, data: T) => {
          if (error) {
            return reject(error);
          }
          resolve(data);
        });
      } catch (error: unknown) {
        reject((error as Error)?.message);
      }
    });
  };
};
                                                                                                                                                                     
/**
 * Reads the contents of a file asynchronously using the promisified `fs.readFile`.
 *
 * @param {string} path - The path to the file to read.
 * @param {BufferEncoding} [encoding='utf8'] - The encoding of the file. Defaults to 'utf8'.
 * @returns {Promise<string>} A promise that resolves to the contents of the file as a string.
 *
 * @example <caption>Read the contents of a file</caption>
 * const fileContent = await readFilePromise('./path/to/file.txt', 'utf8');
 * console.log(fileContent);
 */
export const readFilePromise = promisify<string | Buffer, [fs.PathOrFileDescriptor, (fs.ObjectEncodingOptions & { flag?: string }) | BufferEncoding | null | undefined]>(fs.readFile);

/**
 * Fetch text content from a given URL using the Fetch API.
 *
 * @param {string} url - The URL to fetch the text content from.
 * @returns {Promise<string>} A promise that resolves to the fetched text content.
 *
 * @example <caption>Fetch text content from a URL</caption>
 * const textContent = await fetchText('https://example.com/text.txt');
 * console.log(textContent);
 */
export const fetchText = async (url: string): Promise<string> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch text from "${url}":\n${response.statusText}`);
  }
  const text = await response.text();
  return text;
};

/**
 * Creates a retry wrapper around a function that returns a promise, attempting to resolve it multiple times in case of failure.
 * 
 * @param promise - The function to retry, which must return a Promise.
 * @param retries - The number of attempts to make before rejecting.
 * @returns A function that when called, will attempt to execute a promise up to a certain amount of times before rejecting.
 *
 * @example <caption>Fetch data with up to 3 retries</caption>
 * const fetchData = () => fetch("https://api.example.com/data").then(res => res.json());
 * const fetchDataWithRetry = retryPromise(fetchData, 3);
 * fetchDataWithRetry().then(data => console.log(data)).catch(err => console.error("Failed:", err));
 */
export function retryPromise<T, Args extends unknown[]>(promise: (...args: Args) => Promise<T>, retries = 1): (...args: Args) => Promise<T> {
  return (...args: Args) =>
    new Promise<T>((resolve, reject) => {
      const attempt = (n: number) => {
        promise(...args)
          .then(resolve)
          .catch((err) => {
            if (n === retries) {
              reject(err);
            } else {
              attempt(n + 1);
            }
          });
      };
      attempt(1);
    });
}

/**
 * Creates a lazy-loaded React component with retry functionality for dynamic import.
 * 
 * @param {() => Promise<{ default: ComponentType<unknown> }>} importer - The async function that returns a dynamic import promise.
 * @param {number} [retries=1] - The number of retries to attempt if the import fails. Set to 0 to disable retry behavior.
 * @returns {LazyExoticComponent<ComponentType<T>>} - The lazy-loaded React component with retry behavior.
 *
 * @example <caption>Lazy load a component with up to 3 retries</caption>
 * const LazyComponent = lazyRetry(() => import("./MyComponent"), 3);
 * // Use <LazyComponent /> in your React component
 */
export const lazyRetry = <T>(
  importer: () => Promise<{ default: ComponentType<T> }>,
  retries = 1
): LazyExoticComponent<ComponentType<T>> => {
  const retryImport = async (): Promise<{ default: ComponentType<T> }> => {
    try {
      return await importer();
    } catch (error: unknown) {
      const typedError = error as Error;
      if (retries <= 0) {
        throw typedError;
      }
      for (let i = 0; i < retries; i++) {
        await new Promise((resolve) => setTimeout(resolve, 1000 * 2 ** i));
        try {
          return await importer();
        } catch (e) {
          console.log(`Retrying import (attempt ${i + 1})`);
        }
      }
      throw typedError;
    }
  };
  return lazy(retryImport);
};
// ~/utils/siteFunctions/promises.ts
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
 * @example
 * ```typescript
 * const readFilePromise = promisify(fs.readFile);
 * const fileContent = await readFilePromise('file.txt', 'utf8');
 * console.log(fileContent);
 * ```
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
 * @example
 * ```typescript
 * const readFilePromiseAsync = promisifyAsync(fs.readFile);
 * const fileContent = await readFilePromiseAsync('file.txt', 'utf8');
 * console.log(fileContent);
 * ```
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
 * @example
 * ```typescript
 * const fileContent = await readFilePromise('file.txt', 'utf8');
 * console.log(fileContent);
 * ```
 */
export const readFilePromise = promisify<string | Buffer, [fs.PathOrFileDescriptor, (fs.ObjectEncodingOptions & { flag?: string }) | BufferEncoding | null | undefined]>(fs.readFile);

/**
 * Reads the contents of a file from a URL using the Fetch API.
 *
 * @param {string} url - The URL of the file to read.
 * @returns {Promise<string>} A promise that resolves to the contents of the file as a string.
 *
 * @example
 * ```typescript
 * const fileContent = await readFile('https://example.com/file.txt');
 * console.log(fileContent);
 * ```
 */
export const readFile = async (url: string): Promise<string> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to read file from "${url}":\n${response.statusText}`);
  }
  const text = await response.text();
  return text;
};
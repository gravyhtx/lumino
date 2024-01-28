import * as fs from 'fs';

//* HANDLE PROMISES
/**
 * Converts a callback function to a promise.
 * @param func - The function to convert.
 * @returns A promise.
 * 
 * @example
 * const readFilePromise = promisify(fs.readFile);
 * const data = await readFilePromise('path/to/file');
 * 
 * @url https://betterprogramming.pub/javascript-tips-3-convert-error-first-callback-functions-to-promises-f2561d2aaefd
 */
export const promisify = <T, A extends unknown[]>(
  func: (...args: [...A, (error: Error | null, data: T) => void]) => void
) => {
  return (...args: A): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
      func(...args, (error: Error | null, data: T) => {
        if (error) reject(error);
        else resolve(data);
      });
    });
  };
};

/**
 * Reads a file and returns a promise.
 * @param path - The path of the file to read.
 * @returns A promise.
 * 
 * @example
 * const data = await readFilePromise('path/to/file');
 */
export const readFilePromise = promisify(fs.readFile);

/**
 * Writes a file and returns a promise.
 * @param path - The path of the file to write.
 * @param data - The data to write to the file.
 * @returns A promise.
 */
export const readFsile = async(path: string) => {
  const response = await fetch(path);
  const text = await response.text();
  return text;
}
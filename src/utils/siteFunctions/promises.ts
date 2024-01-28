import * as fs from 'fs';

//* HANDLE PROMISES
//! https://betterprogramming.pub/javascript-tips-3-convert-error-first-callback-functions-to-promises-f2561d2aaefd

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

                                                                                                                                                                     
export const readFilePromise = promisify(fs.readFile);

export const readFsile = async(path: string) => {
  const response = await fetch(path);
  const text = await response.text();
  return text;
}
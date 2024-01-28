import { useState } from 'react';

export function useValue<T>(input: T | [T, T]) {
  const [data] = useState(input);

  const get = (index: 0 | 1, defaultValue: T) => {
    if (Array.isArray(data)) {
      // If data is an array (tuple), retrieve the value at the specified index
      return data.length > index ? data[index] : defaultValue;
    } else {
      // If data is a single value, return it for index 0, or the default value for index 1
      return index === 0 ? data : defaultValue;
    }
  };

  return { get };
}
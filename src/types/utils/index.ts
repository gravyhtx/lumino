// ~/types/utils/index.ts

/* Concatenates two strings */
export type Concat<A extends (string | number), B extends (string | number)> = `${A}${B}`;

/**
 * Combines multiple character types into a single character type.
 * 
 * @example
 * type PasswordString = CombineCharTypes<`${Punctuation}${Letter}${Digit}`>;
 */
export type CombinedTypes<T extends string> = `${T}`;

/**
 * Creates a tuple type of a specified length filled with `unknown` elements.
 * This utility type is particularly useful for creating array types with a fixed length at compile time,
 * which can then be used in other type-level computations or constraints.
 *
 * @template LENGTH The target length of the tuple.
 * @template ACC The accumulator used during recursion, starts as an empty array and fills until the target length is reached.
 * @returns A tuple of type `unknown[]` with a length specified by `LENGTH`.
 *
 * @example
 * //* Creates a tuple type with a length of 5.
 * type FiveLengthArray = CreateArrayWithLengthX<5>; // Resulting type would be equivalent to: [unknown, unknown, unknown, unknown, unknown]
 */
export type CreateArrayWithLengthX<
    LENGTH extends number,
    ACC extends unknown[] = [],
> = ACC['length'] extends LENGTH
    ? ACC
    : CreateArrayWithLengthX<LENGTH, [...ACC,1]>

/**
 * Generates a union type of numbers starting from the length of a given starting array (`START_ARR`) 
 * up to (and including) an end number (`END`). This utility type leverages TypeScript's recursive type capabilities
 * to simulate numeric range generation in the type system.
 *
 * @template START_ARR An array type where its length represents the start of the numeric range.
 * @template END The end number of the range, inclusive.
 * @template ACC Accumulator for the recursive type construction, starts with `never` and accumulates possible numeric values.
 * @returns A union type of numbers from the start (derived from `START_ARR['length']`) to the `END` number.
 *
 * @example
 * //* Generates a type that represents numbers from 0 to 60, inclusive.
 * type ZERO_TO_SIXTY = NumericRange<[], 60>; // Can be used to type variables that can hold any number between 0 and 60.
 * let myNumber: ZeroToSixty;
 * myNumber = 30; //? Valid
 * myNumber = 61; //! Error: Type '61' is not assignable to type 'ZeroToSixty'.
 * 
 * //* Generates a type that represents numbers from 20 to 40, inclusive.
 * type TWENTY_TO_FORTY = NumericRange<CreateArrayWithLengthX<20>, 40>; // Can be used to type variables that can hold any number between 20 and 40.
 * let mySecondNumber: TwentyToForty;
 * mySecondNumber = 30; //? Valid
 * mySecondNumber = 19; //! Error: Type '19' is not assignable to type 'TwentyToForty'.
 * mySecondNumber = 41; //! Error: Type '41' is not assignable to type 'TwentyToForty'.
 */
export type NumericRange<
   START_ARR extends number[], 
   END extends number, 
   ACC extends number=never>
=START_ARR['length'] extends END 
   ? ACC | END
   : NumericRange<[...START_ARR,1], END, ACC | START_ARR['length']>

/**
 * Removes the specified type from a union type.
 *
 * @example
 * type A = 'a' | 'b' | 'c';
 * type B = Exclude<A, 'a'>; // 'b' | 'c'
 */
export type Exclude<T, U> = T extends U ? never : T;

/**
 * Extracts the non-union types from a union type.
 *
 * @example
 * type A = 'a' | 'b' | { x: number };
 * type B = NonUnion<A>; // { x: number }
 */
export type NonUnion<T> = [T] extends [infer U] ? U : never;

/**
 * Converts a union type to an intersection type.
 *
 * @example
 * type A = 'a' | 'b' | 'c';
 * type B = UnionToIntersection<A>; // 'a' & 'b' & 'c'
 */
export type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

/**
 * Converts a tuple type to a union type.
 *
 * @example
 * type A = [1, 2, 3];
 * type B = TupleToUnion<A>; // 1 | 2 | 3
 */
export type TupleToUnion<T extends readonly unknown[]> = T[number];

/**
 * Converts a string to a tuple type.
 *
 * @example
 * type A = StringToTuple<'abc'>; // ['a', 'b', 'c']
 */
export type StringToTuple<S extends string> = S extends `${infer Head}${infer Tail}` ? [Head, ...StringToTuple<Tail>] : [];

/**
 * Converts a tuple type to a string.
 *
 * @example
 * type A = TupleToString<['a', 'b', 'c']>; // 'abc'
 */
export type TupleToString<T extends readonly unknown[]> = T extends [infer Head extends string | number | bigint | boolean | null | undefined, ...infer Tail] ? `${Head}${TupleToString<Tail>}` : '';

/**
 * Converts a string to a union type.
 *
 * @example
 * type A = StringToUnion<'abc'>; // 'a' | 'b' | 'c'
 */
export type StringToUnion<S extends string> = StringToTuple<S>[number];

/**
 * Converts a union type to a tuple type.
 *
 * @example
 * type A = UnionToTuple<'a' | 'b' | 'c'>; // ['a', 'b', 'c']
 */
export type UnionToTuple<U> = UnionToIntersection<(U extends unknown ? (x: U) => 0 : never)> extends (x: infer I) => 0 ? [I] : never;

/**
 * Converts a union type to an array type.
 *
 * @example
 * type A = UnionToArray<'a' | 'b' | 'c'>; // ['a', 'b', 'c']
 */
export type UnionToArray<U> = U extends unknown ? U[] : never;

/**
 * Converts an array type to a union type.
 *
 * @example
 * type A = ArrayToUnion<['a', 'b', 'c']> // 'a' | 'b' | 'c'
 */
export type ArrayToUnion<A extends unknown[]> = A[number];

/**
 * Converts an object type to a union type.
 *
 * @example
 * type A = ObjectToUnion<{ a: 1, b: 2, c: 3 }>; // 1 | 2 | 3
 */
export type ObjectToUnion<O> = O[keyof O];

/**
 * Converts a union type to an object type.
 *
 * @example
 * type A = UnionToObject<'a' | 'b' | 'c'>; // { a: 'a', b: 'b', c: 'c' }
 */
export type UnionToObject<U extends string | number | symbol> = { [K in U]: K };

/**
 * Converts a union type to a record type.
 *
 * @example
 * type A = UnionToRecord<'a' | 'b' | 'c'>; // { a: unknown, b: unknown, c: unknown }
 */
export type UnionToRecord<U extends string | number | symbol> = Record<U, unknown>;
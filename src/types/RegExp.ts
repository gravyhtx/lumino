// ~/types/RegExp.ts
import type { Concat } from "./utils";

/**
 * Represents a single regular expression flag.
 */
export type RegExpFlag =
  | 'g' // Global
  | 'i' // Ignore case
  | 'm' // Multiline
  | 's' // Dotall (treat newlines as regular characters)
  | 'u' // Unicode
  | 'y'; // Sticky

type ConcatFlags<A extends string, B extends RegExpFlag[]> =
  B extends [infer Head extends string, ...infer Tail extends RegExpFlag[]]
    ? `${Concat<A, Head>}${ConcatFlags<'', Tail>}`
    : A;

type EmptyStringOr<T extends string> = '' | T;

/**
 * Represents a combination of regular expression flags.
 */
export type RegExpFlags = EmptyStringOr<ConcatFlags<'', RegExpFlag[]>>;
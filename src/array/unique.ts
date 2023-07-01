/**
 * Remove duplicate items in an array.
 *
 * Notes:
 * - It doesn't deeply compare items.
 * - It will retain the order the items are first discovered in.
 *
 * @example
 * const res = unique([1, 2, 3, 2, 1, 4, 3]);
 * //     ^--- [1, 2, 3, 4]
 */
export function unique<T>(input: T[]): T[] {
  return input.reduce((acc, next) => {
    if (acc.includes(next)) {
      return acc;
    }

    return [...acc, next];
  }, [] as T[]);
}

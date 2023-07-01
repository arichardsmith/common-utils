/**
 * Remove all null values from an array
 *
 * @example
 * const no_null = removeAllFalse(["foo", maybe_null && "bar"]);
 */
export function removeAllNull<T>(input: Array<T | null>): Array<T> {
  return input.filter(outNull);
}

/**
 * Typesafe way to filter out null values from an array
 *
 * @returns true if item is null
 * @example
 * const no_nulls = ["foo", maybe_null && "bar"].filter(outNull);
 */
export function outNull<T>(item: T | null): item is T {
  return item !== null;
}

/**
 * Remove all false values from an array
 *
 * @example
 * const no_false = removeAllFalse(["foo", !!maybe_falsy && "bar"]);
 */
export function removeAllFalse<T>(input: Array<T | false>): Array<T> {
  return input.filter(outFalse);
}

/**
 * Typesafe way to filter out false values from an array
 *
 * @returns true if item is false
 * @example
 * const no_false = ["foo", !!maybe_falsy && "bar"].filter(outFalse);
 */
export function outFalse<T>(item: T | false): item is T {
  return item !== false;
}

/**
 * Remove all undefined values from an array
 *
 * @example
 * const no_undefined = removeAllFalse(["foo", maybe_undefined && "bar"]);
 */
export function removeAllUndefined<T>(input: Array<T | undefined>): Array<T> {
  return input.filter(outUndefined);
}

/**
 * Typesafe way to filter out undefined values from an array
 *
 * @returns true if item is undefined
 * @example
 * const no_undefineds = ["foo", maybe_undefined && "bar"].filter(outundefined);
 */
export function outUndefined<T>(item: T | undefined): item is T {
  return item !== undefined;
}

type Falsy = false | null | undefined | "" | 0;

/**
 * Remove all falsy values from an array
 *
 * @example
 * const no_falsy = removeAllFalse(["foo", maybe_falsy && "bar"]);
 */
export function removeAllFalsy<T>(input: Array<T | Falsy>): Array<T> {
  return input.filter(outFalsy);
}

/**
 * Typesafe way to filter out falsy values from an array
 *
 * @returns true if item is falsy
 * @example
 * const no_falsys = ["foo", maybe_falsy && "bar"].filter(outfalsy);
 */
export function outFalsy<T>(item: T | Falsy): item is T {
  return !!item;
}

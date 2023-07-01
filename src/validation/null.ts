/**
 * Converts null values to undefined (and updates the type)
 *
 * @param input value to convert
 * @returns input value with nulls converted to undefined
 *
 * @example
 * const tight_array = loose_array.map(nullAsUndefined)
 * //         ^-- tight_array has all null values converted to undefined
 */
export function nullAsUndefined<T>(input: T | null | undefined): T | undefined {
  return input === null ? undefined : input;
}

/**
 * Converts undefined values to null (and updates the type)
 *
 * @param input value to convert
 * @returns input value with undefined values converted to null
 *
 * @example
 * const tight_array = loose_array.map(undefinedAsNull)
 * //         ^-- tight_array has all undefined values converted to null
 */
export function undefinedAsNull<T>(input: T | null | undefined): T | null {
  return input === undefined ? null : input;
}

/**
 * Converts undefined keys to null.
 * This is useful when sending JSON requests as stringifying removes undefined keys
 * @param input object with undefined keys
 * @returns input mapped with undefined keys set as null
 *
 * @example
 * const payload = JSON.stringify(undefinedValuesAsNull(has_important_keys))
 * //       ^-- The keys in has_important_keys won't be lost
 */
export function undefinedValuesAsNull<
  V,
  T extends { [key: string | number | symbol]: V | null | undefined }
>(
  input: T
): {
  [K in keyof T]: T[K] extends undefined ? null : T[K];
} {
  return Object.fromEntries(
    Object.entries(input).map(([key, value]) => [key, undefinedAsNull(value)])
  ) as any;
}

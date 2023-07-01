/**
 * Throw an error if the passed value is null or undefined, otherwise return it
 *
 * @param value value to check
 * @param message error message to throw if value is null or undefined
 * @returns the passed value if it is not null or undefined
 * @throws {InvariantError} an `InvariantError` if the value is null or undefined
 *
 * @example
 * const safe_value = invariant(maybe_undefined, "Value must provided");
 */
export function invariant<T>(value: T | null | undefined, message?: string): T {
  if (value === null || value === undefined) {
    throw new InvariantError(message);
  }

  return value;
}

/**
 * Throw an error if the given promise resolves to null or undefined,
 * otherwise returns the result of the promise
 *
 * @param promise promise to check
 * @param message error message to throw if value is null or undefined
 * @returns promise resolving to the result or throwing an error
 * @throws {InvariantError} an `InvariantError` if the value is null or undefined
 *
 * @example
 * const safe_value = await asyncInvariant(maybe_resolves_undefined, "Value must be provided")
 */
export async function asyncInvariant<T>(
  promise: Promise<T | null | undefined>,
  message?: string
): Promise<T> {
  const value = await promise;
  if (value === null || value === undefined) {
    throw new InvariantError(message);
  }

  return value;
}

export class InvariantError extends Error {
  constructor(message?: string) {
    super(message ?? "Invariant value was null or undefined");
  }
}

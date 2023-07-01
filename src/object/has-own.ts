// Prefer the inbuilt Object.hasOwn if present
// but older versions of Safari don't have the function.
// We fall back to Object.prototype.hasOwnProperty in that case.
const nativeHasOwn =
  typeof Object.hasOwn === "function"
    ? (o: object, k: PropertyKey) => Object.hasOwn(o, k)
    : (o: object, k: PropertyKey) => o.hasOwnProperty(k);

/**
 * Ponyfill for Object.hasOwn that supports older versions of Safari etc where the function isn't present
 * @param object
 * @param key
 * @returns true if object has key, false otherwise
 *
 * @example
 * if(hasOwn(test, "test_key")) { // Do something
 */
export function hasOwn(object: object, key: PropertyKey) {
  return nativeHasOwn(object, key);
}

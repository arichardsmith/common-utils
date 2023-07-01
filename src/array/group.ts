/**
 * Group array items based on a keying function
 *
 * @param keyFn recieves each item in the array and produces a valid object property to group them under
 * @returns and object with a property for each group
 *
 * @example
 * const input = [
 *  { key: "foo", index: 1 },
 *  { key: "bar", index: 2 },
 *  { key: "foo", index: 3 },
 * ];
 *
 * const grouped = groupBy(input, (item) => item.key);
 * // grouped === {
 * //   foo: [// item 1 & 3],
 * //   bar: [// item 2]
 * // }
 */
export function groupBy<T, K extends string | number | symbol>(
  arr: T[],
  keyFn: (item: T) => K
): { [key in K]: T[] } {
  const out = {} as { [key in K]: T[] };

  for (let item of arr) {
    const key = keyFn(item);

    if (Array.isArray(out[key])) {
      out[key].push(item);
    } else {
      out[key] = [item];
    }
  }

  return out;
}

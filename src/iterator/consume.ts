/**
 * Consume all records from an async iteratable, resolving with all the values when finished
 *
 * @param iter iterable to consume
 * @returns promise resolving with the contents of the iterable
 *
 * @example
 * const stream_chunks = await consumeAsyncIterable(stream);
 */
export async function consumeAsyncIterable<T>(
  iter: AsyncIterable<T>
): Promise<T[]> {
  const values: T[] = [];

  for await (let value of iter) {
    values.push(value);
  }

  return values;
}

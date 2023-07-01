import { test, expect } from "vitest";

import { consumeAsyncIterable } from "./consume.js";

async function* testCounter(count: number) {
  for (let i = 0; i <= count; i++) {
    await sleep(10);
    yield i;
  }
}

function sleep(ms: number) {
  return new Promise<void>((resolve) => {
    // @ts-ignore This will be present as tests are run in node
    setTimeout(() => resolve(), ms);
  });
}

test("consumeAsyncInterable returns all emited values", async () => {
  const output = await consumeAsyncIterable(testCounter(5));

  expect(output).toEqual([0, 1, 2, 3, 4, 5]);
});

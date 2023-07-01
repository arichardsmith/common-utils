import { test, expect } from "vitest";

import { unique } from "./unique.js";

test("unique removes duplicate primitives from the array", () => {
  const input = [1, 1, 4, 3, 4, 2, 1];

  const output = unique(input);

  expect(output).toEqual([1, 4, 3, 2]);
});

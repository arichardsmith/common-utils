import { test, expect } from "vitest";

import { removeAllFalse, removeAllNull } from "./filter.js";

test("removeAllFalse removes all false values from the array", () => {
  const input: Array<"FOO" | "BAR" | false> = [
    "FOO",
    "FOO",
    false,
    "BAR",
    "FOO",
  ];

  const output = removeAllFalse(input);

  ["FOO", "FOO", "BAR", "FOO"].forEach((x) => expect(output).toContain(x));
});

test("removeAllFalse leaves other falsy values in the array", () => {
  const input: Array<number | false> = [0, 1, false, 2];

  const output = removeAllFalse(input);

  [0, 1, 2].forEach((x) => expect(output).toContain(x));
});

test("removeAllNull removes all null values from the array", () => {
  const input: Array<"FOO" | "BAR" | null> = ["FOO", "FOO", null, "BAR", "FOO"];

  const output = removeAllNull(input);

  ["FOO", "FOO", "BAR", "FOO"].forEach((x) => expect(output).toContain(x));
});

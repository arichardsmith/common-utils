import { describe, it, expect } from "vitest";

import { undefinedValuesAsNull } from "./null.js";

describe.concurrent("undefinedValuesAsNull", () => {
  it("converts all undefined values to null", () => {
    const res = undefinedValuesAsNull({
      foo: undefined,
      bar: "bar",
      baz: undefined,
    });

    expect(res).toEqual({
      foo: null,
      baz: null,
      bar: "bar",
    });
  });

  it("doesnt affect other values", () => {
    const res = undefinedValuesAsNull({
      foo: null,
      bar: false,
      baz: 0,
    });

    expect(res).toEqual({
      foo: null,
      bar: false,
      baz: 0,
    });
  });

  it("values are preserved when JSON stringifying", () => {
    const res = undefinedValuesAsNull({
      foo: undefined,
    });

    const json = JSON.stringify(res);

    expect(json).toBe('{"foo":null}');
  });
});

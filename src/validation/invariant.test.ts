import { describe, it, expect } from "vitest";

import { asyncInvariant, invariant, InvariantError } from "./invariant.js";

describe.concurrent("invariant", () => {
  it("returns the value if it is not null or undefined", () => {
    const output = invariant("foo", "This should never throw");

    expect(output).toEqual("foo");
  });

  it("throws if the value is undefined", () => {
    try {
      invariant(undefined);
      expect.unreachable();
    } catch (e) {
      expect(e).instanceOf(InvariantError);
    }
  });

  it("throws if the value is null", () => {
    try {
      invariant(null);
      expect.unreachable();
    } catch (e) {
      expect(e).instanceOf(InvariantError);
    }
  });

  it("throws with provided error message", () => {
    try {
      invariant(null, "A custom error message");
      expect.unreachable();
    } catch (e) {
      expect(e).instanceOf(InvariantError);
      expect((e as InvariantError).message).toBe("A custom error message");
    }
  });
});

describe.concurrent("asyncInvariant", () => {
  it("returns the value if it is not null or undefined", async () => {
    const output = await asyncInvariant(
      Promise.resolve("foo"),
      "This should never throw"
    );

    expect(output).toBe("foo");
  });

  it("throws if the value is undefined", async () => {
    try {
      await asyncInvariant(Promise.resolve(undefined));
      expect.unreachable();
    } catch (e) {
      expect(e).instanceOf(InvariantError);
    }
  });

  it("throws if the value is null", async () => {
    try {
      await asyncInvariant(Promise.resolve(null));
      expect.unreachable();
    } catch (e) {
      expect(e).instanceOf(InvariantError);
    }
  });

  it("throws with provided error message", async () => {
    try {
      await asyncInvariant(Promise.resolve(null), "A custom error message");
      expect.unreachable();
    } catch (e) {
      expect(e).instanceOf(InvariantError);
      expect((e as InvariantError).message).toBe("A custom error message");
    }
  });
});

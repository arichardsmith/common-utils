import { describe, it, expect } from "vitest";

import { createUrl } from "./create-url.js";

describe("changeHost", () => {
  it("creates a url with the given path", () => {
    expect(createUrl("https://test.com", "test/path").toString()).toBe(
      "https://test.com/test/path"
    );
  });

  it("creates a url with the given path segments", () => {
    expect(
      createUrl("https://test.com", ["test", "path", "segments"]).toString()
    ).toBe("https://test.com/test/path/segments");
  });

  it("creates a url with the given query parameters", () => {
    expect(
      createUrl("https://test.com", "test", {
        test: "param",
        foo: "bar",
      }).toString()
    ).toBe("https://test.com/test?test=param&foo=bar");
  });
});

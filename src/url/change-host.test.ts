import { describe, it, expect } from "vitest";

import { changeHost } from "./change-host.js";

describe("changeHost", () => {
  it("updates the host on the provided url", () => {
    expect(
      changeHost(
        new URL("https://www.foo.com/path"),
        "sub.test.co.jp"
      ).toString()
    ).toBe("https://sub.test.co.jp/path");
  });

  it("doesn't modify the input url", () => {
    const input = new URL("https://www.foo.com/path");

    changeHost(input, "www.test.com");

    expect(input.host).toBe("www.foo.com");
  });

  it("preserves query params", () => {
    expect(
      changeHost(
        new URL("https://www.foo.co.jp/path?some=param"),
        "bar.com"
      ).toString()
    ).toBe("https://bar.com/path?some=param");
  });

  it("preserves hash", () => {
    expect(
      changeHost(
        new URL("https://foo.com/path.html#test"),
        "bar.com"
      ).toString()
    ).toBe("https://bar.com/path.html#test");
  });

  it("preserves protocol if none given", () => {
    expect(
      changeHost(new URL("http://foo.com/path"), "bar.com").toString()
    ).toBe("http://bar.com/path");

    expect(
      changeHost(new URL("https://foo.com/path"), "bar.com").toString()
    ).toBe("https://bar.com/path");

    expect(
      changeHost(new URL("ftp://foo.com/path"), "bar.com").toString()
    ).toBe("ftp://bar.com/path");
  });

  it("converts http to https if option is 'always'", () => {
    expect(
      changeHost(new URL("http://foo.com/path"), "bar.com", {
        https: "always",
      }).toString()
    ).toBe("https://bar.com/path");

    expect(
      changeHost(new URL("https://foo.com/path"), "bar.com", {
        https: "always",
      }).toString()
    ).toBe("https://bar.com/path");

    expect(
      changeHost(new URL("ftp://foo.com/path"), "bar.com", {
        https: "always",
      }).toString()
    ).toBe("ftp://bar.com/path");
  });

  it("converts https to http if option is 'never'", () => {
    expect(
      changeHost(new URL("http://foo.com/path"), "bar.com", {
        https: "never",
      }).toString()
    ).toBe("http://bar.com/path");

    expect(
      changeHost(new URL("https://foo.com/path"), "bar.com", {
        https: "never",
      }).toString()
    ).toBe("http://bar.com/path");

    expect(
      changeHost(new URL("ftp://foo.com/path"), "bar.com", {
        https: "never",
      }).toString()
    ).toBe("ftp://bar.com/path");
  });

  it("overwrites port", () => {
    expect(
      changeHost(new URL("https://localhost:1234/path"), "bar.com").toString()
    ).toBe("https://bar.com/path");

    expect(
      changeHost(
        new URL("https://www.test.com/path"),
        "localhost:8000"
      ).toString()
    ).toBe("https://localhost:8000/path");
  });
});

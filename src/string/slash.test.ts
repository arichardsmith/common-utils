import { describe, it, expect } from "vitest";

import {
  removeTrailingSlash,
  addTrailingSlash,
  removeLeadingSlash,
  addLeadingSlash,
  joinWithSlashes,
} from "./slash.js";

describe.concurrent("removeTrailingSlash", () => {
  it("removes a slash if present", () => {
    expect(removeTrailingSlash("foo/")).toBe("foo");
  });

  it("doesn't modify a string if no slash is present", () => {
    expect(removeTrailingSlash("foo")).toBe("foo");
  });

  it("leaves leading slashes", () => {
    expect(removeTrailingSlash("/foo/")).toBe("/foo");
  });

  it("only removes one trailing slash", () => {
    expect(removeTrailingSlash("foo//")).toBe("foo/");
  });
});

describe.concurrent("addTrailingSlash", () => {
  it("adds an extra trailing slash if none present", () => {
    expect(addTrailingSlash("foo")).toBe("foo/");
  });

  it("doesn't add an extra slash if one already present", () => {
    expect(addTrailingSlash("foo/")).toBe("foo/");
  });
});

describe.concurrent("removeLeadingSlash", () => {
  it("removes a slash if present", () => {
    expect(removeLeadingSlash("/foo")).toBe("foo");
  });

  it("doesn't modify a string if no slash is present", () => {
    expect(removeLeadingSlash("foo")).toBe("foo");
  });

  it("leaves trailing slashes", () => {
    expect(removeLeadingSlash("/foo/")).toBe("foo/");
  });

  it("only removes one leading slash", () => {
    expect(removeLeadingSlash("//foo")).toBe("/foo");
  });
});

describe.concurrent("addLeadingSlash", () => {
  it("adds an extra trailing slash if none present", () => {
    expect(addLeadingSlash("foo")).toBe("/foo");
  });

  it("doesn't add an extra slash if one already present", () => {
    expect(addLeadingSlash("/foo")).toBe("/foo");
  });
});

describe.concurrent("joinWithSlashes", () => {
  it("joins parts with a forward slash", () => {
    expect(joinWithSlashes("foo", "bar", "baz")).toBe("foo/bar/baz");
  });

  it("removes trailing slashes of all but last part", () => {
    expect(joinWithSlashes("foo/", "bar/", "baz")).toBe("foo/bar/baz");
    expect(joinWithSlashes("foo/", "bar/", "baz/")).toBe("foo/bar/baz/");
  });

  it("removes leading slashes of all but first part", () => {
    expect(joinWithSlashes("foo", "/bar", "/baz")).toBe("foo/bar/baz");
    expect(joinWithSlashes("/foo", "/bar", "/baz")).toBe("/foo/bar/baz");
  });

  it("removes undefined segments", () => {
    expect(joinWithSlashes("foo", undefined, "bar", undefined)).toBe("foo/bar");
  });

  it("removes null segments", () => {
    expect(joinWithSlashes("foo", null, "bar", null)).toBe("foo/bar");
  });

  it("removes empty segments", () => {
    expect(joinWithSlashes("foo", "", "bar", "")).toBe("foo/bar");
  });

  it("doesn't remove 0", () => {
    //@ts-expect-error this should give a type error, but it's worth checking for non-ts users
    expect(joinWithSlashes("foo", 0, "bar", 0)).toBe("foo/0/bar/0");
  });
});

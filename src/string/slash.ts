/**
 * Remove trailing slash from a string if present
 *
 * @example
 * const clean_path = removeTrailingSlash(url.pathname);
 */
export function removeTrailingSlash(input: string) {
  return input.replace(/\/$/, "");
}

/**
 * Make sure a string finishes with exactly one slash
 *
 * @example
 * const slashed_path = addTrailingSlash(url.pathname);
 */
export function addTrailingSlash(input: string) {
  return removeTrailingSlash(input) + "/";
}

/**
 * Removes the leading forward slash from a string if present
 *
 * @example
 * const relative_path = removeLeadingSlash(url.pathname);
 */
export function removeLeadingSlash(input: string) {
  return input.replace(/^\//, "");
}

/**
 * Adds a leading forward slash if one is not present
 *
 * @example
 * const rooted_path = addLeadingSlash(url.pathname);
 */
export function addLeadingSlash(input: string) {
  return "/" + removeLeadingSlash(input);
}

type Falsy = undefined | null | false | "";

/**
 * Joins part of a string with forward slashes, removing existing trailing or leading slashes if present
 * It also filters out any undefined, null, empty or false segements.
 *
 * @example
 * const path = joinWithSlashes('/base', oops ? '/oops' : null, 'path/')
 * //     ^--- if oops is true then '/base/oops/path/' otherwise '/base/path/'
 */
export function joinWithSlashes<T extends string | Falsy>(...parts: Array<T>) {
  const cleanParts = parts
    .filter(
      (part): part is Exclude<T, Falsy> =>
        !(part === undefined || part === null || part === false || part === "")
    )
    // TS will stop non string parts being passed, but if the user isn't using TS, passing other values will crash
    .map((part) => (typeof part !== "string" ? "" + part : part));

  const last = cleanParts.length - 1;
  return cleanParts
    .map((part, i) => {
      if (i === 0) {
        return removeTrailingSlash(part);
      }

      if (i === last) {
        return removeLeadingSlash(part);
      }

      return removeTrailingSlash(removeLeadingSlash(part));
    })
    .join("/");
}

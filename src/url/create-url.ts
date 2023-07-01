import { joinWithSlashes } from "../string/slash.js";

/**
 * Helper to generate a url from an origin, path segments and option query params object
 *
 * @param base origin (including protocol)
 * @param path either a string or array of path segments to be joined with slashes
 * @param query object containing query parameters to set on the url
 */
export function createUrl(
  origin: string,
  path: string | Array<string | undefined | null | false>,
  query: Record<string, string> = {}
): URL {
  const joined_path =
    typeof path === "string" ? path : joinWithSlashes(...path);

  const url = new URL(joined_path, origin);

  for (let [key, value] of Object.entries(query)) {
    url.searchParams.set(key, value);
  }

  return url;
}

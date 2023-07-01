/**
 * Changes the host of the URL while preserving protocol, path, query string and url hash
 * @param options set `forceHttps` to true to upgrate url to https if it was http
 * @returns new url with the host updated
 *
 * @example
 * const redirect_url = changeHost(request.url, "www.test.com")
 */
export function changeHost(
  input: URL | string,
  new_host: string,
  options: { https?: "never" | "always" } = {}
) {
  const clone = new URL(input.toString());

  // Rewrite protocol if needed
  if (options.https) {
    if (options.https === "always" && clone.protocol === "http:") {
      clone.protocol = "https:";
    } else if (options.https === "never" && clone.protocol === "https:") {
      clone.protocol = "http:";
    }
  }

  // We have to manually map the port as setting hostname won't update it
  if (!has_port(new_host)) {
    clone.port = "";
    clone.hostname = new_host;
  } else {
    const m = /(.+):(\d+)$/.exec(new_host);

    if (m) {
      clone.port = m[2];
      clone.hostname = m[1];
    }
  }

  return clone;
}

function has_port(host_name: string) {
  return /:\d+$/.test(host_name);
}

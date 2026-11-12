import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!body.includes('"unhandled":true') || !body.includes('"message":"HTTPError"')) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

// The router canonicalizes "/about/" -> "/about" with a temporary 307. Legacy
// WordPress URLs all used trailing slashes, so issue a permanent 301 instead so
// search engines consolidate ranking signals on the canonical URL.
function trailingSlashRedirect(request: Request): Response | undefined {
  if (request.method !== "GET" && request.method !== "HEAD") return undefined;
  const url = new URL(request.url);
  if (url.pathname === "/" || !url.pathname.endsWith("/")) return undefined;
  url.pathname = url.pathname.replace(/\/+$/, "") || "/";
  // Absolute same-origin URL: a bare "//host" path would be a protocol-relative open redirect.
  return new Response(null, { status: 301, headers: { Location: url.toString() } });
}


// Google still surfaces a legacy WordPress monthly archive with obsolete
// consultation copy. Keep the redirect at the Worker edge so it remains a
// permanent signal even though this archive is no longer an application route.
function legacyWordPressRedirect(request: Request): Response | undefined {
  if (request.method !== "GET" && request.method !== "HEAD") return undefined;
  const url = new URL(request.url);
  if (url.pathname !== "/2021/07" && url.pathname !== "/2021/07/hello-world") return undefined;
  url.pathname = "/";
  return new Response(null, { status: 301, headers: { Location: url.toString() } });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const legacyRedirect = legacyWordPressRedirect(request);
    if (legacyRedirect) return legacyRedirect;
    const slashRedirect = trailingSlashRedirect(request);
    if (slashRedirect) return slashRedirect;
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};

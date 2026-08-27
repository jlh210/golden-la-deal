import process from "node:process";

// Server-only config. The .server.ts suffix prevents Vite from bundling
// this file into the client — values here never reach the browser.
//
// IMPORTANT: on Cloudflare Workers (this app's runtime, via Nitro's
// cloudflare_module preset), process.env is NEVER populated with Worker
// secrets/vars, at any point in the request lifecycle — nodejs_compat only
// provides the process.env *object*, it does not fill it in here. Cloudflare
// bindings are only available via globalThis.__env__, set per-request in
// the Cloudflare handler (node_modules/nitro/dist/presets/cloudflare/
// runtime/_module-handler.mjs). Confirmed by a production incident where
// Google Sheets credentials configured as Worker secrets were silently
// unreadable via process.env (see src/lib/leads.functions.ts for the fix
// and full writeup). Always read secrets/vars via a helper like:
//   (globalThis as any).__env__?.MY_VAR ?? process.env.MY_VAR
// inside a function or handler — never a bare `process.env.X` module-scope
// or otherwise, and never assume it will resolve on Cloudflare.
//
// When to use which env-access pattern:
//   - .server.ts module (this file): server-only helpers reused across
//     handlers. Wrap reads in a function so they run per-request, and read
//     from globalThis.__env__ (falling back to process.env) as above.
//   - inline globalThis.__env__ / process.env fallback inside a
//     createServerFn handler: one-off reads not reused elsewhere.
//   - import.meta.env.VITE_FOO: PUBLIC config readable from both client
//     and server (analytics IDs, public URLs). Define in .env with the
//     VITE_ prefix. Never put secrets here — they ship to the browser.

export function getServerConfig() {
  return {
    nodeEnv: process.env.NODE_ENV,
    // Add server-only values here, e.g.:
    //   databaseUrl: process.env.DATABASE_URL,
    //   stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  };
}

import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

export const Route = createFileRoute("/api/public/contact-map")({
  server: {
    handlers: {
      GET: async () => {
        const apiKey = process.env.GOOGLE_API_KEY;
        const mapSrc = apiKey
          ? `https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(apiKey)}&q=${encodeURIComponent("Los Angeles County, CA")}`
          : "https://www.google.com/maps?q=Los%20Angeles%20County%2C%20CA&output=embed";

        return new Response(
          `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Los Angeles County map</title>
    <style>
      html, body, iframe { margin: 0; width: 100%; height: 100%; border: 0; }
      body { overflow: hidden; }
    </style>
  </head>
  <body>
    <iframe title="Los Angeles County map" src="${mapSrc}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
  </body>
</html>`,
          {
            headers: {
              "Content-Type": "text/html; charset=utf-8",
              "Cache-Control": "public, max-age=3600",
              "X-Robots-Tag": "noindex, follow",
            },
          },
        );
      },
    },
  },
});

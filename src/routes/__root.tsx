import { SITE_URL, ORG_ID, WEBSITE_ID } from "@/lib/seo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-gold">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-gold-gradient px-4 py-2 text-sm font-semibold text-charcoal-deep"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong. Try again or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-md bg-gold-gradient px-4 py-2 text-sm font-semibold text-charcoal-deep"
          >
            Try again
          </button>
          <a href="/" className="rounded-md border border-border px-4 py-2 text-sm font-medium">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: ({ match }) => {
    // 404 responses must not inherit the homepage title or an "index, follow"
    // directive, otherwise search engines see soft-404 duplicates of the homepage.
    // `match` is read fresh from router state, so it reflects a root-level notFound boundary.
    const notFoundPage = match.globalNotFound === true || match.status === "notFound";
    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        notFoundPage
          ? { title: "Page Not Found | Penthouse Advisors Inc." }
          : { title: "Restaurant Business Broker Los Angeles, CA | Penthouse Advisors Inc." },
        {
          name: "description",
          content:
            "Penthouse Advisors Inc. is a restaurant business broker in Los Angeles, CA, offering restaurant brokerage, consulting, permitting, licensing, and ADA compliance. Buy, sell, lease, license, and rescue restaurants across LA County. Call 310-663-3521.",
        },
        { name: "author", content: "Penthouse Advisors Inc." },
        {
          name: "keywords",
          content:
            "restaurant business broker Los Angeles CA, restaurant business broker Los Angeles, Los Angeles restaurant business broker, Los Angeles restaurant broker, restaurant consulting LA, restaurant permits Los Angeles, restaurant licensing LA, ADA compliance restaurant, liquor license transfer LA, commercial restaurant leasing Los Angeles, restaurants for sale Los Angeles",
        },
        { name: "robots", content: notFoundPage ? "noindex, follow" : "index, follow" },
        { name: "theme-color", content: "#c9a24a" },
        { property: "og:site_name", content: "Penthouse Advisors Inc." },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: "en_US" },
        { property: "og:image", content: `${SITE_URL}/android-chrome-512x512.png` },
        { property: "og:image:alt", content: "Penthouse Advisors monogram" },
        { name: "twitter:image", content: `${SITE_URL}/android-chrome-512x512.png` },
        { name: "twitter:image:alt", content: "Penthouse Advisors monogram" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@penthouseadv" },
      ],
      links: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
        { rel: "icon", type: "image/png", sizes: "48x48", href: "/favicon-48x48.png" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
        { rel: "manifest", href: "/site.webmanifest" },
        { rel: "stylesheet", href: appCss },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap",
        },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": ["Organization", "ProfessionalService", "LocalBusiness"],
                "@id": ORG_ID,
                name: "Penthouse Advisors Inc.",
                alternateName: "Penthouse Advisors",
                description:
                  "Restaurant business broker in Los Angeles, CA: full-service restaurant brokerage, consulting, licensing, permitting, and ADA compliance advisory serving Los Angeles County.",
                url: SITE_URL,
                logo: {
                  "@type": "ImageObject",
                  url: "https://www.penthouseadvisors.com/android-chrome-512x512.png",
                  width: 512,
                  height: 512,
                },
                image: "https://www.penthouseadvisors.com/android-chrome-512x512.png",
                telephone: "+1-310-663-3521",
                email: "PenthouseAdvisors@gmail.com",
                areaServed: [
                  { "@type": "AdministrativeArea", name: "Los Angeles County" },
                  { "@type": "City", name: "Los Angeles" },
                ],
                foundingDate: "2021",
                knowsAbout: [
                  "Restaurant Business Brokerage",
                  "Restaurant Brokerage",
                  "Restaurant Consulting",
                  "Restaurant Acquisitions",
                  "Restaurant Dispositions",
                  "Commercial Restaurant Leasing",
                  "Alcohol Licensing",
                  "Health Department Permitting",
                  "ADA Compliance",
                  "Hospitality Consulting",
                ],
                openingHoursSpecification: [
                  {
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: [
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                      "Sunday",
                    ],
                    opens: "08:00",
                    closes: "19:00",
                  },
                ],
              },
              {
                "@type": "WebSite",
                "@id": WEBSITE_ID,
                url: SITE_URL,
                name: "Penthouse Advisors",
                publisher: { "@id": ORG_ID },
                inLanguage: "en-US",
              },
            ],
          }),
        },
      ],
    };
  },

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}

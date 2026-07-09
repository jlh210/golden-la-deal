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
          <a
            href="/"
            className="rounded-md border border-border px-4 py-2 text-sm font-medium"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Penthouse Advisors Inc. - LA Restaurant Brokerage & Advisory" },
      {
        name: "description",
        content:
          "Los Angeles restaurant broker & advisory firm. Buy, sell, lease, and license restaurants in LA County. Liquor license transfers, commercial restaurant leasing, health permitting. Call 310-663-3521.",
      },
      { name: "author", content: "Penthouse Advisors Inc." },
      { name: "keywords", content: "Los Angeles restaurant broker, LA restaurant advisory firm, liquor license transfer LA, commercial restaurant leasing Los Angeles, restaurants for sale Los Angeles, Type 47 license LA" },
      { name: "robots", content: "index, follow" },
      { property: "og:site_name", content: "Penthouse Advisors Inc." },
      { property: "og:title", content: "Penthouse Advisors Inc. - LA Restaurant Brokerage & Advisory" },
      {
        property: "og:description",
        content: "LA's sophisticated, full-service restaurant brokerage and advisory firm. Buy. Sell. License. Lease. Rescue.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_US" },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/e3e30457-fc23-4af3-8298-0ca6c1ee0bc6/id-preview-8f27b450--0b604838-c031-4f20-b744-28614ecfedd1.lovable.app-1781650225814.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Penthouse Advisors Inc. - LA Restaurant Brokerage & Advisory" },
      { name: "twitter:description", content: "LA's sophisticated, full-service restaurant brokerage and advisory firm. Buy. Sell. License. Lease. Rescue." },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/e3e30457-fc23-4af3-8298-0ca6c1ee0bc6/id-preview-8f27b450--0b604838-c031-4f20-b744-28614ecfedd1.lovable.app-1781650225814.png" },
    ],
    links: [
      { rel: "icon", type: "image/png", href: faviconAsset.url },
      { rel: "apple-touch-icon", sizes: "180x180", href: appleTouchIconAsset.url },
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
              "@id": "https://www.penthouseadvisors.com/#organization",
              name: "Penthouse Advisors Inc.",
              alternateName: "Penthouse Advisors",
              description:
                "Full-service restaurant brokerage and advisory firm serving Los Angeles County. Restaurant sales, acquisitions, leasing, licensing, permitting, and consulting.",
              url: "https://www.penthouseadvisors.com",
              telephone: "+1-310-663-3521",
              email: "PenthouseAdvisors@gmail.com",
              priceRange: "$$$",
              areaServed: [
                { "@type": "AdministrativeArea", name: "Los Angeles County" },
                { "@type": "City", name: "Los Angeles" },
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Los Angeles",
                addressRegion: "CA",
                addressCountry: "US",
              },
              foundingDate: "2021",
              knowsAbout: [
                "Restaurant Brokerage",
                "Restaurant Acquisitions",
                "Restaurant Dispositions",
                "Commercial Restaurant Leasing",
                "Alcohol Licensing",
                "Health Department Permitting",
                "Hospitality Consulting",
              ],
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
                  opens: "08:00",
                  closes: "19:00",
                },
              ],
            },
            {
              "@type": "WebSite",
              "@id": "https://www.penthouseadvisors.com/#website",
              url: "https://www.penthouseadvisors.com",
              name: "Penthouse Advisors",
              publisher: { "@id": "https://www.penthouseadvisors.com/#organization" },
              inLanguage: "en-US",
            },
          ],
        }),
      },
    ],
  }),

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

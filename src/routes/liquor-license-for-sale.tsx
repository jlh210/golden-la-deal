import { createFileRoute, redirect } from "@tanstack/react-router";

// Liquor License For Sale page removed — permanently redirect to Restaurant Alcohol Licensing.
export const Route = createFileRoute("/liquor-license-for-sale")({
  beforeLoad: () => {
    throw redirect({ to: "/alcohol-licensing", statusCode: 301 });
  },
  component: () => null,
});

import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/house-condo-servicing")({
  beforeLoad: () => {
    throw redirect({ to: "/", statusCode: 301 });
  },
  component: () => null,
});

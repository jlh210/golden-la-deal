import { createFileRoute, redirect } from "@tanstack/react-router";

// Legacy WordPress URL — permanently redirect to home.
export const Route = createFileRoute("/hello-world")({
  beforeLoad: () => {
    throw redirect({ to: "/", statusCode: 301 });
  },
  component: () => null,
});

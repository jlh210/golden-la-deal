import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/hardware-store-for-sale")({
  beforeLoad: () => {
    throw redirect({ to: "/restaurants-for-sale", statusCode: 301 });
  },
  component: () => null,
});

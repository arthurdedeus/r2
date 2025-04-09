import { PostHog } from "posthog-node";

let posthogInstance = null;

export function getPostHogServer() {
  if (!posthogInstance) {
    posthogInstance = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      host: "https://us.i.posthog.com",
      flushAt: 1,
      flushInterval: 0,
    });
  }
  return posthogInstance;
}

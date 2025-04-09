"use client";

import posthog from "posthog-js";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    posthog.captureException(error);
  }, [error]);

  return (
    <div className="flex flex-1 items-center justify-center min-h-screen bg-[#f5f3eb]">
      Uh oh... Something went wrong.
    </div>
  );
}

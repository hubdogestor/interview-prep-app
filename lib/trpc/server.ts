import "server-only";

import { cache } from "react";

import { createCaller } from "@/server/api/root";
import { createContextInner } from "@/server/api/trpc";

/**
 * Helper para usar tRPC em Server Components (RSC)
 * Utiliza React cache para deduplicate requests
 */
export const api = cache(async () => {
  const context = await createContextInner({
    headers: new Headers(),
  });

  return createCaller(context);
});

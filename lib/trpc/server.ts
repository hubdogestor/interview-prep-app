import "server-only";

import { cache } from "react";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { createCaller } from "@/server/api/root";
import { createContextInner } from "@/server/api/trpc";

/**
 * Helper para usar tRPC em Server Components (RSC)
 * Utiliza React cache para deduplicate requests
 */
export const api = cache(async () => {
  const session = await auth();
  const context = await createContextInner({
    headers: headers(),
    session,
  });

  return createCaller(context);
});

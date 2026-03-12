// src/lib/guards.ts

/**
 * Server-side checkout access check.
 * Currently only checks the CHECKOUT_ENABLED env var.
 * Structured for future auth/role/allowlist checks.
 *
 * Returns { allowed: true } or { allowed: false, redirect: string }.
 */
export function checkCheckoutAccess(): {
  allowed: boolean;
  redirect?: string;
} {
  // Gate 1: Feature flag
  if (process.env.CHECKOUT_ENABLED !== "true") {
    return { allowed: false, redirect: "/pricing" };
  }

  // Gate 2 (future): Authentication
  // if (!session?.user) {
  //   return { allowed: false, redirect: "/login" };
  // }

  // Gate 3 (future): Email verification
  // if (!session.user.emailVerified) {
  //   return { allowed: false, redirect: "/verify" };
  // }

  // Gate 4 (future): Allowlist / role check
  // if (!isAllowlisted(session.user.email)) {
  //   return { allowed: false, redirect: "/pricing" };
  // }

  return { allowed: true };
}

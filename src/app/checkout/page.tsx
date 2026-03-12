// src/app/checkout/page.tsx
import { redirect } from "next/navigation";
import { checkCheckoutAccess } from "@/lib/guards";
import { getPlan, VALID_PLAN_IDS } from "@/lib/checkout";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

interface CheckoutPageProps {
  searchParams: Promise<{ plan?: string }>;
}

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  // Route guard
  const access = checkCheckoutAccess();
  if (!access.allowed) {
    redirect(access.redirect ?? "/pricing");
  }

  // Validate plan
  const params = await searchParams;
  const planId = params.plan;

  if (!planId || !(VALID_PLAN_IDS as string[]).includes(planId)) {
    redirect("/pricing");
  }

  const plan = getPlan(planId)!;

  return (
    <main>
      <CheckoutForm plan={plan} />
    </main>
  );
}

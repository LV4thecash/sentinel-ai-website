// src/lib/checkout.ts

export interface Plan {
  id: "monthly" | "quarterly" | "annual";
  label: string;
  price: string;
  priceAmount: number;
  period: string;
  effective: string | null;
  save: string | null;
  popular: boolean;
}

export type PlanId = Plan["id"];

export const PLANS: Plan[] = [
  {
    id: "monthly",
    label: "Monthly",
    price: "1 SOL",
    priceAmount: 1,
    period: "/ month",
    effective: null,
    save: null,
    popular: false,
  },
  {
    id: "quarterly",
    label: "Quarterly",
    price: "2 SOL",
    priceAmount: 2,
    period: "/ quarter",
    effective: "0.67 SOL / mo",
    save: "Save 33%",
    popular: true,
  },
  {
    id: "annual",
    label: "Annual",
    price: "5 SOL",
    priceAmount: 5,
    period: "/ year",
    effective: "0.42 SOL / mo",
    save: "Save 58%",
    popular: false,
  },
];

export const VALID_PLAN_IDS: PlanId[] = ["monthly", "quarterly", "annual"];

export function getPlan(id: string): Plan | undefined {
  return PLANS.find((p) => p.id === id);
}

// --- Checkout API abstraction ---

export interface CreateCheckoutOrderParams {
  planId: PlanId;
  email: string;
}

export interface CheckoutOrder {
  orderId: string;
  paymentUrl: string;
}

export async function createCheckoutOrder(
  params: CreateCheckoutOrderParams
): Promise<CheckoutOrder> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "Unknown error");
    throw new Error(`Checkout failed: ${text}`);
  }

  return res.json();
}

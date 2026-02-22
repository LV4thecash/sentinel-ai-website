import { NextRequest, NextResponse } from "next/server";
import { createInvoice } from "@/lib/nowpayments";

const TIER_PRICES: Record<string, { amount: number; label: string }> = {
  monthly: { amount: 1, label: "Sentinel AI — Monthly (1 SOL)" },
  quarterly: { amount: 2, label: "Sentinel AI — Quarterly (2 SOL)" },
  annual: { amount: 5, label: "Sentinel AI — Annual (5 SOL)" },
};

export async function POST(req: NextRequest) {
  const body = await req.json() as { tier?: string };
  const { tier } = body;

  if (!tier || !TIER_PRICES[tier]) {
    return NextResponse.json({ error: "Invalid tier" }, { status: 400 });
  }

  const config = TIER_PRICES[tier];
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  try {
    const invoice = await createInvoice({
      priceAmount: config.amount,
      priceCurrency: "SOL",
      payCurrency: "SOL",
      orderId: `${tier}-${Date.now()}`,
      orderDescription: config.label,
      successUrl: `${siteUrl}/pricing?success=1`,
      cancelUrl: `${siteUrl}/pricing`,
    });

    return NextResponse.json({ invoiceUrl: invoice.invoice_url });
  } catch (err) {
    console.error("[create-payment] NowPayments error:", err);
    return NextResponse.json(
      { error: "Payment creation failed" },
      { status: 500 }
    );
  }
}

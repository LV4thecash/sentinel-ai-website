const NOWPAYMENTS_BASE = "https://api.nowpayments.io/v1";

export interface CreateInvoiceParams {
  priceAmount: number;
  priceCurrency: "SOL";
  payCurrency: "SOL";
  orderId: string;
  orderDescription: string;
  successUrl: string;
  cancelUrl: string;
}

export interface NowPaymentsInvoice {
  invoice_url: string;
  id: string;
}

export async function createInvoice(
  params: CreateInvoiceParams
): Promise<NowPaymentsInvoice> {
  const res = await fetch(`${NOWPAYMENTS_BASE}/invoice`, {
    method: "POST",
    headers: {
      "x-api-key": process.env.NOWPAYMENTS_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      price_amount: params.priceAmount,
      price_currency: params.priceCurrency,
      pay_currency: params.payCurrency,
      order_id: params.orderId,
      order_description: params.orderDescription,
      success_url: params.successUrl,
      cancel_url: params.cancelUrl,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`NowPayments error ${res.status}: ${text}`);
  }

  return res.json();
}

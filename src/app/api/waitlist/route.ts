import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await req.json() as { email: string; telegram?: string };
  const { email, telegram } = body;

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  // If no audience ID configured, silently succeed (dev mode)
  if (!process.env.RESEND_WAITLIST_AUDIENCE_ID) {
    console.log("[waitlist] dev mode — no audience ID, skipping Resend:", email);
    return NextResponse.json({ ok: true });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.contacts.create({
      email,
      unsubscribed: false,
      audienceId: process.env.RESEND_WAITLIST_AUDIENCE_ID,
      firstName: telegram ?? undefined,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[waitlist] Resend error:", err);
    return NextResponse.json({ error: "Failed to join waitlist" }, { status: 500 });
  }
}

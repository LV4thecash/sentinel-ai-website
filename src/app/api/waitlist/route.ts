import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FIELD_LIMITS: Record<string, number> = {
  email: 254,
  telegram: 64,
  activity: 500,
  tools: 500,
  reason: 2000,
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function sanitize(value: unknown, field: string): string | null {
  if (value === undefined || value === null) return null;
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (trimmed.length === 0) return null;
  const limit = FIELD_LIMITS[field] ?? 500;
  if (trimmed.length > limit) return null;
  return trimmed;
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const email = sanitize(body.email, "email");
  const telegram = sanitize(body.telegram, "telegram");
  const activity = sanitize(body.activity, "activity");
  const tools = sanitize(body.tools, "tools");
  const reason = sanitize(body.reason, "reason");

  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log("[waitlist] No RESEND_API_KEY — logging application:", email, telegram);
    return NextResponse.json({ ok: true });
  }

  const resend = new Resend(apiKey);

  const safeEmail = escapeHtml(email);
  const safeTelegram = escapeHtml(telegram ?? "not provided");
  const safeActivity = escapeHtml(activity ?? "not provided");
  const safeTools = escapeHtml(tools ?? "not provided");
  const safeReason = escapeHtml(reason ?? "not provided");

  try {
    await resend.emails.send({
      from: "Sentinel AI <noreply@sentinelai.bot>",
      to: "leone.andreis@sentinelai.bot",
      subject: `New waitlist application: ${safeEmail}`,
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:2rem;background:#fafafa;border:1px solid #e4e4e7;border-radius:8px;">
          <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:1.25rem;color:#212323;">New Waitlist Application</h2>
          <table style="width:100%;border-collapse:collapse;font-size:0.875rem;">
            <tr>
              <td style="padding:0.6rem 0;color:#71717a;width:100px;">Email</td>
              <td style="padding:0.6rem 0;color:#212323;font-weight:600;">${safeEmail}</td>
            </tr>
            <tr>
              <td style="padding:0.6rem 0;color:#71717a;">Telegram</td>
              <td style="padding:0.6rem 0;color:#212323;">${safeTelegram}</td>
            </tr>
            <tr>
              <td style="padding:0.6rem 0;color:#71717a;">Activity</td>
              <td style="padding:0.6rem 0;color:#212323;">${safeActivity}</td>
            </tr>
            <tr>
              <td style="padding:0.6rem 0;color:#71717a;">Tools used</td>
              <td style="padding:0.6rem 0;color:#212323;">${safeTools}</td>
            </tr>
            <tr>
              <td style="padding:0.6rem 0;color:#71717a;vertical-align:top;">Why beta</td>
              <td style="padding:0.6rem 0;color:#212323;">${safeReason}</td>
            </tr>
          </table>
        </div>
      `,
    });

    if (process.env.RESEND_WAITLIST_AUDIENCE_ID) {
      await resend.contacts.create({
        email,
        unsubscribed: false,
        audienceId: process.env.RESEND_WAITLIST_AUDIENCE_ID,
        firstName: telegram ?? undefined,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[waitlist] Resend error:", err);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}

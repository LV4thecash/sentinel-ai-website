import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await req.json() as { email: string; telegram?: string };
  const { email, telegram } = body;

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log("[waitlist] No RESEND_API_KEY — logging application:", email, telegram);
    return NextResponse.json({ ok: true });
  }

  const resend = new Resend(apiKey);

  try {
    // Send notification email to leone.andreis@sentinelai.bot
    await resend.emails.send({
      from: "Sentinel AI <noreply@sentinelai.bot>",
      to: "leone.andreis@sentinelai.bot",
      subject: `New waitlist application: ${email}`,
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:2rem;background:#fafafa;border:1px solid #e4e4e7;border-radius:8px;">
          <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:1.25rem;color:#212323;">New Waitlist Application</h2>
          <table style="width:100%;border-collapse:collapse;font-size:0.875rem;">
            <tr>
              <td style="padding:0.6rem 0;color:#71717a;width:100px;">Email</td>
              <td style="padding:0.6rem 0;color:#212323;font-weight:600;">${email}</td>
            </tr>
            <tr>
              <td style="padding:0.6rem 0;color:#71717a;">Telegram</td>
              <td style="padding:0.6rem 0;color:#212323;">${telegram ?? "not provided"}</td>
            </tr>
          </table>
        </div>
      `,
    });

    // Also add to audience if configured
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

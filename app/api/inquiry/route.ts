import { NextResponse } from "next/server";
import { eventGuestRanges, isSingleDay, occasions, site, stayTypes } from "@/lib/site";

// Required env vars (set in .env.local locally, and in the Vercel project settings):
//   RESEND_API_KEY     – from https://resend.com/api-keys
//   INQUIRY_TO_EMAIL   – where inquiries are delivered
// Optional:
//   INQUIRY_FROM_EMAIL – sender on a domain verified in Resend. Until a domain is
//                        verified, Resend's test sender only delivers to the email
//                        address that owns the Resend account.
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const TO_EMAIL = process.env.INQUIRY_TO_EMAIL;
const FROM_EMAIL = process.env.INQUIRY_FROM_EMAIL || "MESWO Inquiries <onboarding@resend.dev>";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

type Inquiry = {
  name: string;
  phone: string;
  email: string;
  stayType: string;
  occasion: string;
  guests: string;
  checkIn: string;
  checkOut: string;
  adults: string;
  children: string;
  message: string;
  website: string; // honeypot — real visitors never fill this
};

function str(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const inquiry: Inquiry = {
    name: str(body.name, 100),
    phone: str(body.phone, 20),
    email: str(body.email, 200),
    stayType: str(body.stayType, 30),
    occasion: str(body.occasion, 50),
    guests: str(body.guests, 20),
    checkIn: str(body.checkIn, 10),
    checkOut: str(body.checkOut, 10),
    adults: str(body.adults, 3),
    children: str(body.children, 3),
    message: str(body.message, 2000),
    website: str(body.website, 200),
  };

  // Silently accept bot submissions so they don't retry
  if (inquiry.website) {
    return NextResponse.json({ ok: true });
  }

  const isEvent = inquiry.stayType === "Event / Party";
  const isDayVisit = isSingleDay(inquiry.stayType);
  if (
    !inquiry.name ||
    !/^[0-9+\s-]{8,20}$/.test(inquiry.phone) ||
    !(stayTypes as readonly string[]).includes(inquiry.stayType) ||
    (isEvent &&
      (!(occasions as readonly string[]).includes(inquiry.occasion) ||
        !(eventGuestRanges as readonly string[]).includes(inquiry.guests))) ||
    !DATE_RE.test(inquiry.checkIn) ||
    (!isDayVisit && (!DATE_RE.test(inquiry.checkOut) || inquiry.checkOut <= inquiry.checkIn)) ||
    (inquiry.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email))
  ) {
    return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
  }

  if (!RESEND_API_KEY || !TO_EMAIL) {
    console.error("Inquiry email not configured: set RESEND_API_KEY and INQUIRY_TO_EMAIL");
    return NextResponse.json(
      { error: `Inquiries are temporarily unavailable. Please call us on ${site.phoneDisplay}.` },
      { status: 500 }
    );
  }

  const rows: [string, string][] = [
    ["Name", inquiry.name],
    ["Phone", inquiry.phone],
    ["Email", inquiry.email || "—"],
    ["Type", isEvent ? `${inquiry.stayType} — ${inquiry.occasion}` : inquiry.stayType],
    [isDayVisit ? "Date" : "Check-in", inquiry.checkIn],
    ...(isDayVisit ? [] : [["Check-out", inquiry.checkOut] as [string, string]]),
    ...(isEvent
      ? [["Guests", inquiry.guests] as [string, string]]
      : [
          ["Adults", inquiry.adults] as [string, string],
          ["Children", inquiry.children || "0"] as [string, string],
        ]),
  ];

  // One-tap ways to get back to the guest. Indian numbers are usually typed
  // without the country code, which wa.me needs.
  const phoneDigits = inquiry.phone.replace(/\D/g, "").replace(/^0+/, "");
  const waNumber = phoneDigits.length === 10 ? `91${phoneDigits}` : phoneDigits;
  const callHref = `tel:+${waNumber}`;
  const waHref = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    `Hi ${inquiry.name}, thank you for your inquiry at ${site.name}.`
  )}`;
  const mailHref = inquiry.email
    ? `mailto:${inquiry.email}?subject=${encodeURIComponent(`Your inquiry at ${site.name}`)}`
    : "";

  const text = [
    !inquiry.email && "NOTE: The guest did not share an email — please Call or WhatsApp them.\n",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    inquiry.message && `\nMessage:\n${inquiry.message}`,
    `\nCall: ${callHref}`,
    `WhatsApp: ${waHref}`,
    inquiry.email && `Email: ${inquiry.email}`,
  ]
    .filter(Boolean)
    .join("\n");

  const button = (href: string, label: string, bg: string) =>
    `<a href="${escapeHtml(href)}" style="display:inline-block;margin:0 8px 8px 0;padding:10px 18px;border-radius:8px;background:${bg};color:#ffffff;font-family:sans-serif;font-size:14px;font-weight:600;text-decoration:none">${label}</a>`;

  const html = `
    ${
      inquiry.email
        ? ""
        : `<p style="font-family:sans-serif;font-size:14px;margin:0 0 16px;padding:10px 14px;border-radius:8px;background:#FFF4E0;color:#8A5A00"><strong>No email shared.</strong> Replying to this email won't reach the guest — please Call or WhatsApp them.</p>`
    }
    <h2 style="font-family:sans-serif;margin:0 0 16px">New booking inquiry</h2>
    <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><td style="padding:6px 16px 6px 0;color:#666">${label}</td><td style="padding:6px 0"><strong>${escapeHtml(value)}</strong></td></tr>`
        )
        .join("")}
    </table>
    ${
      inquiry.message
        ? `<p style="font-family:sans-serif;font-size:14px;margin-top:20px;white-space:pre-wrap">${escapeHtml(inquiry.message)}</p>`
        : ""
    }
    <p style="margin-top:24px">
      ${button(callHref, "📞 Call", "#0F3434")}
      ${button(waHref, "💬 WhatsApp", "#1E8E3E")}
      ${mailHref ? button(mailHref, "✉️ Email", "#B8893B") : ""}
    </p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: TO_EMAIL.split(",").map((e) => e.trim()),
      subject: `New inquiry: ${inquiry.name} · ${isEvent ? inquiry.occasion : inquiry.stayType} · ${inquiry.checkIn}`,
      text,
      html,
      ...(inquiry.email ? { reply_to: inquiry.email } : {}),
    }),
  });

  if (!res.ok) {
    console.error("Resend error", res.status, await res.text());
    return NextResponse.json(
      { error: "Couldn't send your inquiry. Please try again in a moment." },
      { status: 502 }
    );
  }

  // Log the Resend id so a missing email can be traced in the Resend dashboard
  const { id } = await res.json().catch(() => ({ id: undefined }));
  console.log("Inquiry email sent", id);

  return NextResponse.json({ ok: true });
}

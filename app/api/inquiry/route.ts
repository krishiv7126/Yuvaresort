import { NextResponse } from "next/server";

// Required env vars (set in .env.local locally, and in the Vercel project settings):
//   RESEND_API_KEY     – from https://resend.com/api-keys
//   INQUIRY_TO_EMAIL   – where inquiries are delivered
// Optional:
//   INQUIRY_FROM_EMAIL – sender on a domain verified in Resend. Until a domain is
//                        verified, Resend's test sender only delivers to the email
//                        address that owns the Resend account.
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const TO_EMAIL = process.env.INQUIRY_TO_EMAIL;
const FROM_EMAIL = process.env.INQUIRY_FROM_EMAIL || "Resort Inquiries <onboarding@resend.dev>";

const STAY_TYPES = ["Cottage Stay", "Day Visit", "Group / Event"];
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

type Inquiry = {
  name: string;
  phone: string;
  email: string;
  stayType: string;
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

  const isDayVisit = inquiry.stayType === "Day Visit";
  if (
    !inquiry.name ||
    !/^[0-9+\s-]{8,20}$/.test(inquiry.phone) ||
    !STAY_TYPES.includes(inquiry.stayType) ||
    !DATE_RE.test(inquiry.checkIn) ||
    (!isDayVisit && (!DATE_RE.test(inquiry.checkOut) || inquiry.checkOut <= inquiry.checkIn)) ||
    (inquiry.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email))
  ) {
    return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
  }

  if (!RESEND_API_KEY || !TO_EMAIL) {
    console.error("Inquiry email not configured: set RESEND_API_KEY and INQUIRY_TO_EMAIL");
    return NextResponse.json(
      { error: "Inquiries are temporarily unavailable. Please call us instead." },
      { status: 500 }
    );
  }

  const rows: [string, string][] = [
    ["Name", inquiry.name],
    ["Phone", inquiry.phone],
    ["Email", inquiry.email || "—"],
    ["Type", inquiry.stayType],
    [isDayVisit ? "Date" : "Check-in", inquiry.checkIn],
    ...(isDayVisit ? [] : [["Check-out", inquiry.checkOut] as [string, string]]),
    ["Adults", inquiry.adults],
    ["Children", inquiry.children || "0"],
  ];

  const text = [
    ...rows.map(([label, value]) => `${label}: ${value}`),
    inquiry.message && `\nMessage:\n${inquiry.message}`,
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
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
    <p style="font-family:sans-serif;font-size:14px;margin-top:24px">
      <a href="tel:${escapeHtml(inquiry.phone.replace(/\s/g, ""))}">Call ${escapeHtml(inquiry.name)}</a>
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
      subject: `New inquiry: ${inquiry.name} · ${inquiry.stayType} · ${inquiry.checkIn}`,
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

"use client";

import { useEffect, useState, type FormEvent } from "react";
import { eventGuestRanges, occasions, stayTypes, type StayType } from "@/lib/site";

// Submits to /api/inquiry, which emails the resort (see app/api/inquiry/route.ts)

const fieldClass =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-foreground";
const labelClass = "mb-2 block text-sm font-medium text-foreground";

function today() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

export function InquiryForm() {
  const [stayType, setStayType] = useState<StayType>(stayTypes[0]);
  const [occasion, setOccasion] = useState<string>(occasions[0]);
  const [checkIn, setCheckIn] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  // Set after mount so server and visitor timezones can't cause a hydration mismatch
  const [minDate, setMinDate] = useState<string | undefined>(undefined);

  useEffect(() => setMinDate(today()), []);

  // Arriving from an Events card (/inquiry?occasion=Birthday%20Party) preselects it
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("occasion");
    if (requested && (occasions as readonly string[]).includes(requested)) {
      setStayType("Event / Party");
      setOccasion(requested);
    }
  }, []);

  const isEvent = stayType === "Event / Party";
  // Day visits and events are single-day; room stays need check-in and check-out
  const isDayVisit = stayType !== "Room Stay";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    const data = new FormData(e.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim();

    const checkOut = get("checkOut");
    if (!isDayVisit && checkOut && checkOut <= get("checkIn")) {
      setError("Check-out date must be after check-in.");
      return;
    }
    setError(null);

    setSubmitting(true);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(data), stayType, ...(isEvent ? { occasion } : {}) }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setError(body?.error ?? "Couldn't send your inquiry. Please try again.");
        return;
      }
      setSent(true);
    } catch {
      setError("Couldn't send your inquiry. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div className="mt-12 rounded-2xl border border-border p-8 text-center">
        <h2 className="text-2xl font-medium text-foreground">Thank you!</h2>
        <p className="mt-3 text-muted-foreground">
          We&apos;ve received your inquiry and will get back to you with
          availability and rates shortly.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 py-2 text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 space-y-6 md:mt-14">
      {/* Stay type */}
      <fieldset>
        <legend className={labelClass}>What are you planning?</legend>
        <div className="flex flex-wrap gap-2">
          {stayTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setStayType(type)}
              aria-pressed={stayType === type}
              className={`rounded-full border px-4 py-2.5 text-sm transition-colors ${
                stayType === type
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-foreground hover:border-foreground"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </fieldset>

      {isEvent && (
        <div>
          <label htmlFor="occasion" className={labelClass}>Occasion</label>
          <select
            id="occasion"
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
            className={fieldClass}
          >
            {occasions.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
      )}

      {/* Contact */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="md:col-span-2">
          <label htmlFor="name" className={labelClass}>Full name</label>
          <input id="name" name="name" required autoComplete="name" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>Phone</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            pattern="[0-9+\s\-]{8,20}"
            placeholder="+91"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email <span className="font-normal text-muted-foreground">(optional)</span>
          </label>
          <input id="email" name="email" type="email" autoComplete="email" className={fieldClass} />
        </div>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-4 md:gap-6">
        <div className={isDayVisit ? "col-span-2" : ""}>
          <label htmlFor="checkIn" className={labelClass}>{isDayVisit ? "Date" : "Check-in"}</label>
          <input
            id="checkIn"
            name="checkIn"
            type="date"
            required
            min={minDate}
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className={fieldClass}
          />
        </div>
        {!isDayVisit && (
          <div>
            <label htmlFor="checkOut" className={labelClass}>Check-out</label>
            <input
              id="checkOut"
              name="checkOut"
              type="date"
              required
              min={checkIn || minDate}
              className={fieldClass}
            />
          </div>
        )}
      </div>

      {/* Guests */}
      {isEvent ? (
        <div>
          <label htmlFor="guests" className={labelClass}>Approx. number of guests</label>
          <select id="guests" name="guests" defaultValue={eventGuestRanges[1]} className={fieldClass}>
            {eventGuestRanges.map((range) => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:gap-6">
          <div>
            <label htmlFor="adults" className={labelClass}>Adults</label>
            <select id="adults" name="adults" defaultValue="2" className={fieldClass}>
              {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
              <option value="20+">20+</option>
            </select>
          </div>
          <div>
            <label htmlFor="children" className={labelClass}>Children</label>
            <select id="children" name="children" defaultValue="0" className={fieldClass}>
              {Array.from({ length: 11 }, (_, i) => i).map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Message */}
      <div>
        <label htmlFor="message" className={labelClass}>
          Anything else? <span className="font-normal text-muted-foreground">(optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Special requests, occasion, food preferences…"
          className={`${fieldClass} resize-none`}
        />
      </div>

      {/* Honeypot: hidden from people, bots fill it and get silently dropped */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      {error && (
        <p role="alert" className="text-sm text-red-600">{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-foreground px-6 py-4 text-base font-medium text-background transition-opacity hover:opacity-80 disabled:opacity-60 md:w-auto md:px-10"
      >
        {submitting ? "Sending…" : "Send Inquiry"}
      </button>
    </form>
  );
}

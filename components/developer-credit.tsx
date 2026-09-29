"use client";

import { useEffect, useState } from "react";
import { Check, Mail, MessageCircle, Phone } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Who built the site — shown as a quiet credit in the footer
const developer = {
  name: "Krishiv Goswami",
  studio: "Infinity",
  studioLine: "Web Design & Development",
  phoneDisplay: "+91 74900 16801",
  phoneHref: "tel:+917490016801",
  whatsapp: "917490016801",
  email: "krishiv71206@gmail.com",
};

const enquiry = "Hi Krishiv, I saw the MESWO Riverside Resort website and I'd like a website like this.";
const whatsappHref = `https://wa.me/${developer.whatsapp}?text=${encodeURIComponent(enquiry)}`;
const mailSubject = "Website enquiry (via MESWO Riverside Resort)";
const mailtoHref = `mailto:${developer.email}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(enquiry)}`;
// Laptops often have no mail app set up for mailto:, so open Gmail's compose instead
const gmailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${developer.email}&su=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(enquiry)}`;

// Infinity loop; the stroke "draws" itself when the credit is hovered or open
const LOOP = "M12 12c-2-2.7-3.6-4-5.4-4a4 4 0 0 0 0 8c1.8 0 3.4-1.3 5.4-4Zm0 0c2 2.7 3.6 4 5.4 4a4 4 0 0 0 0-8c-1.8 0-3.4 1.3-5.4 4Z";

function InfinityMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d={LOOP} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.25" />
      <path
        d={LOOP}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        pathLength={1}
        className="infinity-draw"
      />
    </svg>
  );
}

export function DeveloperCredit() {
  // Phones can dial / open the mail app; mouse devices get fallbacks
  const [isDesktop, setIsDesktop] = useState(false);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    setIsDesktop(window.matchMedia("(pointer: fine)").matches);
  }, []);

  // A tel: link does nothing on most laptops, so copy the number there instead
  const onCall = async (e: React.MouseEvent) => {
    if (!isDesktop) return;
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(developer.phoneDisplay);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = developer.phoneHref;
    }
  };

  // A signature for anyone who opens the browser console
  useEffect(() => {
    console.log(
      `%c∞ ${developer.studio}%c  Designed & developed by ${developer.name} · ${developer.phoneDisplay} · ${developer.email}`,
      "color:#E9A84A;font-weight:700;font-size:14px",
      "color:inherit;font-size:12px",
    );
  }, []);

  const action =
    "flex flex-1 flex-col items-center gap-1 rounded-lg border border-border py-2.5 text-[11px] text-muted-foreground transition-colors hover:border-[#E9A84A]/60 hover:text-foreground";

  return (
    <Popover>
      <PopoverTrigger
        className="group flex shrink-0 items-center gap-1.5 whitespace-nowrap py-2 text-xs text-muted-foreground transition-colors hover:text-foreground data-[state=open]:text-foreground"
        aria-label={`Website crafted by ${developer.name} — contact details`}
      >
        <span>Crafted by</span>
        <InfinityMark className="h-4 w-4 text-[#E9A84A]" />
        <span className="relative font-medium">
          Krishiv
          <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-[#E9A84A] transition-transform duration-500 group-hover:scale-x-100 group-data-[state=open]:scale-x-100" />
        </span>
      </PopoverTrigger>

      <PopoverContent side="top" sideOffset={10} className="w-72 rounded-2xl p-5">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0F3434] text-[#E9A84A]">
            <InfinityMark className="infinity-drawn h-6 w-6" />
          </span>
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-foreground">{developer.studio.toUpperCase()}</p>
            <p className="text-[11px] text-muted-foreground">{developer.studioLine}</p>
          </div>
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          This website was designed &amp; built by{" "}
          <span className="font-medium text-foreground">{developer.name}</span>. Want one like it?
        </p>

        <div className="mt-4 flex gap-2">
          <a href={developer.phoneHref} onClick={onCall} className={action}>
            {copied ? <Check size={15} className="text-[#E9A84A]" /> : <Phone size={15} />}
            {copied ? "Copied" : "Call"}
          </a>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={action}>
            <MessageCircle size={15} />
            WhatsApp
          </a>
          <a
            href={isDesktop ? gmailHref : mailtoHref}
            target={isDesktop ? "_blank" : undefined}
            rel="noopener noreferrer"
            className={action}
          >
            <Mail size={15} />
            Email
          </a>
        </div>

        <p className="mt-3 text-center text-[11px] text-muted-foreground">
          {developer.phoneDisplay} · {developer.email}
        </p>
      </PopoverContent>
    </Popover>
  );
}

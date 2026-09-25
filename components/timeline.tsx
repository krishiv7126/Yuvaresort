"use client";

import { useRef } from "react";
import { Reveal } from "@/components/motion";
import { useScrollProgress } from "@/hooks/use-scroll-progress";

export type TimelineStep = { time: string; title: string; text: string };

// Vertical timeline whose gold line draws itself as you scroll past it
export function Timeline({ steps, accent = "#e9a84a" }: { steps: TimelineStep[]; accent?: string }) {
  const ref = useRef<HTMLOListElement>(null);
  const progress = useScrollProgress(ref, (rect, vh) => (vh * 0.75 - rect.top) / rect.height);

  return (
    <ol ref={ref} className="relative ml-3 space-y-12 border-l border-white/10 pl-8 md:ml-4 md:pl-12">
      {/* Line that fills in with scroll */}
      <span
        aria-hidden="true"
        className="absolute -left-px top-0 w-px origin-top"
        style={{ height: "100%", background: accent, transform: `scaleY(${progress})` }}
      />
      {steps.map((step, i) => (
        <li key={step.title} className="relative">
          <span
            aria-hidden="true"
            className="absolute -left-[calc(2rem+6.5px)] top-1.5 h-3 w-3 rounded-full ring-4 ring-[#0d1717] transition-colors duration-500 md:-left-[calc(3rem+6.5px)]"
            style={{ background: progress > i / steps.length ? accent : "rgba(255,255,255,0.25)" }}
          />
          <Reveal variant="left" delay={i * 80}>
            <p className="text-sm font-medium tracking-wide" style={{ color: accent }}>
              {step.time}
            </p>
            <p className="mt-1 text-2xl font-medium text-white md:text-3xl">{step.title}</p>
            <p className="mt-2 max-w-md text-white/60">{step.text}</p>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

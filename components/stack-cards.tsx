"use client";

import Image from "next/image";
import { useRef } from "react";
import { useScrollProgress } from "@/hooks/use-scroll-progress";

type Card = { id: number; name: string; description: string; image: string };

// Cards pin one after another; each one settles on top of the last, and the
// ones underneath shrink and dim slightly — like a deck being dealt.
export function StackCards({ cards }: { cards: Card[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const n = cards.length;
  // 0 → 1 across the whole deck
  const progress = useScrollProgress(ref, (rect, vh) => -rect.top / (rect.height - vh));

  return (
    <div ref={ref} className="relative">
      {cards.map((card, i) => {
        // How far later cards have covered this one (0 = on top, 1 = fully covered)
        const covered = Math.max(0, Math.min(1, progress * n - (i + 1) + 0.5));
        const isLast = i === n - 1;
        return (
          <div key={card.id} className="h-[85svh] md:h-[95svh]">
            <div
              className="sticky mx-auto h-[70svh] max-w-6xl will-change-transform md:h-[78svh]"
              style={{
                top: `calc(88px + ${i * 14}px)`,
                transform: isLast ? "none" : `scale(${1 - covered * 0.07})`,
                transformOrigin: "50% 0%",
              }}
            >
              <article className="relative h-full overflow-hidden rounded-[2rem] shadow-[0_-12px_40px_rgba(40,30,20,0.18)]">
                <Image
                  src={card.image}
                  alt={card.name}
                  fill
                  sizes="(min-width: 1152px) 1152px, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                {/* Dim as it gets covered */}
                <div
                  className="absolute inset-0 bg-black"
                  style={{ opacity: isLast ? 0 : covered * 0.45 }}
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 text-white md:p-12">
                  <div>
                    <p className="font-display text-lg italic text-white/80 md:text-2xl">
                      {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 font-display text-4xl leading-none md:text-7xl">{card.name}</h3>
                    <p className="mt-3 max-w-md text-base text-white/85 md:text-lg">{card.description}</p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        );
      })}
    </div>
  );
}

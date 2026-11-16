"use client";

import { useRef } from "react";
import { useGSAP, gsap } from "@/lib/gsap-config";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  speed?: number; // duration in seconds for full loop
  pauseOnHover?: boolean;
  className?: string;
}

export function Marquee({
  children,
  direction = "left",
  speed = 28,
  pauseOnHover = false,
  className,
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      const fromX = direction === "left" ? 0 : -50;
      const toX = direction === "left" ? -50 : 0;

      const tween = gsap.fromTo(
        track,
        { xPercent: fromX },
        {
          xPercent: toX,
          duration: speed,
          ease: "none",
          repeat: -1,
        }
      );

      if (pauseOnHover && containerRef.current) {
        const el = containerRef.current;
        const onEnter = () => tween.pause();
        const onLeave = () => tween.play();
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
        return () => {
          el.removeEventListener("mouseenter", onEnter);
          el.removeEventListener("mouseleave", onLeave);
        };
      }
    },
    { scope: containerRef, dependencies: [direction, speed, pauseOnHover] }
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full overflow-hidden select-none",
        className
      )}
    >
      <div
        ref={trackRef}
        className="flex w-max items-center will-change-transform"
      >
        <div className="flex shrink-0 items-center gap-3 pr-3">
          {children}
        </div>
        <div className="flex shrink-0 items-center gap-3 pr-3" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

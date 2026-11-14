"use client";

import { useRef } from "react";
import { useGSAP, gsap } from "@/lib/gsap-config";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  delay?: number;
  stagger?: number;
}

export function TextReveal({
  text,
  className,
  as: Component = "h2",
  delay = 0,
  stagger = 0.04,
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const words = containerRef.current?.querySelectorAll(".reveal-word");
      if (!words || words.length === 0) return;

      gsap.fromTo(
        words,
        {
          y: 35,
          opacity: 0,
          rotateX: 20,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: stagger,
          delay: delay,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    },
    { scope: containerRef }
  );

  const words = text.split(" ");

  return (
    <Component
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={containerRef as any}
      className={cn("overflow-hidden inline-flex flex-wrap gap-x-[0.28em] gap-y-1", className)}
    >
      {words.map((word, index) => (
        <span
          key={index}
          className="reveal-word inline-block will-change-transform transform-gpu"
        >
          {word}
        </span>
      ))}
    </Component>
  );
}

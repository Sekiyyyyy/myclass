"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap-config";

interface CounterNumberProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

export function CounterNumber({
  value,
  suffix = "",
  prefix = "",
  duration = 2000,
}: CounterNumberProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        const startTime = performance.now();
        const startValue = 0;

        const updateCounter = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const easedProgress = 1 - Math.pow(1 - progress, 3);
          const currentCount = Math.floor(startValue + (value - startValue) * easedProgress);

          setCount(currentCount);

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            setCount(value);
          }
        };

        requestAnimationFrame(updateCounter);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [value, duration]);

  return (
    <span ref={elementRef} className="tabular-nums font-bold">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

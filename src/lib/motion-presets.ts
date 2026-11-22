import type { Transition } from "motion/react";

/**
 * Brand Motion Identity — XII PPLG 3 (16-Bit Tactile Cartridge)
 * Crisp, decisive mechanical springs with zero mushy bounce.
 */
export const snappySpring: Transition = {
  type: "spring",
  stiffness: 480,
  damping: 34,
  mass: 0.75,
};

export const modalSpring: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 30,
  mass: 0.85,
};

export const pixelEase: [number, number, number, number] = [0.2, 0, 0, 1];

export const viewportOnce = {
  once: true,
  amount: 0.16,
} as const;

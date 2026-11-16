"use client";

import { ReactNode } from "react";
import { PixelCanvas } from "./PixelCanvas";

interface PixelCardProps {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  pixelCanvas?: boolean;
  colors?: string[];
  onClick?: () => void;
}

export function PixelCard({
  children,
  className = "",
  interactive = true,
  pixelCanvas = true,
  colors = ["#38BDF8", "#818CF8", "#F43F5E", "#FBBF24", "#34D399"],
  onClick,
}: PixelCardProps) {
  return (
    <div
      onClick={onClick}
      className={`relative group overflow-hidden pixel-box ${
        interactive ? "pixel-box-interactive cursor-pointer" : ""
      } ${className}`}
    >
      {pixelCanvas && (
        <PixelCanvas
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          pixelSize={8}
          gap={2}
          colors={colors}
          fadeSpeed={0.05}
        />
      )}
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
}

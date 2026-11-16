"use client";

import { ReactNode } from "react";

interface PixelCardProps {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  onClick?: () => void;
}

export function PixelCard({
  children,
  className = "",
  interactive = true,
  onClick,
}: PixelCardProps) {
  return (
    <div
      onClick={onClick}
      className={`relative group overflow-hidden pixel-box p-4 ${
        interactive ? "pixel-box-interactive cursor-pointer" : ""
      } ${className}`}
    >
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
}

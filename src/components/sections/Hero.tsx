"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, Users, Camera } from "lucide-react";
import { HeroBackground } from "@/components/sections/HeroBackground";
import { CLASS_INFO } from "@/data/students";
import { snappySpring, pixelEase } from "@/lib/motion-presets";

const heroContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.36, ease: pixelEase },
  },
};

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const logoParallaxY = useTransform(scrollYProgress, [0, 1], [0, -32]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[82vh] flex items-center justify-center px-4 sm:px-6 lg:px-10 pt-24 sm:pt-28 pb-16 sm:pb-20 select-none overflow-hidden"
    >
      {/* Theme-Aware 16-Bit Pixel Sky */}
      <HeroBackground />

      <div className="relative z-10 max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
        {/* Left Column: Clean Floating Official 3D Planet Logo */}
        <motion.div
          initial={{ opacity: 0, x: -24, scale: 0.94 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={snappySpring}
          style={{ y: logoParallaxY }}
          className="lg:col-span-5 flex justify-center lg:justify-start"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.04, rotate: 1.5 }}
            whileTap={{ scale: 0.97 }}
            className="relative w-44 h-44 min-[400px]:w-52 min-[400px]:h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-[22rem] xl:h-[22rem] will-change-transform"
          >
            <Image
              src="/logo-v4.png"
              alt="Logo Resmi XII PPLG 3"
              fill
              priority
              className="object-contain drop-shadow-[4px_6px_0px_rgba(24,22,36,0.28)] dark:drop-shadow-[4px_6px_0px_rgba(7,6,13,0.85)]"
            />
          </motion.div>
        </motion.div>

        {/* Right Column: Minimalist Editorial Pixel Title & Actions */}
        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left"
        >
          {/* Main Headline */}
          <motion.h1
            variants={heroItem}
            className="font-pixel text-[1.35rem] min-[400px]:text-2xl sm:text-4xl lg:text-[2.75rem] xl:text-5xl text-[var(--fg-primary)] leading-[1.32] tracking-wide mb-3 sm:mb-4 pixel-title-shadow"
          >
            BUKU KENANGAN
            <br />
            DIGITAL
            <span
              aria-hidden="true"
              className="inline-block w-2.5 sm:w-4 h-5 sm:h-9 ml-2 align-middle bg-[#5B46C8] dark:bg-[#FACC15] animate-pixel-blink"
            />
          </motion.h1>

          {/* Concise Single-Line Subtitle */}
          <motion.p
            variants={heroItem}
            className="font-silk text-[11px] sm:text-sm md:text-base text-[var(--accent-indigo)] dark:text-[#FACC15] font-bold tracking-wider mb-6 sm:mb-8 uppercase"
          >
            {CLASS_INFO.major}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={heroItem}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-2.5 sm:gap-3 w-full sm:w-auto max-w-xs sm:max-w-none"
          >
            <motion.a
              href="#siswa"
              whileHover={{ y: -2 }}
              whileTap={{ y: 2 }}
              transition={snappySpring}
              className="pixel-btn pixel-btn-primary !text-[9px] sm:!text-[10px]"
            >
              <Users className="w-3.5 h-3.5 mr-2 shrink-0" />
              <span>Lihat 31 Siswa</span>
              <ArrowDown className="w-3.5 h-3.5 ml-2 shrink-0" />
            </motion.a>

            <motion.a
              href="#kenangan"
              whileHover={{ y: -2 }}
              whileTap={{ y: 2 }}
              transition={snappySpring}
              className="pixel-btn pixel-btn-secondary !text-[9px] sm:!text-[10px]"
            >
              <Camera className="w-3.5 h-3.5 mr-2 shrink-0" />
              <span>Galeri Kenangan</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
}

export default function SectionHeading({
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  const alignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }[align];

  const lineAlign = {
    left: "mr-auto",
    center: "mx-auto",
    right: "ml-auto",
  }[align];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={`mb-16 ${alignClass}`}
    >
      {/* HUD prefix */}
      <p className="text-accent-cyan font-heading text-xs tracking-[0.4em] uppercase mb-3 opacity-70">
        // system.module
      </p>

      <h2
        className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
        style={{ fontFamily: "'Orbitron', sans-serif" }}
      >
        {title}
      </h2>

      {/* Decorative line */}
      <div className={`flex items-center gap-3 ${align === "center" ? "justify-center" : align === "right" ? "justify-end" : "justify-start"}`}>
        <div className={`h-[2px] w-16 bg-gradient-to-r from-accent-cyan to-transparent`} />
        <div className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
        <div className={`h-[2px] w-8 bg-gradient-to-l from-accent-cyan to-transparent`} />
      </div>

      {subtitle && (
        <p className="text-gray-400 mt-4 text-base md:text-lg max-w-2xl leading-relaxed mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

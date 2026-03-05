"use client";
import { motion } from "framer-motion";
import React from "react";

interface GlowButtonProps {
  children: React.ReactNode;
  variant?: "cyan" | "red" | "outline";
  href?: string;
  onClick?: () => void;
  className?: string;
  download?: boolean;
}

export default function GlowButton({
  children,
  variant = "cyan",
  href,
  onClick,
  className = "",
  download = false,
}: GlowButtonProps) {
  const baseClasses =
    "relative inline-flex items-center gap-2 px-6 py-3 rounded font-orbitron text-sm font-semibold tracking-widest uppercase transition-all duration-300 overflow-hidden group";

  const variantClasses = {
    cyan: "bg-cyan-400/10 border border-cyan-400/60 text-cyan-400 hover:bg-cyan-400/20 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,212,255,0.4)]",
    red: "bg-red-400/10 border border-red-400/60 text-red-400 hover:bg-red-400/20 hover:border-red-400 hover:shadow-[0_0_20px_rgba(255,75,75,0.4)]",
    outline:
      "bg-transparent border border-slate-500/60 text-slate-300 hover:border-cyan-400/60 hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(0,212,255,0.2)]",
  };

  const shimmerColor = variant === "red" ? "rgba(255,75,75,0.15)" : "rgba(0,212,255,0.15)";

  const content = (
    <>
      <span
        className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"
        style={{ background: `linear-gradient(90deg, transparent, ${shimmerColor}, transparent)` }}
      />
      {children}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        download={download || undefined}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {content}
    </motion.button>
  );
}

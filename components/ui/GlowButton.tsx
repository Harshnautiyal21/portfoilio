"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlowButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  download?: boolean;
  target?: string;
  rel?: string;
}

const variantStyles = {
  primary:
    "bg-accent-blue text-background border border-accent-blue hover:bg-transparent hover:text-accent-blue",
  secondary:
    "bg-transparent text-accent-cyan border border-accent-cyan hover:bg-accent-cyan hover:text-background",
  outline:
    "bg-transparent text-gray-300 border border-gray-600 hover:border-accent-blue hover:text-accent-blue",
};

const sizeStyles = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

const glowStyles = {
  primary: "hover:shadow-[0_0_20px_rgba(0,212,255,0.5)] focus:shadow-[0_0_20px_rgba(0,212,255,0.5)]",
  secondary: "hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] focus:shadow-[0_0_20px_rgba(0,255,255,0.4)]",
  outline: "hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] focus:shadow-[0_0_20px_rgba(0,212,255,0.3)]",
};

export default function GlowButton({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  download,
  target,
  rel,
}: GlowButtonProps) {
  const baseClasses = `
    inline-flex items-center gap-2 font-heading font-semibold tracking-wider uppercase
    transition-all duration-300 cursor-pointer relative overflow-hidden
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${glowStyles[variant]}
    ${className}
  `;

  const content = (
    <motion.span
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={baseClasses}
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <a href={href} download={download} target={target} rel={rel} className="inline-flex">
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className="inline-flex">
      {content}
    </button>
  );
}

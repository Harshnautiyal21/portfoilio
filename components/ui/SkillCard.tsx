"use client";

import { motion } from "framer-motion";

interface SkillCardProps {
  category: string;
  icon: string;
  color: "cyan" | "blue" | "orange";
  items: string[];
  index: number;
}

const colorMap = {
  cyan: {
    border: "border-accent-cyan/30 hover:border-accent-cyan/70",
    text: "text-accent-cyan",
    bg: "bg-accent-cyan/10",
    glow: "hover:shadow-[0_0_30px_rgba(0,255,255,0.15)]",
    dot: "bg-accent-cyan",
    tag: "bg-accent-cyan/10 text-accent-cyan border-accent-cyan/20",
  },
  blue: {
    border: "border-accent-blue/30 hover:border-accent-blue/70",
    text: "text-accent-blue",
    bg: "bg-accent-blue/10",
    glow: "hover:shadow-[0_0_30px_rgba(0,212,255,0.15)]",
    dot: "bg-accent-blue",
    tag: "bg-accent-blue/10 text-accent-blue border-accent-blue/20",
  },
  orange: {
    border: "border-accent-orange/30 hover:border-accent-orange/70",
    text: "text-accent-orange",
    bg: "bg-accent-orange/10",
    glow: "hover:shadow-[0_0_30px_rgba(255,107,53,0.15)]",
    dot: "bg-accent-orange",
    tag: "bg-accent-orange/10 text-accent-orange border-accent-orange/20",
  },
};

export default function SkillCard({ category, color, items, index }: SkillCardProps) {
  const colors = colorMap[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      whileHover={{ y: -4 }}
      className={`relative glass rounded-lg p-6 border ${colors.border} ${colors.glow}
                  transition-all duration-300 group`}
    >
      {/* Corner decoration */}
      <div className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 ${colors.text} opacity-60`} />
      <div className={`absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 ${colors.text} opacity-60`} />

      {/* Animated indicator */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-2 h-2 rounded-full ${colors.dot} animate-pulse`} />
        <h3
          className={`font-heading font-semibold text-sm tracking-wider uppercase ${colors.text}`}
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {category}
        </h3>
      </div>

      {/* Skills grid */}
      <div className="flex flex-wrap gap-2">
        {items.map((skill, i) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.15 + i * 0.05 }}
            whileHover={{ scale: 1.08 }}
            className={`text-xs px-3 py-1.5 rounded border font-mono cursor-default
                        transition-all duration-200 ${colors.tag}`}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

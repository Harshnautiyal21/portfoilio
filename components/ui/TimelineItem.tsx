"use client";

import { motion } from "framer-motion";

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  icon: string;
  index: number;
  isLast: boolean;
}

export default function TimelineItem({
  year,
  title,
  description,
  index,
  isLast,
}: TimelineItemProps) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`relative flex items-center gap-6 mb-0 ${
        isEven ? "flex-row" : "flex-row-reverse"
      } md:flex-row`}
    >
      {/* Content card */}
      <div
        className={`flex-1 ${isEven ? "md:text-right" : "md:text-left"} md:w-[calc(50%-3rem)]`}
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="glass rounded-lg p-5 border border-gray-800 hover:border-accent-cyan/40
                     transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,212,255,0.1)] group"
        >
          {/* Year badge */}
          <span className="text-accent-cyan font-heading text-xs tracking-widest font-bold">
            {year}
          </span>

          <h3
            className="text-white font-semibold text-lg mt-1 mb-2 group-hover:text-accent-cyan transition-colors duration-300"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {title}
          </h3>

          <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
        </motion.div>
      </div>

      {/* Center dot + line */}
      <div className="relative flex flex-col items-center flex-shrink-0">
        {/* Dot */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.15 + 0.2 }}
          className="w-4 h-4 rounded-full bg-accent-cyan border-2 border-background
                     shadow-[0_0_15px_rgba(0,212,255,0.8)] z-10 relative"
        />

        {/* Connecting line */}
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
            className="w-[2px] h-24 bg-gradient-to-b from-accent-cyan to-transparent origin-top"
          />
        )}
      </div>

      {/* Empty spacer for alternating layout on desktop */}
      <div className="hidden md:block flex-1 md:w-[calc(50%-3rem)]" />
    </motion.div>
  );
}

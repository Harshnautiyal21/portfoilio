"use client";
import { motion } from "framer-motion";

interface SkillCardProps {
  name: string;
  icon: string;
  index: number;
}

export default function SkillCard({ name, icon, index }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.08, y: -4 }}
      className="hud-card rounded-lg p-3 flex items-center gap-2 cursor-default group"
    >
      <span className="text-xl">{icon}</span>
      <span className="text-sm text-slate-300 font-medium group-hover:text-cyan-400 transition-colors duration-200">
        {name}
      </span>
    </motion.div>
  );
}

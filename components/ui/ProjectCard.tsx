"use client";
import { motion } from "framer-motion";
import GlowButton from "./GlowButton";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
  highlight?: boolean;
  index: number;
}

export default function ProjectCard({
  title,
  description,
  tags,
  demoUrl,
  githubUrl,
  highlight = false,
  index,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className={`relative hud-card rounded-xl p-6 flex flex-col gap-4 ${
        highlight
          ? "border-cyan-400/40 shadow-[0_0_30px_rgba(0,212,255,0.08)]"
          : ""
      }`}
    >
      {/* HUD corners */}
      <div className="hud-corner hud-corner-tl" />
      <div className="hud-corner hud-corner-tr" />
      <div className="hud-corner hud-corner-bl" />
      <div className="hud-corner hud-corner-br" />

      {highlight && (
        <span className="absolute top-3 right-8 text-xs font-orbitron text-cyan-400 tracking-widest uppercase border border-cyan-400/40 px-2 py-0.5 rounded">
          Featured
        </span>
      )}

      <h3 className="font-orbitron text-lg font-bold text-white glow-text-cyan pr-20">{title}</h3>

      <p className="text-slate-400 text-sm leading-relaxed flex-1">{description}</p>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-1 rounded bg-cyan-400/5 border border-cyan-400/20 text-cyan-300 font-mono"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex gap-3 mt-2">
        <GlowButton href={demoUrl} variant="cyan" className="text-xs px-4 py-2">
          Live Demo
        </GlowButton>
        <GlowButton href={githubUrl} variant="outline" className="text-xs px-4 py-2">
          GitHub
        </GlowButton>
      </div>
    </motion.div>
  );
}

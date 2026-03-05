"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  demo: string;
  github: string;
  index: number;
}

export default function ProjectCard({
  title,
  description,
  tech,
  demo,
  github,
  index,
}: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="relative group glass rounded-lg p-6 border border-gray-800 hover:border-accent-cyan/50
                 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,212,255,0.15)] cursor-default
                 flex flex-col h-full"
    >
      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-accent-cyan/60 rounded-tl-sm" />
      <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-accent-cyan/60 rounded-br-sm" />

      {/* Project number */}
      <span className="text-accent-cyan/40 font-heading text-xs tracking-widest mb-3">
        {String(index + 1).padStart(2, "0")} / PROJECT
      </span>

      {/* Title */}
      <h3
        className="text-white font-bold text-xl mb-3 group-hover:text-accent-cyan transition-colors duration-300"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-grow">{description}</p>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-2 mb-5">
        {tech.map((t) => (
          <span
            key={t}
            className="text-xs px-2 py-1 bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 rounded font-mono"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 mt-auto">
        <a
          href={demo}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs font-heading tracking-wider uppercase px-4 py-2
                     border border-accent-cyan/50 text-accent-cyan hover:bg-accent-cyan hover:text-background
                     transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,212,255,0.4)] rounded-sm"
        >
          <ExternalLink size={12} />
          Demo
        </a>
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs font-heading tracking-wider uppercase px-4 py-2
                     border border-gray-600 text-gray-400 hover:border-accent-blue hover:text-accent-blue
                     transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,212,255,0.3)] rounded-sm"
        >
          <Github size={12} />
          GitHub
        </a>
      </div>
    </motion.article>
  );
}

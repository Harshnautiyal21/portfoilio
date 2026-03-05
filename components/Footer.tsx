"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { siteConfig } from "@/content/config";

export default function Footer() {
  return (
    <footer className="relative border-t border-gray-800/50 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Branding */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center md:text-left"
        >
          <p className="text-gray-500 text-sm">
            Designed &amp; Built by{" "}
            <span className="text-accent-cyan font-semibold">{siteConfig.name}</span>
          </p>
          <p className="text-gray-700 text-xs mt-1 font-mono">
            © {new Date().getFullYear()} — All rights reserved
          </p>
        </motion.div>

        {/* Center: Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-heading text-accent-cyan/40 text-xs tracking-[0.4em] uppercase"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          {siteConfig.name}.dev
        </motion.div>

        {/* Right: Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-4"
        >
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-white transition-colors duration-300"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-accent-blue transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <a
            href={`mailto:${siteConfig.social.email}`}
            className="text-gray-600 hover:text-accent-cyan transition-colors duration-300"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        </motion.div>
      </div>

      {/* Bottom decorative line */}
      <div className="mt-6 flex items-center justify-center gap-2 opacity-20">
        <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-accent-cyan" />
        <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
        <div className="h-px flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-accent-cyan" />
      </div>
    </footer>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download, Mail } from "lucide-react";
import { siteConfig } from "@/content/config";
import ParticleBackground from "@/components/ui/ParticleBackground";
import GlowButton from "@/components/ui/GlowButton";

const TYPING_WORDS = [
  "AI & Data Engineer",
  "LLM Application Builder",
  "Data Analytics Expert",
  "Automation Architect",
];

function useTypingEffect(words: string[], speed = 80, pause = 1800) {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];

    const timeout = setTimeout(
      () => {
        if (!deleting) {
          if (charIndex < current.length) {
            setDisplayed(current.slice(0, charIndex + 1));
            setCharIndex((c) => c + 1);
          } else {
            setTimeout(() => setDeleting(true), pause);
          }
        } else {
          if (charIndex > 0) {
            setDisplayed(current.slice(0, charIndex - 1));
            setCharIndex((c) => c - 1);
          } else {
            setDeleting(false);
            setWordIndex((w) => (w + 1) % words.length);
          }
        }
      },
      deleting ? speed / 2 : speed
    );

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words, speed, pause]);

  return displayed;
}

export default function HeroSection() {
  const typedText = useTypingEffect(TYPING_WORDS);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden hud-grid"
    >
      {/* Particle background */}
      <ParticleBackground />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-radial from-accent-blue/5 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />

      {/* HUD corner decorations */}
      <div className="absolute top-24 left-8 opacity-30">
        <div className="w-16 h-16 border-t-2 border-l-2 border-accent-cyan" />
      </div>
      <div className="absolute top-24 right-8 opacity-30">
        <div className="w-16 h-16 border-t-2 border-r-2 border-accent-cyan" />
      </div>
      <div className="absolute bottom-20 left-8 opacity-30">
        <div className="w-16 h-16 border-b-2 border-l-2 border-accent-cyan" />
      </div>
      <div className="absolute bottom-20 right-8 opacity-30">
        <div className="w-16 h-16 border-b-2 border-r-2 border-accent-cyan" />
      </div>

      {/* Status indicators */}
      <div className="absolute top-20 right-12 hidden lg:flex flex-col gap-2 opacity-40">
        {["SYS.ONLINE", "AI.ACTIVE", "DATA.READY"].map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse`}
              style={{ animationDelay: `${i * 0.4}s` }}
            />
            <span className="text-accent-cyan font-mono text-[10px] tracking-widest">{s}</span>
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Greeting line */}
        {mounted && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-accent-cyan font-heading text-xs tracking-[0.5em] uppercase mb-6 opacity-80"
          >
            {"// initializing portfolio..."}
          </motion.p>
        )}

        {/* Main name */}
        {mounted && (
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="font-heading font-black text-5xl md:text-7xl lg:text-8xl text-white mb-4 leading-none"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Hi, I&apos;m{" "}
            <span className="gradient-text glow-text-cyan">{siteConfig.name}</span>
          </motion.h1>
        )}

        {/* Typing effect subtitle */}
        <div className="h-16 flex items-center justify-center mb-4">
          {mounted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="font-heading text-xl md:text-3xl text-accent-blue font-semibold"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {typedText}
              <span className="animate-pulse ml-0.5 text-accent-cyan">|</span>
            </motion.div>
          )}
        </div>

        {/* Subheadline */}
        {mounted && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10"
          >
            {siteConfig.subheadline}
          </motion.p>
        )}

        {/* CTA Buttons */}
        {mounted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <GlowButton variant="primary" size="md" onClick={scrollToProjects}>
              View Projects
            </GlowButton>
            <GlowButton
              variant="secondary"
              size="md"
              href={siteConfig.resumeUrl}
              download
            >
              <Download size={14} />
              Download Resume
            </GlowButton>
            <GlowButton variant="outline" size="md" onClick={scrollToContact}>
              <Mail size={14} />
              Contact Me
            </GlowButton>
          </motion.div>
        )}

        {/* Tech badges */}
        {mounted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="flex flex-wrap justify-center gap-3 mt-10"
          >
            {["Python", "LangChain", "Next.js", "TensorFlow", "FastAPI"].map(
              (tech, i) => (
                <span
                  key={tech}
                  className="text-xs font-mono px-3 py-1 bg-gray-900/60 text-gray-500
                             border border-gray-700/50 rounded-full"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {tech}
                </span>
              )
            )}
          </motion.div>
        )}
      </div>

      {/* Scroll indicator */}
      {mounted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-gray-600 font-mono text-[10px] tracking-widest uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={16} className="text-accent-cyan/50" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}

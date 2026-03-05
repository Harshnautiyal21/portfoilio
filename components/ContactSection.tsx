"use client";
import { motion } from "framer-motion";
import { portfolioConfig } from "@/content/config";
import GlowButton from "./ui/GlowButton";

const socialLinks = [
  {
    label: "LinkedIn",
    icon: "💼",
    url: portfolioConfig.contact.linkedin,
    description: "Connect professionally",
    color: "cyan",
  },
  {
    label: "GitHub",
    icon: "🐙",
    url: portfolioConfig.contact.github,
    description: "Explore my code",
    color: "outline",
  },
  {
    label: "Email",
    icon: "📧",
    url: `mailto:${portfolioConfig.contact.email}`,
    description: portfolioConfig.contact.email,
    color: "red",
  },
] as const;

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="py-24 px-6 relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom, #0B0F19, #080c14)" }}
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="font-orbitron text-xs tracking-[0.3em] text-cyan-400 uppercase mb-3">
            &gt; ESTABLISH CONNECTION
          </p>
          <h2 className="section-title text-white mb-4">
            Get In{" "}
            <span className="text-cyan-400 glow-text-cyan">Touch</span>
          </h2>
          <div className="mt-4 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent mb-6" />
          <p className="text-slate-400 text-base max-w-xl mx-auto leading-relaxed">
            I&apos;m open to exciting opportunities in AI Engineering, Data Engineering, and ML roles.
            Let&apos;s build something impactful together.
          </p>
        </motion.div>

        {/* Contact cards */}
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {socialLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.url}
              target={link.label !== "Email" ? "_blank" : undefined}
              rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="hud-card rounded-xl p-6 flex flex-col items-center gap-3 group cursor-pointer"
            >
              <span className="text-4xl">{link.icon}</span>
              <span className="font-orbitron text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
                {link.label}
              </span>
              <span className="text-xs text-slate-500 truncate w-full text-center">
                {link.description}
              </span>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4"
        >
          <GlowButton href={`mailto:${portfolioConfig.contact.email}`} variant="cyan">
            Send Email
          </GlowButton>
          <GlowButton href={portfolioConfig.resumeUrl} variant="red" download>
            Download Resume
          </GlowButton>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        viewport={{ once: true }}
        className="text-center mt-24 pt-8 border-t border-slate-800"
      >
        <p className="font-mono text-xs text-slate-600 tracking-widest">
          &lt;/&gt; BUILT WITH NEXT.JS + TAILWIND + FRAMER MOTION
        </p>
        <p className="font-orbitron text-xs text-slate-700 mt-2">
          © {new Date().getFullYear()} {portfolioConfig.name} — ALL RIGHTS RESERVED
        </p>
      </motion.div>

      {/* Background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at bottom, rgba(0,212,255,0.04) 0%, transparent 70%)" }}
      />
    </section>
  );
}

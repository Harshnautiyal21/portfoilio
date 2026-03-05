"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import { siteConfig } from "@/content/config";
import SectionHeading from "@/components/ui/SectionHeading";
import GlowButton from "@/components/ui/GlowButton";

const socialLinks = [
  {
    label: "LinkedIn",
    href: (config: typeof siteConfig) => config.social.linkedin,
    Icon: Linkedin,
    color: "hover:text-accent-blue hover:shadow-[0_0_20px_rgba(0,212,255,0.4)]",
    border: "hover:border-accent-blue/60",
  },
  {
    label: "GitHub",
    href: (config: typeof siteConfig) => config.social.github,
    Icon: Github,
    color: "hover:text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]",
    border: "hover:border-white/40",
  },
  {
    label: "Email",
    href: (config: typeof siteConfig) => `mailto:${config.social.email}`,
    Icon: Mail,
    color: "hover:text-accent-cyan hover:shadow-[0_0_20px_rgba(0,212,255,0.4)]",
    border: "hover:border-accent-cyan/60",
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-24 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-blue/[0.03] to-transparent pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center">
        <SectionHeading title="Let's Connect" />

        {/* CTA text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="text-2xl md:text-3xl font-heading font-semibold text-white mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Let&apos;s build something{" "}
            <span className="gradient-text">amazing together</span>
          </p>
          <p className="text-gray-400 leading-relaxed max-w-xl mx-auto">
            Whether you have a project idea, want to collaborate on AI solutions, or just want to chat about technology — I&apos;m always open to interesting conversations.
          </p>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-10"
        >
          {socialLinks.map(({ label, href, Icon, color, border }, i) => (
            <motion.a
              key={label}
              href={href(siteConfig)}
              target={label !== "Email" ? "_blank" : undefined}
              rel={label !== "Email" ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 + 0.3 }}
              whileHover={{ scale: 1.08, y: -3 }}
              className={`flex items-center gap-3 px-6 py-3 glass border border-gray-700/50
                         text-gray-400 ${color} ${border} transition-all duration-300 rounded-sm`}
            >
              <Icon size={18} />
              <span className="font-heading text-xs tracking-widest uppercase">{label}</span>
            </motion.a>
          ))}
        </motion.div>

        {/* Direct email CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <GlowButton
            href={`mailto:${siteConfig.social.email}`}
            variant="primary"
            size="lg"
            className="group"
          >
            Send a Message
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </GlowButton>
        </motion.div>

        {/* Email display */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-6 text-gray-600 font-mono text-sm"
        >
          {siteConfig.social.email}
        </motion.p>
      </div>
    </section>
  );
}

"use client";
import { motion } from "framer-motion";
import { useRef } from "react";
import { portfolioConfig } from "@/content/config";

export default function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="timeline" className="py-24 px-6 max-w-5xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="font-orbitron text-xs tracking-[0.3em] text-cyan-400 uppercase mb-3">
          &gt; MISSION LOG
        </p>
        <h2 className="section-title text-white">
          My{" "}
          <span className="text-cyan-400 glow-text-cyan">Journey</span>
        </h2>
        <div className="mt-4 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
      </motion.div>

      {/* Timeline */}
      <div ref={containerRef} className="relative">
        {/* Vertical line */}
        <div className="absolute left-16 md:left-1/2 top-0 bottom-0 w-px bg-cyan-400/10" />
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true }}
          style={{ originY: 0 }}
          className="absolute left-16 md:left-1/2 top-0 bottom-0 w-px timeline-line"
        />

        <div className="flex flex-col gap-12">
          {portfolioConfig.timeline.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`relative flex items-start gap-8 md:gap-0 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Year */}
              <div
                className={`w-12 md:w-1/2 flex-shrink-0 ${
                  i % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"
                }`}
              >
                <span className="font-orbitron font-bold text-lg text-cyan-400 glow-text-cyan">
                  {item.year}
                </span>
              </div>

              {/* Center dot */}
              <div className="absolute left-16 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-cyan-400 bg-background shadow-[0_0_10px_rgba(0,212,255,0.6)] z-10" />

              {/* Content */}
              <div
                className={`flex-1 md:w-1/2 ml-8 md:ml-0 ${
                  i % 2 === 0 ? "md:pl-12" : "md:pr-12"
                }`}
              >
                <div className="hud-card rounded-lg p-4">
                  <h3 className="font-orbitron text-sm font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

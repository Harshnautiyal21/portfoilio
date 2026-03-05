"use client";
import { motion } from "framer-motion";
import SkillCard from "./ui/SkillCard";
import { portfolioConfig } from "@/content/config";

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 px-6 max-w-6xl mx-auto">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="font-orbitron text-xs tracking-[0.3em] text-cyan-400 uppercase mb-3">
          &gt; LOADING TECH STACK
        </p>
        <h2 className="section-title text-white">
          Skills &amp;{" "}
          <span className="text-cyan-400 glow-text-cyan">Technologies</span>
        </h2>
        <div className="mt-4 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
      </motion.div>

      {/* Skill groups */}
      <div className="flex flex-col gap-12">
        {portfolioConfig.skills.map((group, groupIdx) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: groupIdx * 0.1 }}
            viewport={{ once: true }}
          >
            {/* Category header */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">{group.icon}</span>
              <h3 className="font-orbitron text-base font-bold text-slate-200 tracking-widest uppercase">
                {group.category}
              </h3>
              <div className="flex-1 h-px bg-gradient-to-r from-cyan-400/30 to-transparent" />
            </div>

            {/* Skills grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {group.items.map((skill, skillIdx) => (
                <SkillCard
                  key={skill.name}
                  name={skill.name}
                  icon={skill.icon}
                  index={groupIdx * group.items.length + skillIdx}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

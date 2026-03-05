"use client";

import { siteConfig } from "@/content/config";
import SectionHeading from "@/components/ui/SectionHeading";
import SkillCard from "@/components/ui/SkillCard";

export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-24 px-6 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-blue/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="Skills & Technologies"
          subtitle="A curated set of tools and technologies I use to build intelligent, data-driven systems."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteConfig.skills.map((skill, index) => (
            <SkillCard
              key={skill.category}
              category={skill.category}
              icon={skill.icon}
              color={skill.color as "cyan" | "blue" | "orange"}
              items={skill.items}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

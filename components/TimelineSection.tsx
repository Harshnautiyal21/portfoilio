"use client";

import { siteConfig } from "@/content/config";
import SectionHeading from "@/components/ui/SectionHeading";
import TimelineItem from "@/components/ui/TimelineItem";

export default function TimelineSection() {
  return (
    <section id="journey" className="relative py-24 px-6 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-orange/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        <SectionHeading
          title="My Journey"
          subtitle="From writing first lines of code to building autonomous AI systems."
        />

        {/* Timeline */}
        <div className="relative">
          {siteConfig.timeline.map((item, index) => (
            <TimelineItem
              key={item.year}
              year={item.year}
              title={item.title}
              description={item.description}
              icon={item.icon}
              index={index}
              isLast={index === siteConfig.timeline.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { siteConfig } from "@/content/config";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/ui/ProjectCard";

export default function ProjectsSection() {
  const featured = siteConfig.projects.filter((p) => p.featured);

  return (
    <section id="projects" className="relative py-24 px-6 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-cyan/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="Featured Projects"
          subtitle="Selected work showcasing AI, data engineering, and automation capabilities."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featured.map((project, index) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              tech={project.tech}
              demo={project.demo}
              github={project.github}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

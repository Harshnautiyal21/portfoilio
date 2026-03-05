"use client";
import { motion } from "framer-motion";
import ProjectCard3D from "./ui/ProjectCard3D";
import { portfolioConfig } from "@/content/config";

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="py-24 px-6 relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom, #0B0F19, #0d1220, #0B0F19)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-orbitron text-xs tracking-[0.3em] text-red-400 uppercase mb-3">
            &gt; SYSTEM PROJECTS
          </p>
          <h2 className="section-title text-white">
            Featured{" "}
            <span className="text-red-400 glow-text-red">Projects</span>
          </h2>
          <div className="mt-4 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent" />
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioConfig.projects.map((project, i) => (
            <ProjectCard3D
              key={project.id}
              title={project.title}
              description={project.description}
              tags={project.tags}
              demoUrl={project.demoUrl}
              githubUrl={project.githubUrl}
              highlight={project.highlight}
              index={i}
            />
          ))}
        </div>
      </div>

      {/* Background decoration */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,75,75,0.03) 0%, transparent 70%)" }}
      />
    </section>
  );
}

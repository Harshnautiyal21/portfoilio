"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import TimelineSection from "@/components/TimelineSection";
import ContactSection from "@/components/ContactSection";
import ArcReactorLoader from "@/components/ArcReactorLoader";
import CommandConsole from "@/components/CommandConsole";
import AIChatbot from "@/components/AIChatbot";

export default function PortfolioApp() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!loaded && (
          <motion.div key="arc-loader" exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <ArcReactorLoader onComplete={() => setLoaded(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <Navigation />
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />
        <TimelineSection />
        <ContactSection />
      </motion.main>

      {loaded && (
        <>
          <CommandConsole />
          <AIChatbot />
        </>
      )}
    </>
  );
}

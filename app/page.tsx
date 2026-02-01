"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import HomeSkillsSection from "@/components/HomeSkillsSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import EnvironmentArtSection from "@/components/EnvironmentArtSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import EasterEgg from "@/components/EasterEgg";
import LoadingScreen from "@/components/LoadingScreen";
import ThemeToggle from "@/components/ThemeToggle";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {/* Loading screen */}
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Main content */}
      <motion.div
        className="relative min-h-screen bg-background overflow-x-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {/* Atmospheric overlays */}
        <div className="noise-overlay" />
        <div className="vignette" />
        <div className="scan-lines" />

        {/* Navigation */}
        <Navigation />

        {/* Main content */}
        <main className="pt-16">
          <div id="home">
            <HeroSection isLoading={isLoading} />
          </div>

          <HomeSkillsSection />

          <div id="personal-projects">
            <ProjectsSection />
          </div>

          <EnvironmentArtSection />

          <div id="professional-work">
            <ExperienceSection />
          </div>

          <div id="about">
            <AboutSection />
          </div>

          <div id="contact">
            <ContactSection />
          </div>
        </main>

        {/* Easter egg listener */}
        <EasterEgg />

        {/* Theme toggle */}
        <ThemeToggle />
      </motion.div>
    </>
  );
}

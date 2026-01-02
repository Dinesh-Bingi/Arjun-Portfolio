import { useState } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";

import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import EasterEgg from "@/components/EasterEgg";
import LoadingScreen from "@/components/LoadingScreen";
import ThemeToggle from "@/components/ThemeToggle";

import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <Helmet>
        <title>Kurapati Arjun | Game Designer & Level Designer - Future Games</title>
        <meta 
          name="description" 
          content="Game Designer & Level Designer crafting immersive game worlds at Future Games. Specializing in environmental storytelling, player flow, and atmospheric design." 
        />
        <meta name="keywords" content="Game Designer, Level Designer, Game Developer, Unreal Engine, Unity, Environmental Design, Future Games" />
        <meta property="og:title" content="Kurapati Arjun | Game Designer & Level Designer" />
        <meta property="og:description" content="Designing immersive worlds players remember" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Loading screen */}
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Main content */}
      <motion.div 
        className="relative min-h-screen bg-background overflow-x-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Atmospheric overlays */}
        <div className="noise-overlay" />
        <div className="vignette" />
        <div className="scan-lines" />
        
        {/* Navigation */}
        <Navigation />
        
        {/* Main content */}
        <main>
          <div id="home">
            <HeroSection />
          </div>
          
          <div id="personal-projects">
            <ProjectsSection />
          </div>
          
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
};

export default Index;
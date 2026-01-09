import { useState, useMemo } from "react";
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

import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Get absolute URL for og:image
  const ogImageUrl = useMemo(() => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/images/og-image.png`;
    }
    // Fallback to production URL for SSR/build time
    return 'https://arjunkurapati.com/images/og-image.png';
  }, []);

  return (
    <>
      <Helmet>
        {/* Basic SEO Metadata */}
        <title>Kurapati Arjun – Game & Level Designer</title>
        <meta 
          name="description" 
          content="Portfolio of Kurapati Arjun showcasing level design, gameplay systems, and game projects." 
        />
        <link rel="canonical" href="https://arjunkurapati.com/" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Kurapati Arjun Portfolio" />
        <meta property="og:title" content="Kurapati Arjun – Game & Level Designer" />
        <meta property="og:description" content="Portfolio of Kurapati Arjun showcasing level design, gameplay systems, and game projects." />
        <meta property="og:url" content="https://arjunkurapati.com/" />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />
        
        {/* Twitter / X Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kurapati Arjun – Game & Level Designer" />
        <meta name="twitter:description" content="Portfolio of Kurapati Arjun showcasing level design, gameplay systems, and game projects." />
        <meta name="twitter:image" content={ogImageUrl} />
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
};

export default Index;
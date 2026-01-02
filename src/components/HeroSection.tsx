import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const dimensionsRef = useRef({ width: 1, height: 1 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Cache dimensions on mount and resize
    const updateDimensions = () => {
      dimensionsRef.current = {
        width: window.innerWidth || 1,
        height: window.innerHeight || 1,
      };
    };
    
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Cancel any pending animation frame to avoid layout thrashing
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      rafRef.current = requestAnimationFrame(() => {
        const { width, height } = dimensionsRef.current;
        setMousePosition({
          x: (e.clientX / width - 0.5) * 20,
          y: (e.clientY / height - 0.5) * 20,
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Soft gradient background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/30 to-background" />
        {/* Subtle animated orbs */}
        <motion.div
          className="absolute top-1/4 right-1/3 w-[500px] h-[500px] rounded-full opacity-30 blur-[120px]"
          style={{ background: "hsl(262, 83%, 70%)" }}
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full opacity-25 blur-[100px]"
          style={{ background: "hsl(280, 70%, 75%)" }}
          animate={{ 
            scale: [1.2, 1, 1.2],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
      
      {/* Floating decorative elements - softer */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 border border-primary/15 rounded-2xl opacity-40"
        style={{
          transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-32 right-20 w-24 h-24 border border-primary/10 rounded-full opacity-30"
        style={{
          transform: `translate(${-mousePosition.x * 0.3}px, ${-mousePosition.y * 0.3}px)`,
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Accent lines - refined */}
      <div className="absolute top-1/4 left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-1/3 right-0 w-1/4 h-px bg-gradient-to-l from-transparent via-primary/15 to-transparent" />
      
      {/* Main content */}
      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{
            transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`,
          }}
        >
          {/* Soft glow behind name */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-96 h-32 bg-primary/15 blur-[100px] rounded-full" />
          </div>
          
          <motion.p
            className="font-heading text-sm md:text-base tracking-[0.3em] text-muted-foreground uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Game Designer & Level Designer
          </motion.p>
          
          <motion.h1
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <span className="text-foreground">KURAPATI</span>
            <span className="block text-glow text-gradient">ARJUN</span>
          </motion.h1>
          
          <motion.div
            className="flex items-center justify-center gap-3 text-muted-foreground font-body text-sm md:text-base mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <span>Future Games</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary neon-pulse" />
            <span>Warsaw, Poland</span>
          </motion.div>
          
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="font-body text-xs tracking-widest text-muted-foreground uppercase">
          Scroll
        </span>
        <motion.div
          className="animate-scroll-bounce"
        >
          <ChevronDown className="w-5 h-5 text-primary" />
        </motion.div>
      </motion.div>
      
      {/* HUD corners */}
      <div className="absolute bottom-20 left-10 hud-corner hud-corner-bl opacity-30" />
      <div className="absolute top-20 right-10 hud-corner hud-corner-tr opacity-30" />
    </section>
  );
};

export default HeroSection;
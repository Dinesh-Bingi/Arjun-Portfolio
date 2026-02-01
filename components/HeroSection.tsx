"use client";

import { motion } from "framer-motion";
import { ChevronDown, Play } from "lucide-react";
import { useEffect, useState, useRef } from "react";

interface HeroSectionProps {
  isLoading: boolean;
}

const HeroSection = ({ isLoading }: HeroSectionProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const dimensionsRef = useRef({ width: 1, height: 1 });
  const rafRef = useRef<number | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const userPausedRef = useRef(false);
  const [showPlayOverlay, setShowPlayOverlay] = useState(false);

  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;
    const updateDimensions = () => {
      dimensionsRef.current = {
        width: window.innerWidth || 1,
        height: window.innerHeight || 1,
      };
    };

    updateDimensions();

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateDimensions, 150);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
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

  useEffect(() => {
    if (videoRef.current) {
      if (isLoading) {
        videoRef.current.pause();
      } else {
        const isLandingPage = window.location.pathname === '/';
        if (isLandingPage) {
          userPausedRef.current = false;
          videoRef.current.play().catch(() => {});
        }
      }
    }
  }, [isLoading]);

  const handleVideoClick = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      userPausedRef.current = false;
      setShowPlayOverlay(false);
      video.play().catch(() => {});
    } else {
      userPausedRef.current = true;
      video.pause();
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setShowPlayOverlay(false);
    const handlePause = () => setShowPlayOverlay(video.paused && !video.ended);
    const handleEnded = () => setShowPlayOverlay(false);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);

    setShowPlayOverlay(video.paused && !video.ended);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      setIsMounted(true);
    });
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <section className="relative w-full overflow-hidden">
      {/* Cinematic background video container */}
      <div className="relative w-full aspect-[21/9] overflow-hidden">
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          preload="metadata"
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          className="absolute inset-0 w-full h-full object-cover z-0 cursor-pointer"
          onClick={handleVideoClick}
        >
          <source src="/videos/hero-background.mp4" type="video/mp4" />
        </video>

        {/* Play icon overlay */}
        {showPlayOverlay && (
          <div
            className="absolute inset-0 z-[2] flex items-center justify-center cursor-pointer"
            onClick={handleVideoClick}
            aria-label="Play video"
          >
            <div className="w-16 h-16 rounded-full bg-primary/80 flex items-center justify-center transition-opacity duration-200 hover:bg-primary/90">
              <Play className="w-8 h-8 text-background fill-background ml-1" />
            </div>
          </div>
        )}

        {/* Soft gradient background overlay */}
        <div className="absolute inset-0 z-[1]">
          <div className="absolute inset-0 bg-gradient-to-br from-background/40 via-secondary/20 to-background/40" />
          {/* Subtle animated orbs */}
          <motion.div
            className="absolute top-1/4 right-1/3 w-[500px] h-[500px] rounded-full opacity-30 blur-[120px]"
            style={{ background: "hsl(262, 83%, 70%)" }}
            animate={isMounted ? {
              scale: [1, 1.2, 1],
              x: [0, 30, 0],
            } : {}}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full opacity-25 blur-[100px]"
            style={{ background: "hsl(280, 70%, 75%)" }}
            animate={isMounted ? {
              scale: [1.2, 1, 1.2],
            } : {}}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </div>

        {/* Animated background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent z-[1]" />

        {/* Floating decorative elements */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 border border-primary/15 rounded-2xl opacity-40 z-[2]"
          style={{
            transform: `translate(${isMounted ? mousePosition.x * 0.5 : 0}px, ${isMounted ? mousePosition.y * 0.5 : 0}px)`,
          }}
          animate={isMounted ? { rotate: 360 } : {}}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-32 right-20 w-24 h-24 border border-primary/10 rounded-full opacity-30 z-[2]"
          style={{
            transform: `translate(${isMounted ? -mousePosition.x * 0.3 : 0}px, ${isMounted ? -mousePosition.y * 0.3 : 0}px)`,
          }}
          animate={isMounted ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Accent lines */}
        <div className="absolute top-1/4 left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent z-[2]" />
        <div className="absolute bottom-1/3 right-0 w-1/4 h-px bg-gradient-to-l from-transparent via-primary/15 to-transparent z-[2]" />

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
          initial={{ opacity: 0 }}
          animate={isMounted ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: isMounted ? 1.5 : 0 }}
        >
          <span className="font-body text-xs tracking-widest text-muted-foreground uppercase">
            Scroll
          </span>
          <motion.div className="animate-scroll-bounce">
            <ChevronDown className="w-5 h-5 text-primary" />
          </motion.div>
        </motion.div>

        {/* HUD corners */}
        <div className="absolute bottom-20 left-10 hud-corner hud-corner-bl opacity-30 z-[2]" />
        <div className="absolute top-20 right-10 hud-corner hud-corner-tr opacity-30 z-[2]" />
      </div>
    </section>
  );
};

export default HeroSection;

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const bootMessages = [
    "INITIALIZING SYSTEM...",
    "LOADING ASSETS...",
    "CALIBRATING DISPLAY...",
    "ESTABLISHING CONNECTION...",
    "RENDERING ENVIRONMENT...",
    "SYSTEM READY",
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    const phaseInterval = setInterval(() => {
      setPhase((prev) => {
        if (prev >= bootMessages.length - 1) {
          clearInterval(phaseInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 350);

    return () => clearInterval(phaseInterval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const exitTimer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(onComplete, 800);
      }, 500);
      return () => clearTimeout(exitTimer);
    }
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Background grid */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `
                  linear-gradient(hsla(262, 83%, 58%, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, hsla(262, 83%, 58%, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: "50px 50px",
              }}
            />
          </div>

          {/* Animated scan line */}
          <motion.div
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />

          {/* Main content */}
          <div className="relative z-10 w-full max-w-md px-8">
            {/* Logo */}
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="font-display text-3xl font-bold tracking-widest">
                <span className="text-foreground">KURAPATI ARJUN</span>
              </h1>
              <p className="font-heading text-sm text-muted-foreground mt-2 tracking-[0.3em]">
                GAME DESIGNER & LEVEL DESIGNER
              </p>
            </motion.div>

            {/* Boot messages */}
            <div className="mb-8 h-6 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={phase}
                  className="font-body text-xs text-primary text-center tracking-wider"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {bootMessages[phase]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Progress bar container */}
            <div className="relative">
              {/* HUD corners */}
              <div className="absolute -top-2 -left-2 w-3 h-3 border-t-2 border-l-2 border-primary" />
              <div className="absolute -top-2 -right-2 w-3 h-3 border-t-2 border-r-2 border-primary" />
              <div className="absolute -bottom-2 -left-2 w-3 h-3 border-b-2 border-l-2 border-primary" />
              <div className="absolute -bottom-2 -right-2 w-3 h-3 border-b-2 border-r-2 border-primary" />

              {/* Progress background */}
              <div className="h-1 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary via-purple-400 to-pink-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>

              {/* Progress text */}
              <div className="flex justify-between mt-4">
                <span className="font-body text-xs text-muted-foreground">
                  LOADING
                </span>
                <span className="font-display text-xs text-primary">
                  {progress}%
                </span>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="flex justify-center gap-2 mt-8">
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full"
                    initial={{ opacity: 0.3, scale: 0.8 }}
                    animate={{
                      opacity: progress > i * 20 ? 1 : 0.3,
                      scale: progress > i * 20 ? 1 : 0.8,
                      backgroundColor:
                        progress > i * 20
                          ? "hsl(262, 83%, 58%)"
                          : "hsl(248, 30%, 85%)",
                    }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                  />
                ))}
            </div>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-8 left-8 opacity-30">
            <div className="w-20 h-20 border-t-2 border-l-2 border-primary" />
          </div>
          <div className="absolute top-8 right-8 opacity-30">
            <div className="w-20 h-20 border-t-2 border-r-2 border-primary" />
          </div>
          <div className="absolute bottom-8 left-8 opacity-30">
            <div className="w-20 h-20 border-b-2 border-l-2 border-primary" />
          </div>
          <div className="absolute bottom-8 right-8 opacity-30">
            <div className="w-20 h-20 border-b-2 border-r-2 border-primary" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
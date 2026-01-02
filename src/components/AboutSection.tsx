import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import profileImage from "@/assets/profile.jpg";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const philosophyPoints = [
    "Crafting environments that tell stories without words",
    "Building spaces that guide through intuition, not instruction",
    "Creating moments of wonder through deliberate pacing",
    "Designing worlds that players want to explore, not escape",
  ];

  return (
    <section className="relative py-32 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-primary" />
            <span className="font-heading text-sm tracking-[0.2em] text-primary uppercase">
              Philosophy
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gradient">
            Design Approach
          </h2>
        </motion.div>

        {/* Content with image */}
        <div className="grid md:grid-cols-[300px_1fr] gap-12 items-start">
          {/* Profile Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden border border-border/50">
              <img
                src={profileImage}
                alt="Felipe Fleming"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-3 -right-3 w-24 h-24 border border-primary/30 rounded-lg -z-10" />
            <div className="absolute -top-3 -left-3 w-16 h-16 border border-primary/20 rounded-lg -z-10" />
          </motion.div>

          {/* Philosophy content */}
          <div className="space-y-8">
            <motion.p
              className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Every level is a narrative. Every corner holds potential. I believe in creating 
              environments that breathe—spaces that invite exploration and reward curiosity 
              with meaningful discoveries.
            </motion.p>

            <div className="grid gap-4 mt-8">
              {philosophyPoints.map((point, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-4 group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                >
                  <div className="w-2 h-2 rounded-full bg-primary/50 group-hover:bg-primary group-hover:shadow-[0_0_10px_hsla(262,83%,58%,0.5)] transition-all duration-300" />
                  <p className="font-body text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {point}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <motion.div
          className="absolute right-10 top-1/2 -translate-y-1/2 w-px h-32 bg-gradient-to-b from-transparent via-primary/30 to-transparent hidden lg:block"
          initial={{ opacity: 0, scaleY: 0 }}
          animate={isInView ? { opacity: 1, scaleY: 1 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
        />
      </div>
    </section>
  );
};

export default AboutSection;
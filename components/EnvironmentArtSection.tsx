"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { environmentArtItems } from "@/data/environmentArt";

const EnvironmentArtSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-20 px-6" ref={ref}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-40 h-40 bg-primary/3 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-20 w-60 h-60 bg-primary/2 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-primary/50" />
            <span className="font-heading text-xs tracking-[0.2em] text-primary/70 uppercase">
              Portfolio
            </span>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-primary/50" />
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
            Supporting Environment & World Art
          </h2>
          <p className="font-body text-sm text-muted-foreground max-w-lg mx-auto">
            Selected environment and asset work supporting level design and world building.
          </p>
        </motion.div>

        {/* Image cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {environmentArtItems.map((item, index) => {
            const [isHovered, setIsHovered] = useState(false);

            return (
              <motion.a
                key={item.id}
                href={item.artStationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group cursor-pointer h-full block focus:outline-none"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
                whileHover={{
                  scale: 1.04,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                whileFocus={{
                  scale: 1.04,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onFocus={() => setIsHovered(true)}
                onBlur={() => setIsHovered(false)}
                aria-label={`View ${item.alt} on ArtStation`}
              >
                {/* Image container with border */}
                <div className="relative rounded-lg overflow-hidden border border-primary/20 group-hover:border-primary/40 group-focus:border-primary/40 transition-all duration-300 h-full">
                  {/* Art image */}
                  <motion.div
                    className="aspect-video bg-secondary/80 relative overflow-hidden"
                    style={{
                      backgroundImage: item.imageSrc ? `url(${item.imageSrc})` : 'none',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}
                    role="img"
                    aria-label={item.alt}
                    animate={{ scale: isHovered ? 1.04 : 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    {/* Placeholder for missing images */}
                    {!item.imageSrc && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                        <div className="w-16 h-16 rounded-xl bg-primary/5 border border-primary/20 flex items-center justify-center">
                          <span className="text-primary/40 text-sm">Image</span>
                        </div>
                      </div>
                    )}
                  </motion.div>

                  {/* Dark overlay - fades in on hover/focus */}
                  <motion.div
                    className="absolute inset-0 bg-background z-10 pointer-events-none flex items-center justify-center"
                    animate={{ opacity: isHovered ? 0.4 : 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />

                  {/* Centered text - fades in with slight upward motion */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                    animate={{
                      opacity: isHovered ? 1 : 0,
                      y: isHovered ? 0 : 8
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <span className="font-body text-sm text-foreground tracking-wide">
                      {"View on ArtStation ->"}
                    </span>
                  </motion.div>
                </div>

                {/* Focus indicator for accessibility */}
                <div className="absolute inset-0 rounded-lg ring-2 ring-primary/0 group-focus-visible:ring-primary/40 transition-all duration-200 pointer-events-none" />
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EnvironmentArtSection;

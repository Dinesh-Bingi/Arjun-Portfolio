"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-20 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gradient">
            Greetings!
          </h2>
        </motion.div>

        {/* Content with image */}
        <div className="grid md:grid-cols-[300px_1fr] gap-12 items-start md:items-center">
          {/* Profile Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden border border-border/50">
              <img
                src="/images/profile.jpg"
                alt="Kurapati Arjun"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-3 -right-3 w-24 h-24 border border-primary/30 rounded-lg -z-10" />
            <div className="absolute -top-3 -left-3 w-16 h-16 border border-primary/20 rounded-lg -z-10" />
          </motion.div>

          {/* Philosophy content */}
          <div className="space-y-8">
            <motion.div
              className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <p>
                My name is Arjun, a Game Design student currently based in Warsaw, Poland, with a strong interest in Technical Level Design.
              </p>
              <p>
                I began my journey in game-related fields in 2020, starting with a background in visual arts, animation, and 3D art. Over time, this foundation evolved into a strong focus on level design, where I apply my understanding of space, scale, and visual composition to create clear and engaging gameplay environments.
              </p>
              <p>
                I am currently studying Game Design at Futuregames, specializing in Systems Design, while actively working on solo and team-based projects that focus on level blockouts, player flow, interaction design, and technical implementation using Unreal Engine.
              </p>
            </motion.div>
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

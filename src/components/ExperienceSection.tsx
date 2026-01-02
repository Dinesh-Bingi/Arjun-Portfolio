import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const experiences = [
  {
    period: "2023 – Present",
    title: "Senior Level Designer",
    company: "Future Games",
    location: "Warsaw, Poland",
    description: "Leading level design for an unannounced AAA title. Responsible for player flow, environmental storytelling, and cross-team collaboration.",
  },
  {
    period: "2021 – 2023",
    title: "Level Designer",
    company: "Neon Studios",
    location: "Berlin, Germany",
    description: "Designed and iterated on multiplayer maps for a competitive shooter. Focused on balance, sight lines, and player engagement metrics.",
  },
  {
    period: "2019 – 2021",
    title: "Junior Level Designer",
    company: "Indie Collective",
    location: "Remote",
    description: "Contributed to multiple indie projects, specializing in puzzle design and atmospheric horror environments.",
  },
  {
    period: "2018 – 2019",
    title: "QA & Level Design Intern",
    company: "GameStart Academy",
    location: "Mumbai, India",
    description: "Learned industry pipelines while contributing to educational game projects and documentation.",
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-32 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto relative">
        {/* Section header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-primary" />
            <span className="font-heading text-sm tracking-[0.2em] text-primary uppercase">
              Career
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gradient">
            Experience Timeline
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <motion.div
            className="absolute left-[7px] top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/30 to-transparent"
            initial={{ scaleY: 0, originY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.3 }}
          />

          {/* Experience items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className="relative pl-10"
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.15 }}
              >
                {/* Timeline node */}
                <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-background border-2 border-primary shadow-[0_0_10px_hsla(262,83%,58%,0.3)]">
                  <div className="absolute inset-1 rounded-full bg-primary neon-pulse" />
                </div>

                {/* Content */}
                <div className="group">
                  <span className="font-heading text-sm text-primary tracking-wider">
                    {exp.period}
                  </span>
                  <h3 className="font-display text-xl font-semibold text-gradient mt-1 group-hover:text-glow transition-all duration-300">
                    {exp.title}
                  </h3>
                  <p className="font-heading text-sm text-muted-foreground mt-1">
                    {exp.company} • {exp.location}
                  </p>
                  <p className="font-body text-muted-foreground mt-3 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
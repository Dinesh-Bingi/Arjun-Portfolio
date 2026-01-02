import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Users, Gamepad2 } from "lucide-react";
import ProjectModal from "./ProjectModal";
import { getProjectsByCategory, Project, getIconComponent } from "@/data/projects";

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const groupProjects = getProjectsByCategory("group");

  return (
    <section className="relative py-32 px-6 overflow-hidden" ref={ref}>
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

      <div className="max-w-6xl mx-auto relative">
        {/* Section header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-primary" />
            <span className="font-heading text-sm tracking-[0.2em] text-primary uppercase">
              Collaboration
            </span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-primary" />
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-gradient">
            Group Projects
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Collaborative game development projects where I contributed as part of talented teams
          </p>
        </motion.div>

        {/* Projects grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
              }
            }
          }}
        >
          {groupProjects.map((project) => {
            const IconComponent = getIconComponent(project.icon);
            return (
              <motion.div
                key={project.id}
                className="group relative cursor-pointer"
                variants={{
                  hidden: { 
                    opacity: 0, 
                    y: 40,
                    scale: 0.9,
                  },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 100,
                      damping: 12,
                    }
                  }
                }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => setSelectedProject(project)}
              >
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Card */}
                <div className="relative p-6 rounded-xl bg-card/50 backdrop-blur-xl border border-border/50 group-hover:border-primary/30 transition-all duration-300 h-full">
                  {/* Thumbnail Image */}
                  {project.thumbnailImage && (
                    <div className="w-full h-32 rounded-lg overflow-hidden mb-4">
                      <img 
                        src={project.thumbnailImage} 
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  
                  {/* Icon (fallback if no thumbnail) */}
                  {!project.thumbnailImage && IconComponent && (
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                  )}
                  
                  {/* Content */}
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  {/* Genre badge */}
                  {project.genre && (
                    <div className="mb-4">
                      <span className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary/80 border border-primary/20">
                        {project.genre}
                      </span>
                    </div>
                  )}
                  
                  {/* Hover indicator */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs text-primary">View Details →</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default SkillsSection;

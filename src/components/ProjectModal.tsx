import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import ProjectNavigation from "./ProjectNavigation";
import { SectionRenderer } from "./project-sections";
import { Project } from "@/data/projects";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-background/90 backdrop-blur-xl"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal content - Fullscreen */}
          <motion.div
            className="relative w-screen h-screen overflow-y-auto bg-gradient-to-br from-card to-background-secondary"
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Project Navigation */}
            <ProjectNavigation onClose={onClose} />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-16 right-4 z-10 p-2 rounded-lg bg-background/50 border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all duration-300"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header area - with top padding for fixed nav */}
            <div className="relative h-32 md:h-48 bg-primary/10 flex items-center justify-center overflow-hidden p-0 mt-12">
              <img
                src={project.coverImage || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-full object-cover"
              />

              {/* HUD elements */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="font-heading text-xs tracking-wider text-primary uppercase">
                  Project Data
                </span>
              </div>
            </div>

            {/* Content - Centered with max-width for readability */}
            <div className="max-w-5xl mx-auto px-6 md:px-10 lg:px-16 xl:px-20 pt-4 pb-10">
              {/* Render all sections dynamically */}
              {project.sections.map((section, index) => (
                <SectionRenderer key={index} section={section} />
              ))}

              <div className="pt-6"></div>
            </div>

            {/* HUD corners */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-primary/30" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-primary/30" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-primary/30" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-primary/30" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;

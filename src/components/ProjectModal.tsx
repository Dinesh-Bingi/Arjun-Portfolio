import { motion, AnimatePresence } from "framer-motion";
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
      // Store original overflow value
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      
      return () => {
        // Restore original overflow value
        document.body.style.overflow = originalOverflow || "";
      };
    }
  }, [project]);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        // Check if lightbox is open - if so, let it handle ESC first
        const lightbox = document.querySelector('[data-lightbox-open="true"]');
        if (!lightbox) {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const isEchoesOfStella = project?.id === "metro-descent";

  return (
    <AnimatePresence mode="wait">
      {project && (
        <motion.div
          key={project.id}
          className="fixed inset-0 z-[100] w-screen h-screen overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Fullscreen content */}
          <motion.div
            className="relative w-full h-full overflow-y-auto bg-gradient-to-br from-card to-background-secondary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Project Navigation */}
            <ProjectNavigation onClose={onClose} />

            {/* Hero Cover Section - Only for Echoes of Stella */}
            {isEchoesOfStella && project.coverImage && (
              <motion.div
                className="relative w-full h-32 md:h-48 mt-12 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 w-full h-full"
                  style={{
                    backgroundImage: `url(${project.coverImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }}
                />
                
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
                
                {/* Project Details Label - Top Left */}
                <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="font-heading text-xs tracking-wider text-primary uppercase">
                    Project Details
                  </span>
                </div>
              </motion.div>
            )}

            {/* Header area - with top padding for fixed nav (hidden for Echoes of Stella) */}
            {!isEchoesOfStella && (
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
            )}

            {/* Content - Centered with max-width for readability */}
            <div className="max-w-5xl mx-auto px-6 md:px-10 lg:px-16 xl:px-20 pt-4 pb-10 relative z-0">
              {/* Render all sections dynamically - use project.id in key to force remount on project change */}
              {project.sections.map((section, index) => (
                <SectionRenderer key={`${project.id}-${index}-${section.type}`} section={section} projectId={project.id} />
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

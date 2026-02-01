"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, Suspense, lazy } from "react";
import { Gamepad2, Map, Mountain, Compass, Building, Layers, ExternalLink } from "lucide-react";
import { projects, getProjectsByCategory, Project } from "@/data/projects";

const iconComponents: Record<string, React.ReactNode> = {
  Gamepad2: <Gamepad2 className="w-8 h-8 text-primary" />,
  Map: <Map className="w-8 h-8 text-primary" />,
  Mountain: <Mountain className="w-8 h-8 text-primary" />,
  Compass: <Compass className="w-8 h-8 text-primary" />,
  Building: <Building className="w-8 h-8 text-primary" />,
  Layers: <Layers className="w-8 h-8 text-primary" />,
};

// Project Card Component
const ProjectCard = ({
  title,
  description,
  icon,
  index,
  image,
  genre,
  onClick,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
  image?: string;
  genre?: string;
  onClick?: () => void;
}) => {
  return (
    <motion.div
      className="relative group cursor-pointer h-full"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{
        y: -5,
        transition: { duration: 0.3 }
      }}
      onClick={onClick}
    >
      {/* Image container with border and glow */}
      <div className="relative rounded-lg overflow-hidden border border-primary/30 group-hover:border-primary/60 transition-all duration-300 group-hover:shadow-[0_0_30px_hsla(262,83%,58%,0.3)] h-full">
        {/* Animated glow effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
          style={{
            background: "radial-gradient(circle at center, hsla(262, 83%, 58%, 0.15) 0%, transparent 70%)",
          }}
        />

        {/* Project image or placeholder */}
        {image ? (
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="aspect-video w-full object-cover object-center bg-secondary/80"
          />
        ) : (
          <div className="aspect-video bg-secondary/80 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                {icon}
              </div>
            </div>
          </div>
        )}

        {/* Hover indicator button */}
        <motion.div
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
          whileHover={{ scale: 1.1 }}
        >
          <div className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-primary/40 flex items-center justify-center">
            <ExternalLink className="w-5 h-5 text-primary" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

interface ProjectSectionProps {
  category: Project["category"];
  title: string;
  id: string;
}

const ProjectSection = ({ category, title, id }: ProjectSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const categoryProjects = getProjectsByCategory(category);

  const validProjects = categoryProjects.filter(project => {
    if (!project || !project.title || project.title.trim() === "" || !project.id) {
      return false;
    }
    return true;
  });

  const isSingleProject = validProjects.length === 1;

  const paddingTop = "pt-16";
  const paddingBottom = "pb-20";

  if (validProjects.length === 0) {
    return null;
  }

  return (
    <section className={`relative ${paddingTop} ${paddingBottom} px-6`} id={id} ref={ref}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-40 h-40 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-20 w-60 h-60 bg-primary/3 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-primary" />
            <span className="font-heading text-sm tracking-[0.2em] text-primary uppercase">
              Portfolio
            </span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-primary" />
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4 relative">
            <span className="relative z-10">{title}</span>
            <span
              className="absolute inset-0 blur-2xl opacity-40 bg-gradient-to-r from-primary/50 via-purple-400/40 to-pink-400/30 -z-10"
              aria-hidden="true"
            />
          </h2>
          <p className="font-body text-muted-foreground max-w-lg mx-auto">
            Select a project to explore the design process and final implementation
          </p>
        </motion.div>

        <div className={isSingleProject
          ? "grid grid-cols-1 justify-items-center gap-6 md:gap-8 items-stretch"
          : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch"
        }>
          {validProjects.map((project, index) => (
            <div key={project.id} className={isSingleProject ? "w-full max-w-[400px]" : "w-full"}>
              <ProjectCard
                title={project.title}
                description={project.description}
                icon={iconComponents[project.icon]}
                index={index}
                image={project.thumbnailImage}
                genre={project.genre}
                onClick={() => window.dispatchEvent(new CustomEvent('openProject', { detail: { projectId: project.id } }))}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const syncModalWithUrl = () => {
    const pathname = window.location.pathname;
    if (pathname.startsWith('/projects/')) {
      const projectId = pathname.replace('/projects/', '');
      const project = projects.find(p => p.id === projectId);
      if (project) {
        setSelectedProject(project);
      } else {
        window.history.replaceState(null, '', '/');
        setSelectedProject(null);
      }
    } else {
      setSelectedProject(null);
    }
  };

  useEffect(() => {
    syncModalWithUrl();

    const handleOpenProject = (event: CustomEvent<{ projectId: string }>) => {
      const project = projects.find(p => p.id === event.detail.projectId);
      if (project) {
        setSelectedProject(project);
      }
    };

    const handlePopState = () => {
      syncModalWithUrl();
    };

    window.addEventListener('openProject', handleOpenProject as EventListener);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('openProject', handleOpenProject as EventListener);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <>
      <ProjectSection category="personal" title="Personal Projects" id="personal-projects" />
      <ProjectSection category="group" title="Group Projects" id="group-projects" />

      {/* Project Modal - simplified */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl overflow-y-auto">
          <div className="min-h-screen p-6 md:p-10">
            <div className="max-w-4xl mx-auto">
              <button
                onClick={() => {
                  setSelectedProject(null);
                  if (window.location.pathname.startsWith('/projects/')) {
                    window.history.replaceState(null, '', '/');
                  }
                  window.dispatchEvent(new CustomEvent('closeProject'));
                }}
                className="mb-8 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <span>← Back to Projects</span>
              </button>

              {selectedProject.coverImage && (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
                  <img
                    src={selectedProject.coverImage}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <h1 className="font-display text-4xl md:text-5xl font-bold text-gradient mb-4">
                {selectedProject.title}
              </h1>
              <p className="font-body text-lg text-muted-foreground mb-8">
                {selectedProject.description}
              </p>

              {selectedProject.genre && (
                <div className="badge-primary inline-block mb-8">
                  {selectedProject.genre}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectsSection;

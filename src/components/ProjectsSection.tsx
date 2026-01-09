import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, Suspense, lazy } from "react";
import { Gamepad2, Map, Mountain, Compass, Building, Layers } from "lucide-react";
import ProjectCard from "./ProjectCard";
import { projects, getProjectsByCategory, Project } from "@/data/projects";

// Lazy load ProjectModal - only load when needed
const ProjectModal = lazy(() => import("./ProjectModal"));

const iconComponents: Record<string, React.ReactNode> = {
  Gamepad2: <Gamepad2 className="w-8 h-8 text-primary" />,
  Map: <Map className="w-8 h-8 text-primary" />,
  Mountain: <Mountain className="w-8 h-8 text-primary" />,
  Compass: <Compass className="w-8 h-8 text-primary" />,
  Building: <Building className="w-8 h-8 text-primary" />,
  Layers: <Layers className="w-8 h-8 text-primary" />,
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
  
  // Filter out any invalid/empty projects
  // For personal projects: must have valid title, id, AND valid thumbnail image (not placeholder)
  // For group projects: must have valid title and id
  const validProjects = categoryProjects.filter(project => {
    // Basic validation: project exists, has title and id
    if (!project || !project.title || project.title.trim() === "" || !project.id) {
      return false;
    }
    
    // For personal projects: also require valid thumbnail image (not placeholder)
    if (category === "personal") {
      const hasValidImage = project.thumbnailImage && 
                            project.thumbnailImage.trim() !== "" && 
                            project.thumbnailImage !== "/placeholder.svg" &&
                            !project.thumbnailImage.includes("placeholder");
      return hasValidImage;
    }
    
    // For group projects: basic validation is enough
    return true;
  });
  
  // Check if only one project exists (for centering)
  const isSingleProject = validProjects.length === 1;
  
  // Consistent spacing for both sections
  const paddingTop = category === "personal" ? "pt-16" : "pt-16";
  const paddingBottom = "pb-20";

  // Don't render section if no valid projects
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
          : category === "group" 
            ? "group-projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch"
          : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch"
        }>
          <style>{`
            .group-projects-grid {
              justify-items: start;
            }
            @media (min-width: 1024px) {
              .group-projects-grid {
                justify-items: start;
              }
              /* Center last row when there are exactly 2 items (items 4 and 5) */
              .group-projects-grid > div:nth-child(4):nth-last-child(2) {
                grid-column: 2;
                justify-self: center;
              }
              .group-projects-grid > div:nth-child(5):last-child {
                grid-column: 3;
                justify-self: center;
              }
              /* For 4 items total: center the last item in middle column */
              .group-projects-grid > div:nth-child(4):last-child:not(:nth-last-child(2)) {
                grid-column: 2;
                justify-self: center;
              }
            }
          `}</style>
          {validProjects.map((project, index) => (
            <div key={project.id} className={isSingleProject ? "w-full max-w-[400px]" : "w-full"}>
              <ProjectCard
                title={project.title}
                description={project.description}
                role=""
                tools={[]}
                icon={iconComponents[project.icon]}
                index={index}
                image={project.thumbnailImage}
                genre={project.genre}
                hasImage={(category === "personal" && !!project.thumbnailImage) || (project.id === "metro-descent" && !!project.thumbnailImage) || (project.id === "just-my-duck" && !!project.thumbnailImage)}
                imageOnly={true}
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

  useEffect(() => {
    const handleOpenProject = (event: CustomEvent<{ projectId: string }>) => {
      const project = projects.find(p => p.id === event.detail.projectId);
      if (project) {
        setSelectedProject(project);
      }
    };

    window.addEventListener('openProject', handleOpenProject as EventListener);
    return () => window.removeEventListener('openProject', handleOpenProject as EventListener);
  }, []);

  return (
    <>
      <ProjectSection category="personal" title="Personal Projects" id="personal-projects" />
      <ProjectSection category="group" title="Group Projects" id="group-projects" />

      {selectedProject && (
        <Suspense fallback={null}>
          <ProjectModal
            project={selectedProject}
            onClose={() => {
              setSelectedProject(null);
              window.dispatchEvent(new CustomEvent('closeProject'));
            }}
          />
        </Suspense>
      )}
    </>
  );
};

export default ProjectsSection;

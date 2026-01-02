import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Gamepad2, Map, Mountain, Compass, Building, Layers } from "lucide-react";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { projects, getProjectsByCategory, Project } from "@/data/projects";

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

  return (
    <section className="relative py-32 px-6" id={id} ref={ref}>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categoryProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              role=""
              tools={[]}
              icon={iconComponents[project.icon]}
              index={index}
              image={project.thumbnailImage}
              genre={project.genre}
              hasImage={category === "personal" && !!project.thumbnailImage}
              onClick={() => window.dispatchEvent(new CustomEvent('openProject', { detail: { projectId: project.id } }))}
            />
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

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
};

export default ProjectsSection;

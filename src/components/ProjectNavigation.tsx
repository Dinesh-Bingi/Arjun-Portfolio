import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { getProjectsByCategory } from "@/data/projects";
interface ProjectNavLink {
  label: string;
  href: string;
  isExternal?: boolean;
  hasDropdown?: boolean;
  category?: "personal" | "group";
}
const navLinks: ProjectNavLink[] = [{
  label: "Home",
  href: "/"
}, {
  label: "Personal Projects",
  href: "#personal-projects",
  hasDropdown: true,
  category: "personal"
}, {
  label: "Group Projects",
  href: "#group-projects",
  hasDropdown: true,
  category: "group"
}, {
  label: "Professional Work",
  href: "#professional-work"
}, {
  label: "About",
  href: "#about"
}, {
  label: "Resume",
  href: "/FelipeFleming_CV.pdf",
  isExternal: true
}, {
  label: "Contact",
  href: "#contact"
}];
interface ProjectNavigationProps {
  onClose: () => void;
}
const ProjectNavigation = ({
  onClose
}: ProjectNavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const handleNavClick = (link: ProjectNavLink) => {
    setIsOpen(false);
    setActiveDropdown(null);
    if (link.isExternal) {
      window.open(link.href, "_blank");
    } else if (link.href === "/") {
      onClose();
    } else if (link.href.startsWith("#")) {
      onClose();
      setTimeout(() => {
        const element = document.querySelector(link.href);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth"
          });
        }
      }, 100);
    }
  };
  const handleProjectClick = (projectId: string) => {
    setActiveDropdown(null);
    setIsOpen(false);
    onClose();
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('openProject', {
        detail: {
          projectId
        }
      }));
    }, 100);
  };
  const getDropdownProjects = (category: "personal" | "group") => {
    return getProjectsByCategory(category);
  };
  return <>
      {/* Fixed Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-[60] bg-background/95 backdrop-blur-sm border-b border-border/30">
        <div className="max-w-7xl mx-auto px-6 py-3">
          {/* Desktop Navigation */}
          <div className="hidden items-center justify-center gap-8 md:flex md:items-start md:justify-end">
            {navLinks.map(link => <div key={link.label} className="relative" onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.label)} onMouseLeave={() => setActiveDropdown(null)}>
                <button onClick={() => !link.hasDropdown && handleNavClick(link)} className="relative font-heading text-xs tracking-wider text-muted-foreground hover:text-foreground transition-colors duration-300 group flex items-center gap-1">
                  {link.label}
                  {link.hasDropdown && <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === link.label ? 'rotate-180' : ''}`} />}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground group-hover:w-full transition-all duration-300" />
                </button>

                {/* Dropdown menu */}
                {link.hasDropdown && link.category && <AnimatePresence>
                    {activeDropdown === link.label && <motion.div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 min-w-[200px] bg-background border border-border/50 rounded-lg overflow-hidden shadow-xl z-[70]" initial={{
                opacity: 0,
                y: -10
              }} animate={{
                opacity: 1,
                y: 0
              }} exit={{
                opacity: 0,
                y: -10
              }} transition={{
                duration: 0.2
              }}>
                        {getDropdownProjects(link.category).length > 0 ? getDropdownProjects(link.category).map(project => <button key={project.id} onClick={() => handleProjectClick(project.id)} className="w-full text-left px-4 py-3 font-body text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors duration-200 border-b border-border/30 last:border-b-0">
                              {project.title}
                            </button>) : null}
                      </motion.div>}
                  </AnimatePresence>}
              </div>)}
          </div>

          {/* Mobile - Hamburger Button */}
          <div className="md:hidden flex items-center justify-end">
            <button className="p-2 text-foreground" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && <motion.div className="fixed inset-0 z-[55] md:hidden" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }}>
            <div className="absolute inset-0 bg-background/98 backdrop-blur-xl" />
            <div className="relative flex flex-col items-center justify-center h-full gap-6 overflow-y-auto py-20">
              {navLinks.map((link, index) => <motion.div key={link.label} className="text-center" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.1 + index * 0.05
          }}>
                  <button onClick={() => handleNavClick(link)} className="font-display text-2xl text-foreground hover:text-primary transition-colors duration-300">
                    {link.label}
                  </button>
                  
                  {/* Mobile dropdown items */}
                  {link.hasDropdown && link.category && getDropdownProjects(link.category).length > 0 && <div className="mt-2 space-y-2">
                      {getDropdownProjects(link.category).map(project => <button key={project.id} onClick={() => handleProjectClick(project.id)} className="block w-full text-muted-foreground hover:text-primary text-base transition-colors">
                          {project.title}
                        </button>)}
                    </div>}
                </motion.div>)}
            </div>
          </motion.div>}
      </AnimatePresence>
    </>;
};
export default ProjectNavigation;
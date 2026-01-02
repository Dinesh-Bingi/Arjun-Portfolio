import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { projects, getProjectsByCategory, Project } from "@/data/projects";

interface NavLink {
  label: string;
  href: string;
  isExternal?: boolean;
  hasDropdown?: boolean;
  category?: Project["category"];
}

const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "Personal Projects", href: "#personal-projects", hasDropdown: true, category: "personal" },
  { label: "Group Projects", href: "#group-projects", hasDropdown: true, category: "group" },
  { label: "Professional Work", href: "#professional-work" },
  { label: "About", href: "#about" },
  { label: "Resume", href: "/FelipeFleming_CV.pdf", isExternal: true },
  { label: "Contact", href: "#contact" },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { scrollY } = useScroll();
  
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.95]);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (link: NavLink) => {
    setIsOpen(false);
    setActiveDropdown(null);
    if (link.isExternal) {
      window.open(link.href, "_blank");
    } else if (link.href === "#home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.querySelector(link.href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleProjectClick = (projectId: string) => {
    setActiveDropdown(null);
    // Dispatch custom event to open project modal
    window.dispatchEvent(new CustomEvent('openProject', { detail: { projectId } }));
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-40 px-6 py-4"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <motion.div
          className="absolute inset-0 backdrop-blur-xl border-b border-primary/20"
          style={{ opacity: bgOpacity }}
        />
        
        <div className="max-w-7xl mx-auto flex items-center justify-between relative">
          {/* Logo */}
          <motion.a
            href="#"
            className="group relative"
            whileHover={{ scale: 1.02 }}
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <span className="font-display text-lg font-bold text-foreground tracking-wider">
              K<span className="text-gradient">.</span>ARJUN
            </span>
            <div className="absolute -inset-2 bg-primary/0 group-hover:bg-primary/5 rounded-lg transition-colors duration-300" />
          </motion.a>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link, index) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <motion.button
                  onClick={() => handleNavClick(link)}
                  className="relative font-heading text-xs tracking-wider text-muted-foreground hover:text-foreground transition-colors duration-300 group flex items-center gap-1"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.05 }}
                >
                  {link.label}
                  {link.hasDropdown && (
                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                  )}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
                </motion.button>

                {/* Dropdown menu */}
                {link.hasDropdown && link.category && (
                  <motion.div
                    className="absolute top-full left-0 mt-2 min-w-[200px] bg-background/95 backdrop-blur-xl border border-primary/20 rounded-lg overflow-hidden shadow-xl"
                    initial={{ opacity: 0, y: -10, pointerEvents: "none" }}
                    animate={activeDropdown === link.label 
                      ? { opacity: 1, y: 0, pointerEvents: "auto" }
                      : { opacity: 0, y: -10, pointerEvents: "none" }
                    }
                    transition={{ duration: 0.2 }}
                  >
                    {getProjectsByCategory(link.category).map((project) => (
                      <button
                        key={project.id}
                        onClick={() => handleProjectClick(project.id)}
                        className="w-full text-left px-4 py-3 font-body text-sm text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors duration-200 border-b border-primary/10 last:border-b-0"
                      >
                        {project.title}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <motion.div
        className="fixed inset-0 z-30 md:hidden"
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, pointerEvents: "auto" as const },
          closed: { opacity: 0, pointerEvents: "none" as const },
        }}
      >
        <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" />
        <div className="relative flex flex-col items-center justify-center h-full gap-6 overflow-y-auto py-20">
          {navLinks.map((link, index) => (
            <div key={link.label} className="text-center">
              <motion.button
                onClick={() => !link.hasDropdown && handleNavClick(link)}
                className="font-display text-2xl text-foreground hover:text-primary transition-colors duration-300"
                variants={{
                  open: { 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: 0.1 + index * 0.05 }
                  },
                  closed: { 
                    opacity: 0, 
                    y: 20 
                  },
                }}
              >
                {link.label}
              </motion.button>
              
              {/* Mobile dropdown items */}
              {link.hasDropdown && link.category && (
                <motion.div
                  className="mt-2 space-y-2"
                  variants={{
                    open: { opacity: 1 },
                    closed: { opacity: 0 },
                  }}
                >
                  {getProjectsByCategory(link.category).map((project) => (
                    <button
                      key={project.id}
                      onClick={() => {
                        handleProjectClick(project.id);
                        setIsOpen(false);
                      }}
                      className="block w-full text-muted-foreground hover:text-primary text-base transition-colors"
                    >
                      {project.title}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default Navigation;

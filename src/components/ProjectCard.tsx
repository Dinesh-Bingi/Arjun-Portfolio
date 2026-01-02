import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  role: string;
  tools: string[];
  icon: React.ReactNode;
  index: number;
  onClick?: () => void;
  image?: string;
  genre?: string;
  hasImage?: boolean;
}

const ProjectCard = ({
  title,
  description,
  role,
  tools,
  icon,
  index,
  onClick,
  image,
  genre,
  hasImage = false,
}: ProjectCardProps) => {
  // Image-based card layout (for personal projects with images)
  if (hasImage && image) {
    return (
      <motion.div
        className="relative group cursor-pointer"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: index * 0.15, ease: [0.4, 0, 0.2, 1] }}
        whileHover={{ 
          scale: 1.02, 
          y: -5,
          transition: { duration: 0.3 } 
        }}
        onClick={onClick}
      >
        {/* Image container with border and glow */}
        <div className="relative rounded-lg overflow-hidden border border-primary/30 group-hover:border-primary/60 transition-all duration-300 group-hover:shadow-[0_0_30px_hsla(262,83%,58%,0.3)]">
          {/* Animated glow effect on hover */}
          <motion.div
            className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
            style={{
              background: "radial-gradient(circle at center, hsla(262, 83%, 58%, 0.15) 0%, transparent 70%)",
            }}
          />
          
          {/* Project image */}
          <div className="aspect-video bg-secondary/80 relative overflow-hidden">
            <img 
              src={image} 
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

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
  }

  // Default card layout (for group projects without images)
  return (
    <motion.div
      className="relative group cursor-pointer rounded-xl p-6 md:p-8 bg-secondary/50 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all duration-300"
      initial={{ opacity: 0, y: 40, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ 
        scale: 1.02, 
        y: -5,
        boxShadow: "0 20px 40px -20px hsla(262, 83%, 58%, 0.3)",
        transition: { duration: 0.3 } 
      }}
      onClick={onClick}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Animated glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, hsla(262, 83%, 58%, 0.1) 0%, transparent 70%)",
        }}
      />

      {/* Floating animation wrapper */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
      >
        {/* Icon container */}
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/40 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-[0_0_30px_hsla(262,83%,58%,0.3)] transition-all duration-300">
          {icon}
        </div>

        {/* Content */}
        <h3 className="font-display text-xl md:text-2xl font-bold mb-2 text-gradient group-hover:text-glow transition-all duration-300">
          {title}
        </h3>
        
        <p className="font-body text-sm md:text-base text-muted-foreground mb-4 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center gap-2 mb-4">
          <span className="badge-primary font-heading text-xs tracking-wider uppercase">
            {role}
          </span>
        </div>

        {/* Tools */}
        <div className="flex flex-wrap gap-2">
          {tools.map((tool, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs font-body text-muted-foreground bg-background/50 rounded-full border border-border/50 group-hover:border-primary/30 transition-colors duration-300"
            >
              {tool}
            </span>
          ))}
        </div>

        {/* Hover indicator */}
        <motion.div
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          whileHover={{ scale: 1.1 }}
        >
          <ExternalLink className="w-5 h-5 text-primary" />
        </motion.div>
      </motion.div>

      {/* HUD corners */}
      <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-primary/30 group-hover:border-primary/60 transition-colors duration-300" />
      <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-primary/30 group-hover:border-primary/60 transition-colors duration-300" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-primary/30 group-hover:border-primary/60 transition-colors duration-300" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-primary/30 group-hover:border-primary/60 transition-colors duration-300" />
    </motion.div>
  );
};

export default ProjectCard;
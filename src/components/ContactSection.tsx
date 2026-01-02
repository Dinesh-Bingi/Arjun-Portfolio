import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Linkedin, Github, Twitter } from "lucide-react";

const socialLinks = [
  { icon: <Mail className="w-5 h-5" />, label: "Email", href: "mailto:arjun@example.com" },
  { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn", href: "#" },
  { icon: <Github className="w-5 h-5" />, label: "GitHub", href: "#" },
  { icon: <Twitter className="w-5 h-5" />, label: "Twitter", href: "#" },
];

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-32 px-6" ref={ref}>
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[400px] bg-primary/10 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-3xl mx-auto relative text-center">
        {/* Section content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-primary" />
            <span className="font-heading text-sm tracking-[0.2em] text-primary uppercase">
              Connect
            </span>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-primary" />
          </div>

          <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
            Let's Build Worlds
            <span className="block text-gradient text-glow">Together</span>
          </h2>

          <motion.p
            className="font-body text-lg text-muted-foreground mb-12 max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Open to collaborations, opportunities, and conversations about 
            level design, game development, and interactive experiences.
          </motion.p>

          {/* Social links */}
          <motion.div
            className="flex items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="group relative p-4 rounded-xl bg-secondary/50 backdrop-blur-sm border border-primary/20 hover:border-primary/40 hover:bg-primary/10 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2, boxShadow: "0 10px 30px -10px hsla(262, 83%, 58%, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <span className="text-muted-foreground group-hover:text-primary transition-colors duration-300">
                  {link.icon}
                </span>
                
                {/* Tooltip */}
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 font-body text-xs text-muted-foreground transition-opacity duration-300">
                  {link.label}
                </span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="mt-24 pt-8 border-t border-primary/20"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="font-body text-sm text-muted-foreground">
            © 2024 Kurapati Arjun. Crafted with passion for world design.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
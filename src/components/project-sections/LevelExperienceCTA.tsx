interface LevelExperienceCTASectionProps {
  url?: string;
  imageUrl?: string;
}

const LevelExperienceCTA = ({ 
  url = "https://your-playable-build-link-here",
  imageUrl = "/images/cta-reference.png"
}: LevelExperienceCTASectionProps) => {
  const handleClick = () => {
    if (url && url !== "https://your-playable-build-link-here") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="my-10 flex justify-center px-4">
      {/* Outer glow container - allows glow to be visible, no clipping */}
      <div className="relative cta-outer-wrapper" style={{ padding: '12px' }}>
        {/* Outer glow with breathing animation (pseudo-element behind image) */}
        <div className="absolute inset-0 pointer-events-none cta-outer-glow" />
        
        {/* Subtle animated edge sweep */}
        <div className="absolute inset-0 pointer-events-none cta-edge-sweep" />
        
        {/* Inner button container */}
        <a
          href={url && url !== "https://your-playable-build-link-here" ? url : undefined}
          target={url && url !== "https://your-playable-build-link-here" ? "_blank" : undefined}
          rel={url && url !== "https://your-playable-build-link-here" ? "noopener noreferrer" : undefined}
          onClick={(e) => {
            if (url && url !== "https://your-playable-build-link-here") {
              e.preventDefault();
              handleClick();
            } else {
              e.preventDefault();
            }
          }}
          onKeyDown={(e) => {
            if ((e.key === 'Enter' || e.key === ' ') && url && url !== "https://your-playable-build-link-here") {
              e.preventDefault();
              handleClick();
            }
          }}
          aria-label="Open playable level experience"
          className="group relative block cursor-pointer experience-cta cta-inner-container"
          style={{
            maxWidth: '280px',
            width: '100%',
          }}
          tabIndex={0}
        >
          {/* Image container - no border-radius, no overflow hidden */}
          <div className="relative cta-image-wrapper">
            {/* Base Image - preserves original silhouette */}
            <img
              src={imageUrl}
              alt="Experience the Level CTA"
              className="w-full h-auto block cta-image"
              style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
            />
            
            {/* Inner interaction animation (moving light gradient/highlight sweep) */}
            <div className="absolute inset-0 pointer-events-none cta-inner-animation" />
          </div>
          
          {/* Hover glow enhancement (very subtle) */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none cta-hover-glow" />
          
          {/* Focus glow (keyboard navigation) */}
          <div className="absolute inset-0 opacity-0 group-focus-visible:opacity-100 transition-opacity duration-200 pointer-events-none cta-focus-glow" />
          
          {/* Active/click state overlay */}
          <div className="absolute inset-0 opacity-0 group-active:opacity-100 transition-opacity duration-100 pointer-events-none cta-active-overlay" />
        </a>
      </div>
      
      {/* CSS Animations and Effects */}
      <style>{`
        /* Remove default browser outlines */
        .experience-cta {
          outline: none !important;
        }
        
        .experience-cta:focus {
          outline: none !important;
        }
        
        .experience-cta:focus-visible {
          outline: none !important;
        }
        
        .experience-cta::-moz-focus-inner {
          border: 0 !important;
        }
        
        /* Outer wrapper - allows glow to be visible, no clipping */
        .cta-outer-wrapper {
          overflow: visible;
        }
        
        /* Outer glow with breathing animation (soft blue-gold, diffused, behind image) */
        .cta-outer-glow {
          background: radial-gradient(
            ellipse at center,
            hsla(200, 65%, 55%, 0.12) 0%,
            hsla(200, 60%, 50%, 0.08) 30%,
            hsla(45, 85%, 55%, 0.06) 50%,
            transparent 80%
          );
          filter: blur(30px);
          transform: translateZ(0);
          animation: breathingGlow 6s ease-in-out infinite;
          z-index: 0;
        }
        
        @keyframes breathingGlow {
          0%, 100% {
            opacity: 0.7;
            transform: scale(1) translateZ(0);
          }
          50% {
            opacity: 1;
            transform: scale(1.05) translateZ(0);
          }
        }
        
        /* Subtle animated edge sweep (thin light sweep along edge) */
        .cta-edge-sweep {
          background: conic-gradient(
            from 0deg,
            transparent 0deg,
            transparent 310deg,
            hsla(200, 65%, 60%, 0.25) 330deg,
            hsla(45, 85%, 60%, 0.22) 345deg,
            hsla(200, 65%, 60%, 0.25) 360deg,
            transparent 380deg,
            transparent 720deg
          );
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          -webkit-mask-composite: xor;
          padding: 0.5px;
          animation: edgeSweep 7s linear infinite;
          transform: translateZ(0);
          transition: animation-play-state 200ms ease-in-out, opacity 200ms ease-in-out;
          opacity: 0.7;
          z-index: 1;
        }
        
        @keyframes edgeSweep {
          0% {
            transform: rotate(0deg) translateZ(0);
          }
          100% {
            transform: rotate(360deg) translateZ(0);
          }
        }
        
        /* Inner container - handles content */
        .cta-inner-container {
          position: relative;
          z-index: 2;
          transition: transform 200ms ease-in-out, filter 200ms ease-in-out;
        }
        
        /* Image wrapper - no border-radius, no overflow hidden */
        .cta-image-wrapper {
          position: relative;
          z-index: 1;
          overflow: visible;
        }
        
        /* Refined outside edge blur glow (diagonally angled, pseudo-element behind image) */
        .cta-image-wrapper::before {
          content: '';
          position: absolute;
          inset: -20px;
          background: linear-gradient(
            30deg,
            transparent 0%,
            transparent 20%,
            hsla(200, 65%, 55%, 0.15) 40%,
            hsla(200, 60%, 50%, 0.12) 50%,
            hsla(45, 80%, 55%, 0.1) 60%,
            hsla(200, 55%, 45%, 0.08) 70%,
            transparent 85%,
            transparent 100%
          );
          filter: blur(20px);
          z-index: -1;
          pointer-events: none;
          animation: refinedGlowBreathing 7s ease-in-out infinite;
          transform: translateZ(0);
          opacity: 0.65;
        }
        
        @keyframes refinedGlowBreathing {
          0%, 100% {
            opacity: 0.65;
          }
          50% {
            opacity: 0.85;
          }
        }
        
        /* Base image styling - preserves original silhouette */
        .cta-image {
          filter: brightness(1);
          transition: filter 200ms ease-in-out;
          position: relative;
          z-index: 1;
          display: block;
        }
        
        /* Inner interaction animation (moving light gradient/highlight sweep) */
        .cta-inner-animation {
          background: linear-gradient(
            90deg,
            transparent 0%,
            transparent 40%,
            hsla(200, 70%, 65%, 0.08) 50%,
            hsla(45, 90%, 65%, 0.06) 55%,
            transparent 60%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: innerSweep 9s ease-in-out infinite;
          mix-blend-mode: screen;
          z-index: 2;
          pointer-events: none;
        }
        
        @keyframes innerSweep {
          0% {
            background-position: -100% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        /* Hover state: glow intensity increases, edge sweep slows, brightness lift */
        .group:hover .cta-outer-glow {
          opacity: 1;
          filter: blur(35px);
        }
        
        .group:hover .cta-edge-sweep {
          animation-duration: 12s;
          opacity: 0.5;
        }
        
        .group:hover .cta-image {
          filter: brightness(1.06);
        }
        
        .group:hover .cta-inner-container {
          transform: scale(1.02);
        }
        
        .group:hover .cta-inner-animation {
          animation-duration: 6s;
          opacity: 0.6;
        }
        
        /* Hover: slight increase in outside edge blur glow intensity */
        .group:hover .cta-image-wrapper::before {
          opacity: 0.9;
          background: linear-gradient(
            30deg,
            transparent 0%,
            transparent 18%,
            hsla(200, 65%, 55%, 0.2) 38%,
            hsla(200, 60%, 50%, 0.16) 48%,
            hsla(45, 80%, 55%, 0.14) 58%,
            hsla(200, 55%, 45%, 0.12) 68%,
            transparent 83%,
            transparent 100%
          );
          filter: blur(22px);
        }
        
        /* Hover glow enhancement (very subtle) */
        .cta-hover-glow {
          background: radial-gradient(
            circle at center,
            hsla(200, 65%, 55%, 0.05) 0%,
            transparent 70%
          );
          filter: blur(25px);
          z-index: 1;
        }
        
        /* Focus glow (keyboard navigation) - same as hover */
        .cta-focus-glow {
          background: radial-gradient(
            circle at center,
            hsla(200, 65%, 55%, 0.05) 0%,
            transparent 70%
          );
          filter: blur(25px);
          z-index: 1;
        }
        
        .group:focus-visible .cta-outer-glow {
          opacity: 1;
          filter: blur(35px);
        }
        
        .group:focus-visible .cta-edge-sweep {
          animation-duration: 12s;
          opacity: 0.5;
        }
        
        .group:focus-visible .cta-image {
          filter: brightness(1.06);
        }
        
        .group:focus-visible .cta-inner-container {
          transform: scale(1.02);
        }
        
        .group:focus-visible .cta-inner-animation {
          animation-duration: 6s;
          opacity: 0.6;
        }
        
        /* Focus: slight increase in outside edge blur glow intensity */
        .group:focus-visible .cta-image-wrapper::before {
          opacity: 0.9;
          background: linear-gradient(
            30deg,
            transparent 0%,
            transparent 18%,
            hsla(200, 65%, 55%, 0.2) 38%,
            hsla(200, 60%, 50%, 0.16) 48%,
            hsla(45, 80%, 55%, 0.14) 58%,
            hsla(200, 55%, 45%, 0.12) 68%,
            transparent 83%,
            transparent 100%
          );
          filter: blur(22px);
        }
        
        /* Active/click state: subtle darkening */
        .cta-active-overlay {
          background: rgba(0, 0, 0, 0.1);
          z-index: 3;
        }
        
        .group:active .cta-outer-glow {
          opacity: 0.6;
        }
        
        .group:active .cta-image {
          filter: brightness(0.94);
        }
        
        .group:active .cta-inner-container {
          transform: scale(0.98);
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .cta-outer-wrapper {
            padding: 10px !important;
          }
          .experience-cta {
            max-width: 100% !important;
            width: calc(100% - 24px) !important;
            margin: 0 auto;
          }
          .cta-outer-glow {
            filter: blur(25px);
          }
          .cta-edge-sweep {
            padding: 0.5px;
            opacity: 0.6;
          }
        }
        
        /* Respect prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .cta-outer-glow,
          .cta-edge-sweep,
          .cta-inner-animation,
          .cta-image-wrapper::before {
            animation: none !important;
          }
          .cta-inner-container,
          .cta-image {
            transition: none !important;
          }
          .group:hover .cta-inner-container,
          .group:active .cta-inner-container,
          .group:focus-visible .cta-inner-container,
        }
      `}</style>
    </div>
  );
};

export default LevelExperienceCTA;

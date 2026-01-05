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
    <div className="my-16 flex justify-center px-4">
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
        className="group relative block cursor-pointer transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        style={{
          maxWidth: '330px', // ~55-60% of previous 560px
          width: '100%',
        }}
        tabIndex={0}
      >
        {/* Container with glow */}
        <div 
          className="relative rounded-xl overflow-hidden"
        >
          {/* Base Image */}
          <img
            src={imageUrl}
            alt="Experience the Level CTA"
            className="w-full h-auto block transition-all duration-250 ease-in-out"
            style={{
              filter: 'brightness(1)',
            }}
          />
          
          {/* Animated moving edge glow */}
          <div 
            className="absolute -inset-[2px] pointer-events-none rounded-xl moving-edge-glow"
          />
          
          {/* Soft breathing glow (idle state) */}
          <div 
            className="absolute inset-0 pointer-events-none rounded-xl breathing-glow"
          />
          
          {/* Play icon micro-pulse (positioned over left side where icon typically is) */}
          <div 
            className="absolute left-[3%] top-1/2 -translate-y-1/2 w-14 h-14 pointer-events-none z-20 rounded-full play-icon-pulse"
            style={{
              filter: 'blur(10px)',
              background: 'radial-gradient(circle, hsla(45, 90%, 55%, 0.2) 0%, transparent 70%)',
            }}
          />
          
          {/* Hover glow enhancement */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-250 ease-in-out pointer-events-none rounded-xl"
            style={{
              boxShadow: '0 0 30px hsla(190, 70%, 55%, 0.35), 0 0 60px hsla(45, 90%, 55%, 0.25)',
            }}
          />
          
          {/* Focus glow (keyboard navigation) */}
          <div 
            className="absolute inset-0 opacity-0 group-focus-visible:opacity-100 transition-opacity duration-250 ease-in-out pointer-events-none rounded-xl"
            style={{
              boxShadow: '0 0 30px hsla(190, 70%, 55%, 0.35), 0 0 60px hsla(45, 90%, 55%, 0.25)',
            }}
          />
        </div>
        
        {/* CSS Animations and Effects */}
        <style>{`
          /* Moving edge glow animation - rotating gradient */
          .moving-edge-glow {
            background: conic-gradient(
              from 0deg,
              transparent 0deg,
              transparent 300deg,
              hsla(190, 70%, 65%, 0.4) 330deg,
              hsla(190, 70%, 65%, 0.6) 360deg,
              hsla(45, 90%, 55%, 0.5) 370deg,
              hsla(190, 70%, 65%, 0.4) 390deg,
              transparent 420deg,
              transparent 720deg
            );
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: exclude;
            -webkit-mask-composite: xor;
            padding: 2px;
            animation: movingGlow 7s linear infinite;
          }
          
          @keyframes movingGlow {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
          
          /* Soft breathing glow (idle state) */
          .breathing-glow {
            animation: breathingGlow 4.5s ease-in-out infinite;
          }
          
          @keyframes breathingGlow {
            0%, 100% {
              box-shadow: 
                0 0 20px hsla(190, 70%, 55%, 0.15),
                0 0 40px hsla(45, 90%, 55%, 0.12);
            }
            50% {
              box-shadow: 
                0 0 20px hsla(190, 70%, 55%, 0.25),
                0 0 40px hsla(45, 90%, 55%, 0.2);
            }
          }
          
          /* Play icon micro-pulse */
          .play-icon-pulse {
            animation: playIconPulse 4s ease-in-out infinite;
            animation-delay: 1s;
          }
          
          @keyframes playIconPulse {
            0%, 100% {
              opacity: 0.3;
              transform: translateY(-50%) scale(1);
            }
            50% {
              opacity: 0.6;
              transform: translateY(-50%) scale(1);
            }
          }
          
          /* Hover: glow becomes brighter, animation continues */
          .group:hover .moving-edge-glow {
            background: conic-gradient(
              from 0deg,
              transparent 0deg,
              transparent 300deg,
              hsla(190, 70%, 65%, 0.5) 330deg,
              hsla(190, 70%, 65%, 0.75) 360deg,
              hsla(45, 90%, 55%, 0.65) 370deg,
              hsla(190, 70%, 65%, 0.5) 390deg,
              transparent 420deg,
              transparent 720deg
            );
          }
          
          /* Hover: border glow increases, image brightens slightly */
          .group:hover .breathing-glow {
            box-shadow: 
              0 0 25px hsla(190, 70%, 55%, 0.3),
              0 0 50px hsla(45, 90%, 55%, 0.25);
            animation: none;
          }
          
          .group:hover img {
            filter: brightness(1.08);
          }
          
          .group:focus-visible img {
            filter: brightness(1.08);
          }
          
          @media (max-width: 768px) {
            .group {
              max-width: 100% !important;
            }
            .breathing-glow {
              box-shadow: 
                0 0 15px hsla(190, 70%, 55%, 0.12),
                0 0 30px hsla(45, 90%, 55%, 0.1) !important;
            }
          }
          
          @media (prefers-reduced-motion: reduce) {
            .moving-edge-glow,
            .breathing-glow,
            .play-icon-pulse {
              animation: none !important;
            }
          }
        `}</style>
      </a>
    </div>
  );
};

export default LevelExperienceCTA;


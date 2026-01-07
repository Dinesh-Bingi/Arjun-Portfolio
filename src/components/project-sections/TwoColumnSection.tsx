import { Compass, BookOpen, Map, Mountain, Building, Layers, Gamepad2 } from "lucide-react";
import { TwoColumnSection as TwoColumnSectionType } from "@/data/projects/types";
import HighlightedText from "./HighlightedText";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Compass, BookOpen, Map, Mountain, Building, Layers, Gamepad2,
};

interface TwoColumnSectionProps {
  section: TwoColumnSectionType;
}

const TwoColumnSection = ({ section }: TwoColumnSectionProps) => {
  const { left, right } = section;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 mb-8">
      {/* Left Column */}
      <div className="max-w-prose">
        <div className="bg-primary/60 rounded-md px-4 py-3 mb-6">
          <h3 className="font-display text-lg font-semibold text-foreground text-center">
            {left.title}
          </h3>
        </div>
        
        {left.paragraphs && (
          <div className="space-y-5 font-body text-muted-foreground leading-relaxed">
            {left.paragraphs.map((p, index) => (
              <p key={index}>
                <HighlightedText text={p.text} highlights={p.highlights} />
              </p>
            ))}
          </div>
        )}
        
        {left.bulletPoints && (
          <ul className="space-y-5 list-disc list-outside ml-5">
            {left.bulletPoints.map((item, index) => (
              <li key={index} className="font-body text-muted-foreground leading-relaxed">
                <span className="text-primary font-semibold">{item.label}</span> {item.text}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Right Column */}
      <div className="max-w-prose">
        <div className="bg-primary/60 rounded-md px-4 py-3 mb-6">
          <h3 className="font-display text-lg font-semibold text-foreground text-center">
            {right.title}
          </h3>
        </div>
        
        {right.paragraphs && (
          <div className="space-y-5 font-body text-muted-foreground leading-relaxed">
            {right.paragraphs.map((p, index) => (
              <p key={index}>
                <HighlightedText text={p.text} highlights={p.highlights} />
              </p>
            ))}
          </div>
        )}
        
        {right.bulletPoints && (
          <ul className="space-y-5 list-disc list-outside ml-5">
            {right.bulletPoints.map((item, index) => (
              <li key={index} className="font-body text-muted-foreground leading-relaxed">
                <span className="text-primary font-semibold">{item.label}</span> {item.text}
              </li>
            ))}
          </ul>
        )}
        
        {right.pillars && (
          <>
            {/* Check if this is Puddle Whispers Design Pillars (has "Reflection Through Interaction") */}
            {right.pillars.some(p => p.label === "Reflection Through Interaction") ? (
              // Puddle Whispers: Centered, balanced layout with equal card sizes
              <div className="flex justify-center pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 w-full max-w-2xl">
                  {right.pillars.map((pillar, index) => {
                    const Icon = iconMap[pillar.icon];
                    return (
                      <div 
                        key={index} 
                        className="flex flex-col items-center justify-center gap-3 min-h-[120px] w-full"
                      >
                        <div className="w-16 h-16 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                          {Icon && <Icon className="w-8 h-8 text-primary" />}
                        </div>
                        <span className="font-heading text-sm text-foreground text-center leading-tight min-h-[2.5rem] flex items-center justify-center">
                          {pillar.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : right.pillars.some(p => p.label === "Narrative Through Space") ? (
              // Just My Duck: Centered, balanced layout with equal card sizes
              <div className="flex justify-center pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 w-full max-w-2xl">
                  {right.pillars.map((pillar, index) => {
                    const Icon = iconMap[pillar.icon];
                    return (
                      <div 
                        key={index} 
                        className="flex flex-col items-center justify-center gap-3 min-h-[120px] w-full"
                      >
                        <div className="w-16 h-16 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                          {Icon && <Icon className="w-8 h-8 text-primary" />}
                        </div>
                        <span className="font-heading text-sm text-foreground text-center leading-tight min-h-[2.5rem] flex items-center justify-center">
                          {pillar.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              // Other projects: Original layout
            <div className="flex justify-center gap-12 pt-4">
              {right.pillars.map((pillar, index) => {
                const Icon = iconMap[pillar.icon];
                return (
                  <div key={index} className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                      {Icon && <Icon className="w-8 h-8 text-primary" />}
                    </div>
                    <span className="font-heading text-sm text-foreground">{pillar.label}</span>
                  </div>
                );
              })}
            </div>
            )}
            {right.documentLink && right.documentLink.url && (
              <div className="flex justify-center mt-8">
                <a
                  href={right.documentLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-6 py-3 font-heading text-sm text-foreground bg-primary/10 border border-primary/30 rounded-lg hover:bg-primary/20 hover:border-primary/50 hover:shadow-[0_0_15px_hsla(262,83%,58%,0.2)] transition-all duration-300 flex items-center gap-2 cursor-pointer"
                >
                  {right.documentLink.text || "Link to Game Design Document"}
                  <span className="text-primary group-hover:translate-x-1 transition-transform duration-300">→</span>
                </a>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TwoColumnSection;

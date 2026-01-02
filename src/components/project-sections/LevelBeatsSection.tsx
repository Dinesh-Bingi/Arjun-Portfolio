import { LevelBeatsSection as LevelBeatsSectionType } from "@/data/projects/types";

interface LevelBeatsSectionProps {
  section: LevelBeatsSectionType;
}

const LevelBeatsSection = ({ section }: LevelBeatsSectionProps) => {
  return (
    <div className="mt-12 mb-8">
      <div className="bg-primary/60 rounded-md px-4 py-3 mb-8">
        <h3 className="font-display text-lg font-semibold text-foreground text-center">
          {section.title || "Level Beats & Walkthrough"}
        </h3>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Phases Column */}
        <div className="space-y-4">
          {section.phases.map((phase, phaseIndex) => (
            <div key={phaseIndex}>
              <h4 className="font-display text-sm font-semibold text-foreground mb-2">
                {phase.name}
              </h4>
              <ul className="space-y-1 font-body text-xs text-muted-foreground">
                {phase.beats.map((beat, beatIndex) => (
                  <li key={beatIndex}>
                    <span className="text-primary">{beat.number}.</span> {beat.label}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Images Grid */}
        <div className="lg:col-span-3 grid grid-cols-3 gap-2">
          {section.images.map((image, index) => (
            <div key={index} className="relative rounded-lg overflow-hidden border border-border/30">
              <img
                src={image}
                alt={`Level Beat ${index + 1}`}
                className="w-full h-auto aspect-video object-contain border-dotted border-0 shadow-none"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LevelBeatsSection;

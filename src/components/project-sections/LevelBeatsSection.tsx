import { LevelBeatsSection as LevelBeatsSectionType } from "@/data/projects/types";

interface LevelBeatsSectionProps {
  section: LevelBeatsSectionType;
}

interface LevelBeatCardProps {
  image: string;
  altText: string;
  index: number;
}

const LevelBeatCard = ({ image, altText, index }: LevelBeatCardProps) => {
  return (
    <div
      className="relative rounded-lg overflow-hidden border border-border/30"
    >
      {/* Image container */}
      <div className="relative aspect-video overflow-hidden bg-secondary/20">
        <img
          src={image}
          alt={altText}
          className="w-full h-full object-cover"
        />
        
        {/* Subtle dark gradient overlay at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent pointer-events-none" />
      </div>
    </div>
  );
};

const LevelBeatsSection = ({ section }: LevelBeatsSectionProps) => {
  // Flatten all beats to match with images
  const allBeats = section.phases.flatMap(phase => phase.beats);

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
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
          {section.images.map((image, index) => {
            const beat = allBeats[index];
            const altText = beat 
              ? `Level Beat ${beat.number}: ${beat.label}` 
              : `Level Beat ${index + 1}`;

            return (
              <LevelBeatCard
                key={index}
                image={image}
                altText={altText}
                index={index}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LevelBeatsSection;

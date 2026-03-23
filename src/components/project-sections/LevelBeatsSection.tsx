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
      className="relative rounded-lg"
      style={{
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.45)',
      }}
    >
      {/* Image container */}
      <div className="relative bg-secondary/20 p-0">
        <img
          src={image}
          alt={altText}
          className="rounded-lg"
          style={{
            display: 'block',
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
            margin: 0,
            padding: 0,
            lineHeight: 0,
          }}
        />
      </div>
    </div>
  );
};

const LevelBeatsSection = ({ section }: LevelBeatsSectionProps) => {
  // Flatten all beats to match with images
  const allBeats = section.phases.flatMap(phase => phase.beats);

  // Check if this is The Lost Underworld to apply specific size adjustments
  const isLostUnderworld = typeof window !== 'undefined' && window.location.pathname.includes("the-lost-underworld");

  // For Lost Underworld, we reduce the text column width and increase the image grid width
  // by using a custom grid template rather than the standard 5-column layout
  const gridContainerClass = isLostUnderworld
    ? "grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-6 items-start"
    : "grid grid-cols-1 lg:grid-cols-5 gap-6 items-start";
    
  const textColClass = isLostUnderworld ? "" : "";
  
  // Also we can scale the images slightly for an extra sizing boost
  const imageGridClass = isLostUnderworld
    ? "grid grid-cols-1 md:grid-cols-3 gap-3 items-start transform lg:scale-[1.05] lg:origin-top-left lg:w-[105%]"
    : "lg:col-span-4 grid grid-cols-1 md:grid-cols-3 gap-3 items-start";

  return (
    <div className="mt-12 mb-8">
      <div className="bg-primary/60 rounded-md px-4 py-3 mb-8">
        <h3 className="font-display text-lg font-semibold text-foreground text-center">
          {section.title || "Level Beats & Walkthrough"}
        </h3>
      </div>
      
      <div className={gridContainerClass}>
        {/* Phases Column */}
        <div className={`space-y-4 ${textColClass}`}>
          {section.phases.map((phase, phaseIndex) => (
            <div key={phaseIndex}>
              <h4 className="font-display text-base font-semibold text-foreground mb-2">
                {phase.name}
              </h4>
              <ul className="space-y-1 font-body text-sm text-muted-foreground">
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
        <div className={imageGridClass}>
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

import { LevelLayoutSection as LevelLayoutSectionType } from "@/data/projects/types";
import HighlightedText from "./HighlightedText";

interface LevelLayoutSectionProps {
  section: LevelLayoutSectionType;
}

const LevelLayoutSection = ({ section }: LevelLayoutSectionProps) => {
  return (
    <div className="mt-12 mb-8">
      <div className="bg-primary/60 rounded-md px-4 py-3 mb-6">
        <h3 className="font-display text-lg font-semibold text-foreground text-center">
          {section.title || "Level Design"}
        </h3>
      </div>
      
      {section.description && (
        <div className="space-y-5 font-body text-muted-foreground leading-relaxed">
          {section.description.map((p, index) => (
            <p key={index}>
              <HighlightedText text={p.text} highlights={p.highlights} />
            </p>
          ))}
        </div>
      )}
      
      <div className="mt-8 flex justify-center">
        <img
          src={section.mapImage}
          alt="Level Layout Map"
          className="w-full max-w-4xl h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default LevelLayoutSection;

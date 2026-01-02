import { TextSection as TextSectionType } from "@/data/projects/types";
import HighlightedText from "./HighlightedText";

interface TextSectionProps {
  section: TextSectionType;
}

const TextSection = ({ section }: TextSectionProps) => {
  return (
    <div className="mt-12 mb-8">
      <div className="bg-primary/60 rounded-md px-4 py-3 mb-6">
        <h3 className="font-display text-lg font-semibold text-foreground text-center">
          {section.title}
        </h3>
      </div>
      <div className="space-y-5 font-body text-muted-foreground leading-relaxed">
        {section.paragraphs.map((p, index) => (
          <p key={index}>
            <HighlightedText text={p.text} highlights={p.highlights} />
          </p>
        ))}
      </div>
    </div>
  );
};

export default TextSection;

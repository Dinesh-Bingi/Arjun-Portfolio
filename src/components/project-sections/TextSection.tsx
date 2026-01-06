import { TextSection as TextSectionType } from "@/data/projects/types";
import HighlightedText from "./HighlightedText";

interface TextSectionProps {
  section: TextSectionType;
}

const TextSection = ({ section }: TextSectionProps) => {
  // Special layout for Level Streaming section
  const isLevelStreaming = section.title === "Level Streaming" && section.paragraphs.length >= 2;

  return (
    <div className="mt-12 mb-8">
      <div className="bg-primary/60 rounded-md px-4 py-3 mb-6">
        <h3 className="font-display text-lg font-semibold text-foreground text-center">
          {section.title}
        </h3>
      </div>
      
      {isLevelStreaming ? (
        <div className="space-y-5 font-body text-muted-foreground leading-relaxed">
          {/* First paragraph - full width */}
          <p>
            <HighlightedText text={section.paragraphs[0].text} highlights={section.paragraphs[0].highlights} />
          </p>
          
          {/* Second paragraph - constrained width */}
          <div className="mx-auto max-w-[720px] mt-6">
            <p>
              <HighlightedText text={section.paragraphs[1].text} highlights={section.paragraphs[1].highlights} />
            </p>
          </div>
          
          {/* Image - same constraint as second paragraph */}
          <div className="mx-auto max-w-[720px] mt-6">
            <img 
              src="/images/level-streaming-overview.jpg" 
              alt="Level streaming setup and implementation"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-5 font-body text-muted-foreground leading-relaxed">
          {section.paragraphs.map((p, index) => (
            <p key={index}>
              <HighlightedText text={p.text} highlights={p.highlights} />
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default TextSection;

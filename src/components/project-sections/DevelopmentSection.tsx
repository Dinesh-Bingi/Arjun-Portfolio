import { DevelopmentSection as DevelopmentSectionType } from "@/data/projects/types";
import HighlightedText from "./HighlightedText";

interface DevelopmentSectionProps {
  section: DevelopmentSectionType;
}

const DevelopmentSection = ({ section }: DevelopmentSectionProps) => {
  return (
    <div className="mt-12 mb-8">
      <div className="bg-primary/60 rounded-md px-4 py-3 mb-6">
        <h3 className="font-display text-lg font-semibold text-foreground text-center">
          {section.title || "Pre-Production & Development Approach"}
        </h3>
      </div>
      
      {section.intro && (
        <p className="font-body text-muted-foreground leading-relaxed mb-10">
          <HighlightedText text={section.intro.text} highlights={section.intro.highlights} />
        </p>
      )}

      {section.subsections.map((subsection, index) => (
        <div key={index} className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-primary rounded-full"></div>
            <h4 className="font-display text-base font-semibold text-foreground italic">
              {subsection.title}
            </h4>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">
            <div className="space-y-3 font-body text-muted-foreground leading-relaxed max-w-prose">
              {subsection.paragraphs.map((p, pIndex) => (
                <p key={pIndex}>
                  <HighlightedText text={p.text} highlights={p.highlights} />
                </p>
              ))}
            </div>
            
            {subsection.media && (
              <div className="flex justify-center">
                {subsection.media.type === "video" ? (
                  <div className="w-full max-w-md overflow-hidden rounded-lg border border-border/50">
                    <video
                      src={subsection.media.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-auto object-cover"
                    />
                  </div>
                ) : subsection.media.src ? (
                  <div className="w-full max-w-md overflow-hidden rounded-lg border border-border/50">
                    <img
                      src={subsection.media.src}
                      alt={subsection.title}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full max-w-md h-48 bg-muted/30 rounded-lg border border-border/50 flex items-center justify-center">
                    <p className="text-muted-foreground text-sm text-center px-4">
                      {subsection.media.placeholder || "Image placeholder"}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DevelopmentSection;

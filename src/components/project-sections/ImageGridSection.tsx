import { ImageGridSection as ImageGridSectionType } from "@/data/projects/types";
import HighlightedText from "./HighlightedText";

interface ImageGridSectionProps {
  section: ImageGridSectionType;
}

const ImageGridSection = ({ section }: ImageGridSectionProps) => {
  const columns = section.columns || 2;
  const gridCols = columns === 2 ? "md:grid-cols-2" : columns === 3 ? "md:grid-cols-3" : "md:grid-cols-4";

  return (
    <div className="mt-12 mb-8">
      {section.title && (
        <div className="bg-primary/60 rounded-md px-4 py-3 mb-6">
          <h3 className="font-display text-lg font-semibold text-foreground text-center">
            {section.title}
          </h3>
        </div>
      )}
      
      {section.description && (
        <div className="space-y-5 font-body text-muted-foreground leading-relaxed">
          <p>
            <HighlightedText text={section.description.text} highlights={section.description.highlights} />
          </p>
        </div>
      )}
      
      {section.bulletPoints && (
        <ul className="space-y-4 list-disc list-outside ml-5 mt-4">
          {section.bulletPoints.map((item, index) => (
            <li key={index} className="font-body text-muted-foreground leading-relaxed">
              <span className="text-primary font-semibold">{item.label}</span> {item.text}
            </li>
          ))}
        </ul>
      )}
      
      <div className={`grid grid-cols-1 ${gridCols} gap-6 mt-8 max-w-2xl mx-auto`}>
        {section.images.map((image, index) => (
          <div key={index} className="flex flex-col items-center gap-3">
            <div className="rounded-xl overflow-hidden border border-border/50 shadow-lg">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-auto object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
            {image.caption && (
              <span className="font-heading text-sm text-primary">{image.caption}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGridSection;

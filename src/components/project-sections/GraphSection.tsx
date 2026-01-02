import { GraphSection as GraphSectionType } from "@/data/projects/types";

interface GraphSectionProps {
  section: GraphSectionType;
}

const GraphSection = ({ section }: GraphSectionProps) => {
  return (
    <div className="mt-12 mb-8">
      <div className="bg-primary/60 rounded-md px-4 py-3 mb-6">
        <h3 className="font-display text-lg font-semibold text-foreground text-center">
          {section.title}
        </h3>
      </div>
      <div className="flex justify-center">
        <img
          src={section.imageUrl}
          alt={section.title}
          className="w-full max-w-5xl h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default GraphSection;

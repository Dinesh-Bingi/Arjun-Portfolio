import { CreditsSection as CreditsSectionType } from "@/data/projects/types";

interface CreditsSectionProps {
  section: CreditsSectionType;
}

const CreditsSection = ({ section }: CreditsSectionProps) => {
  // Special case for Puddle Whispers: single item with special label
  const isPuddleWhispersStyle = section.items.length === 1 && section.items[0].label === "Puddle Whispers Credit";
  
  // Special case for "Developed by" single item
  const isDevelopedBySingle = section.items.length > 0 && section.items[0].label === "Developed by" && section.items.length === 1;
  
  return (
    <div className="mt-12 mb-8">
      <div className="bg-primary/60 rounded-md px-4 py-3 mb-6">
        <h3 className="font-display text-lg font-semibold text-foreground text-center">
          {section.title || "Credits"}
        </h3>
      </div>
      
      <div className="font-body text-muted-foreground">
        {isPuddleWhispersStyle || isDevelopedBySingle ? (
          <p className="text-center py-2">
            {section.items[0].credit}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {section.items.map((item, index) => (
          <p key={index}>
                {item.label === "Developed by" ? (
                  item.credit
                ) : (
                  <>
                    <span className="text-primary font-semibold">{item.label}</span>
                    {!item.label.toLowerCase().endsWith("by") && " by "}
                    {item.credit}
                  </>
                )}
          </p>
        ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreditsSection;

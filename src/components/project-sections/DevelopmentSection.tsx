import { DevelopmentSection as DevelopmentSectionType } from "@/data/projects/types";
import HighlightedText from "./HighlightedText";
import { registerVideo, unregisterVideo } from "@/utils/videoManager";
import { useEffect, useRef } from "react";

interface DevelopmentSectionProps {
  section: DevelopmentSectionType;
}

const DevelopmentSection = ({ section }: DevelopmentSectionProps) => {
  // Sections that should use minimal subtitles instead of large title pills
  // Note: "Planning & Development Breakdown" and "Production & Process" are now subsections,
  // so they automatically use the vertical line subtitle style
  const minimalTitleSections: string[] = [];
  
  const useMinimalTitle = section.title && minimalTitleSections.includes(section.title);
  
  // Special handling for Sabershot Post-Mortem section
  // Check if this is "Post-Mortem – Insights" with "Current Status & Reflection" as a subsection
  const isSabershotPostMortem = 
    section.title === "Post-Mortem – Insights" &&
    section.subsections.length >= 2 &&
    section.subsections[1].title === "Current Status & Reflection";
  
  // Special handling for Just My Duck Pre-Production section
  // Check if this is "Pre-Production & Development Approach" with "Planning & Level Development Process" and "Production & Process"
  const isJustMyDuckPreProduction = 
    section.title === "Pre-Production & Development Approach" &&
    section.subsections.length >= 2 &&
    section.subsections.some(sub => sub.title === "Planning & Level Development Process") &&
    section.subsections.some(sub => sub.title === "Production & Process");
  
  // Special handling for Just My Duck Post-Mortem section
  // Check if this is "Post-Mortem – Insights" with no media and specific content structure
  const isJustMyDuckPostMortem = 
    section.title === "Post-Mortem – Insights" &&
    section.subsections.length === 1 &&
    section.subsections[0].title === "" &&
    section.subsections[0].paragraphs.length >= 2 &&
    !section.subsections[0].media;

  // Special handling for Puddle Whispers Design Techniques (reduced spacing)
  const isPuddleWhispersDesignTechniques = 
    section.title === "Design Techniques" &&
    section.subsections.length === 2 &&
    section.subsections.some(sub => sub.title === "Pacing Through Space") &&
    section.subsections.some(sub => sub.title === "Natural Player Guidance");
  
  // Special handling for Sabershot Design Techniques (2-column layout per technique)
  const isSabershotDesignTechniques = 
    section.title === "Design Techniques" &&
    section.subsections.length === 2 &&
    section.subsections.some(sub => sub.title === "Release & Compression") &&
    section.subsections.some(sub => sub.title === "Branch Endpoint");

  return (
    <div className={`${isPuddleWhispersDesignTechniques ? 'mt-8 mb-6' : 'mt-12 mb-8'} ${(isJustMyDuckPreProduction || isJustMyDuckPostMortem) ? 'max-w-[1000px] mx-auto' : ''}`}>
      {useMinimalTitle ? (
        // Minimal subtitle style
        <div className="flex items-center gap-3 mb-4">
          <div className="h-5 w-[2px] bg-primary"></div>
          <h4 className="text-sm font-semibold tracking-wide text-foreground">
            {section.title}
          </h4>
        </div>
      ) : (
        // Large title pill (default)
        <div className={`bg-primary/60 rounded-md px-4 py-3 ${isPuddleWhispersDesignTechniques ? 'mb-4' : 'mb-6'}`}>
          <h3 className="font-display text-lg font-semibold text-foreground text-center">
            {section.title || "Pre-Production & Development Approach"}
          </h3>
        </div>
      )}
      
      {section.intro && (
        <p className={`font-body text-muted-foreground leading-relaxed ${isPuddleWhispersDesignTechniques ? 'mb-4' : 'mb-10'}`}>
          <HighlightedText text={section.intro.text} highlights={section.intro.highlights} />
        </p>
      )}

      {/* Special handling for Design Techniques: images in right column alongside text */}
      {section.title === "Design Techniques" && 
       section.subsections.length > 0 &&
       section.subsections[section.subsections.length - 1].images &&
       section.subsections[section.subsections.length - 1].images!.length > 0 &&
       (!section.subsections[section.subsections.length - 1].paragraphs || 
        section.subsections[section.subsections.length - 1].paragraphs.length === 0) ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-20 items-start">
          {/* Left column: All text subsections */}
          <div className="space-y-8">
            {section.subsections
              .filter(sub => sub.paragraphs && sub.paragraphs.length > 0)
              .map((subsection, index) => (
                <div key={index}>
                  {subsection.title && (
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-1 h-8 bg-primary rounded-full"></div>
                      <h4 className="font-display text-base font-semibold text-foreground italic">
                        {subsection.title}
                      </h4>
                    </div>
                  )}
                  <div className="space-y-3 font-body text-muted-foreground leading-relaxed">
                    {subsection.paragraphs.map((p, pIndex) => (
                      <p key={pIndex}>
                        <HighlightedText text={p.text} highlights={p.highlights} />
                      </p>
                    ))}
                  </div>
                </div>
              ))}
          </div>

          {/* Right column: Images */}
          <div className="flex justify-center items-start p-4 h-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-md">
              {section.subsections[section.subsections.length - 1].images!.map((image, imgIndex) => (
                <div key={imgIndex} className="flex flex-col items-center gap-2">
                  <div className="overflow-hidden rounded-lg border border-border/50 shadow-lg p-2 aspect-square w-full">
                    {image.src ? (
                      <img
                        src={image.src}
                        alt={image.placeholder || `Design technique ${imgIndex + 1}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full min-h-[200px] bg-muted/30 rounded-lg flex items-center justify-center">
                        <p className="text-muted-foreground text-xs text-center px-2">
                          {image.placeholder || "Image placeholder"}
                        </p>
                      </div>
                    )}
                  </div>
                  {image.link && (
                    <a
                      href={image.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:text-primary/80 hover:underline transition-colors text-center"
                    >
                      {image.linkText || "View Blueprint"}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : isJustMyDuckPostMortem ? (
        // Special centered layout for Just My Duck Post-Mortem section (text-only, no images)
        <div className="space-y-3 font-body text-muted-foreground leading-relaxed">
          {section.subsections[0].paragraphs.map((p, pIndex) => (
            <p key={pIndex}>
              <HighlightedText text={p.text} highlights={p.highlights} />
            </p>
          ))}
        </div>
      ) : isSabershotPostMortem ? (
        // Special full-width layout for Sabershot Post-Mortem (no images, subtitle structure)
        <div className="space-y-8">
          {section.subsections.map((subsection, index) => (
            <div key={index}>
              {subsection.title && (
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-primary rounded-full"></div>
                  <h4 className="font-display text-base font-semibold text-foreground italic">
                    {subsection.title}
                  </h4>
                </div>
              )}
              <div className="space-y-3 font-body text-muted-foreground leading-relaxed">
                {subsection.paragraphs.map((p, pIndex) => (
                  <p key={pIndex}>
                    <HighlightedText text={p.text} highlights={p.highlights} />
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : isSabershotDesignTechniques ? (
        // Special 2-column layout for Sabershot Design Techniques (each technique as a row)
        <div className="space-y-10">
          {section.subsections.map((subsection, index) => (
            <div key={index} className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-16 xl:gap-20">
              {/* Left: Title + Text */}
              <div className="space-y-4 max-w-prose">
                {subsection.title && (
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1 h-8 bg-primary rounded-full"></div>
                    <h4 className="font-display text-base font-semibold text-foreground italic">
                      {subsection.title}
                    </h4>
                  </div>
                )}
                <div className="space-y-3 font-body text-muted-foreground leading-relaxed">
                  {subsection.paragraphs.map((p, pIndex) => (
                    <p key={pIndex}>
                      <HighlightedText text={p.text} highlights={p.highlights} />
                    </p>
                  ))}
                </div>
              </div>
              
              {/* Right: Image */}
              {subsection.media && subsection.media.type === "image" && (
                <div className="flex items-center justify-center lg:justify-start">
                  <div className="w-full max-w-lg overflow-hidden rounded-lg">
                    {subsection.media.src ? (
                      <img
                        src={subsection.media.src}
                        alt={subsection.media.placeholder || subsection.title || "Design technique"}
                        className="w-full h-auto object-cover"
                      />
                    ) : (
                      <div className="w-full h-64 bg-muted/30 rounded-lg flex items-center justify-center">
                        <p className="text-muted-foreground text-sm text-center px-4">
                          {subsection.media.placeholder || "Image placeholder"}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : isPuddleWhispersDesignTechniques ? (
        // Special compact layout for Puddle Whispers Design Techniques
        <div className="space-y-4">
          {section.subsections.map((subsection, index) => (
            <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              {/* Left: Title + Text */}
              <div className="space-y-2">
                {subsection.title && (
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1 h-6 bg-primary rounded-full"></div>
                    <h4 className="font-display text-base font-semibold text-foreground italic">
                      {subsection.title}
                    </h4>
                  </div>
                )}
                <div className="space-y-2 font-body text-muted-foreground leading-relaxed">
                  {subsection.paragraphs.map((p, pIndex) => (
                    <p key={pIndex}>
                      <HighlightedText text={p.text} highlights={p.highlights} />
                    </p>
                  ))}
                </div>
              </div>
              
              {/* Right: Image */}
              {subsection.media && subsection.media.type === "image" && (
                <div className="flex items-start justify-center lg:justify-start px-2">
                  <div className="w-full max-w-md overflow-hidden rounded-lg border border-border/50 shadow-lg">
                    <img
                      src={subsection.media.src}
                      alt={subsection.title || "Design technique"}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : isJustMyDuckPreProduction ? (
        // Special two-column layout for Just My Duck Pre-Production subsections
        <div className="space-y-10">
          {section.subsections.map((subsection, index) => {
            const isPlanningSection = subsection.title === "Planning & Level Development Process";
            const isProductionSection = subsection.title === "Production & Process";
            const shouldUseTwoColumn = (isPlanningSection || isProductionSection) && subsection.media;
            
            if (!shouldUseTwoColumn) {
              // Fallback to default rendering for other subsections
              return (
                <div key={index} className="mb-10">
                  {subsection.title && (
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-1 h-8 bg-primary rounded-full"></div>
                      <h4 className="font-display text-base font-semibold text-foreground italic">
                        {subsection.title}
                      </h4>
                    </div>
                  )}
                  <div className="space-y-3 font-body text-muted-foreground leading-relaxed">
                    {subsection.paragraphs.map((p, pIndex) => (
                      <p key={pIndex}>
                        <HighlightedText text={p.text} highlights={p.highlights} />
                      </p>
                    ))}
                  </div>
                </div>
              );
            }
            
            return (
              <div key={index} className="mb-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-20 items-center">
                  {/* Left: Title + Text */}
                  <div className="space-y-4 max-w-prose">
                    {subsection.title && (
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-1 h-8 bg-primary rounded-full"></div>
                        <h4 className="font-display text-base font-semibold text-foreground italic">
                          {subsection.title}
                        </h4>
                      </div>
                    )}
                    <div className="space-y-3 font-body text-muted-foreground leading-relaxed">
                      {subsection.paragraphs.map((p, pIndex) => (
                        <p key={pIndex}>
                          <HighlightedText text={p.text} highlights={p.highlights} />
                        </p>
                      ))}
                    </div>
                  </div>
                  
                  {/* Right: Media (vertically centered) - Echoes of Stella styling */}
                  {subsection.media && (
                    <div className="flex items-center justify-center lg:justify-start">
                      {subsection.media.type === "video" ? (
                        <div className="w-full max-w-xs overflow-hidden rounded-lg border border-border/50 shadow-lg p-2">
                          {subsection.media.src ? (
                            <video
                              src={subsection.media.src}
                              autoPlay
                              muted
                              loop
                              playsInline
                              preload="metadata"
                              disablePictureInPicture
                              controlsList="nodownload nofullscreen noremoteplayback"
                              className="w-full h-auto object-cover rounded-lg"
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: 'inherit',
                                pointerEvents: 'none',
                              }}
                              onPlay={(e) => registerVideo(e.currentTarget)}
                              onLoadedData={(e) => registerVideo(e.currentTarget)}
                              aria-label={subsection.media.placeholder || "Production process video"}
                            />
                          ) : (
                            <div className="w-full h-64 bg-muted/30 rounded-lg flex items-center justify-center">
                              <p className="text-muted-foreground text-sm text-center px-4">
                                {subsection.media.placeholder || "Video placeholder"}
                              </p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="w-full max-w-xs overflow-hidden rounded-lg border border-border/50 shadow-lg p-2">
                          {subsection.media.src ? (
                            <img
                              src={subsection.media.src}
                              alt={subsection.media.placeholder || subsection.title || "Planning and blockout process"}
                              className="w-full h-auto object-cover"
                            />
                          ) : (
                            <div className="w-full h-64 bg-muted/30 rounded-lg flex items-center justify-center">
                              <p className="text-muted-foreground text-sm text-center px-4">
                                {subsection.media.placeholder || "Image placeholder"}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        // Default rendering for other sections
        section.subsections.map((subsection, index) => {
        // Check if next subsection has no paragraphs (only media) to reduce spacing
        const nextSubsection = section.subsections[index + 1];
        const isFollowedByMediaOnly = nextSubsection && 
          (!nextSubsection.paragraphs || nextSubsection.paragraphs.length === 0) && 
          nextSubsection.media;
        // Reduced spacing for Puddle Whispers Design Techniques
        const marginBottom = isPuddleWhispersDesignTechniques 
          ? (isFollowedByMediaOnly ? "mb-2" : "mb-6")
          : (isFollowedByMediaOnly ? "mb-2" : "mb-10");
        
        // Check if this is a media-only subsection that should be rendered with the previous one
        const isMediaOnlyContinuation = 
          (!subsection.paragraphs || subsection.paragraphs.length === 0) && 
          subsection.media &&
          index > 0 &&
          section.subsections[index - 1].paragraphs &&
          section.subsections[index - 1].paragraphs.length > 0;
        
        // Skip rendering if this is a media-only continuation (it will be rendered with previous subsection)
        if (isMediaOnlyContinuation) {
          return null;
        }
        
        // Collect all consecutive media-only subsections that follow this one
        const consecutiveMediaSubsections = [];
        let nextIndex = index + 1;
        while (
          nextIndex < section.subsections.length &&
          section.subsections[nextIndex].media &&
          (!section.subsections[nextIndex].paragraphs || section.subsections[nextIndex].paragraphs.length === 0)
        ) {
          consecutiveMediaSubsections.push(section.subsections[nextIndex]);
          nextIndex++;
        }
        
        // Check if this is Game Design section - if so, render full-width text only
        const isGameDesign = section.title === "Game Design";
        
        // Check if this is Puddle Whispers "Planning & Development Approach" - render full-width text only
        const isPuddleWhispersPlanning = 
          section.title === "Pre-Production & Development Approach" &&
          subsection.title === "Planning & Development Approach" &&
          !subsection.media;
        
        // Check if this is Echoes of Stella or Sabershot "Planning & Development" section with media - use vertical centering
        const isPlanningWithMedia = 
          (subsection.title === "Planning & Development Approach" || subsection.title === "Planning & Development Breakdown") &&
          subsection.media &&
          (section.title === "Pre-Production & Development Approach");
        
        return (
        <div key={index} className={marginBottom}>
          {subsection.title && (
            <div className={`flex items-center gap-3 ${isPuddleWhispersDesignTechniques ? 'mb-4' : 'mb-6'}`}>
              <div className="w-1 h-8 bg-primary rounded-full"></div>
              <h4 className="font-display text-base font-semibold text-foreground italic">
                {subsection.title}
              </h4>
            </div>
          )}
          
          {isGameDesign || isPuddleWhispersPlanning ? (
            // Full-width text layout for Game Design section or Puddle Whispers Planning
            <div className="space-y-3 font-body text-muted-foreground leading-relaxed">
              {subsection.paragraphs.map((p, pIndex) => (
                <p key={pIndex}>
                  <HighlightedText text={p.text} highlights={p.highlights} />
                </p>
              ))}
            </div>
          ) : (
            // Default two-column layout for other sections
            <div className={`grid grid-cols-1 lg:grid-cols-2 ${isPlanningWithMedia ? 'items-center' : 'items-start'} ${isPuddleWhispersDesignTechniques ? 'gap-6 lg:gap-8' : 'gap-10 lg:gap-16 xl:gap-20'}`}>
              <div className="space-y-3 font-body text-muted-foreground leading-relaxed max-w-prose">
                {subsection.paragraphs.map((p, pIndex) => (
                  <p key={pIndex}>
                    <HighlightedText text={p.text} highlights={p.highlights} />
                  </p>
                ))}
              </div>
              
              {/* Support for 2x2 image grid */}
              {subsection.images && subsection.images.length > 0 && (
                <div className="flex justify-center items-start p-4 h-full">
                  <div className="grid grid-cols-2 gap-5 w-full max-w-2xl">
                    {subsection.images.map((image, imgIndex) => (
                      <div key={imgIndex} className="flex flex-col items-center gap-2">
                        <div className="overflow-hidden rounded-lg border border-border/50 shadow-lg p-2 aspect-square w-full">
                          {image.src ? (
                            <img
                              src={image.src}
                              alt={`${subsection.title} ${imgIndex + 1}`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full min-h-[200px] bg-muted/30 rounded-lg flex items-center justify-center">
                              <p className="text-muted-foreground text-xs text-center px-2">
                                {image.placeholder || "Image placeholder"}
                              </p>
                            </div>
                          )}
                        </div>
                        {image.link && (
                          <a
                            href={image.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:text-primary/80 hover:underline transition-colors text-center"
                          >
                            {image.linkText || "View Blueprint"}
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Support for single media (video or image) - with stacked consecutive media */}
              {!subsection.images && (subsection.media || consecutiveMediaSubsections.length > 0) && (
                <div className={`flex flex-col items-start ${isPuddleWhispersDesignTechniques ? 'px-2 pt-0 pb-2' : 'px-4 pt-0 pb-4'} gap-3`}>
                  {/* First media (from current subsection) */}
                  {subsection.media && (
                    <>
                      {subsection.media.type === "video" ? (
                        <div className="w-full max-w-xs overflow-hidden rounded-lg border border-border/50 shadow-lg p-2">
                          <video
                            src={subsection.media.src}
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="metadata"
                            disablePictureInPicture
                            controlsList="nodownload nofullscreen noremoteplayback"
                            className="w-full h-auto object-cover rounded-lg"
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              borderRadius: 'inherit',
                              pointerEvents: 'none',
                            }}
                            onPlay={(e) => registerVideo(e.currentTarget)}
                            onLoadedData={(e) => registerVideo(e.currentTarget)}
                            aria-label={subsection.media.src.includes("production-process") ? "Echoes of Stella production process" : "Level design process showing blockout, iteration, and playtesting"}
                          />
                        </div>
                      ) : subsection.media.src ? (
                        <div className="w-full max-w-xs overflow-hidden rounded-lg border border-border/50 shadow-lg p-2">
                          <img
                            src={subsection.media.src}
                            alt={
                              subsection.media.placeholder === "Design Image 1"
                                ? "Player guidance through level layout and spatial flow"
                                : subsection.media.placeholder === "Design Image 2"
                                ? "Spatial tension created through narrow corridors and controlled visibility"
                                : subsection.title || "Design technique image"
                            }
                            className="w-full h-auto object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-full max-w-xs h-40 bg-muted/30 rounded-lg border border-border/50 shadow-lg">
                        </div>
                      )}
                    </>
                  )}
                  
                  {/* Stack consecutive media-only subsections */}
                  {consecutiveMediaSubsections.map((mediaSubsection, mediaIndex) => (
                    <div key={`media-${index}-${mediaIndex}`} className="w-full max-w-xs">
                      {mediaSubsection.media?.type === "video" ? (
                        <div className="w-full overflow-hidden rounded-lg border border-border/50 shadow-lg p-2">
                          <video
                            src={mediaSubsection.media.src}
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="metadata"
                            disablePictureInPicture
                            controlsList="nodownload nofullscreen noremoteplayback"
                            className="w-full h-auto object-cover"
                            style={{ pointerEvents: 'none' }}
                            onPlay={(e) => registerVideo(e.currentTarget)}
                            onLoadedData={(e) => registerVideo(e.currentTarget)}
                            aria-label="Level design process showing blockout, iteration, and playtesting"
                          />
                        </div>
                      ) : mediaSubsection.media?.src ? (
                        <div className="w-full overflow-hidden rounded-lg border border-border/50 shadow-lg p-2">
                          <img
                            src={mediaSubsection.media.src}
                            alt={
                              mediaSubsection.media.placeholder === "Design Image 1"
                                ? "Player guidance through level layout and spatial flow"
                                : mediaSubsection.media.placeholder === "Design Image 2"
                                ? "Spatial tension created through narrow corridors and controlled visibility"
                                : "Design technique image"
                            }
                            className="w-full h-auto object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-40 bg-muted/30 rounded-lg border border-border/50 flex items-center justify-center p-4 shadow-lg">
                          <p className="text-muted-foreground text-sm text-center px-4">
                            {mediaSubsection.media?.placeholder || "Image placeholder"}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        );
      }))}
    </div>
  );
};

export default DevelopmentSection;

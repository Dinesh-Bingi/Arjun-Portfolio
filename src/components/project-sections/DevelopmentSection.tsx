import { DevelopmentSection as DevelopmentSectionType } from "@/data/projects/types";
import HighlightedText from "./HighlightedText";
import { registerVideo, unregisterVideo } from "@/utils/videoManager";
import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

interface DevelopmentSectionProps {
  section: DevelopmentSectionType;
  projectId?: string;
}

// Sabershot Production & Process Video Component with lazy loading
const SabershotProductionVideo = ({ 
  src, 
  fallbackImage, 
  placeholder,
  projectId
}: { 
  src: string; 
  fallbackImage?: string; 
  placeholder?: string;
  projectId?: string;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasError, setHasError] = useState(false);
  const wasPlayingRef = useRef(false); // Track if video was playing before visibility change
  const [showPlayOverlay, setShowPlayOverlay] = useState(false); // Track if play overlay should be visible

  // Reset video when project changes
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
      video.load();
      unregisterVideo(video);
      setIsVisible(false);
      setHasError(false);
      wasPlayingRef.current = false; // Reset playback tracking
    }
  }, [projectId, src]);

  // Lazy load video when it becomes visible
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "50px" }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  // Register video for single-play management
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isVisible) return;

    const handlePlay = () => {
      registerVideo(video);
    };

    video.addEventListener("play", handlePlay);

    return () => {
      video.removeEventListener("play", handlePlay);
      unregisterVideo(video);
    };
  }, [isVisible]);

  // Track playback state to resume only if video was previously playing
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isVisible) return;

    const handlePlay = () => {
      wasPlayingRef.current = true;
    };

    const handlePause = () => {
      // Only mark as not playing if pause wasn't caused by visibility change
      if (document.visibilityState === 'visible') {
        wasPlayingRef.current = false;
      }
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [isVisible]);

  // Handle video resume when tab becomes visible (Page Visibility API)
  // Browser automatically pauses on hide - we resume immediately on show for maximum continuity
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isVisible) return;

    const handleVisibilityChange = () => {
      // Only handle visibility becoming visible - let browser handle pause naturally
      if (document.visibilityState === 'visible') {
        // Resume immediately if video was playing, is paused, and not ended
        if (wasPlayingRef.current && video.paused && !video.ended) {
          // Immediate resume attempt - no delays for strongest continuity
          if (video.readyState >= 2) {
            video.play().catch(() => {
              // Gracefully handle autoplay restrictions
            });
          } else {
            // If not ready, wait for canplay and resume immediately
            const handleCanPlay = () => {
              video.play().catch(() => {});
              video.removeEventListener('canplay', handleCanPlay);
            };
            video.addEventListener('canplay', handleCanPlay, { once: true });
            // Also try to load if needed
            if (video.readyState === 0) {
              video.load();
            }
          }
        }
      } else {
        // Tab hidden - track that video was playing before browser pauses it
        if (!video.paused) {
          wasPlayingRef.current = true;
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isVisible]);

  // Track video play/pause state for overlay visibility
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isVisible) return;

    const handlePlay = () => {
      setShowPlayOverlay(false); // Hide overlay when playing
    };

    const handlePause = () => {
      // Only show overlay if video is paused and not ended
      setShowPlayOverlay(video.paused && !video.ended);
    };

    const handleEnded = () => {
      setShowPlayOverlay(false); // Hide overlay when video ends
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);

    // Initialize overlay state
    setShowPlayOverlay(video.paused && !video.ended);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
    };
  }, [isVisible]);

  // Handle click-to-play/pause for video
  const handleVideoClick = () => {
    const video = videoRef.current;
    if (!video || !isVisible) return;

    if (video.paused) {
      wasPlayingRef.current = true; // User wants to play - update tracking
      setShowPlayOverlay(false); // Hide overlay immediately
      video.play().catch(() => {
        // Ignore autoplay errors
      });
    } else {
      wasPlayingRef.current = false; // User manually paused - update tracking
      video.pause();
    }
  };

  return (
    <div 
      ref={containerRef}
      className="overflow-hidden sabershot-production-video relative"
      style={{
        borderRadius: '14px',
        border: '1px solid rgba(168, 85, 247, 0.25)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.1)',
      }}
    >
      {isVisible && !hasError ? (
        <>
          <video
            ref={videoRef}
            src={src}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
            className="w-full h-full object-cover cursor-pointer"
            style={{
              display: 'block',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            onClick={handleVideoClick}
            onPlay={(e) => registerVideo(e.currentTarget)}
            onLoadedData={(e) => registerVideo(e.currentTarget)}
            onError={() => {
              setHasError(true);
            }}
            aria-label={placeholder || "Production process video"}
          />
          
          {/* Play icon overlay - only visible when paused */}
          {showPlayOverlay && (
            <div
              className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
              onClick={handleVideoClick}
              aria-label="Play video"
            >
              <div className="w-16 h-16 rounded-full bg-primary/80 flex items-center justify-center transition-opacity duration-200 hover:bg-primary/90">
                <Play className="w-8 h-8 text-background fill-background ml-1" />
              </div>
            </div>
          )}
        </>
      ) : hasError && fallbackImage ? (
        <img
          src={fallbackImage}
          alt={placeholder || "Production process"}
          className="w-full h-full object-cover"
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      ) : (
        <div className="w-full h-full bg-muted/30 flex items-center justify-center">
          <p className="text-muted-foreground text-sm text-center px-4">
            {placeholder || "Loading video..."}
          </p>
        </div>
      )}
    </div>
  );
};

const DevelopmentSection = ({ section, projectId }: DevelopmentSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Handle click-to-play/pause for inline videos
  const handleInlineVideoClick = (e: React.MouseEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (video.paused) {
      video.dataset.wasPlaying = 'true'; // User wants to play - update tracking
      // Hide overlay immediately
      const overlay = video.parentElement?.querySelector('.video-play-overlay') as HTMLElement;
      if (overlay) overlay.style.display = 'none';
      video.play().catch(() => {
        // Ignore autoplay errors
      });
    } else {
      video.dataset.wasPlaying = 'false'; // User manually paused - update tracking
      video.pause();
    }
  };

  // Helper to handle inline video play/pause events for overlay
  const handleInlineVideoPlay = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    const overlay = video.parentElement?.querySelector('.video-play-overlay') as HTMLElement;
    if (overlay) overlay.style.display = 'none';
  };

  const handleInlineVideoPause = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    const overlay = video.parentElement?.querySelector('.video-play-overlay') as HTMLElement;
    // Only show overlay if video is paused and not ended
    if (overlay && video.paused && !video.ended) {
      overlay.style.display = 'flex';
    } else if (overlay) {
      overlay.style.display = 'none';
    }
  };

  const handleInlineVideoEnded = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    const overlay = video.parentElement?.querySelector('.video-play-overlay') as HTMLElement;
    if (overlay) overlay.style.display = 'none';
  };

  // Handle visibility for inline videos without refs (Page Visibility API)
  // Track playback state per video using data attribute for maximum continuity
  useEffect(() => {
    if (!sectionRef.current) return;

    const handleVisibilityChange = () => {
      // Only handle visibility becoming visible - let browser handle pause naturally
      if (document.visibilityState === 'visible') {
        const videos = sectionRef.current?.querySelectorAll('video[autoplay]') as NodeListOf<HTMLVideoElement>;
        if (!videos || videos.length === 0) return;

        videos.forEach((video) => {
          // Resume immediately if video was playing (tracked via data attribute), is paused, and not ended
          const wasPlaying = video.dataset.wasPlaying === 'true';
          if (wasPlaying && video.paused && !video.ended && video.hasAttribute('autoplay')) {
            // Immediate resume attempt - no delays for strongest continuity
            if (video.readyState >= 2) {
              video.play().catch(() => {
                // Gracefully handle autoplay restrictions
              });
            } else {
              // If not ready, wait for canplay and resume immediately
              const handleCanPlay = () => {
                video.play().catch(() => {});
                video.removeEventListener('canplay', handleCanPlay);
              };
              video.addEventListener('canplay', handleCanPlay, { once: true });
              // Also try to load if needed
              if (video.readyState === 0) {
                video.load();
              }
            }
          }
        });
      } else {
        // Tab hidden - track which videos were playing before browser pauses them
        const videos = sectionRef.current?.querySelectorAll('video[autoplay]') as NodeListOf<HTMLVideoElement>;
        videos?.forEach((video) => {
          if (!video.paused) {
            video.dataset.wasPlaying = 'true';
          }
        });
      }
    };

    // Also track play/pause events to update wasPlaying state
    const handlePlay = (e: Event) => {
      const video = e.target as HTMLVideoElement;
      if (document.visibilityState === 'visible') {
        video.dataset.wasPlaying = 'true';
      }
    };

    const handlePause = (e: Event) => {
      const video = e.target as HTMLVideoElement;
      // Only clear flag if pause is user-initiated (not visibility-related)
      if (document.visibilityState === 'visible') {
        video.dataset.wasPlaying = 'false';
      }
    };

    const videos = sectionRef.current.querySelectorAll('video[autoplay]');
    videos.forEach((video) => {
      video.addEventListener('play', handlePlay);
      video.addEventListener('pause', handlePause);
    });

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      videos.forEach((video) => {
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('pause', handlePause);
      });
    };
  }, []);

  // ... rest of component
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
  
  // Special handling for Sabershot Production & Process video
  const isSabershotProductionProcess = (subsection: any) =>
    section.title === "Pre-Production & Development Approach" &&
    subsection.title === "Production & Process" &&
    subsection.media?.type === "video";

  return (
    <div ref={sectionRef} className={`${isPuddleWhispersDesignTechniques ? 'mt-8 mb-6' : 'mt-12 mb-8'} ${(isJustMyDuckPreProduction || isJustMyDuckPostMortem) ? 'max-w-[1000px] mx-auto' : ''}`}>
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
                        isSabershotProductionProcess(subsection) ? (
                          // Sabershot Production & Process: Custom premium styling
                          <>
                            <style>{`
                              .sabershot-production-video {
                                width: 100%;
                                max-width: 320px;
                                height: auto;
                                aspect-ratio: 16 / 9;
                              }
                              @media (min-width: 768px) {
                                .sabershot-production-video {
                                  width: 360px;
                                  height: 200px;
                                  max-width: 360px;
                                }
                              }
                              @media (min-width: 1024px) {
                                .sabershot-production-video {
                                  width: 420px;
                                  height: 240px;
                                  max-width: 420px;
                                }
                              }
                            `}</style>
                            <SabershotProductionVideo 
                              src={subsection.media.src}
                              fallbackImage={(subsection.media as any).fallbackImage}
                              placeholder={subsection.media.placeholder}
                              projectId={projectId}
                            />
                          </>
                        ) : (
                          // Default video styling (Echoes of Stella)
                          <div className="w-full max-w-xs overflow-hidden rounded-lg border border-border/50 shadow-lg p-2 relative">
                            {subsection.media.src ? (
                              <>
                                <video
                                  src={subsection.media.src}
                                  autoPlay
                                  muted
                                  loop
                                  playsInline
                                  preload="metadata"
                                  disablePictureInPicture
                                  controlsList="nodownload nofullscreen noremoteplayback"
                                  className="w-full h-auto object-cover rounded-lg cursor-pointer"
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    borderRadius: 'inherit',
                                  }}
                                  onClick={handleInlineVideoClick}
                                  onPlay={(e) => {
                                    handleInlineVideoPlay(e);
                                    registerVideo(e.currentTarget);
                                    e.currentTarget.dataset.wasPlaying = 'true';
                                  }}
                                  onPause={handleInlineVideoPause}
                                  onEnded={handleInlineVideoEnded}
                                  onLoadedData={(e) => {
                                    registerVideo(e.currentTarget);
                                    // Initialize overlay state
                                    const video = e.currentTarget;
                                    const overlay = video.parentElement?.querySelector('.video-play-overlay') as HTMLElement;
                                    if (overlay) {
                                      overlay.style.display = (video.paused && !video.ended) ? 'flex' : 'none';
                                    }
                                  }}
                                  aria-label={subsection.media.placeholder || "Production process video"}
                                />
                                {/* Play icon overlay - only visible when paused */}
                                <div
                                  className="video-play-overlay absolute inset-0 flex items-center justify-center cursor-pointer z-10 rounded-lg"
                                  onClick={handleInlineVideoClick}
                                  style={{ display: 'none' }}
                                  aria-label="Play video"
                                >
                                  <div className="w-12 h-12 rounded-full bg-primary/80 flex items-center justify-center transition-opacity duration-200 hover:bg-primary/90">
                                    <Play className="w-6 h-6 text-background fill-background ml-0.5" />
                                  </div>
                                </div>
                              </>
                            ) : (
                              <div className="w-full h-64 bg-muted/30 rounded-lg flex items-center justify-center">
                                <p className="text-muted-foreground text-sm text-center px-4">
                                  {subsection.media.placeholder || "Video placeholder"}
                                </p>
                              </div>
                            )}
                          </div>
                        )
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
                        <div className="w-full max-w-xs overflow-hidden rounded-lg border border-border/50 shadow-lg p-2 relative">
                          <video
                            src={subsection.media.src}
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="metadata"
                            disablePictureInPicture
                            controlsList="nodownload nofullscreen noremoteplayback"
                            className="w-full h-auto object-cover rounded-lg cursor-pointer"
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              borderRadius: 'inherit',
                            }}
                            onClick={handleInlineVideoClick}
                            onPlay={(e) => {
                              handleInlineVideoPlay(e);
                              registerVideo(e.currentTarget);
                              e.currentTarget.dataset.wasPlaying = 'true';
                            }}
                            onPause={handleInlineVideoPause}
                            onEnded={handleInlineVideoEnded}
                            onLoadedData={(e) => {
                              registerVideo(e.currentTarget);
                              // Initialize overlay state
                              const video = e.currentTarget;
                              const overlay = video.parentElement?.querySelector('.video-play-overlay') as HTMLElement;
                              if (overlay) {
                                overlay.style.display = (video.paused && !video.ended) ? 'flex' : 'none';
                              }
                            }}
                            aria-label={subsection.media.src.includes("production-process") ? "Echoes of Stella production process" : "Level design process showing blockout, iteration, and playtesting"}
                          />
                          {/* Play icon overlay - only visible when paused */}
                          <div
                            className="video-play-overlay absolute inset-0 flex items-center justify-center cursor-pointer z-10 rounded-lg"
                            onClick={handleInlineVideoClick}
                            style={{ display: 'none' }}
                            aria-label="Play video"
                          >
                            <div className="w-12 h-12 rounded-full bg-primary/80 flex items-center justify-center transition-opacity duration-200 hover:bg-primary/90">
                              <Play className="w-6 h-6 text-background fill-background ml-0.5" />
                            </div>
                          </div>
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
                        <div className="w-full overflow-hidden rounded-lg border border-border/50 shadow-lg p-2 relative">
                          <video
                            src={mediaSubsection.media.src}
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="metadata"
                            disablePictureInPicture
                            controlsList="nodownload nofullscreen noremoteplayback"
                            className="w-full h-auto object-cover cursor-pointer rounded-lg"
                            onClick={handleInlineVideoClick}
                            onPlay={(e) => {
                              handleInlineVideoPlay(e);
                              registerVideo(e.currentTarget);
                              e.currentTarget.dataset.wasPlaying = 'true';
                            }}
                            onPause={handleInlineVideoPause}
                            onEnded={handleInlineVideoEnded}
                            onLoadedData={(e) => {
                              registerVideo(e.currentTarget);
                              // Initialize overlay state
                              const video = e.currentTarget;
                              const overlay = video.parentElement?.querySelector('.video-play-overlay') as HTMLElement;
                              if (overlay) {
                                overlay.style.display = (video.paused && !video.ended) ? 'flex' : 'none';
                              }
                            }}
                            aria-label="Level design process showing blockout, iteration, and playtesting"
                          />
                          {/* Play icon overlay - only visible when paused */}
                          <div
                            className="video-play-overlay absolute inset-0 flex items-center justify-center cursor-pointer z-10 rounded-lg"
                            onClick={handleInlineVideoClick}
                            style={{ display: 'none' }}
                            aria-label="Play video"
                          >
                            <div className="w-12 h-12 rounded-full bg-primary/80 flex items-center justify-center transition-opacity duration-200 hover:bg-primary/90">
                              <Play className="w-6 h-6 text-background fill-background ml-0.5" />
                            </div>
                          </div>
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

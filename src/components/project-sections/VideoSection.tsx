import { useRef, useEffect, useState } from "react";
import { Play } from "lucide-react";
import { VideoSection as VideoSectionType } from "@/data/projects/types";
import { registerVideo, unregisterVideo, getVideoSources } from "@/utils/videoManager";

interface VideoSectionProps {
  section: VideoSectionType;
  projectId?: string; // Add projectId to force reset on project change
}

const VideoSection = ({ section, projectId }: VideoSectionProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const wasPlayingRef = useRef(false); // Track if video was playing before visibility change
  const [showPlayOverlay, setShowPlayOverlay] = useState(false); // Track if play overlay should be visible

  // Reset video when section or project changes (project switch)
  useEffect(() => {
    const video = videoRef.current;
    
    // Reset state when video URL or project changes
    setIsVisible(false);
    setIsLoaded(false);
    wasPlayingRef.current = false; // Reset playback tracking

    if (video) {
      // Reset video when section or project changes
      video.pause();
      video.currentTime = 0;
      video.load();
      unregisterVideo(video);
    }

    return () => {
      // Cleanup: pause and reset on unmount
      if (video) {
        video.pause();
        video.currentTime = 0;
        unregisterVideo(video);
      }
      wasPlayingRef.current = false;
    };
  }, [section.videoUrl, projectId]); // Reset when video URL or project changes

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

  // Register video for single-play management and handle playback
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isVisible) return;

    const handlePlay = () => {
      registerVideo(video);
    };

    const handleLoadedData = () => {
      setIsLoaded(true);
      // Auto-play if configured
      if (section.autoPlay !== false) {
        video.play().catch(() => {
          // Ignore autoplay errors
        });
      }
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("loadeddata", handleLoadedData);

    // Ensure video loads when visible
    if (isVisible && video.readyState === 0) {
      video.load();
    }

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("loadeddata", handleLoadedData);
      unregisterVideo(video);
    };
  }, [isVisible, section.autoPlay]);

  // Track playback state to resume only if video was previously playing
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isVisible) return;

    const handlePlay = () => {
      wasPlayingRef.current = true;
    };

    const handlePause = () => {
      // Only mark as not playing if pause wasn't caused by visibility change
      // If visibility state is visible, this pause is likely user-initiated
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
        // Resume immediately if video was playing, is paused, not ended, and should autoplay
        if (wasPlayingRef.current && video.paused && !video.ended && section.autoPlay !== false && isLoaded) {
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
  }, [isVisible, isLoaded, section.autoPlay]);

  // Show placeholder if video URL is empty
  if (!section.videoUrl || section.videoUrl.trim() === "") {
    return (
      <div className="mb-8 flex justify-center">
        <div className="relative rounded-xl overflow-hidden border border-border/50 shadow-xl max-w-4xl w-full aspect-video bg-secondary/20 flex items-center justify-center">
          <div className="text-center">
            <p className="font-body text-sm text-muted-foreground">
              Gameplay / Walkthrough Video (Coming Soon)
            </p>
          </div>
        </div>
      </div>
    );
  }

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

  const sources = getVideoSources(section.videoUrl);

  return (
    <div ref={containerRef} className="mb-8 flex justify-center">
      <div className="relative rounded-xl overflow-hidden border border-border/50 shadow-xl max-w-4xl w-full aspect-video bg-secondary/20">
        {isVisible ? (
          <>
            <video
              ref={videoRef}
              className="w-full h-full object-cover cursor-pointer"
              autoPlay={section.autoPlay ?? true}
              loop={section.loop ?? true}
              muted={section.muted ?? true}
              playsInline
              preload="metadata"
              disablePictureInPicture
              controlsList="nodownload nofullscreen noremoteplayback"
              onClick={handleVideoClick}
            >
              <source src={sources.webm} type="video/webm" />
              <source src={sources.mp4} type="video/mp4" />
            </video>
            
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
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="font-body text-sm text-muted-foreground">Loading video...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoSection;

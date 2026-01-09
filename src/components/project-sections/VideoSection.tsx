import { useRef, useEffect, useState } from "react";
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

  // Reset video when section or project changes (project switch)
  useEffect(() => {
    const video = videoRef.current;
    
    // Reset state when video URL or project changes
    setIsVisible(false);
    setIsLoaded(false);

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

  const sources = getVideoSources(section.videoUrl);

  return (
    <div ref={containerRef} className="mb-8 flex justify-center">
      <div className="relative rounded-xl overflow-hidden border border-border/50 shadow-xl max-w-4xl w-full aspect-video bg-secondary/20">
        {isVisible ? (
        <video
          ref={videoRef}
            className="w-full h-full object-cover"
          autoPlay={section.autoPlay ?? true}
          loop={section.loop ?? true}
          muted={section.muted ?? true}
          playsInline
            preload="metadata"
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
            style={{ pointerEvents: 'none' }}
          >
            <source src={sources.webm} type="video/webm" />
            <source src={sources.mp4} type="video/mp4" />
          </video>
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

import { useRef } from "react";
import { VideoSection as VideoSectionType } from "@/data/projects/types";

interface VideoSectionProps {
  section: VideoSectionType;
}

const VideoSection = ({ section }: VideoSectionProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

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

  return (
    <div className="mb-8 flex justify-center">
      <div className="relative rounded-xl overflow-hidden border border-border/50 shadow-xl max-w-4xl w-full">
        <video
          ref={videoRef}
          src={section.videoUrl}
          className="w-full h-auto object-cover cursor-pointer"
          onClick={handleVideoClick}
          autoPlay={section.autoPlay ?? true}
          loop={section.loop ?? true}
          muted={section.muted ?? true}
          playsInline
        />
      </div>
    </div>
  );
};

export default VideoSection;

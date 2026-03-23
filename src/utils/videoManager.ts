// Video manager to ensure only one video plays at a time
let activeVideo: HTMLVideoElement | null = null;

export const registerVideo = (video: HTMLVideoElement) => {
  // Pause any currently playing video
  if (activeVideo && activeVideo !== video && !activeVideo.paused) {
    activeVideo.pause();
  }
  activeVideo = video;
};

export const unregisterVideo = (video: HTMLVideoElement) => {
  if (activeVideo === video) {
    activeVideo = null;
  }
};

export const pauseAllVideos = () => {
  if (activeVideo && !activeVideo.paused) {
    activeVideo.pause();
  }
  activeVideo = null;
};

// Helper to get video sources (WEBM primary, MP4 fallback)
export const getVideoSources = (videoUrl: string): { webm: string; mp4: string } => {
  const baseUrl = videoUrl.replace(/\.(mp4|webm)$/i, '');
  return {
    webm: `${baseUrl}.webm`,
    mp4: `${baseUrl}.mp4`,
  };
};





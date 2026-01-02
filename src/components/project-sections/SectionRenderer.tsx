import { ProjectSection } from "@/data/projects/types";
import VideoSection from "./VideoSection";
import TwoColumnSection from "./TwoColumnSection";
import ScreenshotGallerySection from "./ScreenshotGallerySection";
import TextSection from "./TextSection";
import ImageGridSection from "./ImageGridSection";
import LevelLayoutSection from "./LevelLayoutSection";
import LevelBeatsSection from "./LevelBeatsSection";
import GraphSection from "./GraphSection";
import DevelopmentSection from "./DevelopmentSection";
import PostMortemSection from "./PostMortemSection";
import CreditsSection from "./CreditsSection";

interface SectionRendererProps {
  section: ProjectSection;
}

const SectionRenderer = ({ section }: SectionRendererProps) => {
  switch (section.type) {
    case "video":
      return <VideoSection section={section} />;
    case "twoColumn":
      return <TwoColumnSection section={section} />;
    case "screenshotGallery":
      return <ScreenshotGallerySection section={section} />;
    case "text":
      return <TextSection section={section} />;
    case "imageGrid":
      return <ImageGridSection section={section} />;
    case "levelLayout":
      return <LevelLayoutSection section={section} />;
    case "levelBeats":
      return <LevelBeatsSection section={section} />;
    case "graph":
      return <GraphSection section={section} />;
    case "development":
      return <DevelopmentSection section={section} />;
    case "postMortem":
      return <PostMortemSection section={section} />;
    case "credits":
      return <CreditsSection section={section} />;
    case "overview":
    case "focusAreas":
    case "designPillars":
    case "custom":
      // These are handled within other sections or can be extended
      return null;
    default:
      return null;
  }
};

export default SectionRenderer;

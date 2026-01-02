import ScreenshotGallery from "../ScreenshotGallery";
import { ScreenshotGallerySection as ScreenshotGallerySectionType } from "@/data/projects/types";

interface ScreenshotGallerySectionProps {
  section: ScreenshotGallerySectionType;
}

const ScreenshotGallerySection = ({ section }: ScreenshotGallerySectionProps) => {
  return <ScreenshotGallery images={section.images} />;
};

export default ScreenshotGallerySection;

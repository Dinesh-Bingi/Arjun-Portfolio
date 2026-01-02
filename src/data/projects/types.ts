// Flexible project data types - each project can have any combination of sections

import { ReactNode } from "react";

// Base project info (required)
export interface ProjectBase {
  id: string;
  title: string;
  description: string;
  category: "personal" | "group";
  icon: string;
  thumbnailImage?: string;
  coverImage?: string;
  genre?: string;
}

// Section types - each section is optional and customizable per project
export interface VideoSection {
  type: "video";
  videoUrl: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
}

export interface OverviewSection {
  type: "overview";
  title?: string;
  paragraphs: Array<{
    text: string;
    highlights?: string[]; // Words to highlight with primary color
  }>;
}

export interface FocusAreasSection {
  type: "focusAreas";
  title?: string;
  items: Array<{
    label: string;
    description: string;
  }>;
}

export interface ScreenshotGallerySection {
  type: "screenshotGallery";
  images: string[];
}

export interface TextSection {
  type: "text";
  title: string;
  paragraphs: Array<{
    text: string;
    highlights?: string[];
  }>;
}

export interface DesignPillarsSection {
  type: "designPillars";
  title?: string;
  pillars: Array<{
    icon: string; // lucide icon name
    label: string;
  }>;
  documentLink?: {
    text: string;
    url: string;
  };
}

export interface ImageGridSection {
  type: "imageGrid";
  title?: string;
  description?: {
    text: string;
    highlights?: string[];
  };
  bulletPoints?: Array<{
    label: string;
    text: string;
  }>;
  images: Array<{
    src: string;
    alt: string;
    caption?: string;
  }>;
  columns?: 2 | 3 | 4;
}

export interface LevelLayoutSection {
  type: "levelLayout";
  title?: string;
  description?: Array<{
    text: string;
    highlights?: string[];
  }>;
  mapImage: string;
}

export interface LevelBeatsSection {
  type: "levelBeats";
  title?: string;
  phases: Array<{
    name: string;
    beats: Array<{
      number: number;
      label: string;
    }>;
  }>;
  images: string[];
}

export interface GraphSection {
  type: "graph";
  title: string;
  imageUrl: string;
}

export interface DevelopmentSection {
  type: "development";
  title?: string;
  intro?: {
    text: string;
    highlights?: string[];
  };
  subsections: Array<{
    title: string;
    paragraphs: Array<{
      text: string;
      highlights?: string[];
    }>;
    media?: {
      type: "image" | "video";
      src: string;
      placeholder?: string;
    };
  }>;
}

export interface PostMortemSection {
  type: "postMortem";
  title?: string;
  paragraphs: Array<{
    text: string;
    highlights?: string[];
  }>;
}

export interface CreditsSection {
  type: "credits";
  title?: string;
  items: Array<{
    label: string;
    credit: string;
  }>;
}

export interface TwoColumnSection {
  type: "twoColumn";
  left: {
    title: string;
    paragraphs?: Array<{
      text: string;
      highlights?: string[];
    }>;
    bulletPoints?: Array<{
      label: string;
      text: string;
    }>;
  };
  right: {
    title: string;
    content?: ReactNode;
    paragraphs?: Array<{
      text: string;
      highlights?: string[];
    }>;
    bulletPoints?: Array<{
      label: string;
      text: string;
    }>;
    pillars?: Array<{
      icon: string;
      label: string;
    }>;
    documentLink?: {
      text: string;
      url: string;
    };
  };
}

export interface CustomSection {
  type: "custom";
  title?: string;
  component: string; // Component name to render
  props?: Record<string, unknown>;
}

// Union of all section types
export type ProjectSection =
  | VideoSection
  | OverviewSection
  | FocusAreasSection
  | ScreenshotGallerySection
  | TextSection
  | DesignPillarsSection
  | ImageGridSection
  | LevelLayoutSection
  | LevelBeatsSection
  | GraphSection
  | DevelopmentSection
  | PostMortemSection
  | CreditsSection
  | TwoColumnSection
  | CustomSection;

// Complete project with flexible sections
export interface Project extends ProjectBase {
  sections: ProjectSection[];
  // Allow any additional custom fields per project
  [key: string]: unknown;
}

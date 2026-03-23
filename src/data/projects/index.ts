// Central export for all projects
// Each project is fully independent with its own data structure

import { Project } from "./types";
import { theLightRemains } from "./the-light-remains";
import { metroDescent } from "./Echoes-of-stella";
import { sabershotJackOfAllBlades } from "./sabershot-jack-of-all-blades";
import { justMyDuck } from "./just-my-duck";
import { sushi2Go } from "./sushi-2-go";
import { puddleWhispers } from "./puddle-whispers";
import { theLostUnderworld } from "./the-lost-underworld";
import { letMeForget } from "./let-me-forget";

// Export all projects
export const projects: Project[] = [
  // theLostUnderworld,
  theLightRemains,
  // letMeForget,
  metroDescent,
  sabershotJackOfAllBlades,
  puddleWhispers,
  justMyDuck,
  sushi2Go,
];

// Helper functions
export const getProjectById = (id: string): Project | undefined => 
  projects.find(p => p.id === id);

export const getProjectsByCategory = (category: Project["category"]): Project[] => 
  projects.filter(p => p.category === category);

// Icon component helper
import { Gamepad2, Map, Mountain, Compass, Building, Layers, BookOpen } from "lucide-react";
import React from "react";

export const getIconComponent = (iconName: string): React.ComponentType<{ className?: string }> | undefined => {
  const icons: Record<string, React.ComponentType<{ className?: string }>> = {
    Gamepad2,
    Map,
    Mountain,
    Compass,
    Building,
    Layers,
    BookOpen,
  };
  return icons[iconName];
};

// Re-export types
export type { Project, ProjectSection } from "./types";


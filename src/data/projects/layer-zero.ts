import { Project } from "./types";

export const layerZero: Project = {
  id: "layer-zero",
  title: "Layer Zero",
  description: "Puzzle platformer with dimensional shifting mechanics",
  category: "group",
  icon: "Layers",
  genre: "Puzzle Platformer",
  thumbnailImage: "/placeholder.svg",
  coverImage: "/placeholder.svg",
  
  // Minimal sections - can be expanded later
  sections: [
    {
      type: "twoColumn",
      left: {
        title: "Project Overview",
        paragraphs: [
          {
            text: "An innovative puzzle platformer where players shift between dimensional layers to solve intricate environmental puzzles.",
            highlights: ["dimensional layers", "environmental puzzles"],
          },
          {
            text: "Each layer presents the same space differently, requiring creative thinking and precise timing.",
            highlights: ["creative thinking", "precise timing"],
          },
        ],
      },
      right: {
        title: "Design Focus",
        bulletPoints: [
          {
            label: "Puzzle Design:",
            text: "Created multi-layered puzzles that require players to think in three dimensions.",
          },
          {
            label: "Level Flow:",
            text: "Designed clear progression through increasingly complex puzzle mechanics.",
          },
        ],
      },
    },
  ],
};

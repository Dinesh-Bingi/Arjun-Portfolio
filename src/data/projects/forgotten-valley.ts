import { Project } from "./types";

export const forgottenValley: Project = {
  id: "forgotten-valley",
  title: "Forgotten Valley",
  description: "Open-world exploration zone with dynamic weather systems",
  category: "personal",
  icon: "Map",
  genre: "Open World - Adventure",
  thumbnailImage: "/placeholder.svg",
  coverImage: "/placeholder.svg",
  
  // This project has fewer sections - demonstrating flexibility
  sections: [
    {
      type: "twoColumn",
      left: {
        title: "Project Overview",
        paragraphs: [
          {
            text: "An expansive open-world environment featuring dynamic weather systems and time-of-day progression.",
            highlights: ["dynamic weather systems", "time-of-day progression"],
          },
          {
            text: "The valley rewards exploration with hidden caves, ancient ruins, and emergent gameplay opportunities scattered throughout the landscape.",
            highlights: ["hidden caves", "ancient ruins", "emergent gameplay"],
          },
        ],
      },
      right: {
        title: "Focus Areas",
        bulletPoints: [
          {
            label: "Open World Design:",
            text: "Created expansive environments with multiple points of interest and organic discovery moments.",
          },
          {
            label: "Dynamic Systems:",
            text: "Implemented weather and time systems that affect gameplay and atmosphere.",
          },
        ],
      },
    },
    
    {
      type: "text",
      title: "Design Philosophy",
      paragraphs: [
        {
          text: "The Forgotten Valley prioritizes player freedom and organic discovery over guided experiences.",
          highlights: ["player freedom", "organic discovery"],
        },
      ],
    },
  ],
};

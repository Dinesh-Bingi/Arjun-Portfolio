import { Project } from "./types";

export const justMyDuck: Project = {
  id: "just-my-duck",
  title: "Just My Duck",
  description: "A light-hearted, bite-sized retro RPG delivering a short, narrative-driven experience centered on exploration, NPC interactions, turn-based combat, and multiple endings within a single medieval-inspired village.",
  category: "group",
  icon: "Gamepad2",
  genre: "Retro RPG",
  thumbnailImage: "/images/just-my-duck-card.jpg",
  coverImage: "/images/just-my-duck-cover.jpg",
  heroVideo: null,
  
  sections: [
    // Video Section
    {
      type: "video",
      videoUrl: "/videos/just-my-duck-walkthrough.mp4",
      autoPlay: true,
      loop: true,
      muted: true,
    },
    
    // Two Column: Overview + Focus Areas
    {
      type: "twoColumn",
      left: {
        title: "Project Overview",
        paragraphs: [
          {
            text: "Just My Duck is a light-hearted, bite-sized retro RPG developed as a group project (GP2). It delivers a short, narrative-driven experience centered on exploration, NPC interactions, turn-based combat, and multiple endings within a single medieval-inspired village.",
            highlights: ["Just My Duck", "retro RPG", "group project", "GP2", "narrative-driven experience", "exploration", "NPC interactions", "turn-based combat", "multiple endings", "medieval-inspired village"],
          },
          {
            text: "As the Level Designer, I focused on village layout, player flow, and spatial storytelling. The level was scoped to encourage exploration, readable navigation, balanced pacing, and meaningful backtracking across both chapters.",
            highlights: ["Level Designer", "village layout", "player flow", "spatial storytelling", "exploration", "readable navigation", "balanced pacing", "meaningful backtracking"],
          },
          {
            text: "In Chapter 2, the same space is recontextualized with updated dialogue and events, evolving story and gameplay without increasing scope, complexity, or production cost for the team.",
            highlights: ["Chapter 2", "recontextualized", "updated dialogue", "events", "evolving story", "gameplay"],
          },
        ],
      },
      right: {
        title: "Focus Areas",
        bulletPoints: [
          {
            label: "Level Design",
            text: "Designed the full village layout using a hub-and-path structure to control pacing, guide player progression, and support narrative beats across multiple chapters.",
          },
          {
            label: "Player Flow & Pacing",
            text: "Structured the level into distinct zones (entry, village hub, and boss area) to gradually build engagement, encourage exploration, and create a clear sense of progression.",
          },
          {
            label: "Encounter & NPC Placement",
            text: "Carefully positioned NPCs, side quests, and fixed combat encounters to avoid random battles, reduce player fatigue, and maintain a smooth gameplay rhythm.",
          },
        ],
      },
    },
    
    // Screenshots Section
    {
      type: "screenshotGallery",
      images: [
        "/images/just-my-duck-01.jpg",
        "/images/just-my-duck-02.jpg",
        "/images/just-my-duck-03.jpg",
        "/images/just-my-duck-04.jpg",
        "/images/just-my-duck-05.jpg",
        "/images/just-my-duck-06.jpg",
        "/images/just-my-duck-07.jpg",
        "/images/just-my-duck-08.jpg",
        "/images/just-my-duck-09.jpg",
        "/images/just-my-duck-10.png",
        "/images/just-my-duck-11.png",
        "/images/just-my-duck-12.png",
        "/images/just-my-duck-13.png",
        "/images/just-my-duck-14.png",
        "/images/just-my-duck-15.png",
      ],
    },
    
    // Image Grid (after Screenshots)
    {
      type: "imageGrid",
      images: [],
      columns: 2,
    },
    
    // Two Column: Narrative Summary + Design Pillars
    {
      type: "twoColumn",
      left: {
        title: "Level Design",
        paragraphs: [
          {
            text: "The village level is designed as a compact, readable space divided into three main zones: an entry area, a central village hub, and a boss-focused end zone.",
            highlights: ["village level", "compact", "readable space", "three main zones", "entry area", "central village hub", "boss-focused end zone"],
          },
          {
            text: "This structure introduces exploration and NPC interaction naturally, builds engagement, and delivers clear narrative progression without overwhelming the player.",
            highlights: ["exploration", "NPC interaction", "engagement", "narrative progression"],
          },
          {
            text: "Backtracking and optional paths allow the same environment to evolve across chapters through updated dialogue and events, creating a cohesive and replayable experience.",
            highlights: ["Backtracking", "optional paths", "evolve across chapters", "updated dialogue", "events", "cohesive", "replayable experience"],
          },
        ],
      },
      right: {
        title: "Design Pillars",
        pillars: [
          { icon: "Compass", label: "Exploration" },
          { icon: "Gamepad2", label: "Pacing" },
          { icon: "BookOpen", label: "Narrative Through Space" },
        ],
        documentLink: {
          text: "Level Design Document",
          url: "https://drive.google.com/file/d/1PM31rbraqbhldCYnWS2R-um1l6U6rhyf/view?usp=sharing",
        },
      },
    },
    
    // Image Grid (after Design Pillars)
    {
      type: "imageGrid",
      images: [],
      columns: 2,
    },
    
    // Level Design
    {
      type: "levelLayout",
      title: "Level Structure Summary",
      description: [
        {
          text: "The village level is designed as a compact, readable space divided into three main zones: an entry area, a central village hub, and a boss-focused end zone.",
          highlights: ["village level", "compact", "readable space", "three main zones", "entry area", "central village hub", "boss-focused end zone"],
        },
        {
          text: "This structure introduces exploration and NPC interaction naturally, builds engagement, and delivers clear narrative progression without overwhelming the player. Backtracking and optional paths allow the same environment to evolve across chapters through updated dialogue and events, creating a cohesive and replayable experience.",
          highlights: ["exploration", "NPC interaction", "engagement", "narrative progression", "Backtracking", "optional paths", "evolve across chapters"],
        },
        {
          text: "The level features a medieval-inspired village divided into distinct zones, with fixed encounters and NPC placement controlling pacing. The same level space is revisited in Chapter 2 with narrative changes.",
          highlights: ["medieval-inspired village", "distinct zones", "fixed encounters", "NPC placement", "pacing", "Chapter 2", "narrative changes"],
        },
      ],
      mapImage: "",
    },
    
    // Pre-Production & Development Approach
    {
      type: "development",
      title: "Pre-Production & Development Approach",
      intro: {
        text: "For Just My Duck, my development approach focused on structured planning, iteration, and collaboration within a team-based production environment. I treated the project as a small-scale studio assignment, aligning my level design decisions with narrative goals, gameplay requirements, and production constraints established during pre-production.",
        highlights: ["Just My Duck", "structured planning", "iteration", "collaboration", "team-based production environment", "small-scale studio assignment", "level design decisions", "narrative goals", "gameplay requirements", "production constraints", "pre-production"],
      },
      subsections: [
        {
          title: "Planning & Level Development Process",
          paragraphs: [
            {
              text: "Week 1: Reviewed documentation and planned the village layout and flow.",
              highlights: ["Week 1", "Reviewed documentation", "village layout", "flow"],
            },
            {
              text: "Week 2: Created a rough blockout to test scale and navigation.",
              highlights: ["Week 2", "rough blockout", "scale", "navigation"],
            },
            {
              text: "Week 3: Refined the blockout based on feedback and playtesting.",
              highlights: ["Week 3", "Refined", "blockout", "feedback", "playtesting"],
            },
          ],
          media: {
            type: "image",
            src: "/images/just-my-duck-planning.png",
            placeholder: "Planning and blockout process",
          },
        },
        {
          title: "Production & Process",
          paragraphs: [
            {
              text: "For Just My Duck, I followed a simple and organized level design process. I started by reading the Game Design Document (GDD) to understand the story, gameplay needs, and level goals.",
              highlights: ["Just My Duck", "simple and organized level design process", "Game Design Document", "GDD", "story", "gameplay needs", "level goals"],
            },
            {
              text: "I then created a rough blockout of the village to check scale, player movement, and overall flow. I playtested the level often and made small changes based on what worked and what didn't.",
              highlights: ["rough blockout", "village", "scale", "player movement", "flow", "playtested", "small changes"],
            },
            {
              text: "After the layout felt right, I refined the blockout, improved readability, and added details to better support exploration, backtracking, and story progression.",
              highlights: ["refined the blockout", "readability", "details", "exploration", "backtracking", "story progression"],
            },
          ],
          media: {
            type: "video",
            src: "/videos/just-my-duck-process.mp4",
            placeholder: "Production process video",
          },
        },
      ],
    },
    
    // Experience the Level CTA
    {
      type: "levelExperienceCTA",
      url: "https://drive.google.com/file/d/1TAOmICkcJmmFikTHnOV5TBlREqs_UtsL/view?usp=sharing",
      imageUrl: "/images/cta-reference.png",
    },
    
    // Post-Mortem – Insights
    {
      type: "development",
      title: "Post-Mortem – Insights",
      subsections: [
        {
          title: "",
          paragraphs: [
            {
              text: "With more time, additional playtesting would have helped further refine player flow and pacing, especially in later village sections. More iteration on optional paths and side content connections would also strengthen progression clarity.",
              highlights: ["playtesting", "player flow", "pacing", "later village sections", "optional paths", "side content connections", "progression clarity"],
            },
            {
              text: "This project strengthened skills in planning, blockout iteration, and designing exploration-focused spaces within a small scope. It reinforced working within deadlines, incorporating feedback, and making clear design decisions in a team environment.",
              highlights: ["planning", "blockout iteration", "exploration-focused spaces", "small scope", "deadlines", "incorporating feedback", "clear design decisions", "team environment"],
            },
          ],
        },
      ],
    },
    
    // Credits
    {
      type: "credits",
      title: "Credits",
      items: [
        { label: "Developed by", credit: "Developed as part of a student team at Futuregames." },
      ],
    },
  ],
};

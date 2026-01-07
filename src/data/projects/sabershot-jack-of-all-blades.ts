import { Project } from "./types";

export const sabershotJackOfAllBlades: Project = {
  id: "sabershot-jack-of-all-blades",
  title: "Sabershot – Jack of All Blades",
  description: "",
  category: "group",
  icon: "Gamepad2",
  genre: "",
  thumbnailImage: "/images/sabershot-card.jpg",
  coverImage: "/images/sabershot-cover.jpg",
  heroVideo: {
    src: "/videos/sabershot-gameplay.mp4",
    placeholder: false,
  },
  
  sections: [
    // Video Section
    {
      type: "video",
      videoUrl: "/videos/sabershot-gameplay.mp4",
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
            text: "Jack of All Blades is a dark Victorian action game developed as part of our GP4 group project. I worked mainly on level design and technical level design, and also helped shape the overall gameplay flow, from the opening sequence to the final boss encounter.",
            highlights: ["Jack of All Blades", "dark Victorian action game", "GP4 group project", "level design", "technical level design", "gameplay flow"],
          },
          {
            text: "The level was built as a large, branching layout that gives players different routes, such as rooftops and sewers, while reconnecting later to maintain a clear and structured progression. Each area was designed to support specific gameplay moments, pacing changes, and narrative beats throughout the experience.",
            highlights: ["large, branching layout", "different routes", "rooftops", "sewers", "gameplay moments", "pacing changes", "narrative beats"],
          },
          {
            text: "All blockout work was created directly in Unreal Engine using simple cube geometry. Over a three-week period, I iterated on the layout, planned gameplay progression, set up level streaming, and added light set-dressing to improve readability, performance, and flow.",
            highlights: ["blockout work", "Unreal Engine", "simple cube geometry", "three-week period", "level streaming", "readability", "performance", "flow"],
          },
        ],
      },
      right: {
        title: "Focus Areas",
        bulletPoints: [
          {
            label: "Level Design (Blockout & Readability)",
            text: "Designed a large, branching level layout with a clear structure and readable flow. The blockout focused on scale, proportions, and navigation, using simple geometry to ensure combat spaces, traversal paths, and landmarks were easy to read and understand during gameplay.",
          },
          {
            label: "Gameplay Flow & Progression",
            text: "Planned the gameplay experience from start to finish, deciding what the player encounters at each stage. This included early introduction areas, mid-game challenges, branching routes, pacing shifts, and a steady buildup toward the final boss encounter.",
          },
          {
            label: "Technical Level Design",
            text: "Set up level streaming to support the scale of the map, dividing the level into sections to manage performance while keeping transitions smooth and hidden from the player.",
          },
        ],
      },
    },
    
    // Image Grid (after Focus Areas)
    {
      type: "imageGrid",
      images: [],
      columns: 2,
    },
    
    // Overview Screenshots
    {
      type: "screenshotGallery",
      images: [
        "/images/sabershot-screenshot-01.jpg",
        "/images/sabershot-screenshot-02.jpg",
        "/images/sabershot-screenshot-03.jpg",
        "/images/sabershot-screenshot-04.jpg",
        "/images/sabershot-screenshot-05.jpg",
        "/images/sabershot-screenshot-06.jpg",
        "/images/sabershot-screenshot-07.jpg",
        "/images/sabershot-screenshot-08.jpg",
        "/images/sabershot-screenshot-09.jpg",
        "/images/sabershot-screenshot-10.jpg",
        "/images/sabershot-screenshot-11.jpg",
      ],
    },
    
    // Game Design Section
    {
      type: "development",
      title: "Game Design",
      subsections: [
        {
          title: "",
          paragraphs: [
            {
              text: "For Jack of All Blades, the game design focuses on delivering a story-driven action experience set in a dark Victorian world. Instead of relying on heavy dialogue or cutscenes, the goal was to let players understand the story through gameplay, level progression, and environmental cues as they move through the world.",
              highlights: ["story-driven action experience", "dark Victorian world", "gameplay", "level progression", "environmental cues"],
            },
            {
              text: "I worked on shaping the gameplay structure from start to finish, planning how combat, exploration, and tension unfold across the experience. The journey gradually shifts from controlled, guided spaces to more dangerous and revealing areas, building intensity toward the final confrontation. All design decisions were guided by three core pillars: Combat, Exploration, and Storytelling.",
              highlights: ["gameplay structure", "combat", "exploration", "tension", "final confrontation", "Combat", "Exploration", "Storytelling"],
            },
          ],
          media: {
            type: "image",
            src: "",
            placeholder: "Game Design Media",
          },
        },
      ],
    },
    
    // Two Column: Narrative Summary + Design Pillars
    {
      type: "twoColumn",
      left: {
        title: "Narrative Summary",
        paragraphs: [
          {
            text: "Jack, a skilled mercenary, enters a decaying Victorian city controlled by a secret cult called The Undying Eclipse, believing they are responsible for his family's disappearance and driven by revenge.",
            highlights: ["Jack", "skilled mercenary", "decaying Victorian city", "secret cult", "The Undying Eclipse", "family's disappearance", "revenge"],
          },
          {
            text: "As he moves deeper through abandoned districts and ritual spaces, the environment reveals the cult's manipulation, control, and hidden influence over the city.",
            highlights: ["abandoned districts", "ritual spaces", "cult's manipulation", "control", "hidden influence"],
          },
          {
            text: "By the end, Jack confronts the truth behind the ritual and his own role in it, leaving the story focused on choice, consequence, and identity.",
            highlights: ["truth", "ritual", "choice", "consequence", "identity"],
          },
        ],
      },
      right: {
        title: "Design Pillars",
        pillars: [
          { icon: "Gamepad2", label: "Combat" },
          { icon: "Compass", label: "Exploration" },
          { icon: "BookOpen", label: "Storytelling" },
        ],
        documentLink: {
          text: "Link to Game Design Document",
          url: "",
        },
      },
    },
    
    // Image Grid (after Design Pillars)
    {
      type: "imageGrid",
      images: [],
      columns: 2,
    },
    
    // Level Streaming
    {
      type: "text",
      title: "Level Streaming",
      paragraphs: [
        {
          text: "I implemented level streaming to support the large-scale map and its branching structure. The level was divided into logical sections based on player progression, enabling seamless loading and unloading as players moved through the world.",
          highlights: ["level streaming", "large-scale map", "branching structure", "player progression"],
        },
        {
          text: "Streaming volumes and logical splits were strategically placed around corridors, turns, and transition spaces to hide loading operations and maintain immersion. This approach optimized performance while preserving a seamless experience across extended sightlines and multiple interconnected paths.",
          highlights: ["Streaming volumes", "corridors", "turns", "transition spaces", "immersion", "performance", "seamless"],
        },
      ],
    },
    
    // Image Grid (after Level Streaming)
    {
      type: "imageGrid",
      images: [],
      columns: 2,
    },
    
    // Level Design
    {
      type: "levelLayout",
      title: "Level Design",
      description: [
        {
          text: "The level was designed as a structured experience divided into clear stages that guide the player from introduction to climax. I focused on creating a natural flow that slowly builds tension, introduces challenges step by step, and supports the narrative through progression rather than explicit explanation.",
          highlights: ["structured experience", "clear stages", "introduction to climax", "natural flow", "tension", "narrative"],
        },
        {
          text: "The layout blends exploration, combat spaces, and transition areas to maintain pacing and player engagement. Each section was planned to feel readable and intuitive, using space, scale, and layout to guide movement and decision-making. The goal was to keep the player oriented, motivated to explore, and emotionally invested as they move through the level.",
          highlights: ["exploration", "combat spaces", "transition areas", "pacing", "player engagement", "readable", "intuitive"],
        },
      ],
      mapImage: "/images/sabershot-level-layout-map.png",
    },
    
    // Design Techniques
    {
      type: "development",
      title: "Design Techniques",
      subsections: [
        {
          title: "Release & Compression",
          paragraphs: [
            {
              text: "The space begins more open and readable, then gradually compresses as the player moves toward the narrow corridor and archway. This shift reduces visibility, increases focus, and builds tension before guiding the player forward into the next area.",
              highlights: ["open and readable", "gradually compresses", "narrow corridor", "archway", "reduces visibility", "increases focus", "builds tension"],
            },
          ],
          media: {
            type: "image",
            src: "/images/design-technique-release-compression.png",
            placeholder: "Release & Compression design technique",
          },
        },
        {
          title: "Branch Endpoint",
          paragraphs: [
            {
              text: "This rooftop marks the end of a branching path. From here, the player can clearly see how the routes reconnect and where to go next, helping them re-orient and continue forward without confusion.",
              highlights: ["rooftop", "branching path", "routes reconnect", "re-orient", "without confusion"],
            },
          ],
          media: {
            type: "image",
            src: "/images/design-technique-branch-endpoint.png",
            placeholder: "Branch Endpoint design technique",
          },
        },
      ],
    },
    
    // Pacing & Tension Graph
    {
      type: "graph",
      title: "Pacing & Tension",
      imageUrl: "/images/sabershot-pacing-tension-graph.png",
    },
    
    // Level Beats & Walkthrough
    {
      type: "levelBeats",
      title: "Level Beats & Walkthrough",
      phases: [
        {
          name: "Act 1 – Entry into the Cursed City",
          beats: [
            { number: 1, label: "Player Arrival – Fog-covered streets" },
            { number: 2, label: "Market Ambush – First major combat" },
            { number: 3, label: "Cult Signs – Environmental hints" },
          ],
        },
        {
          name: "Act 2 – Up and Down Tension",
          beats: [
            { number: 4, label: "Open Exploration – Branching paths" },
            { number: 5, label: "Combat Escalation – Tighter and pressure" },
            { number: 6, label: "Transition Space – Rooftops or sewers" },
          ],
        },
        {
          name: "Act 3 – Truth & Consequence",
          beats: [
            { number: 7, label: "Point of No Return – into cult territory" },
            { number: 8, label: "Final Approach – combat buildup" },
            { number: 9, label: "Ritual Chamber – Boss fight climax" },
          ],
        },
      ],
      images: [
        "/images/sabershot-level-beat-01.jpg",
        "/images/sabershot-level-beat-02.jpg",
        "/images/sabershot-level-beat-03.jpg",
        "/images/sabershot-level-beat-04.jpg",
        "/images/sabershot-level-beat-05.jpg",
        "/images/sabershot-level-beat-06.jpg",
        "/images/sabershot-level-beat-07.jpg",
        "/images/sabershot-level-beat-08.jpg",
        "/images/sabershot-level-beat-09.jpg",
      ],
    },
    
    // Pre-Production & Development Approach
    {
      type: "development",
      title: "Pre-Production & Development Approach",
      subsections: [
        {
          title: "Planning & Development Breakdown",
          paragraphs: [
            {
              text: "Week 1: Research, references, and documentation (GDD & LDD)",
              highlights: ["Week 1:", "Research", "references", "documentation", "GDD", "LDD"],
            },
            {
              text: "Week 2: Prototyping and validating core gameplay and level ideas",
              highlights: ["Week 2:", "Prototyping", "validating", "core gameplay", "level ideas"],
            },
            {
              text: "Week 3: Creating the initial rough blockout of the level",
              highlights: ["Week 3:", "initial rough blockout"],
            },
            {
              text: "Week 4: Refining the blockout for flow, scale, and clarity, while adding basic set dressing, setting up level streaming, and applying early lighting for readability",
              highlights: ["Week 4:", "Refining", "blockout", "flow", "scale", "clarity", "set dressing", "level streaming", "lighting", "readability"],
            },
          ],
          media: {
            type: "image",
            src: "/images/sabershot-planning-development.png",
            placeholder: "Planning & Development Breakdown Image",
          },
        },
        {
          title: "Production & Process",
          paragraphs: [
            {
              text: "For this project, I followed a clear and practical level design workflow as part of a real group production. I began by reviewing and contributing to documentation such as the GDD to understand the level goals, gameplay needs, and narrative context before moving into production.",
              highlights: ["clear and practical level design workflow", "real group production", "documentation", "GDD", "level goals", "gameplay needs", "narrative context"],
            },
            {
              text: "I then created a rough blockout of the full level to test scale, layout, and overall feel. During this phase, I iterated frequently and ran playtests to check player flow, readability, and pacing. Once the layout felt solid, I moved into a refined blockout stage, adding clearer structure, basic set dressing, level streaming, and early lighting to better communicate intent and support the full game experience.",
              highlights: ["rough blockout", "scale", "layout", "iterated", "playtests", "player flow", "readability", "pacing", "refined blockout", "set dressing", "level streaming", "lighting"],
            },
          ],
          media: {
            type: "image",
            src: "/images/projects/sabershot/production-process.jpg",
            placeholder: "Production & Process Image",
          },
        },
      ],
    },
    
    // Experience the Level CTA
    {
      type: "levelExperienceCTA",
      url: "https://your-playable-build-link-here",
      imageUrl: "/images/cta-reference.png",
    },
    
    // Post-Mortem – Insights (combined with Current Status & Reflection)
    {
      type: "development",
      title: "Post-Mortem – Insights",
      subsections: [
        {
          title: "",
          paragraphs: [
            {
              text: "Looking back, the biggest learning from this project was managing dependencies in a group environment. While my level design work was completed on time, delays in enemy mechanics affected overall progress. This reinforced the importance of early system integration, clear communication, and planning for risks when multiple disciplines depend on each other.",
              highlights: ["managing dependencies", "group environment", "level design work", "enemy mechanics", "early system integration", "clear communication", "planning for risks"],
            },
          ],
        },
        {
          title: "Current Status & Reflection",
          paragraphs: [
            {
              text: "The project is still in progress, and responsibility for completing the remaining enemy mechanics has now been handed over to me. While this was not part of my original role, taking ownership of this task has been a valuable learning experience. It has pushed me to better understand gameplay systems and how enemy behaviour connects with level design.",
              highlights: ["still in progress", "enemy mechanics", "original role", "taking ownership", "valuable learning experience", "gameplay systems", "enemy behaviour", "level design"],
            },
            {
              text: "Overall, this situation helped me grow in adaptability, problem-solving, and responsibility within a real group production setting.",
              highlights: ["adaptability", "problem-solving", "responsibility", "real group production setting"],
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
        { label: "Developed by", credit: "a team of 8 students at Futuregames" },
      ],
    },
  ],
};

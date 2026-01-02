import { Project } from "./types";

export const theLightRemains: Project = {
  id: "the-light-remains",
  title: "The Light Remains",
  description: "A third-person exploration adventure through mysterious landscapes",
  category: "personal",
  icon: "Gamepad2",
  genre: "Third Person · Exploration Adventure",
  thumbnailImage: "/images/the-light-remains-thumb.jpg",
  coverImage: "/images/the-light-remains-cover.jpg",
  
  sections: [
    // Video Section
    {
      type: "video",
      videoUrl: "/videos/the-light-remains-gameplay.mp4",
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
            text: "The Light Remains is a solo third-person action-adventure project made in Unreal Engine 5.",
            highlights: ["The Light Remains", "solo", "Unreal Engine 5"],
          },
          {
            text: "The main focus of this project is level design, exploration, and environment storytelling. Player guidance is done using lighting, paths, and landmarks, without heavy UI.",
            highlights: ["level design", "exploration", "environment storytelling"],
          },
          {
            text: "The project was completed in ~30-minute playable experience set in floating islands and dangerous traversal areas.",
            highlights: ["~30-minute playable experience"],
          },
        ],
      },
      right: {
        title: "Focus Areas",
        bulletPoints: [
          {
            label: "Level Design & Player Flow:",
            text: "Designed the full level from start to finish, focusing on clear paths, vertical traversal, exploration routes, and a strong sense of progression toward the final goal.",
          },
          {
            label: "Environmental Storytelling & Guidance:",
            text: "Told the story through the environment using lighting, landmarks, broken paths, and world composition—guiding the player naturally without maps or heavy UI.",
          },
          {
            label: "Blockout & Blueprint Implementation:",
            text: "Built the level mainly using Unreal Engine's modeling tools, with a few custom props made in Maya. Implemented gameplay logic using Blueprints, including triggers, dialogue, sound, and object visibility tied to player progression.",
          },
        ],
      },
    },
    
    // Screenshot Gallery
    {
      type: "screenshotGallery",
      images: [
        "/images/screenshot-01.png",
        "/images/screenshot-02.jpg",
        "/images/screenshot-03.jpg",
        "/images/screenshot-04.jpg",
        "/images/screenshot-05.jpg",
        "/images/screenshot-06.jpg",
        "/images/screenshot-07.jpg",
        "/images/screenshot-08.jpg",
        "/images/screenshot-09.jpg",
        "/images/screenshot-10.jpg",
      ],
    },
    
    // Game Design Section
    {
      type: "text",
      title: "Game Design",
      paragraphs: [
        {
          text: "In The Light Remains, the focus is on exploration and atmosphere. The player learns about the world through movement, level layout, and light, without relying on heavy UI or complex systems.",
          highlights: ["The Light Remains", "exploration", "atmosphere", "movement", "level layout", "light"],
        },
        {
          text: "The gameplay uses simple Blueprint-based triggers such as lighting changes, object visibility, and dialogue moments that react to player progress. The full experience lasts around 30 minutes and tells its story through environment and pacing.",
          highlights: ["Blueprint-based triggers", "lighting changes", "object visibility", "dialogue moments", "30 minutes", "environment", "pacing"],
        },
      ],
    },
    
    // Two Column: Narrative + Design Pillars
    {
      type: "twoColumn",
      left: {
        title: "Narrative Summary",
        paragraphs: [
          {
            text: "In The Light Remains, the player explores a broken world shaped by a mysterious light from the sky. Floating islands and ruined paths show that something went wrong long ago.",
            highlights: ["The Light Remains", "broken world", "mysterious light", "Floating islands", "ruined paths"],
          },
          {
            text: "At the end, the player learns that the light is not dangerous, but something that keeps the world alive. The world is still broken, but it is calm.",
            highlights: ["keeps the world alive", "calm"],
          },
        ],
      },
      right: {
        title: "Design Pillars",
        pillars: [
          { icon: "Compass", label: "Exploration" },
          { icon: "BookOpen", label: "Storytelling" },
        ],
        documentLink: {
          text: "Link to Game Design Document",
          url: "#",
        },
      },
    },
    
    // Explorative Items
    {
      type: "imageGrid",
      title: "Explorative Items",
      description: {
        text: "Exploration is rewarded through simple interactive items placed along the player's journey. Instead of complex systems, I focused on discoverability and curiosity, encouraging players to explore optional paths and hidden areas.",
        highlights: ["interactive items", "discoverability", "curiosity"],
      },
      bulletPoints: [
        {
          label: "Loot Objects:",
          text: "Small loot boxes are placed in side paths and hard-to-reach locations. These rewards give players a sense of progress and reinforce exploration without interrupting gameplay flow.",
        },
        {
          label: "Key Item:",
          text: "A key is collected during the journey without explaining its purpose. The player only learns its importance at the final door, creating a delayed payoff and a stronger narrative moment.",
        },
      ],
      images: [
        { src: "/images/explorative-key.png", alt: "Key Item", caption: "Key Item" },
        { src: "/images/explorative-lootbox.png", alt: "Loot Box", caption: "Loot Box" },
      ],
      columns: 2,
    },
    
    // Level Design Section
    {
      type: "levelLayout",
      title: "Level Design",
      description: [
        {
          text: "The level is designed as a three-part journey, where each section gradually increases in scale, challenge, and atmosphere. This structure helps the player learn the world naturally, build tension over time, and reach a meaningful ending.",
          highlights: ["three-part journey", "scale", "challenge", "atmosphere"],
        },
        {
          text: "The design focuses on clear paths, strong landmarks, and visual guidance so the player always understands where to go without needing a map or heavy UI.",
          highlights: ["clear paths", "strong landmarks", "visual guidance"],
        },
        {
          text: "Exploration is encouraged through optional routes, vertical spaces, and hidden areas that reward curiosity. Instead of relying on complex mechanics, the level uses space, lighting, and pacing to guide the experience.",
          highlights: ["optional routes", "vertical spaces", "hidden areas", "space", "lighting", "pacing"],
        },
        {
          text: "Each section is carefully arranged to keep the player engaged, create moments of danger and calm, and support the story told through the environment.",
          highlights: ["danger", "calm"],
        },
      ],
      mapImage: "/images/level-layout-map.png",
    },
    
    // Level Beats
    {
      type: "levelBeats",
      title: "Level Beats & Walkthrough",
      phases: [
        {
          name: "Phase 1: The Journey Begins",
          beats: [
            { number: 1, label: "Player Start" },
            { number: 2, label: "First Environment" },
            { number: 3, label: "Early Exploration" },
          ],
        },
        {
          name: "Phase 2: Following the Light",
          beats: [
            { number: 4, label: "Guided Path" },
            { number: 5, label: "Exploration + Challenge" },
            { number: 6, label: "Key Landmark" },
          ],
        },
        {
          name: "Phase 3: The Truth",
          beats: [
            { number: 7, label: "Major Reveal" },
            { number: 8, label: "Enemy Fight" },
            { number: 9, label: "Final Path" },
          ],
        },
      ],
      images: [
        "/images/level-beat-01.jpg",
        "/images/level-beat-02.jpg",
        "/images/level-beat-03.jpg",
        "/images/level-beat-04.jpg",
        "/images/level-beat-05.jpg",
        "/images/level-beat-06.jpg",
        "/images/level-beat-07.jpg",
        "/images/level-beat-08.jpg",
        "/images/level-beat-09.jpg",
      ],
    },
    
    // Pacing Graph
    {
      type: "graph",
      title: "Pacing & Tension Graph",
      imageUrl: "/images/pacing-tension-graph.png",
    },
    
    // Development Section
    {
      type: "development",
      title: "Pre-Production & Development Approach",
      intro: {
        text: "For The Light Remains, I followed a simple and iterative workflow inspired by real-world level design processes. Before production, I focused on the core idea, player journey, and overall level flow, then refined the experience through quick iteration and playtesting. The project was completed in 3 weeks, with each week focused on a clear goal.",
        highlights: ["The Light Remains", "iterative workflow", "real-world level design processes", "3 weeks"],
      },
      subsections: [
        {
          title: "Planning & Development Approach",
          paragraphs: [
            { text: "Week 1: Defined the core idea and theme, planned the player path, key locations, and player guidance using light and landmarks.", highlights: ["Week 1:"] },
            { text: "Week 2: Built the full level blockout in Unreal Engine, testing scale, pacing, traversal, and exploration flow.", highlights: ["Week 2:"] },
            { text: "Week 3: Improved level readability, added gameplay triggers (light, dialogue, progression), fixed flow issues, and polished the level into a complete playable experience.", highlights: ["Week 3:"] },
          ],
          media: {
            type: "image",
            src: "",
            placeholder: "Development workflow image placeholder - upload your image",
          },
        },
        {
          title: "Production & Process",
          paragraphs: [
            { text: "My level design process focuses on clarity, iteration, and playtesting. I begin by planning the core idea and player journey, outlining the level flow, key locations, and how the player should move through the space before building anything.", highlights: ["clarity", "iteration", "playtesting"] },
            { text: "I then create a rough blockout to test scale, traversal, and pacing, constantly playtesting and refining the layout. Once the level feels good to play, I move into a refined blockout phase—improving shapes, adding detail, and using lighting and landmarks to guide the player and set the overall mood.", highlights: ["refined blockout phase"] },
          ],
          media: {
            type: "video",
            src: "/videos/blockout-walkthrough.mp4",
          },
        },
      ],
    },
    
    // Post-Mortem
    {
      type: "postMortem",
      title: "Post-Mortem",
      paragraphs: [
        {
          text: "If I had more time, I would focus more on playtesting, especially near the final section of the level. I would also spend extra time refining the ending to improve pacing and make the final moments feel more impactful and clear for the player.",
          highlights: ["playtesting"],
        },
        {
          text: "Overall, working on The Light Remains was a valuable learning experience. From planning the player journey to building and refining the level through blockouts, I learned how important iteration and playtesting are in level design. Completing this project helped me better balance creativity with technical work, manage time effectively, and confidently finish a complete playable experience. Seeing the level come together step by step was very rewarding and strengthened my confidence as a level designer.",
          highlights: ["The Light Remains"],
        },
      ],
    },
    
    // Credits
    {
      type: "credits",
      title: "Credits",
      items: [
        { label: "Spirit Mask Asset", credit: "Dmitry Schnein" },
        { label: "Boat Asset", credit: "Dmitry Schnein" },
        { label: "Human Skull Asset", credit: "Johan Hansson" },
        { label: "Beer Skull Asset", credit: "Johan Hansson" },
        { label: "Totem Asset", credit: "Stewart MacLean" },
        { label: "Sword Asset", credit: "MMKH" },
      ],
    },
  ],
};

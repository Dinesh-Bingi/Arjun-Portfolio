import { Project } from "./types";

export const metroDescent: Project = {
  id: "metro-descent",
  title: "Echoes of Stella",
  description: "A first-person psychological horror game focusing on atmosphere, tension, and exploration",
  category: "group",
  icon: "Gamepad2",
  genre: "First Person · Psychological Horror",
  thumbnailImage: "/images/echo-stella-thumb.jpg",
  coverImage: "/images/echo-stella-cover.jpg",
  
  sections: [
    // Video Section
    {
      type: "video",
      videoUrl: "/videos/echo-stella-gameplay.mp4",
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
            text: "Echoes of Stella is a first-person psychological horror game\ncreated during Game Project 3 at Futuregames. The game focuses\non atmosphere, tension, and exploration instead of combat.",
            highlights: ["Echoes of Stella", "first-person psychological horror", "atmosphere", "tension", "exploration"],
          },
          {
            text: "It was developed by a team of 15 students over a seven-week\nperiod, with the goal of creating fear through level design,\ngameplay systems, and scripted events. The project was built\nin Unreal Engine 5.",
            highlights: ["15 students", "seven-week period", "level design", "gameplay systems", "scripted events", "Unreal Engine 5"],
          },
          {
            text: "My work focused on level design, technical gameplay systems,\nand gameplay narrative planning, shaping how the player\nexperiences the story through movement, interaction, and\nenvironmental changes rather than dialogue or cutscenes.",
            highlights: ["level design", "technical gameplay systems", "gameplay narrative planning", "movement", "interaction", "environmental changes"],
          },
        ],
      },
      right: {
        title: "Focus Areas",
        bulletPoints: [
          {
            label: "Level Design",
            text: "Designed level layouts and\nplayer flow, focusing on pacing,\nexploration, tension, and guiding the player\nnaturally through the environment.",
          },
          {
            label: "Technical Level Design",
            text: "Implemented\ngameplay systems using Unreal Engine\nBlueprints, including door systems, player\nfall traps, triggers, and object\ninteractions.",
          },
          {
            label: "Gameplay Narrative Design",
            text: "Planned how\nthe story is experienced through\ngameplay by deciding progression, event\ntiming, and story moments delivered\nthrough level design and triggers.",
          },
          {
            label: "Gameplay Systems & Triggers",
            text: "Implemented scripted events such as\nobjects falling, objects moving suddenly,\nenvironment changes, scare spawns, and\ntrap sequences with camera shake.",
          },
          {
            label: "UI & Gameplay Integration",
            text: "Implemented\nthe mirror shard system, including UI\nfeedback, shard collection logic, and the\nfinal mirror interaction sequence.",
          },
        ],
      },
    },
    
    // Screenshot Gallery
    {
      type: "screenshotGallery",
      images: [
        "/images/echo-stella-screenshot-01.jpg",
        "/images/echo-stella-screenshot-02.jpg",
        "/images/echo-stella-screenshot-03.jpg",
        "/images/echo-stella-screenshot-04.jpg",
        "/images/echo-stella-screenshot-05.jpg",
        "/images/echo-stella-screenshot-06.jpg",
        "/images/echo-stella-screenshot-07.jpg",
        "/images/echo-stella-screenshot-08.jpg",
        "/images/echo-stella-screenshot-09.jpg",
        "/images/echo-stella-screenshot-10.jpg",
      ],
    },
    
    // Game Design Section
    {
      type: "text",
      title: "Game Design",
      paragraphs: [
        {
          text: "My role in game design focused on gameplay narrative planning—deciding how the story is communicated through play rather than written dialogue or exposition.",
          highlights: ["gameplay narrative planning", "story", "play"],
        },
        {
          text: "I focused on what the player sees, hears, and interacts with, and how those moments slowly reveal the story. Story progression was planned using level flow, gameplay systems, and scripted events, ensuring the player understands the narrative naturally through movement and interaction.",
          highlights: ["player", "story", "level flow", "gameplay systems", "scripted events"],
        },
        {
          text: "I used the Game Design Document as a guide to align gameplay, level design, AI behavior, and story beats, then applied these ideas directly inside the levels.",
          highlights: ["Game Design Document", "gameplay", "level design", "AI behavior", "story beats"],
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
            text: "Planned when and where story moments happen during gameplay, using level\nprogression to guide the player through the mirror world naturally.",
            highlights: ["story moments", "gameplay", "level progression", "mirror world"],
          },
          {
            text: "Used gameplay events, triggers, environmental changes, and mirror shard\nprogression to support story beats and pacing.",
            highlights: ["gameplay events", "triggers", "environmental changes", "mirror shard progression", "story beats", "pacing"],
          },
          {
            text: "Delivered the story through player movement, interactions with mirrors and\nobjects, and scripted events instead of dialogue or cutscenes.",
            highlights: ["player movement", "interactions", "mirrors", "objects", "scripted events"],
          },
        ],
      },
      right: {
        title: "Design Pillars",
        pillars: [
          { icon: "Compass", label: "Exploration" },
          { icon: "BookOpen", label: "Atmosphere" },
        ],
        documentLink: {
          text: "Level Design Document",
          url: "https://drive.google.com/file/d/1xc_DT3pJtVT645qiddQiEFPQrppkSVDh/view?usp=sharing",
        },
      },
    },
    
    // Gameplay Systems & Interactions
    {
      type: "development",
      title: "Gameplay Systems & Interactions",
      subsections: [
        {
          title: "",
          paragraphs: [
            {
              text: "My work focused on gameplay systems that react to the player's actions and\ncontrol how the environment responds during play. These systems were\ndesigned to support horror, tension, and story progression through interaction\nrather than direct player control or combat mechanics.",
              highlights: ["gameplay systems", "player's actions", "environment"],
            },
            {
              text: "Door Systems: Implemented interactive door systems using Blueprints. Doors\nrespond to player input, triggers, and progression states, helping control\npacing and access to spaces.",
              highlights: ["Door Systems", "Blueprints", "player input", "triggers", "progression states"],
            },
            {
              text: "Triggers & Scripted Events: Implemented trigger-based gameplay events across\nthe levels. Triggers were used for horror moments, environmental changes, and\ncontrolled scare timing.",
              highlights: ["Triggers", "Scripted Events", "horror moments", "environmental changes"],
            },
            {
              text: "Traps: Implemented player fall traps that drop the player into new areas.\nCamera shake and forced movement were used to sell impact and fear.",
              highlights: ["Traps", "camera shake", "forced movement"],
            },
            {
              text: "Mirror Shard Gameplay System: Implemented mirror shard collection logic and\nconnected shard progression to gameplay flow. Designed and implemented the\nfinal mirror interaction where collected shards are placed into the mirror\nholder.",
              highlights: ["Mirror Shard Gameplay System", "collection logic", "gameplay flow", "mirror interaction"],
            },
          ],
          images: [
            { 
              src: "/images/gameplay-systems-1.jpg", 
              placeholder: "Gameplay Image 1",
              link: "https://blueprintue.com/blueprint/8_voazew/",
              linkText: "Link to Blueprint"
            },
            { 
              src: "/images/gameplay-systems-2.jpg", 
              placeholder: "Gameplay Image 2",
              link: "https://blueprintue.com/blueprint/kt1ikrre/",
              linkText: "Link to Blueprint"
            },
            { 
              src: "/images/gameplay-systems-3.jpg", 
              placeholder: "Gameplay Image 3",
              link: "https://blueprintue.com/blueprint/xrjpamj9/",
              linkText: "Link to Blueprint"
            },
            { 
              src: "/images/gameplay-systems-4.jpg", 
              placeholder: "Gameplay Image 4",
              link: "https://blueprintue.com/blueprint/rot4mxk4/",
              linkText: "Link to Blueprint"
            },
          ],
        },
      ],
    },
    
    // Explorative Items
    {
      type: "imageGrid",
      title: "Exploration & Interactive Objects (My Contribution)",
      description: {
        text: "My work on exploration focused on interactive objects and progression items that guide the player through the level\nand support the gameplay narrative.",
        highlights: ["exploration", "interactive objects", "progression items", "gameplay narrative"],
      },
      bulletPoints: [
        {
          label: "",
          text: "The mirror shard system and key collect system was designed as a key exploration mechanic. Shards and keys are\nplaced in specific areas to guide the player through the level and encourage exploration. Collecting mirror shards and\nkeys is required to progress, and their placement helps control pacing while supporting the story flow naturally during\ngameplay.",
        },
        {
          label: "",
          text: "I also implemented interactive environment objects that react to the player. Some objects fall or move suddenly when\nthe player enters an area, creating surprise and tension. These events are triggered based on player position and\nprogression, making the environment feel alive, unsafe, and closely connected to the horror experience.",
        },
      ],
      images: [
        { 
          src: "/images/mirror-shard.jpg", 
          alt: "Mirror Shard", 
          caption: "Mirror Shard",
          link: "https://blueprintue.com/blueprint/obqcz91o/",
          linkText: "Link to Blueprint"
        },
        { 
          src: "/images/key-item.png", 
          alt: "Key Item", 
          caption: "Key Item",
          link: "https://blueprintue.com/blueprint/m8go27hs/",
          linkText: "Link to Blueprint"
        },
      ],
      columns: 2,
    },
    
    // Level Design Section
    {
      type: "levelLayout",
      title: "Level Design",
      description: [
        {
          text: "The blockout level is divided into three phases, with three sections in each phase. The flow starts calm, slowly builds tension, and ends in intense horror. Each phase is designed to change how the player feels as they move through the space.",
          highlights: ["three phases", "calm", "tension", "intense horror"],
        },
        {
          text: "The level uses space, sound, and interaction to guide the player and deliver story moments through gameplay instead of cutscenes. Exploration is encouraged early, but safety is gradually removed, keeping the player alert and tense until the end.",
          highlights: ["space", "sound", "interaction", "exploration"],
        },
      ],
      mapImage: "/images/group-level-layout.png",
    },
    
    // Level Beats
    {
      type: "levelBeats",
      title: "Level Beats & Walkthrough",
      phases: [
        {
          name: "Phase 1: Emotional Setup",
          beats: [
            { number: 1, label: "Safe introduction space" },
            { number: 2, label: "Environmental storytelling" },
            { number: 3, label: "First tension moment" },
          ],
        },
        {
          name: "Phase 2: Rising Tension",
          beats: [
            { number: 4, label: "Ghost introduced" },
            { number: 5, label: "Traps" },
            { number: 6, label: "First chase" },
          ],
        },
        {
          name: "Phase 3: Horror Climax",
          beats: [
            { number: 7, label: "Loss of comfort" },
            { number: 8, label: "Sudden changes" },
            { number: 9, label: "Survive and escape" },
          ],
        },
      ],
      images: [
        "/images/echo-stella-level-beat-01.jpg",
        "/images/echo-stella-level-beat-02.jpg",
        "/images/echo-stella-level-beat-03.jpg",
        "/images/echo-stella-level-beat-04.jpg",
        "/images/echo-stella-level-beat-05.jpg",
        "/images/echo-stella-level-beat-06.jpg",
        "/images/echo-stella-level-beat-07.jpg",
        "/images/echo-stella-level-beat-08.jpg",
        "/images/echo-stella-level-beat-09.jpg",
      ],
    },
    
    // Pacing Graph
    {
      type: "graph",
      title: "Pacing & Tension Graph",
      imageUrl: "/images/echo-stella-pacing-tension-graph.png",
    },
    
    // Design Techniques
    {
      type: "development",
      title: "Design Techniques",
      intro: {
        text: "While working on level design and gameplay implementation, I focused on guiding the player naturally, building tension, and supporting the gameplay narrative through space, timing, and interaction. My approach was not about visual polish alone, but about how level structure, triggers, and events affect player experience.",
        highlights: ["level design", "gameplay implementation", "guiding the player", "tension", "gameplay narrative", "level structure", "triggers", "events"],
      },
      subsections: [
        {
          title: "",
          paragraphs: [
            { text: "Player Guidance Through Level Design: Used level layout and paths to guide players without heavy UI. Placed doors, corridors, and narrow spaces to control player movement. Used open and closed spaces to manage pacing and tension.", highlights: ["Player Guidance Through Level Design", "level layout", "paths", "doors", "corridors", "pacing", "tension"] },
            { text: "Spatial Tension & Flow: Designed tight corridors to create fear and pressure. Used larger spaces after tight areas to give brief relief. Controlled how much the player can see at a time.", highlights: ["Spatial Tension & Flow", "tight corridors", "fear", "pressure", "relief"] },
            { text: "Surprise Moments: Implemented moments where the environment behaves unexpectedly. Used sudden events to break player expectations. These moments were carefully timed using triggers, not random behavior.", highlights: ["Surprise Moments", "unexpectedly", "sudden events", "triggers"] },
          ],
          media: {
            type: "image",
            src: "/images/design-technique-1.jpg",
            placeholder: "Design Technique 1",
          },
        },
        {
          title: "",
          paragraphs: [],
          media: {
            type: "image",
            src: "/images/design-technique-2.jpg",
            placeholder: "Design Technique 2",
          },
        },
      ],
    },
    
    // Development Section
    {
      type: "development",
      title: "Pre-Production & Development Approach",
      intro: {
        text: "For Echoes of Stella, I followed a clear and iterative workflow focused on planning, testing, and refinement.",
        highlights: ["Echoes of Stella", "iterative workflow", "planning", "testing", "refinement"],
      },
      subsections: [
        {
          title: "Planning & Development Approach",
          paragraphs: [
            { text: "Week 1: Idea & planning", highlights: ["Week 1:"] },
            { text: "Week 2: Map & layout planning", highlights: ["Week 2:"] },
            { text: "Week 3: Initial blockout", highlights: ["Week 3:"] },
            { text: "Week 4: Gameplay implementation", highlights: ["Week 4:"] },
            { text: "Weeks 5–7: Iteration, level dressing, and polish", highlights: ["Weeks 5–7:"] },
          ],
          media: {
            type: "image",
            src: "/images/echo-stella-planning-development.png",
            placeholder: "Planning & Development Approach",
          },
        },
        {
          title: "Production & Process",
          paragraphs: [
            { text: "My level design process focused on testing and iteration. I started with rough blockouts to check scale and readability, then implemented gameplay systems directly into the level. I iterated based on playtesting and feedback, refining layouts to improve tension, pacing, and clarity.", highlights: ["testing", "iteration", "playtesting", "feedback"] },
            { text: "Designing levels together with gameplay systems helped create a more connected experience. Using triggers and scripted events allowed me to control pacing and tension. Planning layouts in Photoshop before blockout saved time during implementation, and level dressing helped improve atmosphere and visual storytelling.", highlights: ["gameplay systems", "triggers", "scripted events", "level dressing"] },
          ],
          media: {
            type: "video",
            src: "/videos/echo-stella-production-process.mp4",
          },
        },
      ],
    },
    
    // Experience the Level CTA
    {
      type: "levelExperienceCTA",
      url: "https://drive.google.com/file/d/1wnYiZoga-paFaEyTfrQWnUsODlXUb8-2/view?usp=sharing",
      imageUrl: "/images/cta-reference.png",
    },
    
    // Post-Mortem
    {
      type: "postMortem",
      title: "Post-Mortem",
      paragraphs: [
        {
          text: "Looking back, I would have liked more time for playtesting and iteration, especially to fine-tune level flow, trigger timing, and scare pacing. I would also spend more time refining some late-game areas to make the final moments feel stronger and more polished in terms of gameplay events and progression.",
          highlights: ["playtesting", "iteration", "level flow", "trigger timing"],
        },
        {
          text: "What went well: Designing levels together with gameplay systems created a more connected experience. Using triggers and scripted events allowed precise control of pacing and tension. Planning layouts in Photoshop before blockout saved development time. Level dressing improved atmosphere and visual storytelling.",
          highlights: ["gameplay systems", "triggers", "scripted events", "level dressing"],
        },
        {
          text: "This project helped me grow as a Level Designer and Technical Level Designer. I learned how to plan gameplay and story through level design, implement complex interactions using Blueprints, balance atmosphere, tension, and player guidance, and work under tight deadlines while iterating on gameplay.",
          highlights: ["Level Designer", "Technical Level Designer", "Blueprints", "atmosphere", "tension"],
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

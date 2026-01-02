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
            text: "Echoes of Stella is a first-person psychological horror game created during Game Project 3 at Futuregames. The project focuses on atmosphere, tension, and exploration, avoiding traditional combat in favor of environmental storytelling and controlled pacing.",
            highlights: ["Echoes of Stella", "first-person psychological horror", "atmosphere", "tension", "exploration"],
          },
          {
            text: "The game was developed by a team of 15 students over a seven-week period, with the goal of creating fear through level design, gameplay systems, and scripted events. The project was built in Unreal Engine 5.",
            highlights: ["15 students", "seven-week period", "level design", "gameplay systems", "scripted events", "Unreal Engine 5"],
          },
          {
            text: "My contribution focused on level design, technical gameplay systems, and gameplay narrative planning, shaping how the player experiences the story through movement, interaction, and environmental changes rather than dialogue or cutscenes.",
            highlights: ["level design", "technical gameplay systems", "gameplay narrative planning", "movement", "interaction", "environmental changes"],
          },
        ],
      },
      right: {
        title: "Focus Areas",
        bulletPoints: [
          {
            label: "Level Design & Player Flow:",
            text: "Designed level layouts that guide the player naturally through the environment, focusing on pacing, exploration, tension, and controlled visibility. The layout was structured to gradually escalate fear while maintaining clarity and direction.",
          },
          {
            label: "Technical Level Design:",
            text: "Implemented gameplay systems using Unreal Engine Blueprints, including doors, traps, triggers, and interactive objects that respond to player progression and actions.",
          },
          {
            label: "Gameplay Narrative Design:",
            text: "Planned how the story is experienced through gameplay by deciding when and where events occur, using progression, triggers, and environment changes to deliver narrative moments naturally.",
          },
          {
            label: "Gameplay Systems & Triggers:",
            text: "Implemented scripted events such as objects falling, sudden environment changes, scare moments, trap sequences, and camera shake to control pacing and horror intensity.",
          },
          {
            label: "UI & Gameplay Integration:",
            text: "Implemented the mirror shard system, including UI feedback, shard collection logic, and the final mirror interaction sequence that ties gameplay progression to the narrative climax.",
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
            text: "Echoes of Stella tells its story through atmosphere, exploration, and environmental change.",
            highlights: ["Echoes of Stella", "atmosphere", "exploration", "environmental change"],
          },
          {
            text: "As the player progresses through the mirror world, story elements are revealed through level transitions, environmental storytelling, mirror shard progression, and scripted events and interactions. Rather than relying on dialogue or cutscenes, the narrative unfolds through player movement, object interaction, and changes in the environment, reinforcing immersion and tension throughout the experience.",
            highlights: ["mirror world", "level transitions", "environmental storytelling", "mirror shard progression", "scripted events"],
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
          text: "Link to Game Design Document",
          url: "#",
        },
      },
    },
    
    // Gameplay Systems & Interactions
    {
      type: "text",
      title: "Gameplay Systems & Interactions",
      paragraphs: [
        {
          text: "My work focused on gameplay systems that react to the player's actions and control how the environment responds during play.",
          highlights: ["gameplay systems", "player's actions", "environment"],
        },
        {
          text: "Door Systems: Implemented interactive door systems using Blueprints. Doors respond to player input, triggers, and progression states, helping control pacing and access to spaces.",
          highlights: ["Door Systems", "Blueprints", "player input", "triggers", "progression states"],
        },
        {
          text: "Triggers & Scripted Events: Implemented trigger-based gameplay events across the levels, used for horror moments, environmental changes, and controlled scare timing.",
          highlights: ["Triggers", "Scripted Events", "horror moments", "environmental changes"],
        },
        {
          text: "Traps: Implemented player fall traps that drop the player into new areas. Camera shake and forced movement were used to sell impact and fear.",
          highlights: ["Traps", "camera shake", "forced movement"],
        },
        {
          text: "Mirror Shard Gameplay System: Implemented mirror shard collection logic and connected shard progression to gameplay flow. Designed and implemented the final mirror interaction where collected shards are placed into the mirror holder.",
          highlights: ["Mirror Shard Gameplay System", "collection logic", "gameplay flow", "mirror interaction"],
        },
      ],
    },
    
    // Explorative Items
    {
      type: "imageGrid",
      title: "Exploration & Interactive Objects",
      description: {
        text: "Exploration plays a central role in Echoes of Stella. The mirror shard system acts as a key exploration mechanic. Shards are placed in specific areas to guide the player through the level while encouraging exploration. Their placement controls pacing and supports the story flow naturally.",
        highlights: ["Exploration", "mirror shard system", "exploration mechanic", "pacing", "story flow"],
      },
      bulletPoints: [
        {
          label: "Mirror Shard System:",
          text: "The mirror shard system acts as a key exploration mechanic. Shards are placed in specific areas to guide the player through the level while encouraging exploration. Their placement controls pacing and supports the story flow naturally.",
        },
        {
          label: "Interactive Environment Objects:",
          text: "I also implemented interactive environment objects that react to the player. Some objects fall or move suddenly when the player enters certain areas, creating surprise and tension. These events are triggered based on player position and progression, making the environment feel alive, unsafe, and connected to the horror experience.",
        },
      ],
      images: [
        { src: "/images/echo-stella-mirror-shard.png", alt: "Mirror Shard", caption: "Mirror Shard" },
        { src: "/images/echo-stella-key.png", alt: "Key Item", caption: "Key Item" },
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
      mapImage: "/images/echo-stella-level-layout-map.png",
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
            src: "",
            placeholder: "Design Image 1",
          },
        },
      ],
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
            src: "",
            placeholder: "Development workflow image placeholder - upload your image",
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
            src: "/videos/echo-stella-blockout-walkthrough.mp4",
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
        { label: "Developed by", credit: "Team of 15 students at Futuregames" },
        { label: "Engine", credit: "Unreal Engine 5" },
      ],
    },
  ],
};

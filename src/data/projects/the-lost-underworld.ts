import { Project } from "./types";

export const theLostUnderworld: Project = {
  id: "the-lost-underworld",
  title: "The Lost Underworld",
  description: "A third-person action adventure level design project set across a moving train and a hidden underground world",
  category: "personal",
  icon: "Gamepad2",
  genre: "Third Person · Action Adventure",
  thumbnailImage: "/images/lost-underworld-thumb.jpg",
  coverImage: "/images/lost-underworld-cover.png",

  sections: [
    {
      type: "video",
      videoUrl: "/videos/lost-underworld-gameplay.mp4",
      autoPlay: true,
      loop: true,
      muted: true,
    },

    {
      type: "twoColumn",
      left: {
        title: "Project Overview",
        paragraphs: [
          {
            text: "The Lost Underworld is a solo action-adventure level design project made in Unreal Engine 5.",
            highlights: ["The Lost Underworld", "solo", "Unreal Engine 5"],
          },
          {
            text: "The level begins on a moving cargo train where the player tries to steal an ancient object while fighting enemies and progressing forward.",
            highlights: ["moving cargo train", "ancient object", "fighting enemies"],
          },
          {
            text: "During gameplay, enemies call for backup and a helicopter arrives, leading to a major moment where the bridge is destroyed and the player must jump into the ocean to survive.",
            highlights: ["helicopter", "bridge destroyed", "jump into the ocean"],
          },
          {
            text: "After this, the gameplay shifts into exploration, where the player discovers a hidden underground world and continues the journey to find the second object and reach the treasure.",
            highlights: ["exploration", "underground world", "treasure"],
          },
        ],
      },
      right: {
        title: "Focus Areas",
        bulletPoints: [
          {
            label: "Level Design & Player Flow:",
            text: "Designed the full level from start to end, focusing on how the player moves through the train, engages in combat, and reaches the final escape moment.",
          },
          {
            label: "Cinematic Moment Design:",
            text: "Created a key moment where enemies call a helicopter that destroys the bridge, building tension and guiding the player to escape.",
          },
          {
            label: "Blueprint Implementation:",
            text: "Implemented gameplay systems such as environment scrolling for train movement, train shaking, object collection, merging mechanics, and cinematic events using Blueprints.",
          },
        ],
      },
    },

    // Screenshot Gallery
    {
      type: "screenshotGallery",
      images: [
        "/images/001.jpg",
        "/images/002.jpg",
        "/images/003.jpg",
        "/images/004.jpg",
        "/images/005.jpg",
        "/images/006.jpg",
        "/images/007.jpg",
        "/images/008.jpg",
        "/images/009.jpg",
      ],
    },

    {
      type: "text",
      title: "Game Design",
      paragraphs: [
        {
          text: "My role in this project focused on planning how the player experiences the level through gameplay.",
        },
        {
          text: "I focused on what the player sees, does, and how each moment connects from start to end, guiding the player naturally through combat, action, and exploration without confusion.",
        },
        {
          text: "The gameplay flow was designed using level progression, enemy encounters, and key events like the helicopter attack and train crash to create a strong and engaging experience.",
        },
        {
          text: "All gameplay ideas were implemented directly inside the level using Blueprints, including triggers, object interactions, and cinematic sequences.",
        },
      ],
    },

    {
      type: "twoColumn",
      left: {
        title: "Narrative Summary",
        paragraphs: [
          {
            text: "The story is told through gameplay moments instead of long dialogue. The player starts on a train, fights enemies, and experiences a major event where the bridge is destroyed.",
          },
          {
            text: "This forces the player to escape by jumping into the ocean, after which the player discovers a hidden underground world and continues exploring to find the second object and the treasure.",
          },
        ],
      },
      right: {
        title: "Design Pillars",
        pillars: [
          { icon: "Zap", label: "Action" },
          { icon: "Compass", label: "Exploration" },
        ],
        documentLink: {
          text: "Game Design Document",
          url: "https://drive.google.com/file/d/1QjeIfyQ-vnEqCQtz-SBH-ezg0ilpet8H/view?usp=sharing",
        },
      },
    },

    {
      type: "text",
      title: "Gameplay Systems & Interactions",
      paragraphs: [
        {
          text: "I created an object interaction system where the player collects two ancient objects, places them in placeholders, and both merge into a new object that unlocks the next area. And created environment scrolling for realistic train movement and train shaking. ",
        },
        {
          text: "I also designed cinematic gameplay events like the helicopter attack and train crash to build tension and guide the player during important moments.",
        },
        {
          text: "All gameplay systems were implemented using Blueprints, including object movement with puzzles, the merging system, enemy triggers, dialogue, and cutscenes. ",
        },
      ],
    },
    {
      type: "imageGrid",
      images: [
        {
          src: "/images/gameplay-interaction-01.png",
          alt: "Gameplay Systems & Interactions 1",
          link: "https://blueprintue.com/blueprint/op7wedc0/"
        },
        {
          src: "/images/gameplay-interaction-02.png",
          alt: "Gameplay Systems & Interactions 2",
          link: "https://blueprintue.com/blueprint/u0fqwddz/"
        }
      ],
      columns: 2
    },
    // Level Design Section
    {
      type: "levelLayout",
      title: "Level Design",
      description: [
        {
          text: "The level is divided into Three parts, starting with action on the train and later moving into exploration in the underground world. The flow begins with fast-paced combat, builds tension with the helicopter attack, and leads to a big moment where the player must escape by jumping into the ocean.",
          highlights: ["Three parts", "action", "exploration", "combat", "escape"],
        },
        {
          text: "After this, the level slows down and focuses on exploration. The player moves through the tunnel and discovers the hidden world, which creates a strong contrast from the earlier action.",
          highlights: ["exploration", "hidden world", "contrast"],
        },
        {
          text: "The level uses environment, events, and progression to guide the player forward. Each section is designed to change how the player feels, from action and danger to curiosity and exploration.",
          highlights: ["environment", "events", "progression", "action", "danger", "curiosity", "exploration"],
        },
      ],
      mapImage: "/images/lost-underworld-map.png",
    },
    // Level Beats
    {
      type: "levelBeats",
      title: "Level Beats & Walkthrough",
      phases: [
        {
          name: "Phase 1: On the Train",
          beats: [
            { number: 1, label: "Enter the Train" },
            { number: 2, label: "Moving Through the Wagons" },
            { number: 3, label: "Combat on the Train" },
          ],
        },
        {
          name: "Phase 2: Lost Underworld",
          beats: [
            { number: 4, label: "First Look at the Underworld" },
            { number: 5, label: "Exploring the Ruins" },
            { number: 6, label: "Finding the Second Object" },
          ],
        },
        {
          name: "Phase 3: Final Journey",
          beats: [
            { number: 7, label: "Entering the Ancient Temple" },
            { number: 8, label: "Solving the Puzzle" },
            { number: 9, label: "Final Treasure Encounter" },
          ],
        },
      ],
      images: [
        "/images/01.jpg",
        "/images/02.jpg",
        "/images/03.jpg",
        "/images/04.jpg",
        "/images/05.jpg",
        "/images/06.jpg",
        "/images/07.jpg",
        "/images/08.jpg",
        "/images/09.jpg",
      ],
    },
    // Pacing Graph
    {
      type: "graph",
      title: "Pacing & Tension Graph",
      imageUrl: "/images/lost world graph.png",
    },

    // Development Section
    {
      type: "development",
      title: "Pre-Production & Development Approach",
      intro: {
        text: "For The Lost Underworld, I followed a simple workflow focused on building and improving the level step by step.I started by planning the core idea, player journey, and overall level flow. Then I built the level in parts and improved it through testing and iteration. The project was completed in 6 weeks, with each week focused on a clear goal.",
        highlights: ["The Lost Underworld", "improving", "journey", "core idea", "level flow", "testing", "iteration", "6 weeks", "clear goal"],
      },
      subsections: [
        {
          title: "Planning & Development Approach",
          paragraphs: [
            { text: "Week 1: Planned the core idea, story, and player flow. Decided how the level starts on the train and transitions into the underground world", highlights: ["Week 1"] },
            { text: "Week 2: Created the initial blockout of the train level, including player path, enemy placement, and movement flow.", highlights: ["Week 2"] },
            { text: "Week 3: Added gameplay elements like combat, triggers, and basic interactions on the train. ", highlights: ["Week 3"] },
            { text: "Week 4: Implemented the helicopter sequence and bridge destruction, and worked on the player escape moment and level.", highlights: ["Week 4"] },
            { text: "Week 5: Built the underground world, including exploration areas, second object location, and puzzle zones.", highlights: ["Week 5"] },
            { text: "Week 6: Added final gameplay elements, fixed issues, improved flow, and polished the level into a complete playable experience. ", highlights: ["Week 6"] },
          ],
          media: {
            type: "image",
            src: "/images/lost-underworld-planning.png",
            placeholder: "Development workflow image",
          },
        },
        {
          title: "Production & Process",
          paragraphs: [
            {
              text: "I started by planning the main idea, player journey, and level flow. Then I created a basic blockout to test player movement, scale, and progression from the train to the underground world. I kept testing and making changes to improve the player path.",
            },
            {
              text: "After that, I added gameplay events, interactions, and key moments like the helicopter sequence and train crash. In the final stage, I fixed issues, improved the level flow, and polished the experience to make it feel smooth and complete.",
            },
          ],
          media: {
            type: "video",
            src: "/videos/lost-underworld-blockout.mp4",
          },
        },
      ],
    },

    // Experience the Level CTA
    {
      type: "levelExperienceCTA",
      url: "",
      imageUrl: "/images/cta-reference.png",
    },

    // Post-Mortem
    {
      type: "postMortem",
      title: "Post-Mortem",
      paragraphs: [
        {
          text: "If I had more time, I would focus more on testing the final part of the level. I would also improve the ending to make the last moments feel more clear and impactful for the player.",
        },
        {
          text: "Working on The Lost Underworld helped me understand how important player flow and timing are in level design. I learned how to create strong moments like the train sequence and how to guide the player through gameplay events.",
        },
        {
          text: "This project also helped me improve my Blueprint skills and understand how to connect gameplay, events, and level design into one complete experience.",
        },
      ],
    },

    {
      type: "credits",
      title: "Credits",
      items: [
        { label: "Project", credit: "Solo Project" },
      ],
    },
  ],
};
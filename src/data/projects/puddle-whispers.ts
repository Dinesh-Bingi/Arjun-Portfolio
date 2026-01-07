import { Project } from "./types";

export const puddleWhispers: Project = {
  id: "puddle-whispers",
  title: "Puddle Whispers",
  description: "A short 2.5D adventure game created during the EDU Online Game Jam. The game explores the theme of reflection through quiet exploration, emotional dialogue, and environmental storytelling in a rainy world.",
  category: "group",
  icon: "Map",
  genre: "2.5D Adventure",
  thumbnailImage: "/images/puddle-whispers-card.jpg",
  coverImage: "/images/puddle-whispers-cover.jpg",
  heroVideo: null,
  
  sections: [
    // Video Section
    {
      type: "video",
      videoUrl: "/videos/puddle-whispers-walkthrough.mp4",
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
            text: "Puddle Whispers is a short 2.5D adventure game created during the EDU Online Game Jam. The game explores the theme of reflection through quiet exploration, emotional dialogue, and environmental storytelling in a rainy world.",
            highlights: ["Puddle Whispers", "2.5D adventure game", "EDU Online Game Jam", "reflection", "quiet exploration", "emotional dialogue", "environmental storytelling", "rainy world"],
          },
          {
            text: "I joined the team on the final day to handle level design and environment art, building the complete playable level, shaping player flow, and setting the visual mood using simple textures, lighting, and composition.",
            highlights: ["level design", "environment art", "complete playable level", "player flow", "visual mood", "simple textures", "lighting", "composition"],
          },
          {
            text: "The project was developed by a small team of programmers, a narrative designer, and a 2D artist. Through close collaboration, the project was awarded Best Theme (Reflection) and Best Graphics overall.",
            highlights: ["small team", "programmers", "narrative designer", "2D artist", "Best Theme", "Reflection", "Best Graphics"],
          },
        ],
      },
      right: {
        title: "Focus Areas",
        bulletPoints: [
          {
            label: "Level Design & Player Flow",
            text: "Designed the complete level layout within one day, focusing on smooth player flow, pacing, and careful placement of narrative puddles to guide emotional progression naturally.",
          },
          {
            label: "Environment Art & Visual Mood",
            text: "Built the environment using simple geometry, textures, lighting, and composition to support the melancholic yet warm emotional tone and reinforce the reflection theme.",
          },
          {
            label: "Collaboration & Rapid Production",
            text: "Joined the project late and adapted quickly, working closely with programmers and the narrative designer to deliver a finished level and environment under strict time constraints.",
          },
        ],
      },
    },
    
    // Screenshots Section
    {
      type: "screenshotGallery",
      images: [
        "/images/puddle-whispers-01.jpg",
        "/images/puddle-whispers-02.jpg",
        "/images/puddle-whispers-03.jpg",
        "/images/puddle-whispers-04.jpg",
        "/images/puddle-whispers-05.jpg",
        "/images/puddle-whispers-06.jpg",
      ],
    },
    
    // Image Grid (after Screenshots)
    {
      type: "imageGrid",
      images: [],
      columns: 2,
    },
    
    // Game Design Section
    {
      type: "text",
      title: "Game Design",
      paragraphs: [
        {
          text: "Puddle Whispers is a narrative-driven experience focused on quiet exploration, reflection, and emotional pacing. The design avoids traditional challenges and instead delivers story through movement, space, and interaction.",
          highlights: ["narrative-driven experience", "quiet exploration", "reflection", "emotional pacing", "movement", "space", "interaction"],
        },
        {
          text: "My contribution focused on translating narrative ideas into level structure and environment layout. I collaborated closely with the narrative designer and programmers to ensure that player progression, puddle placement, and environmental pacing aligned with the emotional flow of the story, allowing players to uncover memories naturally without pressure.",
          highlights: ["narrative ideas", "level structure", "environment layout", "narrative designer", "programmers", "player progression", "puddle placement", "environmental pacing", "emotional flow"],
        },
      ],
    },
    
    // Image Grid (after Narrative Summary)
    {
      type: "imageGrid",
      images: [],
      columns: 2,
    },
    
    // Two Column: Narrative Summary + Design Pillars
    {
      type: "twoColumn",
      left: {
        title: "Narrative Summary",
        paragraphs: [
          {
            text: "The player follows Caelum, a quiet cat wandering through a rainy world, discovering reflective puddles that reveal conversations with long-lost friends and forgotten memories.",
            highlights: ["Caelum", "quiet cat", "rainy world", "reflective puddles", "conversations", "long-lost friends", "forgotten memories"],
          },
          {
            text: "Each reflection grows more emotional, slowly uncovering feelings of absence, regret, and unspoken promises.",
            highlights: ["reflection", "emotional", "absence", "regret", "unspoken promises"],
          },
          {
            text: "The story concludes as the rain stops, symbolizing acceptance, forgiveness, and emotional release.",
            highlights: ["rain stops", "acceptance", "forgiveness", "emotional release"],
          },
        ],
      },
      right: {
        title: "Design Pillars",
        pillars: [
          { icon: "Compass", label: "Exploration" },
          { icon: "BookOpen", label: "Reflection Through Interaction" },
          { icon: "Mountain", label: "Emotional Atmosphere" },
        ],
        documentLink: {
          text: "Level Design Document",
          url: "https://drive.google.com/file/d/1_Av8iheC64O-hdtqKFBaADHFibNxnHEq/view?usp=sharing",
        },
      },
    },
    
    // Level Design
    {
      type: "levelLayout",
      title: "Level Design",
      description: [
        {
          text: "The level is designed as a linear emotional journey. As the Level Designer and Environment Artist, I focused on creating a clear, readable path that naturally guides the player from one puddle interaction to the next.",
          highlights: ["linear emotional journey", "Level Designer", "Environment Artist", "clear, readable path", "puddle interaction"],
        },
        {
          text: "Each area allows players to slow down, observe their surroundings, and engage with the story at their own pace. Puddle placement, path length, and transitions were carefully planned to control pacing and ensure emotional moments land effectively.",
          highlights: ["slow down", "observe", "engage with the story", "puddle placement", "path length", "transitions", "pacing", "emotional moments"],
        },
      ],
      mapImage: "/images/puddle-whispers-level-layout.png",
    },
    
    // Design Techniques
    {
      type: "development",
      title: "Design Techniques",
      subsections: [
        {
          title: "Pacing Through Space",
          paragraphs: [
            {
              text: "Wide open areas and long sightlines are used to slow players down and encourage observation before emotional story moments.",
              highlights: ["Wide open areas", "long sightlines", "slow players down", "observation", "emotional story moments"],
            },
          ],
          media: {
            type: "image",
            src: "/images/puddle-whispers-pacing.jpg",
            placeholder: "Pacing Through Space",
          },
        },
        {
          title: "Natural Player Guidance",
          paragraphs: [
            {
              text: "Narrow paths such as bridges guide the player naturally without UI markers, helping control movement and focus attention on the journey.",
              highlights: ["Narrow paths", "bridges", "guide the player", "UI markers", "control movement", "focus attention", "journey"],
            },
          ],
          media: {
            type: "image",
            src: "/images/puddle-whispers-guidance.jpg",
            placeholder: "Natural Player Guidance",
          },
        },
      ],
    },
    
    // Pre-Production & Development Approach
    {
      type: "development",
      title: "Pre-Production & Development Approach",
      subsections: [
        {
          title: "Planning & Development Approach",
          paragraphs: [
            {
              text: "The team followed a focused and practical approach suited for a short game jam timeline. Early discussions aligned the core idea, narrative direction, and scope to avoid unnecessary complexity.",
              highlights: ["focused and practical approach", "short game jam timeline", "core idea", "narrative direction", "scope"],
            },
            {
              text: "I joined during the final day and focused on rapid execution, quickly understanding the narrative and mechanics before building a complete level and environment that supported the emotional flow of the game within the remaining time.",
              highlights: ["final day", "rapid execution", "narrative", "mechanics", "complete level", "environment", "emotional flow"],
            },
          ],
        },
        {
          title: "Production & Process",
          paragraphs: [
            {
              text: "My workflow focused on speed and clarity. I began with a quick layout to establish player flow and puddle placement, then moved directly into environment building using simple geometry, textures, and lighting.",
              highlights: ["speed and clarity", "quick layout", "player flow", "puddle placement", "environment building", "simple geometry", "textures", "lighting"],
            },
            {
              text: "Continuous playtesting helped validate pacing and readability, allowing fast refinement of transitions and atmosphere while staying aligned with the team's vision.",
              highlights: ["Continuous playtesting", "pacing", "readability", "refinement", "transitions", "atmosphere", "team's vision"],
            },
          ],
          media: {
            type: "video",
            src: "/videos/puddle-whispers-process.mp4",
          },
        },
      ],
    },
    
    // Experience the Level CTA
    {
      type: "levelExperienceCTA",
      url: "https://drive.google.com/file/d/1xkVbE8b_MQzdrASiVjwEmNZHMFvYMJsp/view?usp=sharing",
      imageUrl: "/images/cta-reference.png",
    },
    
    // Post-Mortem
    {
      type: "postMortem",
      title: "Post-Mortem",
      paragraphs: [
        {
          text: "Given more time, additional playtesting would have helped further refine pacing and transitions between puddle interactions. Some emotional beats could benefit from more space and polish, particularly toward the later sections.",
          highlights: ["playtesting", "pacing", "transitions", "puddle interactions", "emotional beats", "space", "polish"],
        },
        {
          text: "Joining late and contributing under pressure strengthened my ability to adapt quickly, collaborate effectively, and translate narrative ideas into playable space. Completing a full level within one day and contributing to an award-winning project was both motivating and rewarding.",
          highlights: ["adapt quickly", "collaborate effectively", "translate narrative ideas", "playable space", "full level", "one day", "award-winning project"],
        },
      ],
    },
    
    // Credits
    {
      type: "credits",
      title: "Credits",
      items: [
        { label: "Puddle Whispers Credit", credit: "Developed by a small team during the EDU Online Game Jam." },
      ],
    },
  ],
};


import { Project } from "./types";

export const sushi2Go: Project = {
  id: "sushi-2-go",
  title: "Sushi 2 Go",
  description: "A PC endless runner developed as my first game project during my studies at Futuregames. Players control a piece of sushi escaping along a conveyor belt inside a busy sushi restaurant, avoiding obstacles as the speed gradually increases.",
  category: "group",
  icon: "Gamepad2",
  genre: "Endless Runner",
  thumbnailImage: "/images/sushi-2-go-card.jpg",
  coverImage: "/images/sushi-2-go-cover.jpg",
  heroVideo: null,
  
  sections: [
    // Video Section
    {
      type: "video",
      videoUrl: "/videos/sushi-2-go-gameplay.mp4",
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
            text: "Sushi 2 Go is a PC endless runner developed as my first game project during my studies at Futuregames. The game was created in three weeks as a cross-site collaboration, with game designers in Warsaw and programmers and artists in Malmö.",
            highlights: ["Sushi 2 Go", "PC endless runner", "first game project", "Futuregames", "three weeks", "cross-site collaboration", "Warsaw", "Malmö"],
          },
          {
            text: "Players control a piece of sushi escaping along a conveyor belt inside a busy sushi restaurant, avoiding obstacles as the speed gradually increases. The project focused on learning core production workflows, teamwork, and delivering a playable experience within a tight academic schedule.",
            highlights: ["piece of sushi", "conveyor belt", "sushi restaurant", "obstacles", "speed gradually increases", "core production workflows", "teamwork", "playable experience", "tight academic schedule"],
          },
        ],
      },
      right: {
        title: "Focus Areas",
        bulletPoints: [
          {
            label: "Gameplay Feel",
            text: "Focused on creating responsive controls and smooth movement that felt satisfying as the game speed increased.",
          },
          {
            label: "Visual Feedback",
            text: "Implemented subtle screen-edge speed line visual effects to enhance the sense of movement and speed, providing clear visual feedback as the conveyor belt accelerated.",
          },
          {
            label: "Team Collaboration",
            text: "Worked closely with designers in Warsaw and programmers and artists in Malmö, requiring clear communication to ensure visual effects supported gameplay without distraction.",
          },
          {
            label: "Production Workflow",
            text: "Learned core production workflows, cross-location collaboration, and working efficiently under short deadlines to deliver a playable experience.",
          },
        ],
      },
    },
    
    // Screenshots Section
    {
      type: "screenshotGallery",
      images: [
        "/images/sushi-2-go-01.png",
        "/images/sushi-2-go-02.png",
        "/images/sushi-2-go-03.png",
        "/images/sushi-2-go-04.png",
        "/images/sushi-2-go-05.png",
      ],
    },
    
    // Image Grid (after Screenshots)
    {
      type: "imageGrid",
      images: [],
      columns: 2,
    },
    
    // Core Gameplay Section
    {
      type: "text",
      title: "Core Gameplay",
      paragraphs: [
        {
          text: "Sushi 2 Go features endless runner gameplay where players control a piece of sushi moving along a conveyor belt inside a busy sushi restaurant. The game gradually increases in speed over time, requiring players to avoid obstacles and maintain control as the challenge intensifies.",
          highlights: ["endless runner gameplay", "conveyor belt", "sushi restaurant", "gradually increases in speed", "avoid obstacles"],
        },
      ],
    },
    
    // Key Contribution Section
    {
      type: "text",
      title: "Key Contribution",
      paragraphs: [
        {
          text: "VFX Design (Minor Contribution): Implemented subtle screen-edge speed line visual effects to enhance the sense of movement and speed. These effects provided clear visual feedback as the conveyor belt accelerated, while ensuring the player's view was never obstructed.",
          highlights: ["VFX Design", "screen-edge speed line visual effects", "sense of movement", "speed", "visual feedback", "conveyor belt accelerated"],
        },
      ],
    },
    
    // Team Collaboration Section
    {
      type: "text",
      title: "Team Collaboration",
      paragraphs: [
        {
          text: "Sushi 2 Go was developed by a distributed team, with designers based in Warsaw and programmers and artists in Malmö. Close communication was required to ensure the visual effects supported gameplay without distraction. Based on feedback, the effects were refined to feel smooth and readable while reinforcing speed.",
          highlights: ["distributed team", "Warsaw", "Malmö", "close communication", "visual effects", "gameplay", "feedback", "smooth", "readable", "reinforcing speed"],
        },
      ],
    },
    
    // Learning Outcomes Section
    {
      type: "text",
      title: "Learning Outcomes",
      paragraphs: [
        {
          text: "This project provided valuable experience in understanding team-based game production, cross-location collaboration workflows, working efficiently under short deadlines, and supporting gameplay through subtle visual design.",
          highlights: ["team-based game production", "cross-location collaboration workflows", "short deadlines", "subtle visual design"],
        },
      ],
    },
    
    // Experience the Level CTA
    {
      type: "levelExperienceCTA",
      url: "https://your-playable-build-link-here",
      imageUrl: "/images/cta-reference.png",
    },
    
    // Credits
    {
      type: "credits",
      title: "Credits",
      items: [
        { label: "Developed by", credit: "a distributed team at Futuregames (Warsaw & Malmö)" },
        { label: "Platform", credit: "PC" },
        { label: "Development Time", credit: "3 weeks" },
      ],
    },
  ],
};



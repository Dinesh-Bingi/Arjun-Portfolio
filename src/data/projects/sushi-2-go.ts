import { Project } from "./types";

export const sushi2Go: Project = {
  id: "sushi-2-go",
  title: "Sushi 2 Go",
  description: "A PC endless runner developed as my first game project during my studies at Futuregames. The game was created in three weeks as a cross-site collaboration, with game designers in Warsaw and programmers and artists in Malmö.",
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
        title: "Project Breakdown",
        paragraphs: [
          {
            text: "Sushi 2 Go is a PC endless runner developed as my first game project during my studies at Futuregames. The game was created in three weeks as a cross-site collaboration, with game designers in Warsaw and programmers and artists in Malmö.",
            highlights: ["Sushi 2 Go", "PC endless runner", "first game project", "Futuregames", "three weeks", "cross-site collaboration", "Warsaw", "Malmö"],
          },
          {
            text: "Players control a piece of sushi escaping along a conveyor belt inside a busy sushi restaurant, avoiding obstacles as the speed gradually increases.",
            highlights: ["piece of sushi", "conveyor belt", "sushi restaurant", "obstacles", "speed gradually increases"],
          },
          {
            text: "The project focused on learning core production workflows, team collaboration, and delivering a playable experience within a tight academic schedule.",
            highlights: ["core production workflows", "team collaboration", "playable experience", "tight academic schedule"],
          },
        ],
      },
      right: {
        title: "Focus Areas",
        bulletPoints: [],
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
    
    // Key Contribution Section
    {
      type: "text",
      title: "Key Contribution",
      paragraphs: [
        {
          text: "• VFX Design (Minor Contribution): Implemented subtle screen-edge speed line effects to enhance the sense of movement and speed, providing clear visual feedback as the conveyor belt accelerates.",
          highlights: ["VFX Design", "Minor Contribution", "screen-edge speed line effects", "sense of movement", "speed", "visual feedback", "conveyor belt accelerates"],
        },
      ],
    },
    
    // Team Collaboration Section
    {
      type: "text",
      title: "Team Collaboration",
      paragraphs: [
        {
          text: "Sushi 2 Go was developed by a distributed team, with designers in Warsaw and programmers and artists in Malmö. Because of this setup, clear communication and teamwork were essential throughout the project.",
          highlights: ["distributed team", "Warsaw", "Malmö", "clear communication", "teamwork"],
        },
        {
          text: "I worked closely with the team to ensure the visual effect aligned with gameplay and did not obstruct player visibility. Based on feedback, I refined the effect so it felt smooth, readable, and supported the sense of speed without becoming distracting.",
          highlights: ["visual effect", "gameplay", "player visibility", "feedback", "smooth", "readable", "sense of speed"],
        },
        {
          text: "This project helped me understand how small individual contributions come together in a team project and highlighted the importance of collaboration when working under short deadlines.",
          highlights: ["small individual contributions", "team project", "collaboration", "short deadlines"],
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



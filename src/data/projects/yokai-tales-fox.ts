import { Project } from "./types";

export const yokaiTalesFox: Project = {
  id: "yokai-tales-fox",
  title: "Yokai Tales - Fox",
  description: "",
  category: "professional",
  icon: "Gamepad2",
  thumbnailImage: "/images/yokai-tales-fox.jpg",
  coverImage: "/images/Silkroad_Fishing_Village_Coverphoto.jpg",
  sections: [
  {
    type: "video",
    videoUrl: "/videos/Silkroad_Fishing_Village.mp4",
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
          text: "Yokai Tales: Fox is a professional game development project at Silkroad Studios, where I worked as a Level Designer.",
          highlights: [
            "Yokai Tales: Fox",
            "Silkroad Studios",
            "Level Designer",
          ],
        },
        {
          text: "My main contribution was the gameplay redesign of the Fishing Village, adapting the level to new gameplay metrics and features while improving player flow, traversal, and overall gameplay feel.",
          highlights: [
            "gameplay redesign",
            "Fishing Village",
            "gameplay metrics",
            "player flow",
            "traversal",
          ],
        },
        {
          text: "The level was developed through continuous design, feedback, and playtesting, allowing me to identify problems and refine the experience based on real player behaviour.",
          highlights: [
            "design",
            "feedback",
            "playtesting",
            "player behaviour",
          ],
        },
      ],
    },

    right: {
      title: "Focus Areas",
      bulletPoints: [
        {
          label: "Gameplay Redesign & Player Flow:",
          text: "I took ownership of the Fishing Village gameplay redesign, focusing on player flow, progression, and readable routes. I adapted the layout to support gameplay metrics and features while improving the level structure.",
        },
        {
          label: "Traversal & Parkour:",
          text: "I designed traversal and parkour spaces that encourage exploration and vertical movement. Gameplay spaces were built around movement, encounters, Balistha interactions, traversal targets, and environmental landmarks to create gameplay opportunities.",
        },
        {
          label: "Feedback & Playtesting:",
          text: "The level was refined through team feedback and playtesting. I used player behaviour and observations to identify navigation and gameplay issues, making targeted changes to improve the flow, clarity, and gameplay feel.",
        },
      ],
         },
    },

    {
  type: "screenshotGallery",
  fit: "contain",
  images: [
        "/images/fishing-village-01.jpg",
        "/images/fishing-village-02.jpg",
        "/images/fishing-village-03.jpg",
        "/images/fishing-village-04.jpg",
        "/images/fishing-village-05.jpg",
        "/images/fishing-village-06.jpg",
        "/images/fishing-village-07.jpg",
        "/images/fishing-village-08.jpg",
        "/images/fishing-village-09.jpg",
        "/images/fishing-village-010.jpg",
        "/images/fishing-village-011.jpg",
      ],
    },
  ],
};
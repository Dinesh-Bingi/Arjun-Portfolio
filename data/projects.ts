// Project types
export interface Project {
  id: string;
  title: string;
  description: string;
  category: "personal" | "group";
  icon: string;
  thumbnailImage?: string;
  coverImage?: string;
  genre?: string;
  sections: ProjectSection[];
  [key: string]: unknown;
}

export interface ProjectSection {
  type: string;
  [key: string]: unknown;
}

// Sample projects data
export const projects: Project[] = [
  {
    id: "the-light-remains",
    title: "The Light Remains",
    description: "A narrative exploration game focused on atmosphere and environmental storytelling.",
    category: "personal",
    icon: "Map",
    thumbnailImage: "/images/projects/the-light-remains-thumb.jpg",
    coverImage: "/images/projects/the-light-remains-cover.jpg",
    genre: "Exploration",
    sections: []
  },
  {
    id: "metro-descent",
    title: "Echoes of Stella",
    description: "A stealth-action game set in abandoned metro tunnels with dynamic lighting systems.",
    category: "personal",
    icon: "Compass",
    thumbnailImage: "/images/projects/metro-descent-thumb.jpg",
    coverImage: "/images/projects/metro-descent-cover.jpg",
    genre: "Stealth-Action",
    sections: []
  },
  {
    id: "sabershot-jack-of-all-blades",
    title: "Sabershot: Jack of All Blades",
    description: "Fast-paced action game with sword combat and projectile mechanics.",
    category: "personal",
    icon: "Gamepad2",
    thumbnailImage: "/images/projects/sabershot-thumb.jpg",
    coverImage: "/images/projects/sabershot-cover.jpg",
    genre: "Action",
    sections: []
  },
  {
    id: "puddle-whispers",
    title: "Puddle Whispers",
    description: "A meditative puzzle game about water reflections and hidden worlds.",
    category: "group",
    icon: "Mountain",
    thumbnailImage: "/images/projects/puddle-whispers-thumb.jpg",
    coverImage: "/images/projects/puddle-whispers-cover.jpg",
    genre: "Puzzle",
    sections: []
  },
  {
    id: "just-my-duck",
    title: "Just My Duck",
    description: "A charming casual game about guiding a duck through obstacle courses.",
    category: "group",
    icon: "Building",
    thumbnailImage: "/images/projects/just-my-duck-thumb.jpg",
    coverImage: "/images/projects/just-my-duck-cover.jpg",
    genre: "Casual",
    sections: []
  },
  {
    id: "sushi-2-go",
    title: "Sushi 2 Go",
    description: "A fast-paced cooking game where players manage a sushi delivery service.",
    category: "group",
    icon: "Layers",
    thumbnailImage: "/images/projects/sushi-2-go-thumb.jpg",
    coverImage: "/images/projects/sushi-2-go-cover.jpg",
    genre: "Simulation",
    sections: []
  }
];

// Helper functions
export const getProjectById = (id: string): Project | undefined =>
  projects.find(p => p.id === id);

export const getProjectsByCategory = (category: Project["category"]): Project[] =>
  projects.filter(p => p.category === category);

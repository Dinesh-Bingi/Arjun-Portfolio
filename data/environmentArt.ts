export interface EnvironmentArtItem {
  id: string;
  imageSrc: string;
  artStationUrl: string;
  alt: string;
}

export const environmentArtItems: EnvironmentArtItem[] = [
  {
    id: "env-art-1",
    imageSrc: "/images/environment-art-1.jpg",
    artStationUrl: "https://arjunkurapati.artstation.com/projects/04deGe",
    alt: "Environment art work 1 - Level design support"
  },
  {
    id: "env-art-2",
    imageSrc: "/images/environment-art-2.jpg",
    artStationUrl: "https://arjunkurapati.artstation.com/projects/elDzKX",
    alt: "Environment art work 2 - World building asset"
  },
  {
    id: "env-art-3",
    imageSrc: "/images/environment-art-3.jpg",
    artStationUrl: "https://arjunkurapati.artstation.com/",
    alt: "Environment art work 3 - Supporting environment design"
  }
];

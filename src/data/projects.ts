// Re-export from the new modular project structure
// This file is kept for backward compatibility

export { projects, getProjectById, getProjectsByCategory, getIconComponent } from "./projects/index";
export type { Project, ProjectSection } from "./projects/types";

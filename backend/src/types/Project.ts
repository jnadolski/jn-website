// src/types/Project.ts

export interface Project {
    id: string; // Document ID
    title: string;
    techStack: string[];
    challengeText: string;
    oversightText: string;
    cicdText: string;
}

export type NewProject = Omit<Project, 'id'>;

export type ProjectData = Omit<Project, 'id'>;

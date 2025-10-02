import React from 'react';
import useDataFetching from './hooks/useDataFetching';

interface Project {
  id: string;
  title: string;
  description: string;
  url: string;
  technologies: string[];
}

const Projects = () => {
  const { data: projects, loading, error } = useDataFetching<Project>(`${process.env.REACT_APP_API_URL}/api/projects`);

  if (loading) {
    return <div>Loading projects...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="page-content">
      <h2>Projects</h2>
      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <img src="/project-icon.png" alt={project.title} className="project-icon" />
            <div className="project-card-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="technologies">
                {project.technologies.map((tech) => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                View Project
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;

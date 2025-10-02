import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './FeaturedProjects.css'; // Assuming a CSS file for styling

interface Project {
  id: string;
  title: string;
  description: string;
  url: string;
  technologies: string[];
}

const FeaturedProjects = () => {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/projects`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Project[] = await response.json();
        // Take the first 2 projects as featured
        setFeaturedProjects(data.slice(0, 2));
      } catch (err) {
        setError('Failed to fetch featured projects.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <section className="featured-projects"><div>Loading featured projects...</div></section>;
  }

  if (error) {
    return <section className="featured-projects"><div>{error}</div></section>;
  }

  return (
    <section className="featured-projects">
      <h2>Featured Projects</h2>
      <div className="projects-grid">
        {featuredProjects.map((project) => (
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
      <Link to="/projects" className="button primary">View All Project Details</Link>
    </section>
  );
};

export default FeaturedProjects;

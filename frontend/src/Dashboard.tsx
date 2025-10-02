import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useDataFetching from './hooks/useDataFetching';
import ProjectForm from './components/ProjectForm';

interface Project {
  id?: string;
  title: string;
  description: string;
  url: string;
  technologies: string[];
}

interface AboutPageContent {
  title: string;
  bio: string[];
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { data: projects, loading: projectsLoading, error: projectsError, setData: setProjects } = useDataFetching<Project>(`${process.env.REACT_APP_API_URL}/api/projects`);
  
  const [isProjectFormVisible, setIsProjectFormVisible] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);

  const [aboutContent, setAboutContent] = useState<AboutPageContent>({ title: '', bio: [] });
  const [aboutLoading, setAboutLoading] = useState(true);
  const [aboutError, setAboutError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAboutContent = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/pages/about`);
        if (response.ok) {
          const data = await response.json();
          setAboutContent(data);
        }
      } catch (err) {
        setAboutError('Failed to fetch about page content.');
      } finally {
        setAboutLoading(false);
      }
    };
    fetchAboutContent();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleAddProjectClick = () => {
    setProjectToEdit(null);
    setIsProjectFormVisible(true);
  };

  const handleEditProjectClick = (project: Project) => {
    setProjectToEdit(project);
    setIsProjectFormVisible(true);
  };

  const handleProjectFormSubmit = async (project: Project) => {
    const token = localStorage.getItem('token');
    const method = project.id ? 'PUT' : 'POST';
    const url = project.id ? `${process.env.REACT_APP_API_URL}/api/projects/${project.id}` : `${process.env.REACT_APP_API_URL}/api/projects`;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(project),
      });

      if (!response.ok) {
        throw new Error('Failed to save project');
      }

      const savedProject = await response.json();

      if (project.id) {
        setProjects(projects.map(p => p.id === savedProject.id ? savedProject : p));
      } else {
        setProjects([...projects, savedProject]);
      }

      setIsProjectFormVisible(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProject = async (id: string) => {
    const token = localStorage.getItem('token');
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/projects/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to delete project');
        }

        setProjects(projects.filter(p => p.id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleAboutFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/pages/about`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(aboutContent),
      });

      if (!response.ok) {
        throw new Error('Failed to save about page content');
      }

      alert('About page content saved!');
    } catch (err) {
      console.error(err);
      alert('Failed to save about page content.');
    }
  };

  const handleAboutBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAboutContent({ ...aboutContent, bio: e.target.value.split('\n') });
  };

  return (
    <div className="page-content">
      <h1>Dashboard</h1>
      <p>This is your private, protected area.</p>
      <Link to="/gallery">Manage Gallery</Link>
      <button onClick={handleLogout}>Logout</button>

      <hr />

      <h2>Manage About Page</h2>
      {aboutLoading && <div>Loading about page content...</div>}
      {aboutError && <div>{aboutError}</div>}
      <form onSubmit={handleAboutFormSubmit}>
        <label>
          Title:
          <input 
            type="text" 
            value={aboutContent.title || ''} 
            onChange={(e) => setAboutContent({ ...aboutContent, title: e.target.value })}
          />
        </label>
        <label>
          Bio (separate paragraphs with a new line):
          <textarea 
            value={aboutContent.bio.join('\n')} 
            onChange={handleAboutBioChange} 
            rows={10}
          />
        </label>
        <button type="submit">Save About Page</button>
      </form>

      <hr />

      <h2>Manage Projects</h2>

      {isProjectFormVisible ? (
        <ProjectForm 
          projectToEdit={projectToEdit}
          onFormSubmit={handleProjectFormSubmit} 
          onCancel={() => setIsProjectFormVisible(false)} 
        />
      ) : (
        <button onClick={handleAddProjectClick}>Add New Project</button>
      )}
      
      {projectsLoading && <div>Loading projects...</div>}
      {projectsError && <div>{projectsError}</div>}
      
      <div className="projects-list">
        {projects.map((project) => (
          <div key={project.id} className="project-item">
            <h3>{project.title}</h3>
            <button onClick={() => handleEditProjectClick(project)}>Edit</button>
            <button onClick={() => { if (project.id) { handleDeleteProject(project.id) }}}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
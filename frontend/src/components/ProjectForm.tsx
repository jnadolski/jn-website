import React, { useState, useEffect } from 'react';

interface Project {
  id?: string;
  title: string;
  description: string;
  url: string;
  technologies: string[];
}

interface ProjectFormProps {
  projectToEdit?: Project | null;
  onFormSubmit: (project: Project) => Promise<void> | void;
  onCancel: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ projectToEdit, onFormSubmit, onCancel }) => {
  const [project, setProject] = useState<Project>({ title: '', description: '', url: '', technologies: [] });

  useEffect(() => {
    if (projectToEdit) {
      setProject(projectToEdit);
    } else {
      setProject({ title: '', description: '', url: '', technologies: [] });
    }
  }, [projectToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  const handleTechChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProject({ ...project, technologies: e.target.value.split(',').map(tech => tech.trim()) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFormSubmit(project);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" name="title" value={project.title} onChange={handleChange} required />
      </label>
      <label>
        Description:
        <textarea name="description" value={project.description} onChange={handleChange} required />
      </label>
      <label>
        URL:
        <input type="text" name="url" value={project.url} onChange={handleChange} required />
      </label>
      <label>
        Technologies (comma-separated):
        <input type="text" name="technologies" value={project.technologies.join(', ')} onChange={handleTechChange} required />
      </label>
      <button type="submit">{projectToEdit ? 'Update Project' : 'Add Project'}</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default ProjectForm;

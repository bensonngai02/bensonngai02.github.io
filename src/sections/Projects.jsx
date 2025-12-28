// Projects section; rendered with the same expandable list used by experiences.
import React from 'react';
import ExperienceList from '../components/ExperienceList';
import { projects } from '../data/projects';

function Projects() {
  return <ExperienceList items={projects} id="projects" title="projects" sectionClassName="projects-section" />;
}

export default Projects;

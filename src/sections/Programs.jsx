// Programs section; content comes from src/data/programs.js.
import React from 'react';
import ExperienceList from '../components/ExperienceList';
import { programs } from '../data/programs';

function Programs() {
  return <ExperienceList items={programs} id="programs" title="programs" sectionClassName="programs-section" />;
}

export default Programs;

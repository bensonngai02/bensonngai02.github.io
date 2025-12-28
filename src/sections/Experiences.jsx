// Experiences section; all content comes from src/data/experiences.js.
import React from 'react';
import ExperienceList from '../components/ExperienceList';
import { experiences } from '../data/experiences';

function Experiences() {
  return <ExperienceList items={experiences} id="experiences" title="experiences" />;
}

export default Experiences;

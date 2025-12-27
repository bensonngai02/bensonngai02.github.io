// Home page assembly; edit to reorder or include sections on the landing page.
import React from 'react';
import About from '../sections/About';
import Experiences from '../sections/Experiences';
import Projects from '../sections/Projects';
import Life from '../sections/Life';
import Blog from '../sections/Blog';

function Home() {
  return (
    <main>
      <About />
      <Experiences />
      <Projects />
      <Blog />
      <Life />
    </main>
  );
}

export default Home;

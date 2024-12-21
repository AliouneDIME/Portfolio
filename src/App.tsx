import React from 'react';
import { Layout } from './components/layout/Layout';
import { Hero } from './components/Hero';
import { About } from './components/About/About';
import { Services } from './components/Services/Services';
import { Formation } from './components/Formation/Formation';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';

function App() {
  return (
    <Layout>
      <Hero />
      <About />
      <Services />
      <Formation />
      <Projects />
      <Skills />
      <Contact />
    </Layout>
  );
}

export default App;
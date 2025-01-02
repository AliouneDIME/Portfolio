import { Layout } from './components/layout/Layout';
import { Hero } from './components/Hero';
import { About } from './components/About/About';
import { Services } from './components/Services/Services';
import { Formation } from './components/Formation/Formation';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { AnimatedSection } from './components/common/AnimatedSection';

function App() {
  return (
    <Layout>
      <AnimatedSection>
        <Hero />
      </AnimatedSection>
      
      <AnimatedSection delay={0.2}>
        <About />
      </AnimatedSection>
      
      <AnimatedSection delay={0.3}>
        <Services />
      </AnimatedSection>
      
      <AnimatedSection delay={0.4}>
        <Formation />
      </AnimatedSection>
      
      <AnimatedSection delay={0.5}>
        <Projects />
      </AnimatedSection>
      
      <AnimatedSection delay={0.6}>
        <Skills />
      </AnimatedSection>
      
      <AnimatedSection delay={0.7}>
        <Contact />
      </AnimatedSection>
    </Layout>
  );
}

export default App;
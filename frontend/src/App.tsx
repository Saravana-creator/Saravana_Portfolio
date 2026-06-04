import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen      from '@/components/layout/LoadingScreen';
import Navbar             from '@/components/layout/Navbar';
import Footer             from '@/components/layout/Footer';
import HeroSection        from '@/components/sections/HeroSection';
import AboutSection       from '@/components/sections/AboutSection';
import SkillsSection      from '@/components/sections/SkillsSection';
import ProjectsSection    from '@/components/sections/ProjectsSection';
import ExperienceSection  from '@/components/sections/ExperienceSection';
import ContactSection     from '@/components/sections/ContactSection';
import { trackPageView }  from '@/lib/api';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    trackPageView('/');
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <LoadingScreen onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {!loading && (
        <>
          <Navbar />
          <main>
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <ExperienceSection />
            <ContactSection />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}

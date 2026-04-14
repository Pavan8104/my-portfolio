import { useState, useEffect, lazy, Suspense } from 'react';
import { useAppStore } from '../stores/appStore';
import { AnimatePresence } from 'framer-motion';
import BootScreen from './BootScreen';
import Navbar from './Navbar';
import ScanLines from './effects/ScanLines';
import SectionDivider from './effects/SectionDivider';
import ScrollProgress from './effects/ScrollProgress';
import HeroSection from './Hero/HeroSection';
import AboutSection from './AboutMe/AboutSection';
import ProjectsSection from './Projects/ProjectsSection';
import ExperienceSection from './Experience/ExperienceSection';
import BlogSection from './Blog/BlogSection';
import ToolboxSection from './Toolbox/ToolboxSection';
import ContactSection from './Contact/ContactSection';
import StatsCounter from './effects/StatsCounter';

const StarfieldBackground = lazy(() => import('./effects/StarfieldBackground'));

export default function Layout() {
  const { booted, showAbout, scrollLocked, setBoot, setShowAbout, setScrollLocked } =
    useAppStore();

  const handleHackClick = () => {
    setShowAbout(true);
    setScrollLocked(true);
  };

  const handleEscape = () => {
    setShowAbout(false);
    setScrollLocked(false);
  };

  // Lock/unlock scroll
  useEffect(() => {
    document.body.style.overflow = scrollLocked ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [scrollLocked]);

  return (
    <div className="min-h-screen bg-cyber-black text-cyber-blue relative">
      {/* Boot Screen */}
      {!booted && <BootScreen onComplete={() => {
        setBoot(true);
        // User has interacted via boot screen, safe to start audio
        import('../hooks/useAudio').then(({ startAmbientMusic }) => {
          const { audioEnabled } = useAppStore.getState();
          if (audioEnabled) startAmbientMusic();
        });
      }} />}

      {/* Background effects (lazy loaded) */}
      {booted && (
        <Suspense fallback={null}>
          <StarfieldBackground />
        </Suspense>
      )}

      {/* Scanlines */}
      <ScanLines />

      {/* Scroll progress */}
      {booted && <ScrollProgress />}

      {/* Navbar */}
      {booted && <Navbar />}

      {/* Main content */}
      {booted && (
        <main>
          <HeroSection onHackClick={handleHackClick} />
          {!showAbout && (
            <>
              <StatsCounter />
              <SectionDivider />

              {/* Projects Grid */}
              <ProjectsSection />

              {/* Sections after verse — always rendered */}
              <SectionDivider />
              <ExperienceSection />
              <SectionDivider />
              <ToolboxSection />
              <SectionDivider />
              <BlogSection />
              <SectionDivider />
              <ContactSection />
            </>
          )}
        </main>
      )}

      {/* About overlay */}
      <AboutSection isVisible={showAbout} onEscape={handleEscape} />

      {/* Scroll-to-top */}
      {booted && !showAbout && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-30 w-10 h-10 cyber-glass rounded-full flex items-center justify-center text-cyber-blue hover:text-neon-pink hover:shadow-neon transition-all"
        >
          ↑
        </button>
      )}
    </div>
  );
}

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playSound, toggleAudio } from '../hooks/useAudio';
import { useAppStore } from '../stores/appStore';
import { LOGO } from '../constants/brand';

const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Toolbox', href: '#toolbox' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

function AudioVisualizer({ active }: { active: boolean }) {
  return (
    <div className="flex items-center gap-[2px] h-4">
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="w-[3px] bg-cyber-blue rounded-full"
          animate={
            active
              ? { height: [4, 12 + i * 2, 6, 14 - i, 4] }
              : { height: 4 }
          }
          transition={
            active
              ? { duration: 0.8, repeat: Infinity, delay: i * 0.1, ease: 'easeInOut' }
              : { duration: 0.3 }
          }
        />
      ))}
    </div>
  );
}

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const audioEnabled = useAppStore((s) => s.audioEnabled);

  // Active section detection via IntersectionObserver
  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.slice(1));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Scroll detection for navbar background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    playSound('click');
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'cyber-glass-strong border-b border-cyan-900/30'
            : 'bg-transparent border-b border-transparent'
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 3.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="font-cyber text-lg text-cyber-blue tracking-wider cursor-pointer"
            whileHover={{ textShadow: '0 0 30px rgba(0,255,255,0.8)' }}
            onClick={() => handleNavClick('#hero')}
          >
            <span className="text-neon-pink">{'<'}</span>
            {LOGO}
            <span className="text-neon-pink">{'/>'}</span>
          </motion.div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <motion.button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  onMouseEnter={() => playSound('hover')}
                  className={`relative px-3 py-2 font-code text-sm rounded-md transition-colors ${
                    isActive
                      ? 'text-cyber-blue'
                      : 'text-cyber-blue-dim hover:text-cyber-blue'
                  }`}
                  whileHover={{ y: -1 }}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-neon-pink rounded-full"
                      layoutId="navActiveBar"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      style={{ boxShadow: '0 0 8px rgba(255,0,153,0.6)' }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Toggle */}
            <button
              onClick={() => {
                toggleAudio();
                playSound('click');
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
              title={audioEnabled ? 'Mute' : 'Unmute'}
            >
              <AudioVisualizer active={audioEnabled} />
              <span className="text-xs text-cyber-blue-dim font-code hidden sm:block">
                {audioEnabled ? 'ON' : 'OFF'}
              </span>
            </button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/5 transition-colors"
              onClick={() => {
                setMenuOpen(!menuOpen);
                playSound('click');
              }}
              aria-label="Toggle menu"
            >
              <motion.div
                className="w-5 h-[2px] bg-cyber-blue rounded-full origin-center"
                animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.div
                className="w-5 h-[2px] bg-cyber-blue rounded-full"
                animate={menuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.div
                className="w-5 h-[2px] bg-cyber-blue rounded-full origin-center"
                animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setMenuOpen(false)} />
            <motion.div
              className="absolute top-16 left-0 right-0 cyber-glass-strong border-b border-cyan-900/30 p-4"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col gap-1">
                {navItems.map((item, i) => {
                  const isActive = activeSection === item.href.slice(1);
                  return (
                    <motion.button
                      key={item.label}
                      onClick={() => handleNavClick(item.href)}
                      className={`text-left px-4 py-3 rounded-lg font-code text-sm transition-colors ${
                        isActive
                          ? 'text-neon-pink bg-neon-pink/10 border-l-2 border-neon-pink'
                          : 'text-cyber-blue-dim hover:text-cyber-blue hover:bg-white/5'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <span className="text-cyber-blue-dim mr-2">{'>'}</span>
                      {item.label}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

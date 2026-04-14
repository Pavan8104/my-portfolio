import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { playSound } from '../../hooks/useAudio';
import type { Project } from '../../data/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
  featured?: boolean;
}

export default function ProjectCard({ project, index, featured = false }: ProjectCardProps) {
  const [blast, setBlast] = useState<{ x: number, y: number, active: boolean } | null>(null);

  const handleNavigate = (e: React.MouseEvent | React.TouchEvent, link: string) => {
    e.preventDefault();
    e.stopPropagation();
    playSound('click');

    let x = 0;
    let y = 0;
    if ('touches' in e && e.touches.length > 0) {
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    } else {
      x = (e as React.MouseEvent).clientX;
      y = (e as React.MouseEvent).clientY;
    }

    setBlast({ x, y, active: true });

    setTimeout(() => {
      window.open(link, '_blank');
      setBlast(null); // Reset after redirect
    }, 900);
  };

  // Helper to auto-generate names from URLs (e.g. beamish-quokka -> Beamish Quokka)
  const getAutoTitle = () => {
    // If the data already contains the exact title intended by the user, respect it first:
    // Actually, per instruction to auto-format from URL, we parse the URL heavily:
    const urlString = project.live || project.github; // Prioritize live links for slug
    if (urlString) {
      try {
        const url = new URL(urlString);
        let slug = url.pathname.split('/').filter(Boolean).pop();
        
        if (!slug || slug === '') {
          // If the link is the root of a deployment service, parse the subdomain
          const hostnameParts = url.hostname.split('.');
          if (hostnameParts.length > 2) {
             slug = hostnameParts[0].replace(/-[a-z0-9]{6,20}$/i, ''); // Strip netlify/vercel/streamlit hashes
          } else {
             slug = hostnameParts[0];
          }
        }
        
        if (slug && slug.length > 2) { // Ensure slug is substantial and not a generic string
          return slug
            .split(/[-_]+/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
        }
      } catch { /* graceful fallback */ }
    }
    return project.title;
  };

  const displayTitle = getAutoTitle();

  return (
    <motion.div
      className={`relative group cursor-pointer overflow-hidden rounded-xl cyber-glass border ${
        featured ? 'border-neon-pink/40 shadow-[0_0_15px_rgba(255,0,153,0.15)]' : 'border-cyber-blue/30 shadow-[0_0_15px_rgba(0,255,255,0.1)]'
      }`}
      style={{
        background: 'rgba(10, 10, 10, 0.5)',
        backdropFilter: 'blur(12px)',
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{
        scale: 1.05,
        boxShadow: featured
          ? '0 0 35px rgba(255,0,153,0.6)'
          : '0 0 30px rgba(0,255,255,0.5)',
      }}
      onHoverStart={() => playSound('hover')}
      onClick={(e) => {
        const link = project.github || project.live;
        if (link && !blast?.active) handleNavigate(e, link);
      }}
    >
      {/* Floating continuous animation via inner wrapper */}
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 4 + (index % 3), repeat: Infinity, ease: 'easeInOut' }}
        className="h-full flex flex-col"
      >
        {/* Glow gradient backplate */}
        <div className={`absolute -inset-2 opacity-10 ${featured ? 'bg-gradient-to-br from-neon-pink to-transparent' : 'bg-gradient-to-br from-cyber-blue to-transparent'} pointer-events-none rounded-xl`} />
        
        {/* Content Wrapper */}
        <div className="relative z-10 p-6 sm:p-8 flex flex-col h-full min-h-[220px]">
          {/* Title */}
          <h3 className={`font-cyber mb-3 ${featured ? 'text-2xl text-neon-pink tracking-widest' : 'text-xl text-cyber-blue tracking-wider'}`}>
            {displayTitle}
          </h3>
          
          {/* Description */}
          <p className="font-code text-sm text-cyber-blue-dim leading-relaxed mb-6 flex-grow">
            {project.description}
          </p>

          {/* Tech Stack Badges */}
          <div className="flex flex-wrap gap-2 mt-auto relative z-20">
            {project.tags.map(tag => (
              <span
                key={tag}
                className={`px-2.5 py-1 text-[10px] font-code rounded border ${
                  featured
                    ? 'bg-neon-pink/10 text-neon-pink border-neon-pink/30'
                    : 'bg-cyber-blue/10 text-cyber-blue border-cyber-blue/30'
                }`}
              >
                [{tag}]
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 flex flex-col items-center justify-center gap-4">
        {project.github && (
          <button 
            className="cyber-button px-6 py-2.5 text-xs w-[60%] flex items-center justify-center gap-2"
            onClick={(e) => !blast?.active && handleNavigate(e, project.github!)}
            onTouchStart={(e) => !blast?.active && handleNavigate(e, project.github!)}
          >
            {'<>'} View Code
          </button>
        )}
        {project.live && (
          <button 
            className="cyber-button-pink px-6 py-2.5 text-xs w-[60%] flex items-center justify-center gap-2 tracking-widest uppercase font-cyber"
            onClick={(e) => !blast?.active && handleNavigate(e, project.live!)}
            onTouchStart={(e) => !blast?.active && handleNavigate(e, project.live!)}
          >
            ▸ Live Demo
          </button>
        )}
      </div>

      {/* Cinematic Blast Effect */}
      {blast?.active && typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          <motion.div
            className="fixed z-[9999] rounded-full pointer-events-none mix-blend-screen"
            style={{
              left: blast.x,
              top: blast.y,
              width: '30px',
              height: '30px',
              background: 'radial-gradient(circle, rgba(255,165,0,1) 0%, rgba(255,0,0,0.8) 40%, rgba(255,0,153,0) 80%)',
              x: '-50%',
              y: '-50%',
              boxShadow: '0 0 50px 20px rgba(255,165,0,0.5)',
            }}
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 150, opacity: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </AnimatePresence>,
        document.body
      )}

      {/* Corner Accents */}
      <div className={`absolute top-0 left-0 w-6 h-[2px] ${featured ? 'bg-neon-pink' : 'bg-cyber-blue'} pointer-events-none`} />
      <div className={`absolute top-0 left-0 w-[2px] h-6 ${featured ? 'bg-neon-pink' : 'bg-cyber-blue'} pointer-events-none`} />
      <div className={`absolute bottom-0 right-0 w-6 h-[2px] ${featured ? 'bg-neon-pink/50' : 'bg-cyber-blue/50'} pointer-events-none`} />
      <div className={`absolute bottom-0 right-0 w-[2px] h-6 ${featured ? 'bg-neon-pink/50' : 'bg-cyber-blue/50'} pointer-events-none`} />
    </motion.div>
  );
}

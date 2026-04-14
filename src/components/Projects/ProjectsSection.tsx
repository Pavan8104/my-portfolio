import { useState } from 'react';
import { motion } from 'framer-motion';
import { projects, type DomainKey } from '../../data/projects';
import ProjectCard from './ProjectCard';
import GalaxyTransition from './GalaxyTransition';
import { playSound } from '../../hooks/useAudio';

type Category = 'featured' | 'live' | 'other';

export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('featured');
  const [isAnimating, setIsAnimating] = useState(false);

  // Filter Logic
  let filteredProjects = projects;
  if (selectedCategory === 'featured') {
    filteredProjects = projects.filter(p => p.featured);
  } else if (selectedCategory === 'live') {
    filteredProjects = projects.filter(p => p.live);
  } else if (selectedCategory === 'other') {
    filteredProjects = projects.filter(p => !p.featured && !p.live);
  }

  const handleCategoryChange = (category: Category) => {
    if (category === selectedCategory || isAnimating) return;
    playSound('click');
    setIsAnimating(true);
    
    // Swap the active content exactly at the peak darkness of the transition
    setTimeout(() => {
      setSelectedCategory(category);
    }, 400);

    // Release animation lock after transition finishes
    setTimeout(() => {
      setIsAnimating(false);
    }, 900);
  };

  const buttons: { id: Category; label: string }[] = [
    { id: 'featured', label: 'Featured Projects' },
    { id: 'live', label: 'Live Projects' },
    { id: 'other', label: 'Other Projects' },
  ];

  return (
    <section id="projects" className="relative min-h-screen py-24 pb-32 overflow-hidden">
      <GalaxyTransition isAnimating={isAnimating} />

      {/* Background grids and glares */}
      <div className="absolute inset-0 cyber-grid-bg opacity-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/10 to-black pointer-events-none" />

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10 max-w-7xl">
        {/* Section heading */}
        <motion.div
          className="flex flex-col items-center justify-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-code text-xs text-cyber-blue-dim tracking-widest uppercase mb-4 text-center">
            {'// CLASSIFIED BUILDS'}
          </p>
          <h2 className="cyber-heading text-4xl md:text-5xl lg:text-6xl neon-text-pink text-center mb-10">
            Explorer
          </h2>

          {/* 3 Main View Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-3xl">
            {buttons.map((btn) => {
              const active = selectedCategory === btn.id;
              return (
                <button
                  key={btn.id}
                  className={`relative px-8 py-5 flex-1 min-w-[200px] text-sm md:text-base font-cyber tracking-widest transition-all duration-300 rounded-lg border ${
                    active 
                      ? 'border-neon-pink bg-neon-pink/10 text-white shadow-[0_0_20px_rgba(255,0,153,0.4)]' 
                      : 'border-cyber-blue/30 bg-black/40 text-cyber-blue-dim hover:border-cyber-blue hover:text-cyber-blue hover:shadow-[0_0_15px_rgba(0,255,255,0.2)]'
                  }`}
                  style={{ backdropFilter: 'blur(8px)' }}
                  onClick={() => handleCategoryChange(btn.id)}
                  onMouseEnter={() => !active && playSound('hover')}
                >
                  <span className="relative z-10">{btn.label}</span>
                  {active && (
                    <motion.div 
                      layoutId="activeCategoryGlow"
                      className="absolute inset-0 rounded-lg bg-gradient-to-r from-neon-pink/0 via-neon-pink/5 to-neon-pink/0"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Project Grid / Data Mount */}
        <motion.div 
          className={selectedCategory === 'live' ? "w-full flex flex-col" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full"}
          initial={{ opacity: 1 }}
          animate={{ opacity: isAnimating ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          {filteredProjects.length > 0 ? (
            selectedCategory === 'live' ? (
              // DOMAIN GROUPED RENDER (LIVE PROJECTS)
              <div className="space-y-20 w-full col-span-full">
                {(['AI / RAG', 'Data Science', 'Frontend'] as DomainKey[]).map(domain => {
                  const group = filteredProjects.filter(p => p.domain === domain);
                  if (group.length === 0) return null;
                  
                  return (
                    <div key={domain} className="w-full">
                      <h3 className="cyber-heading text-xl md:text-2xl text-cyber-blue mb-8 border-b border-cyber-blue/20 pb-4 inline-block">
                        <span className="text-neon-pink">{'[ '}</span>{domain}<span className="text-neon-pink">{' ]'}</span>
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full">
                        {group.map((project, index) => (
                          <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                            featured={project.featured}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              // STANDARD FLAT RENDER
              filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  featured={project.featured}
                />
              ))
            )
          ) : (
            <div className="col-span-full py-20 text-center font-code text-cyber-blue-dim border border-dashed border-cyber-blue/20 rounded-xl bg-black/30 w-full">
              <span className="text-2xl block mb-2 transition-all hover:text-neon-pink">∅</span>
              No projects detected in this operational category.
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

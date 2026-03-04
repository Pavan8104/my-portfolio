import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, type Project } from '../../data/projects';
import ProjectCard from './ProjectCard';
import ProjectCarousel from './ProjectCarousel';
import EnhancedPortal from './EnhancedPortal';

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative min-h-screen py-24 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 cyber-grid-bg opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-purple/5 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            className="font-code text-xs text-cyber-blue-dim tracking-widest uppercase mb-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {'// CLASSIFIED PROJECTS'}
          </motion.p>
          <h2 className="cyber-heading text-3xl md:text-5xl neon-text-pink">Projects</h2>
          <motion.p
            className="font-code text-cyber-blue-dim text-sm max-w-xl mx-auto mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Each project a testament to the fusion of creativity and code from the digital realm.
          </motion.p>
        </motion.div>

        {/* Mobile carousel */}
        <div className="block lg:hidden">
          <ProjectCarousel onProjectSelect={setSelectedProject} />
        </div>

        {/* Desktop grid */}
        <div className="hidden lg:grid grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Portal overlay */}
      <AnimatePresence>
        {selectedProject && (
          <EnhancedPortal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

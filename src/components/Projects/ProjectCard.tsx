import { motion } from 'framer-motion';
import { playSound } from '../../hooks/useAudio';
import type { Project } from '../../data/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

// Generate a unique gradient per project based on an index
const gradients = [
  'from-cyan-500/20 via-blue-600/10 to-purple-600/20',
  'from-pink-500/20 via-red-500/10 to-orange-500/20',
  'from-purple-500/20 via-indigo-500/10 to-blue-500/20',
  'from-green-400/20 via-emerald-500/10 to-teal-500/20',
  'from-yellow-400/20 via-amber-500/10 to-red-500/20',
  'from-rose-500/20 via-pink-500/10 to-fuchsia-500/20',
];

const icons = ['⟐', '◈', '⬡', '◇', '⟡', '⬢'];

export default function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  const isFeatured = project.featured;
  const gradient = gradients[index % gradients.length];
  const icon = icons[index % icons.length];

  return (
    <motion.div
      className={`relative cursor-pointer overflow-hidden group rounded-xl ${
        isFeatured ? 'border-2 border-neon-pink' : 'border border-cyber-blue/20'
      }`}
      style={{ background: 'rgba(10,10,10,0.6)', backdropFilter: 'blur(20px)' }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, type: 'spring', stiffness: 100 }}
      whileHover={{
        scale: 1.03,
        boxShadow: isFeatured
          ? '0 0 25px rgba(255,0,153,0.5), 0 0 50px rgba(255,0,153,0.15)'
          : '0 0 25px rgba(0,255,255,0.4), 0 0 50px rgba(0,255,255,0.1)',
      }}
      onHoverStart={() => playSound('hover')}
      onClick={onClick}
    >
      {/* Gradient thumbnail area */}
      <div className={`relative h-32 bg-gradient-to-br ${gradient} overflow-hidden`}>
        {/* Floating geometric icon */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ y: [0, -5, 0], rotate: [0, 3, -3, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className={`text-5xl opacity-30 ${isFeatured ? 'text-neon-pink' : 'text-cyber-blue'}`}>
            {icon}
          </span>
        </motion.div>

        {/* Grid overlay on thumbnail */}
        <div className="absolute inset-0 cyber-grid-bg opacity-20" />

        {/* Scan line sweep */}
        <motion.div
          className="absolute left-0 right-0 h-[1px]"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(0,255,255,0.4), transparent)' }}
          animate={{ top: ['0%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />

        {/* Featured badge */}
        {isFeatured && (
          <div className="absolute top-3 right-3 bg-neon-pink text-black px-2.5 py-1 text-[10px] font-bold font-cyber uppercase tracking-wider rounded-sm"
            style={{ boxShadow: '0 0 10px rgba(255,0,153,0.5)' }}
          >
            ★ Featured
          </div>
        )}

        {/* Project number */}
        <div className="absolute bottom-2 left-3 font-cyber text-[10px] text-white/20">
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-5">
        {/* Corner accents */}
        <div className="absolute top-0 left-0">
          <div className={`absolute top-0 left-0 w-5 h-[1px] ${isFeatured ? 'bg-neon-pink/50' : 'bg-cyber-blue/30'}`} />
          <div className={`absolute top-0 left-0 w-[1px] h-5 ${isFeatured ? 'bg-neon-pink/50' : 'bg-cyber-blue/30'}`} />
        </div>
        <div className="absolute bottom-0 right-0">
          <div className={`absolute bottom-0 right-0 w-5 h-[1px] ${isFeatured ? 'bg-neon-pink/50' : 'bg-cyber-blue/30'}`} />
          <div className={`absolute bottom-0 right-0 w-[1px] h-5 ${isFeatured ? 'bg-neon-pink/50' : 'bg-cyber-blue/30'}`} />
        </div>

        <h3 className={`font-cyber text-sm md:text-base uppercase tracking-wider mb-2 ${
          isFeatured ? 'neon-text-pink' : 'neon-text'
        }`}>
          {project.title}
        </h3>

        <p className="font-code text-cyber-blue-dim text-xs mb-4 line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className={`px-2 py-0.5 text-[10px] font-code rounded border ${
                isFeatured
                  ? 'bg-neon-pink/10 text-neon-pink border-neon-pink/20'
                  : 'bg-cyber-blue/10 text-cyber-blue border-cyber-blue/20'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-2">
          {project.github && (
            <button
              className="cyber-button text-[10px] py-1.5 px-3 flex items-center gap-1.5"
              onClick={(e) => {
                e.stopPropagation();
                playSound('click');
                window.open(project.github, '_blank');
              }}
            >
              {'<>'} Code
            </button>
          )}
          {project.live && (
            <button
              className="cyber-button-pink text-[10px] py-1.5 px-3 flex items-center gap-1.5"
              onClick={(e) => {
                e.stopPropagation();
                playSound('click');
                window.open(project.live, '_blank');
              }}
            >
              ▸ Demo
            </button>
          )}
        </div>
      </div>

      {/* Hover glow overlay */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
        isFeatured
          ? 'bg-gradient-to-t from-neon-pink/5 to-transparent'
          : 'bg-gradient-to-t from-cyber-blue/5 to-transparent'
      }`} />

      {/* Hover sparkle particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-0.5 h-0.5 rounded-full opacity-0 group-hover:opacity-100 ${
              isFeatured ? 'bg-neon-pink' : 'bg-cyber-blue'
            }`}
            style={{ left: `${15 + i * 18}%`, top: `${25 + i * 12}%` }}
            animate={{ y: [-5, -20, -5], opacity: [0, 0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.25 }}
          />
        ))}
      </div>
    </motion.div>
  );
}

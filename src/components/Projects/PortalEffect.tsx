import { motion } from 'framer-motion';
import { playSound } from '../../hooks/useAudio';
import type { Project } from '../../data/projects';

interface PortalEffectProps {
  project: Project;
  onClose: () => void;
}

export default function PortalEffect({ project, onClose }: PortalEffectProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.92)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onClick={onClose}
    >
      {/* Swirling portal rings */}
      <motion.div
        className="absolute w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full"
        style={{
          border: '2px solid rgba(0,255,255,0.2)',
          boxShadow:
            '0 0 60px rgba(0,255,255,0.2), inset 0 0 60px rgba(0,255,255,0.1)',
          background:
            'radial-gradient(circle, rgba(0,255,255,0.05) 0%, rgba(138,43,226,0.05) 50%, transparent 70%)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute w-[280px] h-[280px] md:w-[400px] md:h-[400px] rounded-full"
        style={{
          border: '1px solid rgba(255,0,153,0.15)',
          boxShadow: '0 0 40px rgba(255,0,153,0.15)',
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-full"
        style={{
          border: '1px solid rgba(138,43,226,0.2)',
          boxShadow: 'inset 0 0 50px rgba(138,43,226,0.1)',
        }}
        animate={{
          rotate: 360,
          scale: [1, 1.05, 1],
        }}
        transition={{
          rotate: { duration: 12, repeat: Infinity, ease: 'linear' },
          scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
        }}
      />

      {/* Floating tech icons */}
      <div className="absolute inset-0 pointer-events-none">
        {project.tags.map((tag, i) => (
          <motion.div
            key={tag}
            className="absolute neon-badge text-[10px]"
            style={{
              left: `${25 + Math.cos((i * Math.PI * 2) / project.tags.length) * 25}%`,
              top: `${30 + Math.sin((i * Math.PI * 2) / project.tags.length) * 20}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            {tag}
          </motion.div>
        ))}
      </div>

      {/* Content panel */}
      <motion.div
        className="relative z-10 cyber-glass-strong p-6 md:p-10 max-w-lg w-full mx-4 text-center"
        initial={{ y: 60, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6, type: 'spring' }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-cyber text-xl md:text-2xl neon-text-pink uppercase tracking-widest mb-3">
          {project.title}
        </h2>
        <p className="font-code text-cyber-blue-dim text-sm mb-6 leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {project.tags.map((tag, i) => (
            <motion.span
              key={tag}
              className="neon-badge"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              whileHover={{ scale: 1.1 }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        <div className="flex gap-4 justify-center mb-4">
          {project.github && (
            <motion.button
              className="cyber-button px-6 py-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                playSound('click');
                window.open(project.github, '_blank');
              }}
            >
              Code
            </motion.button>
          )}
          {project.live && (
            <motion.button
              className="cyber-button-pink px-6 py-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                playSound('whoosh');
                window.open(project.live, '_blank');
              }}
            >
              Let's Visit 🚀
            </motion.button>
          )}
        </div>

        <motion.button
          className="cyber-button-red text-xs px-5 py-2 mt-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          whileHover={{ scale: 1.05 }}
          onClick={onClose}
        >
          Close Portal
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

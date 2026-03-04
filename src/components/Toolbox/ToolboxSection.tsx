import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { tools, toolCategories, type Tool } from '../../data/tools';
import { playSound } from '../../hooks/useAudio';

function ToolBadge({ tool, index }: { tool: Tool; index: number }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
    >
      <motion.div
        className="cyber-glass px-4 py-3 cursor-pointer flex items-center gap-2.5 group"
        whileHover={{
          scale: 1.05,
          boxShadow: `0 0 15px ${tool.color}40, 0 0 30px ${tool.color}20`,
          borderColor: tool.color,
        }}
        onMouseEnter={() => {
          setShowTooltip(true);
          playSound('hover');
        }}
        onMouseLeave={() => setShowTooltip(false)}
        style={{ borderColor: `${tool.color}30` }}
      >
        <span className="text-lg">{tool.icon}</span>
        <span
          className="font-code text-xs font-medium transition-colors"
          style={{ color: tool.color }}
        >
          {tool.name}
        </span>
      </motion.div>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-20 w-48"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.15 }}
          >
            <div className="cyber-glass-strong p-3 text-center">
              <p className="font-code text-[10px] text-cyber-blue-dim leading-relaxed">
                {tool.description}
              </p>
            </div>
            {/* Arrow */}
            <div className="w-2 h-2 bg-cyber-black/90 border-b border-r border-cyan-900/25 rotate-45 mx-auto -mt-1" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ToolboxSection() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredTools = activeCategory === 'All'
    ? tools
    : tools.filter((t) => t.category === activeCategory);

  return (
    <section id="toolbox" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 cyber-grid-bg opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-blue/3 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-code text-xs text-cyber-blue-dim tracking-widest uppercase mb-3">
            {'// ARSENAL'}
          </p>
          <h2 className="cyber-heading text-3xl md:text-5xl neon-text">Toolbox</h2>
          <p className="font-code text-cyber-blue-dim text-sm max-w-xl mx-auto mt-4">
            Technologies and tools in the cyber arsenal. Hover for details.
          </p>
        </motion.div>

        {/* Filter chips */}
        <motion.div
          className="flex justify-center gap-2 mb-10 flex-wrap"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {toolCategories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                playSound('click');
              }}
              className={`font-cyber text-[11px] px-4 py-2 rounded-full uppercase tracking-wider transition-all border ${
                activeCategory === cat
                  ? 'bg-cyber-blue/15 text-cyber-blue border-cyber-blue shadow-neon'
                  : 'bg-transparent text-cyber-blue-dim border-cyber-blue/20 hover:border-cyber-blue/40'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Tool badges grid */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredTools.map((tool, index) => (
              <ToolBadge key={tool.name} tool={tool} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

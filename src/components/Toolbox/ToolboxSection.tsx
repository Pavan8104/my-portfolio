import { motion } from 'framer-motion';
import { toolCategories } from '../../data/tools';
import { playSound } from '../../hooks/useAudio';

export default function ToolboxSection() {
  return (
    <section id="toolbox" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 cyber-grid-bg opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-blue/3 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-code text-xs text-cyber-blue-dim tracking-widest uppercase mb-3">
            {'// ARSENAL'}
          </p>
          <h2 className="cyber-heading text-3xl md:text-5xl neon-text">Skills & Tech Stack</h2>
          <p className="font-code text-cyber-blue-dim text-sm max-w-xl mx-auto mt-4">
            A comprehensive mapping of operational capabilities and technical expertise.
          </p>
        </motion.div>

        {/* FAANG-Level Skill Category Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 max-w-[1400px] mx-auto">
          {toolCategories.map((group, index) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              onMouseEnter={() => playSound('hover')}
              className="cyber-glass p-6 md:p-8 rounded-xl border border-cyber-blue/20 hover:border-cyber-blue/80 hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] hover:scale-[1.02] transition-all duration-300 flex flex-col h-full"
            >
              <h3 className="font-cyber text-lg lg:text-xl text-cyber-blue tracking-wider mb-8 border-b border-cyber-blue/20 pb-4 leading-relaxed">
                <span className="text-neon-pink mr-2">{'//'}</span>{group.category}
              </h3>
              
              <div className="space-y-8 mt-auto content-start flex-1">
                {group.subcategories.map(subGroup => (
                  <div key={subGroup.title}>
                    <h4 className="font-code text-xs text-cyber-blue border-l-2 border-neon-pink pl-2 bg-cyber-blue/5 py-1 mb-4 uppercase tracking-widest">
                      {subGroup.title}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {subGroup.skills.map(skill => (
                        <span
                          key={skill}
                          className="px-3 py-1.5 text-xs font-code text-cyber-blue-dim bg-cyber-blue/5 border border-cyber-blue/20 rounded hover:bg-cyber-blue/15 hover:text-cyber-blue hover:border-cyber-blue/50 transition-colors cursor-default"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

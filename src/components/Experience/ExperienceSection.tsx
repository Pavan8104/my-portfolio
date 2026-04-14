import { motion } from 'framer-motion';
import { experiences } from '../../data/experience';
import { playSound } from '../../hooks/useAudio';
import VehicleLaunch from '../effects/VehicleLaunch';

const typeConfig = {
  work: { color: '#00FFFF', icon: '💼', label: 'EMPLOYMENT' },
  freelance: { color: '#FF0099', icon: '⚡', label: 'FREELANCE' },
  education: { color: '#8A2BE2', icon: '🎓', label: 'EDUCATION' },
};

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 cyber-grid-bg opacity-10" />

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
            {'// MISSION LOG'}
          </p>
          <h2 className="cyber-heading text-3xl md:text-5xl neon-text-pink">Experience</h2>
          <p className="font-code text-cyber-blue-dim text-sm max-w-xl mx-auto mt-4">
            A chronological record of operations and missions completed.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Central line */}
          <motion.div
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px]"
            style={{
              background: 'linear-gradient(to bottom, transparent, #00FFFF, #FF0099, #8A2BE2, transparent)',
              boxShadow: '0 0 8px rgba(0,255,255,0.3)',
            }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          />

          {experiences.map((exp, index) => {
            const config = typeConfig[exp.type];
            const isLeft = index % 2 === 0;

            return (
              <VehicleLaunch key={exp.id} delay={index * 0.15}>
                <div
                  className={`relative flex items-start mb-12 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Dot on timeline */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                    <motion.div
                      className="w-4 h-4 rounded-full border-2"
                      style={{
                        borderColor: config.color,
                        backgroundColor: `${config.color}30`,
                        boxShadow: `0 0 10px ${config.color}50`,
                      }}
                      whileInView={{
                        boxShadow: [
                          `0 0 10px ${config.color}50`,
                          `0 0 20px ${config.color}80`,
                          `0 0 10px ${config.color}50`,
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>

                  {/* Content card */}
                  <div
                    className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${
                      isLeft ? 'md:pr-8' : 'md:pl-8'
                    }`}
                  >
                    <motion.div
                      className="cyber-glass p-5 group cursor-default"
                      whileHover={{
                        boxShadow: `0 0 15px ${config.color}30, 0 0 30px ${config.color}15`,
                      }}
                      onMouseEnter={() => playSound('hover')}
                    >
                      {/* Type badge */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm">{config.icon}</span>
                        <span
                          className="font-code text-[10px] uppercase tracking-widest"
                          style={{ color: config.color }}
                        >
                          {config.label}
                        </span>
                        <span className="font-code text-[10px] text-cyber-blue-dim ml-auto">
                          {exp.period}
                        </span>
                      </div>

                      {/* Role & Company */}
                      <h3
                        className="font-cyber text-sm uppercase tracking-wider mb-1"
                        style={{ color: config.color }}
                      >
                        {exp.role}
                      </h3>
                      <p className="font-code text-xs text-cyber-blue-dim mb-3">
                        @ {exp.company}
                      </p>

                      {/* Description */}
                      <p className="font-code text-xs text-cyber-blue-dim/80 leading-relaxed mb-3">
                        {exp.description}
                      </p>

                      {/* Tech tags */}
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {exp.tech.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 text-[10px] font-code rounded border"
                            style={{
                              borderColor: `${config.color}30`,
                              color: config.color,
                              backgroundColor: `${config.color}08`,
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* LinkedIn Proof */}
                      {exp.linkedin && (
                        <div className="flex flex-col sm:flex-row items-center sm:justify-start mt-4 pt-4 border-t border-cyber-blue/10">
                          <a
                            href={exp.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 px-4 py-2 border rounded-lg transition-all duration-300 w-full sm:w-auto hover:bg-cyber-blue/5"
                            style={{
                              borderColor: `${config.color}50`,
                              color: config.color,
                            }}
                            onMouseEnter={(e) => {
                               e.currentTarget.style.boxShadow = `0 0 10px ${config.color}50`;
                               e.currentTarget.style.transform = `scale(1.02)`;
                            }}
                            onMouseLeave={(e) => {
                               e.currentTarget.style.boxShadow = `none`;
                               e.currentTarget.style.transform = `scale(1)`;
                            }}
                          >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                            <span className="font-code text-[11px] font-bold tracking-wider uppercase">LinkedIn Proof</span>
                          </a>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </div>
              </VehicleLaunch>
            );
          })}
        </div>
      </div>
    </section>
  );
}

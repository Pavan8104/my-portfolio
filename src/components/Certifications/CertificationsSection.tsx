import { motion } from 'framer-motion';
import { certifications } from '../../data/certifications';
import { playSound } from '../../hooks/useAudio';

export default function CertificationsSection() {
  // Group by category dynamically from data
  // Using Set ensures unique categories, maintaining the order they appear in the data
  const categories = Array.from(new Set(certifications.map((c) => c.category)));

  return (
    <section id="certifications" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 cyber-grid-bg opacity-10" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-code text-xs text-cyber-blue-dim tracking-widest uppercase mb-3">
            {'// VALIDATION & MASTERY'}
          </p>
          <h2 className="cyber-heading text-3xl md:text-5xl neon-text-pink">Certifications</h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {categories.map((category) => {
            const items = certifications.filter((c) => c.category === category);
            return (
              <div key={category} className="mb-12 last:mb-0 w-full">
                <h3 className="cyber-heading text-xl md:text-2xl text-cyber-blue mb-8 border-b border-cyber-blue/20 pb-4 inline-block">
                  <span className="text-neon-pink">{'[ '}</span>{category}<span className="text-neon-pink">{' ]'}</span>
                </h3>
                
                {/* Responsive Grid mapping explicitly to 1/2/3 columns across breakpoints */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      onMouseEnter={() => playSound('hover')}
                      className="cyber-glass p-6 md:p-8 rounded-xl border border-cyber-blue/30 hover:shadow-[0_0_15px_rgba(0,255,255,0.2)] transition-shadow duration-300 flex flex-col sm:flex-row gap-6 sm:items-center justify-between"
                    >
                        <h4 className="flex-1 font-cyber text-[15px] md:text-lg text-cyber-blue tracking-wider mb-0 text-center sm:text-left leading-relaxed">
                          {item.title}
                        </h4>
                      
                      {item.link && (
                        <div className="flex shrink-0 mt-2 sm:mt-0 items-center justify-center">
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            draggable={false}
                            title="LinkedIn Documentation"
                            className="flex items-center justify-center p-3 sm:p-2.5 border border-cyber-blue text-cyber-blue rounded-md hover:bg-cyber-blue/10 hover:border-cyber-blue hover:shadow-[0_0_15px_rgba(0,255,255,0.6)] hover:scale-110 transition-all duration-300"
                          >
                            <svg className="w-5 h-5 md:w-6 md:h-6 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                          </a>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

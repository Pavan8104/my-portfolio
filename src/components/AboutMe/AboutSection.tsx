import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TypingEffect from '../effects/TypingEffect';
import MatrixRain from '../effects/MatrixRain';
import { skills } from '../../data/skills';
import { playSound } from '../../hooks/useAudio';

interface AboutSectionProps {
  isVisible: boolean;
  onEscape: () => void;
}

const hackingSequence = [
  '> Connecting to secure server...',
  '> Breaching firewall...',
  '> Accessing personal data...',
  '> Loading portfolio info...',
  '> Welcome to Mayank\'s Digital Identity',
];

const contactLinks = [
  { name: 'Email', icon: '📧', href: 'mailto:mayank275sharma@gmail.com' },
  { name: 'GitHub', icon: '🔗', href: 'https://github.com/Ms-10182' },
  { name: 'LinkedIn', icon: '💼', href: 'https://www.linkedin.com/in/mayank-sharma-078278243/' },
];

export default function AboutSection({ isVisible, onEscape }: AboutSectionProps) {
  const [hackingStage, setHackingStage] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setHackingStage(0);
      setShowContent(false);
    }
  }, [isVisible]);

  const handleStageComplete = () => {
    if (hackingStage < hackingSequence.length - 1) {
      setTimeout(() => {
        setHackingStage((s) => s + 1);
        playSound('typing');
      }, 400);
    } else {
      setTimeout(() => setShowContent(true), 800);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 overflow-y-auto"
          style={{ background: 'rgba(10,10,10,0.95)' }}
        >
          {/* Matrix background */}
          <MatrixRain opacity={0.08} />

          {/* Glitch scanline overlay */}
          <div
            className="fixed inset-0 pointer-events-none z-[51]"
            style={{
              background:
                'repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,255,65,0.02) 2px, rgba(0,255,65,0.02) 4px)',
              animation: 'scanline-move 0.5s linear infinite',
            }}
          />

          <div className="relative z-[52] min-h-screen flex items-center justify-center p-4">
            {!showContent ? (
              /* Hacking Terminal */
              <motion.div
                initial={{ x: -100, opacity: 0, scale: 0.95 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, type: 'spring', bounce: 0.3 }}
                className="cyber-glass-strong p-6 md:p-8 max-w-2xl w-full"
              >
                {/* Terminal header */}
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-cyan-900/30">
                  <div className="w-3 h-3 rounded-full bg-cyber-red" />
                  <div className="w-3 h-3 rounded-full bg-cyber-yellow" />
                  <div className="w-3 h-3 rounded-full bg-cyber-green" />
                  <span className="ml-3 text-xs text-cyber-blue-dim font-code">
                    hack_identity.sh
                  </span>
                </div>

                {/* Hacking lines */}
                <div className="font-code text-sm space-y-3 min-h-[200px]">
                  {hackingSequence.slice(0, hackingStage + 1).map((line, index) => (
                    <div key={index} className="flex items-start">
                      {index === hackingStage ? (
                        <TypingEffect
                          text={line}
                          speed={40}
                          onComplete={handleStageComplete}
                          className="neon-text-green"
                        />
                      ) : (
                        <span className="text-cyber-green/60">{line}</span>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              /* Bio Content Panel */
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, type: 'spring' }}
                className="cyber-glass-strong p-6 md:p-10 max-w-4xl w-full"
              >
                <h2 className="cyber-heading text-2xl md:text-4xl neon-text mb-8 text-center">
                  Digital Identity Accessed
                </h2>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Bio */}
                  <div>
                    <h3 className="cyber-heading text-lg neon-text-purple mb-4">Profile</h3>
                    <p className="font-code text-cyber-blue-dim text-sm leading-relaxed mb-6">
                      Backend and Blockchain developer with a passion for creating immersive digital experiences.
                      Specializing in Golang, Docker, Kubernetes, and blockchain technologies.
                      I bring ideas to life through code and pure creativity.
                    </p>

                    <div className="space-y-2 text-sm">
                      {[
                        { label: 'Alias', value: 'Msattack' },
                        { label: 'Role', value: 'Backend and Blockchain Developer' },
                        { label: 'Status', value: 'Available for Collaboration' },
                        { label: 'Clearance', value: 'Backend and Blockchain' },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center gap-2">
                          <span className="text-neon-pink">▶</span>
                          <span className="text-cyber-blue-dim">
                            {item.label}: <span className="text-cyber-blue">{item.value}</span>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="relative">
                    <h3 className="relative z-10 cyber-heading text-lg neon-text-purple mb-4">Core Abilities</h3>

                    {/* Rotating skill ring (background) */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible" style={{ top: '15%' }}>
                      {/* Outer glow ring */}
                      <div
                        className="absolute rounded-full border border-neon-pink/5"
                        style={{
                          width: '340px',
                          height: '340px',
                          animation: 'spin 40s linear infinite reverse',
                        }}
                      />
                      {/* Main orbit ring */}
                      <div
                        className="relative rounded-full border border-cyber-blue/15"
                        style={{
                          width: '300px',
                          height: '300px',
                          animation: 'spin 20s linear infinite',
                        }}
                      >
                        {skills.slice(0, 8).map((skill, i) => {
                          const angle = (i / 8) * 360;
                          return (
                            <div
                              key={skill.name}
                              className="absolute left-1/2 top-1/2"
                              style={{
                                transform: `rotate(${angle}deg) translateY(-150px) rotate(-${angle}deg)`,
                                marginLeft: '-18px',
                                marginTop: '-18px',
                              }}
                            >
                              <div
                                className="w-9 h-9 rounded-full flex items-center justify-center text-lg cyber-glass border"
                                style={{
                                  animation: 'spin 20s linear infinite reverse',
                                  borderColor: i % 2 === 0 ? 'rgba(0,255,255,0.25)' : 'rgba(255,0,153,0.25)',
                                  boxShadow: `0 0 12px ${i % 2 === 0 ? 'rgba(0,255,255,0.3)' : 'rgba(255,0,153,0.3)'}`,
                                }}
                              >
                                {skill.icon}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Skill list (foreground) */}
                    <div className="relative z-10 grid grid-cols-2 gap-2">
                      {skills.slice(0, 8).map((skill, index) => (
                        <motion.div
                          key={skill.name}
                          className="flex items-center gap-2 py-1.5 px-2 rounded cyber-glass"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.08 }}
                        >
                          <span className="text-sm">{skill.icon}</span>
                          <span className="font-code text-[11px] text-cyber-blue-dim leading-tight">
                            {skill.name}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Contact Links */}
                <div className="mt-8 pt-6 border-t border-cyan-900/30">
                  <h3 className="cyber-heading text-lg neon-text-purple mb-4 text-center">
                    Connect
                  </h3>
                  <div className="flex justify-center gap-4 flex-wrap">
                    {contactLinks.map((link, i) => (
                      <motion.a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="neon-badge"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.15 }}
                        whileHover={{ scale: 1.08 }}
                        onMouseEnter={() => playSound('hover')}
                      >
                        <span className="mr-2">{link.icon}</span>
                        {link.name}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Escape button */}
          <motion.button
            onClick={() => {
              playSound('click');
              onEscape();
            }}
            className="fixed bottom-6 right-6 z-[55] cyber-button-red text-sm px-6 py-3"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🚨 Escape Safely
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

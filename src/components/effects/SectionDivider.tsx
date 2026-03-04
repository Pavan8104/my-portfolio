import { motion } from 'framer-motion';

export default function SectionDivider() {
  return (
    <div className="relative py-4 flex items-center justify-center overflow-hidden">
      <motion.div
        className="flex items-center gap-3 w-full max-w-2xl mx-auto px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Left line */}
        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-cyber-blue/30 to-cyber-blue/50" />

        {/* Center diamond */}
        <div className="relative">
          <div
            className="w-3 h-3 rotate-45 border border-cyber-blue/50"
            style={{ boxShadow: '0 0 8px rgba(0,255,255,0.3)' }}
          />
          <div
            className="w-1.5 h-1.5 rotate-45 bg-cyber-blue/50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </div>

        {/* Right line */}
        <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-cyber-blue/30 to-cyber-blue/50" />
      </motion.div>
    </div>
  );
}

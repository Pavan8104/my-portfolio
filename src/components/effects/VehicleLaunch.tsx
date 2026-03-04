import { motion } from 'framer-motion';

interface VehicleLaunchProps {
  children: React.ReactNode;
  delay?: number;
}

export default function VehicleLaunch({ children, delay = 0 }: VehicleLaunchProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80, scale: 0.95 }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.8,
        delay,
        type: 'spring',
        stiffness: 80,
        damping: 15,
      }}
    >
      {/* Exhaust trail effect */}
      <motion.div
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[60%] h-8 pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: [0, 0.4, 0] }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: delay + 0.2 }}
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,255,255,0.15) 0%, transparent 70%)',
          filter: 'blur(8px)',
        }}
      />
      {children}
    </motion.div>
  );
}

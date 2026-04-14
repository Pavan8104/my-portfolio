import { motion, AnimatePresence } from 'framer-motion';

interface GalaxyTransitionProps {
  isAnimating: boolean;
}

export default function GalaxyTransition({ isAnimating }: GalaxyTransitionProps) {
  return (
    <AnimatePresence>
      {isAnimating && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Zooming warp speed effect using an SVG star pattern */}
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: 5, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeIn" }}
            style={{
              background: 'radial-gradient(circle at center, transparent 0%, #000 80%), url("data:image/svg+xml,%3Csvg width=\'150\' height=\'150\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'75\' cy=\'75\' r=\'1\' fill=\'%23ffffff\' opacity=\'0.9\'/%3E%3Ccircle cx=\'20\' cy=\'80\' r=\'1.5\' fill=\'%2300ffff\' opacity=\'0.7\'/%3E%3Ccircle cx=\'110\' cy=\'30\' r=\'1\' fill=\'%23ff0099\' opacity=\'0.8\'/%3E%3Ccircle cx=\'40\' cy=\'120\' r=\'0.5\' fill=\'%23ffffff\' opacity=\'0.6\'/%3E%3C/svg%3E")',
              backgroundSize: '150px 150px',
            }}
          />
          
          {/* Central hyperspace flash */}
          <motion.div
            className="rounded-full bg-cyber-blue"
            style={{ 
              width: '4px', 
              height: '4px',
              boxShadow: '0 0 300px 150px rgba(0, 255, 255, 0.6), 0 0 100px 50px rgba(255, 0, 153, 0.4)' 
            }}
            initial={{ scale: 0 }}
            animate={{ scale: [0, 40, 0] }}
            transition={{ duration: 0.8, times: [0, 0.8, 1], ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

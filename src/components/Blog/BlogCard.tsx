import { motion } from 'framer-motion';
import { playSound } from '../../hooks/useAudio';
import type { BlogPost } from '../../data/blog';

interface BlogCardProps {
  post: BlogPost;
  index: number;
  onClick: () => void;
}

export default function BlogCard({ post, index, onClick }: BlogCardProps) {
  return (
    <motion.div
      className="cyber-glass p-5 cursor-pointer group relative overflow-hidden"
      initial={{ opacity: 0, y: 30, rotate: -1 + Math.random() * 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{
        scale: 1.03,
        boxShadow: '0 0 20px rgba(0,255,255,0.4), 0 0 40px rgba(0,255,255,0.2)',
      }}
      onClick={onClick}
      onMouseEnter={() => playSound('hover')}
    >
      {/* Status indicator */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
        <span className="font-code text-[10px] text-cyber-green uppercase tracking-widest">
          Intercepted
        </span>
        <span className="font-code text-[10px] text-cyber-blue-dim ml-auto">
          {post.date}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-cyber text-sm md:text-base text-cyber-blue mb-2 uppercase tracking-wider group-hover:text-neon-pink transition-colors">
        {post.title}
      </h3>

      {/* Excerpt */}
      <p className="font-code text-xs text-cyber-blue-dim line-clamp-2 mb-3">
        {post.excerpt}
      </p>

      {/* Tags + Read time */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1.5 flex-wrap">
          {post.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[10px] font-code bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/20 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="font-code text-[10px] text-cyber-blue-dim">
          {post.readTime}
        </span>
      </div>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-12 h-12">
        <div className="absolute top-2 right-2 w-4 h-[1px] bg-cyber-blue opacity-50" />
        <div className="absolute top-2 right-2 w-[1px] h-4 bg-cyber-blue opacity-50" />
      </div>

      {/* Hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyber-blue/5 to-cyber-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
}
